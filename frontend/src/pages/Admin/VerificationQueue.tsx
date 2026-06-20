import React from 'react';
import { CheckCircle2, XCircle, Eye, AlertCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription } from
'../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow } from
'../../components/ui/Table';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/Avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter } from
'../../components/ui/Dialog';
export default function AdminVerificationQueuePage() {
  const queue = [
  {
    id: 'REQ-101',
    name: 'Meena R.',
    type: 'Aadhaar Card',
    submitted: '2 hours ago',
    status: 'pending',
    img: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=100&auto=format&fit=crop'
  },
  {
    id: 'REQ-102',
    name: 'Kavita M.',
    type: 'Police Clearance',
    submitted: '5 hours ago',
    status: 'pending',
    img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=100&auto=format&fit=crop'
  },
  {
    id: 'REQ-103',
    name: 'Radha S.',
    type: 'Medical Certificate',
    submitted: '1 day ago',
    status: 'pending',
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop'
  }];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Verification Queue</h1>
          <p className="text-muted-foreground">
            Review and approve helper documents.
          </p>
        </div>
        <Badge variant="secondary" className="text-sm px-3 py-1">
          <AlertCircle className="w-4 h-4 mr-2" /> 12 Pending Reviews
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Helper</TableHead>
                <TableHead>Document Type</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {queue.map((item) =>
              <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={item.img} />
                        <AvatarFallback>{item.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {item.submitted}
                  </TableCell>
                  <TableCell>
                    <Badge
                    variant="outline"
                    className="bg-yellow-500/10 text-yellow-700 border-yellow-500/20">
                    
                      Pending
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" /> Review
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>
                            Review Document: {item.type}
                          </DialogTitle>
                          <DialogDescription>
                            Submitted by {item.name}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="bg-muted/30 border rounded-lg p-8 flex items-center justify-center min-h-[400px]">
                          {/* Placeholder for document viewer */}
                          <div className="text-center text-muted-foreground">
                            <p className="mb-2">Document Viewer Placeholder</p>
                            <p className="text-sm">
                              In a real app, the PDF or image would render here.
                            </p>
                          </div>
                        </div>
                        <DialogFooter className="flex justify-between sm:justify-between">
                          <Button variant="destructive">
                            <XCircle className="w-4 h-4 mr-2" /> Reject
                          </Button>
                          <Button className="bg-green-600 hover:bg-green-700 text-white">
                            <CheckCircle2 className="w-4 h-4 mr-2" /> Approve &
                            Verify
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>);

}