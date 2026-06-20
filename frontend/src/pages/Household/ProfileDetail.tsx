import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  CheckCircle2,
  ChevronLeft,
  Calendar as CalendarIcon,
  FileText } from
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
import { Badge } from '../../components/ui/Badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/Avatar';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger } from
'../../components/ui/Tabs';
import { Separator } from '../../components/ui/Separator';
export default function ProfileDetailPage() {
  const { id } = useParams();
  // Mock data
  const helper = {
    name: 'Sunita Devi',
    type: 'Maid & Cook',
    location: 'Andheri West, Mumbai',
    exp: '5 years',
    rating: 4.9,
    reviews: 124,
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    bio: 'I am a reliable and hardworking domestic helper with 5 years of experience in housekeeping and cooking. I specialize in North Indian and Maharashtrian cuisine. I am very particular about hygiene and maintain a clean environment. I am also comfortable around pets.',
    skills: [
    'Sweeping & Mopping',
    'Dusting',
    'Laundry',
    'North Indian Cooking',
    'Pet Friendly'],

    languages: ['Hindi', 'Marathi', 'Basic English'],
    verified: true,
    bgChecked: true,
    idVerified: true
  };
  return (
    <div className="bg-muted/10 min-h-screen pb-20">
      <div className="bg-card border-b">
        <div className="container mx-auto px-4 py-4">
          <Link
            to="/browse"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Search
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Profile Info */}
          <div className="flex-1 space-y-8">
            {/* Header Card */}
            <Card className="border-none shadow-md overflow-hidden">
              <div className="h-32 bg-primary/10 relative">
                {helper.verified &&
                <div className="absolute top-4 right-4 bg-card px-3 py-1 rounded-full flex items-center gap-1 shadow-sm text-sm font-medium text-primary">
                    <ShieldCheck className="h-4 w-4 text-accent" />
                    TrustCare Verified
                  </div>
                }
              </div>
              <CardContent className="pt-0 relative px-6 sm:px-8">
                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end -mt-12 mb-6">
                  <Avatar className="h-24 w-24 border-4 border-card shadow-md">
                    <AvatarImage src={helper.img} />
                    <AvatarFallback>{helper.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 pb-2">
                    <h1 className="text-2xl font-bold">{helper.name}</h1>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground mt-1 text-sm">
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" /> {helper.location}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" /> {helper.exp}{' '}
                        Experience
                      </span>
                      <span className="flex items-center text-foreground font-medium">
                        <Star className="h-4 w-4 mr-1 fill-accent text-accent" />{' '}
                        {helper.rating} ({helper.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {helper.skills.map((skill) =>
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="font-normal">
                    
                      {skill}
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-accent/10 p-2 rounded-full">
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">ID Verified</p>
                      <p className="text-xs text-muted-foreground">
                        Aadhaar checked
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-accent/10 p-2 rounded-full">
                      <ShieldCheck className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Background Checked</p>
                      <p className="text-xs text-muted-foreground">
                        Police verification done
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Medical Cleared</p>
                      <p className="text-xs text-muted-foreground">
                        Basic health check
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Details Tabs */}
            <Card className="border-none shadow-sm">
              <CardContent className="p-0">
                <Tabs defaultValue="about" className="w-full">
                  <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0 h-auto">
                    <TabsTrigger
                      value="about"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4">
                      
                      About
                    </TabsTrigger>
                    <TabsTrigger
                      value="reviews"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4">
                      
                      Reviews ({helper.reviews})
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="about" className="p-6 sm:p-8 space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Bio</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {helper.bio}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Languages Spoken
                      </h3>
                      <p className="text-muted-foreground">
                        {helper.languages.join(', ')}
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="reviews" className="p-6 sm:p-8 space-y-6">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="text-4xl font-bold">{helper.rating}</div>
                      <div>
                        <div className="flex text-accent mb-1">
                          {[1, 2, 3, 4, 5].map((i) =>
                          <Star key={i} className="h-4 w-4 fill-current" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Based on {helper.reviews} reviews
                        </p>
                      </div>
                    </div>
                    <div className="space-y-6">
                      {[1, 2, 3].map((i) =>
                      <div
                        key={i}
                        className="border-b pb-6 last:border-0 last:pb-0">
                        
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>R</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">Rahul M.</p>
                                <p className="text-xs text-muted-foreground">
                                  2 months ago
                                </p>
                              </div>
                            </div>
                            <div className="flex text-accent">
                              {[1, 2, 3, 4, 5].map((star) =>
                            <Star
                              key={star}
                              className="h-3 w-3 fill-current" />

                            )}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            Sunita is very punctual and does her work
                            thoroughly. Her cooking is excellent, especially the
                            dal makhani. Highly recommend her!
                          </p>
                        </div>
                      )}
                      <Button variant="outline" className="w-full">
                        Load More Reviews
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Booking Cards */}
          <div className="w-full lg:w-96 shrink-0 space-y-6">
            <h3 className="text-xl font-bold mb-4">Select a Plan</h3>

            {/* Monthly Plan (Featured) */}
            <Card className="border-primary shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                MOST POPULAR
              </div>
              <CardHeader>
                <CardTitle>Monthly Plan</CardTitle>
                <CardDescription>Best for regular daily help</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-4">
                  ₹12,000
                  <span className="text-sm font-normal text-muted-foreground">
                    /mo
                  </span>
                </div>
                <ul className="space-y-2 text-sm mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent" /> 26 days a
                    month
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent" /> 8 hours per
                    day
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent" /> Free
                    replacement within 15 days
                  </li>
                </ul>
                <Link to={`/book/${id}?plan=monthly`}>
                  <Button className="w-full" size="lg">
                    Book Monthly Plan
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Hourly Plan */}
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle>Hourly Plan</CardTitle>
                <CardDescription>
                  For one-time or flexible needs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary mb-4">
                  ₹200
                  <span className="text-sm font-normal text-muted-foreground">
                    /hr
                  </span>
                </div>
                <ul className="space-y-2 text-sm mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-muted-foreground" />{' '}
                    Minimum 2 hours
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-muted-foreground" />{' '}
                    Flexible scheduling
                  </li>
                </ul>
                <Link to={`/book/${id}?plan=hourly`}>
                  <Button variant="outline" className="w-full">
                    Book Hourly Plan
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <div className="text-center text-sm text-muted-foreground mt-4">
              <p className="flex items-center justify-center gap-1">
                <ShieldCheck className="h-4 w-4" /> Secure payment via TrustCare
              </p>
              <p className="mt-1">
                You won't be charged until the helper confirms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>);

}