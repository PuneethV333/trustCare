/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  Clock,
  IndianRupee,
  Star,
  TrendingUp,
  Calendar as CalendarIcon,
  MapPin,
  Loader2,
  AlertCircle,
  InboxIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Progress } from "../../components/ui/Progress";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/Avatar";
import { useGetMe } from "../../hooks/useAuth";
import { useGetUser } from "../../hooks/useUser";
import { requestType } from "../../types/user.types";
import { useAcceptRequest, useGetMyRequests, useRejectRequest } from "../../hooks/useMaid.";


// ─── helpers ────────────────────────────────────────────────────────────────

function formatPlanType(type: requestType["plan"]["type"]) {
  const map = {
    hourly: "Hourly Plan",
    monthly: "Monthly Plan",
    yearly: "Yearly Plan",
  };
  return map[type] ?? type;
}

function formatCost(cost: number, type: requestType["plan"]["type"]) {
  const suffix = type === "hourly" ? "/hr" : type === "monthly" ? "/mo" : "/yr";
  return `₹${cost.toLocaleString("en-IN")}${suffix}`;
}

function formatStartDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

// ─── sub-components ──────────────────────────────────────────────────────────

function RequestCard({ req }: { req: requestType }) {
  const accept = useAcceptRequest();
  const reject = useRejectRequest();

  const isPending = req.status === "Pending";
  const isAccepted = req.status === "Accepted";
  const isRejected = req.status === "Rejected";

  const isMutating = accept.isPending || reject.isPending;

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center p-4 border rounded-lg bg-card">
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <Avatar className="h-10 w-10 shrink-0">
          <AvatarImage src={req.plan.maidProfile.user.profilePic} />
          <AvatarFallback>
            {req.plan.maidProfile.user.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h4 className="font-semibold">{req.plan.maidProfile.user.name}</h4>
            <Badge variant="secondary">{formatPlanType(req.plan.type)}</Badge>

            {/* status badge — shown once actioned */}
            {isAccepted && (
              <Badge className="bg-green-100 text-green-700 border-green-200">
                Accepted
              </Badge>
            )}
            {isRejected && (
              <Badge className="bg-red-100 text-red-700 border-red-200">
                Declined
              </Badge>
            )}
          </div>

          <div className="text-sm text-muted-foreground space-y-1">
            <p className="flex items-center gap-1">
              <CalendarIcon className="h-3 w-3 shrink-0" />
              Starting {formatStartDate(req.startDate)} •{" "}
              {req.plan.dailyWorkingHours}h/day
            </p>
          </div>

          <p className="font-semibold text-primary mt-2">
            {formatCost(req.plan.cost, req.plan.type)}
          </p>
        </div>
      </div>

      {isPending && (
        <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0 shrink-0">
          <Button
            variant="outline"
            className="flex-1 sm:flex-none text-destructive hover:text-destructive hover:bg-destructive/10"
            disabled={isMutating}
            onClick={() => reject.mutate(req.id)}
          >
            {reject.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Decline"
            )}
          </Button>

          <Button
            className="flex-1 sm:flex-none"
            disabled={isMutating}
            onClick={() => accept.mutate(req.id)}
          >
            {accept.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Accept Job"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

function RequestsSection() {
  const { data: requests, isLoading, isError, error } = useGetMyRequests();

  const pending = requests?.filter((r) => r.status === "Pending") ?? [];
  const recent = requests?.filter((r) => r.status !== "Pending") ?? [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12 text-muted-foreground gap-2">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>Loading requests…</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center gap-3 p-4 rounded-lg bg-destructive/5 text-destructive border border-destructive/20">
        <AlertCircle className="h-5 w-5 shrink-0" />
        <p className="text-sm">
          {(error as Error)?.message ??
            "Failed to load requests. Please try again."}
        </p>
      </div>
    );
  }

  if (!requests?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground gap-3">
        <InboxIcon className="h-10 w-10 opacity-30" />
        <p className="text-sm">No job requests yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {pending.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Pending — {pending.length}
          </p>
          {pending.map((req) => (
            <RequestCard key={req.id} req={req} />
          ))}
        </div>
      )}

      {recent.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Recent
          </p>
          {recent.map((req) => (
            <RequestCard key={req.id} req={req} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── page ────────────────────────────────────────────────────────────────────

export default function HelperDashboardPage() {
  const { data: me } = useGetMe();
  console.log(me);
  
const { data: helper } = useGetUser(me?.id ?? "");
  const { data: requests } = useGetMyRequests();

  const pendingCount =
    requests?.filter((r) => r.status === "Pending").length ?? 0;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Welcome & Profile Completion */}
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between bg-primary/5 p-6 rounded-xl border border-primary/10">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-background">
            <AvatarImage src={me?.profilePic} />
            <AvatarFallback>
              {me?.name?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">Welcome back, {me?.name}!</h2>
            <p className="text-muted-foreground flex items-center gap-2">
              <Star className="h-4 w-4 fill-accent text-accent" />
              {helper?.maidProfile?.averageRating ?? "—"} Rating •{" "}
              {helper?.maidProfile?.totalReviews ?? 0} Reviews
            </p>
          </div>
        </div>

        <div className="w-full md:w-64 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Profile Completion</span>
            <span className="text-primary font-bold">
              {helper?.maidProfile?.profileCompletion ?? 0}%
            </span>
          </div>
          <Progress
            value={helper?.maidProfile?.profileCompletion ?? 0}
            className="h-2"
          />
          <p className="text-xs text-muted-foreground">
            Add medical certificate to reach 100%
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Job Requests */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              New Job Requests
              {pendingCount > 0 && (
                <span className="inline-flex items-center justify-center h-5 min-w-5 px-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  {pendingCount}
                </span>
              )}
            </CardTitle>
            <CardDescription>
              {pendingCount > 0
                ? `You have ${pendingCount} pending request${pendingCount > 1 ? "s" : ""} to review.`
                : "No pending requests right now."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RequestsSection />
          </CardContent>
        </Card>

        {/* Today's Schedule — unchanged, static */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative pl-6 border-l-2 border-primary/30 space-y-6">
              <div className="relative">
                <div className="absolute -left-[29px] top-1 h-4 w-4 rounded-full bg-primary border-4 border-background" />
                <p className="text-sm font-bold text-primary mb-1">
                  08:00 AM – 04:00 PM
                </p>
                <p className="font-medium">Monthly Maid Service</p>
                <p className="text-sm text-muted-foreground">
                  Anita Desai • Bandra West
                </p>
              </div>
              <div className="relative">
                <div className="absolute -left-[29px] top-1 h-4 w-4 rounded-full bg-muted border-4 border-background" />
                <p className="text-sm font-bold text-muted-foreground mb-1">
                  05:00 PM – 08:00 PM
                </p>
                <p className="font-medium">Evening Cook</p>
                <p className="text-sm text-muted-foreground">
                  Vikram Singh • Khar
                </p>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              View Full Calendar
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
