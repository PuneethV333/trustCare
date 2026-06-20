import React from 'react';
import {
  Search,
  Filter,
  MoreHorizontal,
  ShieldCheck,
  AlertTriangle } from
'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow } from
'../../components/ui/Table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger } from
'../../components/ui/DropdownMenu';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/Avatar';
export default function AdminManageUsersPage() {
  const users = [
  {
    id: 'USR-892',
    name: 'Sunita Devi',
    role: 'Helper',
    status: 'Active',
    verified: true,
    joined: 'Jan 2025'
  },
  {
    id: 'USR-893',
    name: 'Priya Sharma',
    role: 'Household',
    status: 'Active',
    verified: false,
    joined: 'Mar 2025'
  },
  {
    id: 'USR-894',
    name: 'Rahul Mehta',
    role: 'Household',
    status: 'Active',
    verified: false,
    joined: 'Jun 2025'
  },
  {
    id: 'USR-895',
    name: 'Kavita M.',
    role: 'Helper',
    status: 'Suspended',
    verified: true,
    joined: 'Feb 2026'
  },
  {
    id: 'USR-896',
    name: 'Anita Patel',
    role: 'Helper',
    status: 'Active',
    verified: true,
    joined: 'Aug 2025'
  }];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Users</h1>
        <Button>Export CSV</Button>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search users by name, ID, or email..."
                className="pl-9" />
              
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" /> Role
              </Button>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" /> Status
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) =>
              <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium flex items-center gap-1">
                          {user.name}
                          {user.verified &&
                        <ShieldCheck className="w-3 h-3 text-accent" />
                        }
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {user.id}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                    variant={user.role === 'Helper' ? 'default' : 'secondary'}>
                    
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {user.status === 'Active' ?
                  <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20 border-green-500/20">
                        Active
                      </Badge> :

                  <Badge
                    variant="destructive"
                    className="bg-destructive/10 text-destructive hover:bg-destructive/20 border-destructive/20">
                    
                        <AlertTriangle className="w-3 h-3 mr-1" /> Suspended
                      </Badge>
                  }
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {user.joined}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>View Bookings</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {user.status === 'Active' ?
                      <DropdownMenuItem className="text-destructive">
                            Suspend User
                          </DropdownMenuItem> :

                      <DropdownMenuItem className="text-green-600">
                            Reactivate User
                          </DropdownMenuItem>
                      }
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>);

}