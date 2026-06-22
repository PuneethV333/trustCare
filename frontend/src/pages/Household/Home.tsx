import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShieldCheck,
  Star,
  Clock,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/Avatar";
import { useGetTopMaids } from "../../hooks/useMaid.";
export default function HomePage() {
  const { data: maids } = useGetTopMaids();
  const navigate = useNavigate();
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/browse");
  };
  return (
    <div className="flex flex-col w-full">
      <section className="relative bg-primary text-primary-foreground py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
          <Badge
            variant="secondary"
            className="mb-6 bg-accent text-accent-foreground hover:bg-accent/90 border-none px-4 py-1 text-sm font-medium"
          >
            <ShieldCheck className="w-4 h-4 mr-2" /> India's #1 Trusted Platform
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl mb-6 leading-tight">
            Find Trusted Maids & Nannies for Your Home
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mb-10">
            100% background-verified professionals. Flexible hourly, monthly, or
            yearly plans. Book with confidence.
          </p>

          <Card className="w-full max-w-4xl p-2 shadow-xl border-none">
            <form
              onSubmit={handleSearch}
              className="flex flex-col md:flex-row gap-2"
            >
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <select
                  title="which service do you need?"
                  className="w-full h-12 pl-10 pr-4 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">What service do you need?</option>
                  <option value="maid">Maid / Housekeeping</option>
                  <option value="nanny">Nanny / Childcare</option>
                  <option value="babysitter">Babysitter (Hourly)</option>
                </select>
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Enter your city or pincode"
                  className="h-12 pl-10"
                />
              </div>
              <Button type="submit" size="lg" className="h-12 px-8 text-base">
                Search Helpers
              </Button>
            </form>
          </Card>

          <div className="flex flex-wrap justify-center gap-8 mt-12 text-primary-foreground/90">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-accent h-6 w-6" />
              <span className="font-semibold">12,000+ Verified Helpers</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="text-accent h-6 w-6 fill-accent" />
              <span className="font-semibold">4.8/5 Average Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-accent h-6 w-6" />
              <span className="font-semibold">₹1Cr Insurance Cover</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How TrustCare Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We've simplified the process of finding reliable domestic help,
              ensuring safety and quality at every step.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Browse & Filter</h3>
              <p className="text-muted-foreground">
                Search our extensive database of verified helpers based on your
                specific needs, location, and budget.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-6">
                <ShieldCheck className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Review Profiles</h3>
              <p className="text-muted-foreground">
                Check detailed profiles, read authentic reviews, and verify
                their background check status before deciding.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Book & Relax</h3>
              <p className="text-muted-foreground">
                Choose a flexible plan (hourly, monthly, or yearly), book
                instantly, and manage everything through the app.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                Top Rated Professionals
              </h2>
              <p className="text-muted-foreground">
                Highly recommended helpers
              </p>
            </div>
            <Link to="/browse">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {maids?.map((helper, idx) => (
              <Card
                key={idx}
                className="overflow-hidden hover:shadow-lg transition-shadow border-border/50"
              >
                <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <Avatar className="h-16 w-16 border-2 border-background shadow-sm">
                      <AvatarImage src={helper.user.profilePic} />
                      <AvatarFallback>{helper.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <Badge
                      variant="secondary"
                      className="bg-accent/10 text-accent-foreground border-accent/20"
                    >
                      <ShieldCheck className="w-3 h-3 mr-1 text-accent" />{" "}
                      Verified
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-lg">{helper.user.name}</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {helper.type} • {helper.experience} exp
                  </p>
                  <div className="flex items-center gap-1 mb-4 text-sm">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="font-medium">{helper.averageRating}</span>
                    <span className="text-muted-foreground">
                      ({helper.totalReviews} reviews)
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Starting from
                      </p>
                      <p className="font-semibold text-primary">
                        {helper.costPerHour}/hour
                      </p>
                    </div>
                    <Link to={`/helper/${helper.userId}`}>
                      <Button size="sm">View Profile</Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
