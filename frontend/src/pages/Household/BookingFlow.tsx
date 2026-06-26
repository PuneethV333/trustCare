import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  CheckCircle2,
  ChevronLeft,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  ShieldCheck,
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
import { Input } from "../../components/ui/Input";
import { Label } from "../../components/ui/Label";
import { RadioGroup, RadioGroupItem } from "../../components/ui/RadioGroup";
import { Separator } from "../../components/ui/Separator";
import { useAddRequest, useGetUser } from "../../hooks/useUser";
// import { useAddRequest, addRequestSchema, addRequest } from "../../hooks/useRequest"; // adjust import path
import { returnTypeOfCost } from "../../utils/getTypeOfCost";
import { addRequestSchema, type addRequest } from "../../types/user.types";

export default function BookingFlowPage() {
  const { id } = useParams();
  const { data: helper } = useGetUser(id ?? "");
  const { mutate: addRequest, isPending } = useAddRequest();

  const [step, setStep] = useState(1);

  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<addRequest, any, addRequest>({
    resolver: zodResolver(addRequestSchema),
    defaultValues: {
      planId: helper?.maidProfile.plans?.[0]?.id ?? "",
      startData: new Date().toISOString().split("T")[0] as unknown as Date,
    },
  });

  // Step 1 → 2: just advance, no submission yet
  const handleStep1Next = () => setStep(2);

  // Step 2 → 3: just advance
  const handleStep2Next = () => setStep(3);

  // Step 3: final submission
  const onConfirm = (data: addRequest) => {
    if (!id) return;
    addRequest(
      { id, data },
      {
        onSuccess: () => {
          toast.success("Booking request sent!", {
            description: "The helper will review and accept your booking soon.",
          });
        },
        onError: (err: unknown) => {
          const message =
            err instanceof Error ? err.message : "Something went wrong.";
          toast.error("Booking failed", { description: message });
        },
      },
    );
  };

  // Derive review-summary values from live form state
  const selectedPlanId = getValues("planId");
  const selectedPlan = helper?.maidProfile?.plans?.find(
    (p) => p.id === selectedPlanId,
  );
  const startDateValue = getValues("startData");
  const formattedStartDate = startDateValue
    ? new Date(startDateValue).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "—";

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <Link
          to={`/helper/${id}`}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> Back to Profile
        </Link>
        <h1 className="text-3xl font-bold">Book {helper?.name}</h1>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-muted -z-10 rounded-full" />
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 rounded-full transition-all duration-300"
          style={{ width: `${((step - 1) / 2) * 100}%` }}
        />
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`flex flex-col items-center gap-2 bg-background px-2 ${
              step >= i ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                step >= i
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {step > i ? <CheckCircle2 className="h-5 w-5" /> : i}
            </div>
            <span className="text-xs font-medium hidden sm:block">
              {i === 1 ? "Schedule" : i === 2 ? "Details" : "Confirm"}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Form Area */}
        <div className="md:col-span-2">
          {/* ── Step 1: Schedule & Plan ── */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Schedule & Plan</CardTitle>
                <CardDescription>
                  When do you need the service to start?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Plan Selection */}
                <div className="space-y-3">
                  <Label>Selected Plan</Label>
                  <Controller
                    name="planId"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                      >
                        {helper?.maidProfile?.plans?.map((plan) => (
                          <div key={plan.id}>
                            <RadioGroupItem
                              value={plan.id}
                              id={plan.id}
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor={plan.id}
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                            >
                              <span className="font-semibold text-lg mb-1 capitalize">
                                {plan.type}
                              </span>
                              <span className="text-primary font-bold">
                                ₹{plan.cost}
                                {returnTypeOfCost(plan.type)}
                              </span>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    )}
                  />
                  {errors.planId && (
                    <p className="text-sm text-destructive">
                      {errors.planId.message}
                    </p>
                  )}
                </div>

                {/* Start Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="start-date"
                        type="date"
                        className="pl-9"
                        {...register("startData")}
                      />
                    </div>
                    {errors.startData && (
                      <p className="text-sm text-destructive">
                        {errors.startData.message}
                      </p>
                    )}
                  </div>

                  {/* Time is UI-only — not sent to backend */}
                  <div className="space-y-2">
                    <Label htmlFor="start-time">Preferred Start Time</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="start-time"
                        type="time"
                        className="pl-9"
                        defaultValue="08:00"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleStep1Next}>
                  Continue to Details
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* ── Step 2: Service Details (address/notes — UI only for now) ── */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Service Details</CardTitle>
                <CardDescription>Where should the helper go?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Full Address</Label>
                  <Input
                    id="address"
                    placeholder="Flat/House No, Building, Street"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input id="pincode" placeholder="400053" />
                  </div>
                </div>
                <div className="space-y-2 pt-4">
                  <Label htmlFor="notes">Special Instructions (Optional)</Label>
                  <textarea
                    id="notes"
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="E.g., We have a dog, please ring the bell once."
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button onClick={handleStep2Next}>Review Booking</Button>
              </CardFooter>
            </Card>
          )}

          {/* ── Step 3: Review & Confirm ── */}
          {step === 3 && (
            <form onSubmit={handleSubmit(onConfirm)}>
              <Card>
                <CardHeader>
                  <CardTitle>Review & Confirm</CardTitle>
                  <CardDescription>
                    Please review your booking details before confirming.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-muted/30 p-4 rounded-lg space-y-4">
                    <div className="flex items-start gap-3">
                      <CalendarIcon className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Schedule</p>
                        <p className="text-sm text-muted-foreground">
                          Starting {formattedStartDate}
                        </p>
                        {selectedPlan && (
                          <p className="text-sm text-muted-foreground capitalize">
                            {selectedPlan.type} Plan — {selectedPlan.duration}{" "}
                            days · {selectedPlan.dailyWorkingHours} hrs/day
                          </p>
                        )}
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-sm text-muted-foreground">
                          As entered in the previous step
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-accent/10 p-4 rounded-lg border border-accent/20 flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium text-accent-foreground">
                        TrustCare Guarantee
                      </p>
                      <p className="text-muted-foreground mt-1">
                        Your payment is secure. You won't be charged until the
                        helper accepts the booking. Free replacement within 15
                        days if you're not satisfied.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setStep(2)}
                    disabled={isPending}
                  >
                    Back
                  </Button>
                  <Button type="submit" size="lg" disabled={isPending}>
                    {isPending ? "Sending Request..." : "Confirm Booking"}
                  </Button>
                </CardFooter>
              </Card>
            </form>
          )}
        </div>

        {/* ── Order Summary Sidebar ── */}
        <div className="md:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="text-lg">Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={helper?.profilePic}
                  alt={helper?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{helper?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {helper?.maidProfile?.skill.join(" & ")}
                  </p>
                </div>
              </div>
              <Separator />
              {selectedPlan ? (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground capitalize">
                      {selectedPlan.type} Plan
                    </span>
                    <span>₹{selectedPlan.cost}</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{selectedPlan.duration} days</span>
                    <span>{selectedPlan.dailyWorkingHours} hrs/day</span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No plan selected
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
