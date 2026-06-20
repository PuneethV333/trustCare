import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  ChevronLeft,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  ShieldCheck } from
'lucide-react';
import { Button } from '../../components/ui/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter } from
'../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';
import { RadioGroup, RadioGroupItem } from '../../components/ui/RadioGroup';
import { Separator } from '../../components/ui/Separator';
export default function BookingFlowPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const handleNext = () => {
    if (step < 3) setStep(step + 1);else
    {
      // Simulate booking success
      navigate('/bookings');
    }
  };
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <Link
          to="/helper/1"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
          
          <ChevronLeft className="h-4 w-4 mr-1" /> Back to Profile
        </Link>
        <h1 className="text-3xl font-bold">Book Sunita Devi</h1>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-muted -z-10 rounded-full"></div>
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 rounded-full transition-all duration-300"
          style={{
            width: `${(step - 1) / 2 * 100}%`
          }}>
        </div>

        {[1, 2, 3].map((i) =>
        <div
          key={i}
          className={`flex flex-col items-center gap-2 bg-background px-2 ${step >= i ? 'text-primary' : 'text-muted-foreground'}`}>
          
            <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= i ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
            
              {step > i ? <CheckCircle2 className="h-5 w-5" /> : i}
            </div>
            <span className="text-xs font-medium hidden sm:block">
              {i === 1 ? 'Schedule' : i === 2 ? 'Details' : 'Confirm'}
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Form Area */}
        <div className="md:col-span-2">
          {step === 1 &&
          <Card>
              <CardHeader>
                <CardTitle>Schedule & Plan</CardTitle>
                <CardDescription>
                  When do you need the service to start?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Selected Plan</Label>
                  <RadioGroup
                  defaultValue="monthly"
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                    <div>
                      <RadioGroupItem
                      value="monthly"
                      id="monthly"
                      className="peer sr-only" />
                    
                      <Label
                      htmlFor="monthly"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                      
                        <span className="font-semibold text-lg mb-1">
                          Monthly
                        </span>
                        <span className="text-primary font-bold">
                          ₹12,000/mo
                        </span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                      value="hourly"
                      id="hourly"
                      className="peer sr-only" />
                    
                      <Label
                      htmlFor="hourly"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                      
                        <span className="font-semibold text-lg mb-1">
                          Hourly
                        </span>
                        <span className="text-primary font-bold">₹200/hr</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="start-date" type="date" className="pl-9" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="start-time">Preferred Start Time</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                      id="start-time"
                      type="time"
                      className="pl-9"
                      defaultValue="08:00" />
                    
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleNext}>
                  Continue to Details
                </Button>
              </CardFooter>
            </Card>
          }

          {step === 2 &&
          <Card>
              <CardHeader>
                <CardTitle>Service Details</CardTitle>
                <CardDescription>Where should the helper go?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Full Address</Label>
                  <Input
                  id="address"
                  placeholder="Flat/House No, Building, Street" />
                
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" defaultValue="Mumbai" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input id="pincode" placeholder="400053" />
                  </div>
                </div>
                <div className="space-y-2 pt-4">
                  <Label htmlFor="notes">Special Instructions (Optional)</Label>
                  <textarea
                  id="notes"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="E.g., We have a dog, please ring the bell once." />
                
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button onClick={handleNext}>Review Booking</Button>
              </CardFooter>
            </Card>
          }

          {step === 3 &&
          <Card>
              <CardHeader>
                <CardTitle>Review & Confirm</CardTitle>
                <CardDescription>
                  Please review your booking details before confirming.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted/30 p-4 rounded-lg space-y-4">
                  <div className="flex items-start gap-3">
                    <CalendarIcon className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Schedule</p>
                      <p className="text-sm text-muted-foreground">
                        Starting Oct 15, 2026 at 08:00 AM
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Monthly Plan (26 days/mo)
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">
                        A-402, Sunshine Apts, Andheri West, Mumbai 400053
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-accent/10 p-4 rounded-lg border border-accent/20 flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-accent-foreground">
                      TrustCare Guarantee
                    </p>
                    <p className="text-muted-foreground mt-1">
                      Your payment is secure. You won't be charged until the
                      helper accepts the booking. Free replacement within 15
                      days if you're not satisfied.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button onClick={handleNext} size="lg">
                  Confirm Booking
                </Button>
              </CardFooter>
            </Card>
          }
        </div>

        {/* Order Summary Sidebar */}
        <div className="md:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="text-lg">Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop"
                  alt="Helper"
                  className="w-12 h-12 rounded-full object-cover" />
                
                <div>
                  <p className="font-medium">Sunita Devi</p>
                  <p className="text-xs text-muted-foreground">Maid & Cook</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monthly Plan</span>
                  <span>₹12,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Platform Fee</span>
                  <span>₹500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxes (GST 18%)</span>
                  <span>₹2,250</span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">₹14,750</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>);

}