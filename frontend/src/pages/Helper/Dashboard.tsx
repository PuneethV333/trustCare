import React from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Clock,
  IndianRupee,
  Star,
  TrendingUp,
  Calendar as CalendarIcon,
  MapPin } from
'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription } from
'../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Progress } from '../../components/ui/Progress';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/Avatar';
export default function HelperDashboardPage() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Welcome & Profile Completion */}
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between bg-primary/5 p-6 rounded-xl border border-primary/10">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-background">
            <AvatarImage src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop" />
            <AvatarFallback>SD</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">Welcome back, Sunita!</h2>
            <p className="text-muted-foreground flex items-center gap-2">
              <Star className="h-4 w-4 fill-accent text-accent" /> 4.9 Rating •
              124 Reviews
            </p>
          </div>
        </div>
        <div className="w-full md:w-64 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Profile Completion</span>
            <span className="text-primary font-bold">85%</span>
          </div>
          <Progress value={85} className="h-2" />
          <p className="text-xs text-muted-foreground">
            Add medical certificate to reach 100%
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <IndianRupee className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">
                Earnings (This Month)
              </p>
              <h3 className="text-2xl font-bold">₹14,500</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-accent/20 p-3 rounded-full">
              <Clock className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">
                Active Jobs
              </p>
              <h3 className="text-2xl font-bold">2</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-green-500/10 p-3 rounded-full">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">
                Completed Jobs
              </p>
              <h3 className="text-2xl font-bold">48</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-blue-500/10 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">
                Profile Views
              </p>
              <h3 className="text-2xl font-bold">124</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Incoming Requests */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>New Job Requests</CardTitle>
            <CardDescription>
              You have 2 pending requests to review.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
            {
              id: 1,
              name: 'Priya Sharma',
              location: 'Andheri West (2km away)',
              plan: 'Monthly Plan',
              time: 'Starting Oct 15 • 8 hours/day',
              amount: '₹12,000/mo'
            },
            {
              id: 2,
              name: 'Rahul Mehta',
              location: 'Juhu (4km away)',
              plan: 'Hourly Plan',
              time: 'Oct 12 • 4 hours',
              amount: '₹800'
            }].
            map((req) =>
            <div
              key={req.id}
              className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center p-4 border rounded-lg bg-card">
              
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{req.name}</h4>
                    <Badge variant="secondary">{req.plan}</Badge>   
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" /> {req.location}
                    </p>
                    <p className="flex items-center">
                      <CalendarIcon className="h-3 w-3 mr-1" /> {req.time}
                    </p>
                  </div>
                  <p className="font-semibold text-primary mt-2">
                    {req.amount}
                  </p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                  <Button
                  variant="outline"
                  className="flex-1 sm:flex-none text-destructive hover:text-destructive hover:bg-destructive/10">
                  
                    Decline
                  </Button>
                  <Button className="flex-1 sm:flex-none">Accept Job</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative pl-6 border-l-2 border-primary/30 space-y-6">
              <div className="relative">
                <div className="absolute -left-[29px] top-1 h-4 w-4 rounded-full bg-primary border-4 border-background"></div>
                <p className="text-sm font-bold text-primary mb-1">
                  08:00 AM - 04:00 PM
                </p>
                <p className="font-medium">Monthly Maid Service</p>
                <p className="text-sm text-muted-foreground">
                  Anita Desai • Bandra West
                </p>
              </div>
              <div className="relative">
                <div className="absolute -left-[29px] top-1 h-4 w-4 rounded-full bg-muted border-4 border-background"></div>
                <p className="text-sm font-bold text-muted-foreground mb-1">
                  05:00 PM - 08:00 PM
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
    </div>);

}