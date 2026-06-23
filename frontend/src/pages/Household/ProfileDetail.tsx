import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  CheckCircle2,
  ChevronLeft,
  Calendar as CalendarIcon,
  FileText,
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/Avatar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/Tabs";
import { useGetUser } from "../../hooks/useUser";
import { returnTypeOfCost } from "../../utils/getTypeOfCost";
export default function ProfileDetailPage() {
  const { id } = useParams();

  const { data: helper } = useGetUser(id ?? "");
  if (!id) {
    return null;
  }
  return (
    <div className="bg-muted/10 min-h-screen pb-20">
      <div className="bg-card border-b">
        <div className="container mx-auto px-4 py-4">
          <Link
            to="/browse"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Search
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-8">
            <Card className="border-none shadow-md overflow-hidden">
              <div className="h-32 bg-primary/10 relative">
                {helper?.maidProfile?.isVerified && (
                  <div className="absolute top-4 right-4 bg-card px-3 py-1 rounded-full flex items-center gap-1 shadow-sm text-sm font-medium text-primary">
                    <ShieldCheck className="h-4 w-4 text-accent" />
                    TrustCare Verified
                  </div>
                )}
              </div>
              <CardContent className="pt-0 relative px-6 sm:px-8">
                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end -mt-12 mb-6">
                  <Avatar className="h-24 w-24 border-4 border-card shadow-md">
                    <AvatarImage src={helper?.profilePic} />
                  </Avatar>
                  <div className="flex-1 pb-2">
                    <h1 className="text-2xl font-bold">{helper?.name}</h1>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground mt-1 text-sm">
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />{" "}
                        {helper?.maidProfile?.area}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />{" "}
                        {helper?.maidProfile?.experience} Experience
                      </span>
                      <span className="flex items-center text-foreground font-medium">
                        <Star className="h-4 w-4 mr-1 fill-accent text-accent" />{" "}
                        {helper?.maidProfile?.averageRating} (
                        {helper?.maidProfile?.totalReviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {helper?.maidProfile?.skill.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="font-normal"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-accent/10 p-2 rounded-full">
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">ID Verified</p>
                      <p className="text-xs text-muted-foreground">
                        Aadhaar checked
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-accent/10 p-2 rounded-full">
                      <ShieldCheck className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Background Checked</p>
                      <p className="text-xs text-muted-foreground">
                        Police verification done
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Medical Cleared</p>
                      <p className="text-xs text-muted-foreground">
                        Basic health check
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardContent className="p-0">
                <Tabs defaultValue="about" className="w-full">
                  <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0 h-auto">
                    <TabsTrigger
                      value="about"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4"
                    >
                      About
                    </TabsTrigger>
                    <TabsTrigger
                      value="reviews"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4"
                    >
                      Reviews ({helper?.maidProfile?.totalReviews})
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="about" className="p-6 sm:p-8 space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Bio</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {helper?.maidProfile?.bio}
                      </p>
                    </div>
                    <div></div>
                  </TabsContent>
                  <TabsContent value="reviews" className="p-6 sm:p-8 space-y-6">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="text-4xl font-bold">
                        {helper?.maidProfile?.averageRating}
                      </div>
                      <div>
                        <div className="flex text-accent mb-1">
                          {helper?.maidProfile?.reviews?.map((_, idx) => (
                            <Star key={idx} className="h-4 w-4 fill-current" />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Based on {helper?.maidProfile?.totalReviews} reviews
                        </p>
                      </div>
                    </div>
                    <div className="space-y-6">
                      {helper?.maidProfile?.reviews?.map((i, idx) => (
                        <div
                          key={idx}
                          className="border-b pb-6 last:border-0 last:pb-0"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={i.user.profilePic} />
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">
                                  {i.user.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {i.createdAt.toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex text-accent">
                              {Array.from(
                                new Array(i.rating),
                                (_, l) => l + 1,
                              ).map((star) => (
                                <Star
                                  key={star}
                                  className="h-3 w-3 fill-current"
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            {i.comment}
                          </p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="w-full lg:w-96 shrink-0 space-y-6">
            <h3 className="text-xl font-bold mb-4">Select a Plan</h3>

            {helper?.maidProfile?.plans?.map((x, idx) => (
              <Card className="border-primary shadow-md relative overflow-hidden">
                <CardHeader>
                  <CardTitle>{x.type} Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className="text-3xl font-bold text-primary mb-4"
                    key={idx}
                  >
                    ₹{Number(x.cost)}
                    <span className="text-sm font-normal text-muted-foreground">
                      {returnTypeOfCost(x.type)}
                    </span>
                  </div>
                  <ul className="space-y-2 text-sm mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent" /> duration{" "}
                      {x.duration} days
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent" />{" "}
                      {x.dailyWorkingHours} hours per day
                    </li>
                  </ul>
                  <Link to={`/book/${id}?plan=monthly`}>
                    <Button className="w-full" size="lg">
                      Book Monthly Plan
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}

            <div className="text-center text-sm text-muted-foreground mt-4">
              <p className="flex items-center justify-center gap-1">
                <ShieldCheck className="h-4 w-4" /> Secure payment via TrustCare
              </p>
              <p className="mt-1">
                You won't be charged until the helper confirms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
