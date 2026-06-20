import React from 'react';
import { User, MapPin, CreditCard, Shield, Bell } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle } from
'../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger } from
'../../components/ui/Tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/Avatar';
export default function AccountPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <Tabs
          defaultValue="profile"
          className="flex-1 flex flex-col md:flex-row gap-8">
          
          <TabsList className="flex flex-col h-auto bg-transparent items-start w-full md:w-64 shrink-0 space-y-1 p-0">
            <TabsTrigger
              value="profile"
              className="w-full justify-start px-4 py-2 data-[state=active]:bg-muted">
              
              <User className="h-4 w-4 mr-2" /> Profile Information
            </TabsTrigger>
            <TabsTrigger
              value="addresses"
              className="w-full justify-start px-4 py-2 data-[state=active]:bg-muted">
              
              <MapPin className="h-4 w-4 mr-2" /> Saved Addresses
            </TabsTrigger>
            <TabsTrigger
              value="payments"
              className="w-full justify-start px-4 py-2 data-[state=active]:bg-muted">
              
              <CreditCard className="h-4 w-4 mr-2" /> Payment Methods
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="w-full justify-start px-4 py-2 data-[state=active]:bg-muted">
              
              <Shield className="h-4 w-4 mr-2" /> Security
            </TabsTrigger>
          </TabsList>

          <div className="flex-1">
            <TabsContent value="profile" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal details here.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                      <AvatarFallback>PS</AvatarFallback>
                    </Avatar>
                    <Button variant="outline">Change Photo</Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="Priya" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Sharma" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue="priya@example.com" />
                      
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        defaultValue="+91 98765 43210" />
                      
                    </div>
                  </div>

                  <Button>Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Other tabs would go here */}
            <TabsContent value="addresses" className="m-0">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Saved Addresses</CardTitle>
                      <CardDescription>
                        Manage your service locations.
                      </CardDescription>
                    </div>
                    <Button size="sm">Add New</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg p-4 relative">
                    <Badge
                      className="absolute top-4 right-4"
                      variant="secondary">
                      
                      Default
                    </Badge>
                    <h4 className="font-medium mb-1">Home</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      A-402, Sunshine Apts, Andheri West
                      <br />
                      Mumbai, Maharashtra 400053
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive">
                        
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>);

}