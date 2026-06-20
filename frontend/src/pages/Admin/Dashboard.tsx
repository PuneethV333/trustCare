import React from 'react';
import { Users, ShieldCheck, CalendarCheck, TrendingUp } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../../components/ui/Card';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip } from
'recharts';
const data = [
{
  name: 'Jan',
  users: 4000,
  bookings: 2400
},
{
  name: 'Feb',
  users: 4500,
  bookings: 2800
},
{
  name: 'Mar',
  users: 5200,
  bookings: 3200
},
{
  name: 'Apr',
  users: 6100,
  bookings: 3900
},
{
  name: 'May',
  users: 7500,
  bookings: 4800
},
{
  name: 'Jun',
  users: 8900,
  bookings: 5600
}];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Platform Overview</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">
                Total Households
              </p>
              <h3 className="text-2xl font-bold">12,450</h3>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" /> +12% this month
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-accent/20 p-3 rounded-full">
              <ShieldCheck className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">
                Verified Helpers
              </p>
              <h3 className="text-2xl font-bold">3,820</h3>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" /> +5% this month
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-blue-500/10 p-3 rounded-full">
              <CalendarCheck className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">
                Active Bookings
              </p>
              <h3 className="text-2xl font-bold">8,942</h3>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" /> +18% this month
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-green-500/10 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">
                Platform Revenue
              </p>
              <h3 className="text-2xl font-bold">₹4.2M</h3>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" /> +22% this month
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Growth Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0
                  }}>
                  
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="var(--primary)"
                        stopOpacity={0.3} />
                      
                      <stop
                        offset="95%"
                        stopColor="var(--primary)"
                        stopOpacity={0} />
                      
                    </linearGradient>
                    <linearGradient
                      id="colorBookings"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1">
                      
                      <stop
                        offset="5%"
                        stopColor="var(--accent)"
                        stopOpacity={0.3} />
                      
                      <stop
                        offset="95%"
                        stopColor="var(--accent)"
                        stopOpacity={0} />
                      
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false} />
                  
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`} />
                  
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="var(--border)" />
                  
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stroke="var(--primary)"
                    fillOpacity={1}
                    fill="url(#colorUsers)" />
                  
                  <Area
                    type="monotone"
                    dataKey="bookings"
                    stroke="var(--accent)"
                    fillOpacity={1}
                    fill="url(#colorBookings)" />
                  
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
              {
                title: 'New Helper Registration',
                desc: 'Meena R. submitted documents for verification.',
                time: '10 mins ago'
              },
              {
                title: 'Dispute Raised',
                desc: 'Booking BKG-8923 reported a no-show.',
                time: '1 hour ago'
              },
              {
                title: 'High Value Booking',
                desc: 'Yearly Nanny plan booked in South Mumbai (₹2.4L)',
                time: '3 hours ago'
              },
              {
                title: 'Verification Approved',
                desc: 'Admin approved Aadhaar for 5 helpers.',
                time: '5 hours ago'
              }].
              map((item, i) =>
              <div key={i} className="flex gap-4">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.time}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>);

}