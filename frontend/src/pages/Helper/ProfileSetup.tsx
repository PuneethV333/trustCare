import React from 'react';
import { Upload, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription } from
'../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger } from
'../../components/ui/Tabs';
import { Badge } from '../../components/ui/Badge';
import { Checkbox } from '../../components/ui/Checkbox';
export default function HelperProfileSetupPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Profile & Documents</h1>
          <p className="text-muted-foreground">
            Manage your public profile
          </p>
        </div>
        <Button>Save Changes</Button>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="services">Services & Pricing</TabsTrigger>
          <TabsTrigger value="documents">Verification Docs</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" defaultValue="Sunita Devi" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+91 98765 43210" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" defaultValue="Mumbai" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input id="experience" type="number" defaultValue="5" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">About Me (Bio)</Label>
                <textarea
                title='bio'
                  id="bio"
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  defaultValue="I am a reliable and hardworking domestic helper with 5 years of experience in housekeeping and cooking. I specialize in North Indian and Maharashtrian cuisine." />
                
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Services Offered</CardTitle>
              <CardDescription>
                Select the services you provide.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                'Maid / Housekeeping',
                'Babysitting',
                'Nanny'].
                map((service) =>
                <div key={service} className="flex items-center space-x-2">
                    <Checkbox
                    id={`srv-${service}`}
                    defaultChecked={[
                    'Maid / Housekeeping',
                    'Cooking'].
                    includes(service)} />
                  
                    <Label htmlFor={`srv-${service}`} className="font-normal">
                      {service}
                    </Label>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pricing Plans</CardTitle>
              <CardDescription>
                Set your rates for different plans.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4 p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Monthly Plan</h4>
                    <Checkbox defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label>Rate per month (₹)</Label>
                    <Input type="number" defaultValue="12000" />
                  </div>
                </div>
                <div className="space-y-4 p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Hourly Plan</h4>
                    <Checkbox defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label>Rate per hour (₹)</Label>
                    <Input type="number" defaultValue="200" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <div className="bg-accent/10 border border-accent/20 p-4 rounded-lg flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-accent mt-0.5 shrink-0" />
            <div>
              <h4 className="font-semibold text-accent-foreground">
                Verification Status: Partially Verified
              </h4>
              <p className="text-sm text-muted-foreground mt-1">
                Complete all document uploads to get the "TrustCare Verified"
                badge on your profile, which increases your bookings by up to
                3x.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Aadhaar Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold">Aadhaar Card</h4>
                    <p className="text-sm text-muted-foreground">
                      Front and back copy
                    </p>
                  </div>
                  <Badge className="bg-green-500/10 text-green-700 border-green-500/20">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> Verified
                  </Badge>
                </div>
                <div className="bg-muted/30 border border-dashed rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Document uploaded and verified on Oct 1, 2026.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Police Verification */}
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold">Police Clearance</h4>
                    <p className="text-sm text-muted-foreground">
                      Issued within last 6 months
                    </p>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-yellow-500/10 text-yellow-700 border-yellow-500/20">
                    
                    <AlertCircle className="w-3 h-3 mr-1" /> Pending Review
                  </Badge>
                </div>
                <div className="bg-muted/30 border border-dashed rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    police_clearance_2026.pdf
                  </p>
                  <Button variant="link" size="sm" className="mt-2">
                    Replace File
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Medical Certificate */}
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold">Medical Certificate</h4>
                    <p className="text-sm text-muted-foreground">
                      Basic health screening
                    </p>
                  </div>
                  <Badge variant="outline">Not Uploaded</Badge>
                </div>
                <div className="bg-muted/30 border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm font-medium">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PDF, JPG or PNG (max. 5MB)
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>);

}