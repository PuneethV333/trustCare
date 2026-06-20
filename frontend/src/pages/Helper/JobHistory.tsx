import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow } from
'../../components/ui/Table';
export default function HelperJobHistoryPage() {
  const jobs = [
  {
    id: 'JOB-1029',
    client: 'Priya Sharma',
    type: 'Monthly Maid',
    date: 'Oct 2026 - Present',
    status: 'Active',
    amount: '₹12,000/mo'
  },
  {
    id: 'JOB-0982',
    client: 'Rahul Mehta',
    type: 'Hourly Cook',
    date: 'Oct 12, 2026',
    status: 'Completed',
    amount: '₹800'
  },
  {
    id: 'JOB-0844',
    client: 'Anita Desai',
    type: 'Babysitter',
    date: 'Sep 25, 2026',
    status: 'Completed',
    amount: '₹1,200'
  },
  {
    id: 'JOB-0712',
    client: 'Vikram Singh',
    type: 'Monthly Maid',
    date: 'Jan 2026 - Aug 2026',
    status: 'Completed',
    amount: '₹84,000 (Total)'
  }];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Job History & Earnings</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Lifetime Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">₹1,45,000</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Jobs Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">48</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Payouts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">₹2,400</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Service Type</TableHead>
                <TableHead>Date / Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job) =>
              <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.id}</TableCell>
                  <TableCell>{job.client}</TableCell>
                  <TableCell>{job.type}</TableCell>
                  <TableCell>{job.date}</TableCell>
                  <TableCell>
                    <Badge
                    variant={
                    job.status === 'Active' ? 'default' : 'secondary'
                    }>
                    
                      {job.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {job.amount}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>);

}