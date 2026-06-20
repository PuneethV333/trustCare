import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, MoreVertical, Star } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/Avatar';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger } from
'../../components/ui/Tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger } from
'../../components/ui/DropdownMenu';
export default function MyBookingsPage() {
  const bookings = [
  {
    id: 'BKG-7829',
    helperName: 'Sunita Devi',
    helperImg:
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop',
    type: 'Maid & Cook',
    plan: 'Monthly Plan',
    status: 'active',
    startDate: 'Oct 15, 2026',
    amount: '₹14,750'
  },
  {
    id: 'BKG-6541',
    helperName: 'Anita Patel',
    helperImg:
    'https://images.unsplash.com/photo-1531123897727-8f129e1bfa8ea?q=80&w=100&auto=format&fit=crop',
    type: 'Babysitter',
    plan: 'Hourly Plan (4 hrs)',
    status: 'upcoming',
    startDate: 'Oct 22, 2026',
    amount: '₹800'
  },
  {
    id: 'BKG-4321',
    helperName: 'Lakshmi K.',
    helperImg:
    'https://images.unsplash.com/photo-1589156280159-27698a70f29e?q=80&w=100&auto=format&fit=crop',
    type: 'Nanny',
    plan: 'Monthly Plan',
    status: 'completed',
    startDate: 'Jan 10, 2026',
    endDate: 'Jul 10, 2026',
    amount: '₹18,000/mo',
    rating: 5
  }];

  const StatusBadge = ({ status }: {status: string;}) => {
    switch (status) {
      case 'active':
        return (
          <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20 border-green-500/20">
            In Progress
          </Badge>);

      case 'upcoming':
        return (
          <Badge
            variant="secondary"
            className="bg-blue-500/10 text-blue-700 hover:bg-blue-500/20 border-blue-500/20">
            
            Upcoming
          </Badge>);

      case 'completed':
        return (
          <Badge variant="outline" className="text-muted-foreground">
            Completed
          </Badge>);

      default:
        return <Badge>{status}</Badge>;
    }
  };
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Bookings</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Past</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {bookings.map((booking) =>
          <Card key={booking.id} className="overflow-hidden">
              <CardContent className="p-0 sm:flex">
                {/* Left Info */}
                <div className="p-6 flex-1 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={booking.helperImg} />
                    <AvatarFallback>{booking.helperName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg">
                        {booking.helperName}
                      </h3>
                      <StatusBadge status={booking.status} />
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {booking.type} • {booking.plan}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />{' '}
                        {booking.startDate}{' '}
                        {booking.endDate && `- ${booking.endDate}`}
                      </span>
                      <span className="flex items-center">
                        <span className="font-medium text-foreground mr-1">
                          Total:
                        </span>{' '}
                        {booking.amount}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Actions */}
                <div className="bg-muted/20 p-6 sm:w-64 flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 sm:border-l">
                  {booking.status === 'active' &&
                <div className="flex flex-col gap-2 w-full">
                      <Button className="w-full" variant="outline">
                        View Details
                      </Button>
                      <Button
                    className="w-full text-destructive"
                    variant="ghost">
                    
                        Raise Issue
                      </Button>
                    </div>
                }
                  {booking.status === 'upcoming' &&
                <div className="flex flex-col gap-2 w-full">
                      <Button className="w-full" variant="outline">
                        Reschedule
                      </Button>
                      <Button
                    className="w-full text-destructive"
                    variant="ghost">
                    
                        Cancel
                      </Button>
                    </div>
                }
                  {booking.status === 'completed' &&
                <div className="flex flex-col gap-2 w-full items-center sm:items-end">
                      {booking.rating ?
                  <div className="flex items-center gap-1 text-accent mb-2">
                          {[1, 2, 3, 4, 5].map((i) =>
                    <Star key={i} className="h-4 w-4 fill-current" />
                    )}
                        </div> :

                  <Button className="w-full" variant="outline">
                          Leave Review
                        </Button>
                  }
                      <Button className="w-full" variant="ghost">
                        Book Again
                      </Button>
                    </div>
                }
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        {/* Other tabs would filter the list similarly */}
      </Tabs>
    </div>);

}