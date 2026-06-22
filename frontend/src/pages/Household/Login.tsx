/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Label } from "../../components/ui/Label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/Tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";

import {
  signInViaEmail,
  signInViaGoogle,
  signUpViaEmail,
} from "../../service/auth.service";

import { useQueryClient } from "@tanstack/react-query";
import { friendlyError } from "../../service/friendlyError.service";
import { useSignUp } from "../../hooks/useAuth";
import {
  LoginForm,
  loginSchema,
  RegisterForm,
  registerSchema,
} from "../../types/auth.types";

export default function LoginPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutateAsync: signUp } = useSignUp();

  const [authError, setAuthError] = useState<string | null>(null);

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const registerForm = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const syncUser = async (payload: {
    name: string;
    email: string;
    phoneNumber?: string;
    profilePic?: string;
  }) => {
    await queryClient.invalidateQueries({ queryKey: ["me"] });

    try {
      await queryClient.fetchQuery({ queryKey: ["me"] });
    } catch {
      await signUp(payload);
    }

    navigate("/");
  };

  const handleLogin = loginForm.handleSubmit(async ({ email, password }) => {
    setAuthError(null);
    try {
      await signInViaEmail(email, password);

      await queryClient.invalidateQueries({ queryKey: ["me"] });
      navigate("/");
    } catch (err: any) {
      setAuthError(friendlyError(err.code));
    }
  });

  const handleRegister = registerForm.handleSubmit(
    async ({ firstName, lastName, email, phoneNumber, password }) => {
      setAuthError(null);
      try {
        await signUpViaEmail(email, password);
        await syncUser({
          name: `${firstName} ${lastName}`,
          email,
          phoneNumber,
        });
      } catch (err: any) {
        setAuthError(friendlyError(err.code));
      }
    },
  );

  const handleGoogleSignIn = async () => {
    setAuthError(null);
    try {
      const user = await signInViaGoogle();
      await syncUser({
        name: user.displayName ?? "",
        email: user.email ?? "",
        phoneNumber: user.phoneNumber ?? undefined,
        profilePic: user.photoURL ?? undefined,
      });
    } catch (err: any) {
      setAuthError(friendlyError(err.code));
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col md:flex-row">
      {/* Left side - Trust Messaging */}
      <div className="hidden md:flex w-1/2 bg-primary text-primary-foreground p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="relative z-10">
          <Link
            to="/"
            className="flex items-center gap-2 text-primary-foreground mb-12"
          >
            <ShieldCheck className="h-8 w-8 text-accent" />
            <span className="font-bold text-2xl tracking-tight">TrustCare</span>
          </Link>
          <h1 className="text-4xl font-bold mb-6 leading-tight">
            Peace of mind for your home and family.
          </h1>
          <p className="text-lg text-primary-foreground/80 mb-12 max-w-md">
            Join thousands of households who trust us to find reliable, verified
            domestic help.
          </p>
          <div className="space-y-6">
            {[
              {
                title: "100% Background Verified",
                desc: "Every helper undergoes strict identity and criminal record checks.",
              },
              {
                title: "Transparent Pricing",
                desc: "No hidden fees. Pay securely through the platform.",
              },
              {
                title: "Replacement Guarantee",
                desc: "Not satisfied? Get a free replacement within 15 days.",
              },
            ].map(({ title, desc }) => (
              <div key={title} className="flex items-center gap-4">
                <div className="bg-accent/20 p-2 rounded-full">
                  <CheckCircle2 className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-sm text-primary-foreground/70">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10 text-sm text-primary-foreground/60">
          © 2026 TrustCare India. All rights reserved.
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 bg-background">
        <Card className="w-full max-w-md border-none shadow-none md:shadow-xl md:border-border">
          <CardHeader className="space-y-1 text-center md:text-left">
            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
            <CardDescription>
              Enter your details to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {authError && (
              <div className="mb-4 rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {authError}
              </div>
            )}

            <Tabs
              defaultValue="login"
              className="w-full"
              onValueChange={() => setAuthError(null)}
            >
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Log In</TabsTrigger>
                <TabsTrigger value="register">Sign Up</TabsTrigger>
              </TabsList>

              {/* ── Login Tab ── */}
              <TabsContent value="login" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    {...loginForm.register("email")}
                  />
                  {loginForm.formState.errors.email && (
                    <p className="text-xs text-destructive">
                      {loginForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      to="#"
                      className="text-sm text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    {...loginForm.register("password")}
                  />
                  {loginForm.formState.errors.password && (
                    <p className="text-xs text-destructive">
                      {loginForm.formState.errors.password.message}
                    </p>
                  )}
                </div>
                <Button
                  className="w-full mt-6"
                  size="lg"
                  onClick={handleLogin}
                  disabled={loginForm.formState.isSubmitting}
                >
                  {loginForm.formState.isSubmitting ? "Logging in…" : "Log In"}
                </Button>
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  size="lg"
                  onClick={handleGoogleSignIn}
                >
                  Google
                </Button>
              </TabsContent>

              {/* ── Register Tab ── */}
              <TabsContent value="register" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input
                      id="first-name"
                      placeholder="Priya"
                      {...registerForm.register("firstName")}
                    />
                    {registerForm.formState.errors.firstName && (
                      <p className="text-xs text-destructive">
                        {registerForm.formState.errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input
                      id="last-name"
                      placeholder="Sharma"
                      {...registerForm.register("lastName")}
                    />
                    {registerForm.formState.errors.lastName && (
                      <p className="text-xs text-destructive">
                        {registerForm.formState.errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-email">Email</Label>
                  <Input
                    id="reg-email"
                    type="email"
                    placeholder="m@example.com"
                    {...registerForm.register("email")}
                  />
                  {registerForm.formState.errors.email && (
                    <p className="text-xs text-destructive">
                      {registerForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    {...registerForm.register("phoneNumber")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-password">Password</Label>
                  <Input
                    id="reg-password"
                    type="password"
                    {...registerForm.register("password")}
                  />
                  {registerForm.formState.errors.password && (
                    <p className="text-xs text-destructive">
                      {registerForm.formState.errors.password.message}
                    </p>
                  )}
                </div>
                <Button
                  className="w-full mt-6"
                  size="lg"
                  onClick={handleRegister}
                  disabled={registerForm.formState.isSubmitting}
                >
                  {registerForm.formState.isSubmitting
                    ? "Creating account…"
                    : "Create Account"}
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-4">
                  By clicking continue, you agree to our{" "}
                  <Link to="#" className="underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="#" className="underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
