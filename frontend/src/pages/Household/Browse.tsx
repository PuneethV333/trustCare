import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Filter,
  Star,
  ShieldCheck,
  MapPin,
  SlidersHorizontal } from
'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/Avatar';
import { Checkbox } from '../../components/ui/Checkbox';
import { Label } from '../../components/ui/Label';
import { Slider } from '../../components/ui/Slider';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle } from
'../../components/ui/Sheet';
const HELPERS = [
{
  id: 1,
  name: 'Sunita Devi',
  type: 'Maid',
  exp: '5 yrs',
  rating: 4.9,
  reviews: 124,
  price: '₹12,000/mo',
  img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
  verified: true,
  available: 'Immediate'
},
{
  id: 2,
  name: 'Lakshmi K.',
  type: 'Nanny',
  exp: '8 yrs',
  rating: 5.0,
  reviews: 89,
  price: '₹18,000/mo',
  img: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?q=80&w=200&auto=format&fit=crop',
  verified: true,
  available: 'In 2 weeks'
},
{
  id: 3,
  name: 'Anita Patel',
  type: 'Babysitter',
  exp: '3 yrs',
  rating: 4.8,
  reviews: 56,
  price: '₹200/hr',
  img: 'https://images.unsplash.com/photo-1531123897727-8f129e1bfa8ea?q=80&w=200&auto=format&fit=crop',
  verified: true,
  available: 'Immediate'
},
{
  id: 4,
  name: 'Meena R.',
  type: 'Maid & Cook',
  exp: '10 yrs',
  rating: 4.9,
  reviews: 210,
  price: '₹15,000/mo',
  img: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=200&auto=format&fit=crop',
  verified: true,
  available: 'Immediate'
},
{
  id: 5,
  name: 'Radha S.',
  type: 'Maid',
  exp: '2 yrs',
  rating: 4.5,
  reviews: 34,
  price: '₹10,000/mo',
  img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
  verified: true,
  available: 'Next month'
},
{
  id: 6,
  name: 'Kavita M.',
  type: 'Nanny',
  exp: '12 yrs',
  rating: 4.9,
  reviews: 302,
  price: '₹22,000/mo',
  img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop',
  verified: true,
  available: 'Immediate'
}];

export default function BrowsePage() {
  const [priceRange, setPriceRange] = useState([5000]);
  const FilterContent = () =>
  <div className="space-y-8">
      <div>
        <h3 className="font-semibold mb-4">Service Type</h3>
        <div className="space-y-3">
          {['Maid', 'Nanny', 'Babysitter', 'Cook', 'Elder Care'].map((type) =>
        <div key={type} className="flex items-center space-x-2">
              <Checkbox id={`type-${type}`} />
              <Label htmlFor={`type-${type}`} className="font-normal">
                {type}
              </Label>
            </div>
        )}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Experience Level</h3>
        <div className="space-y-3">
          {['Any', '1-3 years', '3-5 years', '5+ years', '10+ years'].map(
          (exp) =>
          <div key={exp} className="flex items-center space-x-2">
                <Checkbox id={`exp-${exp}`} />
                <Label htmlFor={`exp-${exp}`} className="font-normal">
                  {exp}
                </Label>
              </div>

        )}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Service Plan</h3>
        <div className="space-y-3">
          {['Hourly', 'Monthly', 'Yearly'].map((plan) =>
        <div key={plan} className="flex items-center space-x-2">
              <Checkbox id={`plan-${plan}`} />
              <Label htmlFor={`plan-${plan}`} className="font-normal">
                {plan}
              </Label>
            </div>
        )}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Max Price (Monthly)</h3>
        <Slider
        defaultValue={[15000]}
        max={30000}
        step={1000}
        value={priceRange}
        onValueChange={setPriceRange}
        className="mb-2" />
      
        <div className="text-sm text-muted-foreground">
          Up to ₹{priceRange[0].toLocaleString()}
        </div>
      </div>

      <Button className="w-full">Apply Filters</Button>
    </div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden md:block w-64 shrink-0">
          <div className="sticky top-24">
            <div className="flex items-center gap-2 mb-6">
              <Filter className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Filters</h2>
            </div>
            <FilterContent />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Search & Mobile Filter Header */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center justify-between">
            <div className="relative w-full max-w-md">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by location or name..."
                className="pl-9" />
              
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="md:hidden w-full sm:w-auto">
                    
                    <SlidersHorizontal className="h-4 w-4 mr-2" /> Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px]">
                  <SheetHeader className="mb-6">
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <FilterContent />
                </SheetContent>
              </Sheet>

              <div className="text-sm text-muted-foreground whitespace-nowrap hidden sm:block">
                Showing {HELPERS.length} results
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {HELPERS.map((helper) =>
            <Card
              key={helper.id}
              className="overflow-hidden hover:shadow-lg transition-shadow border-border/50 flex flex-col">
              
                <div className="p-5 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <Avatar className="h-16 w-16 border-2 border-background shadow-sm">
                      <AvatarImage src={helper.img} />
                      <AvatarFallback>{helper.name[0]}</AvatarFallback>
                    </Avatar>
                    {helper.verified &&
                  <Badge
                    variant="secondary"
                    className="bg-accent/10 text-accent-foreground border-accent/20">
                    
                        <ShieldCheck className="w-3 h-3 mr-1 text-accent" />{' '}
                        Verified
                      </Badge>
                  }
                  </div>
                  <h3 className="font-semibold text-lg">{helper.name}</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {helper.type} • {helper.exp} exp
                  </p>
                  <div className="flex items-center gap-1 mb-2 text-sm">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="font-medium">{helper.rating}</span>
                    <span className="text-muted-foreground">
                      ({helper.reviews} reviews)
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground mb-4">
                    Availability:{' '}
                    <span className="text-foreground font-medium">
                      {helper.available}
                    </span>
                  </div>
                </div>
                <div className="p-5 border-t bg-muted/20 flex items-center justify-between mt-auto">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Starting from
                    </p>
                    <p className="font-semibold text-primary">{helper.price}</p>
                  </div>
                  <Link to={`/helper/${helper.id}`}>
                    <Button size="sm">View Profile</Button>
                  </Link>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>);

}