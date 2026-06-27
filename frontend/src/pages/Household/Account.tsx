// AccountPage.tsx
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Label } from "../../components/ui/Label";
import { Tabs, TabsContent } from "../../components/ui/Tabs";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/Avatar";
import { updateMeSchema, updateMeType } from "../../types/user.types";
import { useUpdateMe } from "../../hooks/useUser";
import { useGetMe } from "../../hooks/useAuth";
import { getImgUrl } from "../../utils/getUrl";

export default function AccountPage() {
  const { data: me } = useGetMe();
  const { mutate: updateMe, isPending } = useUpdateMe();
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<updateMeType>({
    resolver: zodResolver(updateMeSchema),
    values: {
      name: me?.name ?? "",
      email: me?.email ?? "",
      phoneNumber: me?.phoneNumber ?? "",
      profilePic: me?.profilePic ?? "",
    },
  });

  const profilePic = watch("profilePic");

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await getImgUrl(file);
      setValue("profilePic", url, { shouldValidate: true });
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = (data: updateMeType) => updateMe(data);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <Tabs
          defaultValue="profile"
          className="flex-1 flex flex-col md:flex-row gap-8"
        >
          <div className="flex-1">
            <TabsContent value="profile" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal details here.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <input
                      title="file"
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoChange}
                    />
                    <div className="flex items-center gap-6">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={profilePic || me?.profilePic} />
                        <AvatarFallback>
                          {me?.name?.charAt(0).toUpperCase() ?? "?"}
                        </AvatarFallback>
                      </Avatar>
                      <Button
                        type="button"
                        variant="outline"
                        disabled={uploading}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        {uploading ? "Uploading..." : "Change Photo"}
                      </Button>
                    </div>

                    {/* Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" {...register("name")} />
                        {errors.name && (
                          <p className="text-sm text-destructive">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" {...register("email")} />
                        {errors.email && (
                          <p className="text-sm text-destructive">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Phone</Label>
                        <Input
                          id="phoneNumber"
                          type="tel"
                          {...register("phoneNumber")}
                        />
                        {errors.phoneNumber && (
                          <p className="text-sm text-destructive">
                            {errors.phoneNumber.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <Button type="submit" disabled={isPending || uploading}>
                      {isPending ? "Saving..." : "Save Changes"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
