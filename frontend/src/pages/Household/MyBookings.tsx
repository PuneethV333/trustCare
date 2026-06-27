import React from "react";
import { Calendar } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card, CardContent } from "../../components/ui/Card";
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
import { useGetMyRequests } from "../../hooks/useUser";
import { type requestType } from "../../types/user.types";

const StatusBadge = ({ status }: { status: requestType["status"] }) => {
  switch (status) {
    case "Accepted":
      return (
        <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20 border-green-500/20">
          Accepted
        </Badge>
      );
    case "Pending":
      return (
        <Badge
          variant="secondary"
          className="bg-blue-500/10 text-blue-700 hover:bg-blue-500/20 border-blue-500/20"
        >
          Pending
        </Badge>
      );
    case "Rejected":
      return (
        <Badge
          variant="outline"
          className="text-destructive border-destructive/30"
        >
          Rejected
        </Badge>
      );
    default:
      return <Badge>{status}</Badge>;
  }
};

const BookingCard = ({ request }: { request: requestType }) => {
  const { plan, status, startDate } = request;
  const helper = plan.maidProfile.user;

  const formattedDate = startDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0 sm:flex">
        <div className="p-6 flex-1 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <Avatar className="h-16 w-16">
            <AvatarImage src={helper.profilePic} />
            <AvatarFallback>{helper.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-lg">{helper.name}</h3>
              <StatusBadge status={status} />
            </div>
            <p className="text-sm text-muted-foreground mb-3 capitalize">
              {plan.type} Plan • {plan.dailyWorkingHours} hrs/day
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formattedDate}
              </span>
              <span>
                <span className="font-medium text-foreground">Cost: </span>₹
                {plan.cost}
                {plan.type === "hourly"
                  ? "/hr"
                  : plan.type === "monthly"
                    ? "/mo"
                    : "/yr"}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function MyBookingsPage() {
  const { data: requests, isLoading, isError } = useGetMyRequests();

  const filter = (status: requestType["status"] | "all") =>
    status === "all"
      ? (requests ?? [])
      : (requests ?? []).filter((r) => r.status === status);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="h-32 animate-pulse bg-muted" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
        <p className="text-destructive">
          Failed to load bookings. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">
            All Bookings
            {requests && requests.length > 0 && (
              <span className="ml-1.5 text-xs bg-muted-foreground/20 rounded-full px-1.5">
                {requests.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="Accepted">Active</TabsTrigger>
          <TabsTrigger value="Pending">Pending</TabsTrigger>
          <TabsTrigger value="Rejected">Rejected</TabsTrigger>
        </TabsList>

        {(["all", "Accepted", "Pending", "Rejected"] as const).map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            {filter(tab).length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <p className="text-lg font-medium">No bookings here</p>
                <p className="text-sm mt-1">
                  {tab === "all"
                    ? "You haven't made any bookings yet."
                    : `No ${tab.toLowerCase()} requests.`}
                </p>
              </div>
            ) : (
              filter(tab).map((request) => (
                <BookingCard key={request.id} request={request} />
              ))
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
