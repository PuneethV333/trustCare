import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, Calendar, User, Menu, LogOut } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/Avatar";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/Sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/DropdownMenu";
import { useGetMe } from "../hooks/useAuth";
import { signOut } from "firebase/auth";
import { Auth } from "../config/firebase.config";
import { useQueryClient } from "@tanstack/react-query";

export function HouseholdLayout({ children }: { children: React.ReactNode }) {
  // inside HouseholdLayout:
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(Auth);
    queryClient.clear();
    navigate("/login");
  };

  const { data: user } = useGetMe();
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <header className="sticky top-0 z-40 w-full border-b bg-card/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-primary">
            <Shield className="h-6 w-6 text-accent" />
            <span className="font-bold text-xl tracking-tight">TrustCare</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/browse"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Find a Helper
            </Link>
            <Link
              to="/how-it-works"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              How it Works
            </Link>
            <Link
              to="/trust"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Trust & Safety
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            

            {/* Logged in state demo */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8 border border-border">
                      <AvatarImage src={user.profilePic} alt={user.name} />
                      <AvatarFallback>{user.name?.[0]}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      to="/bookings"
                      className="cursor-pointer w-full flex items-center"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>My Bookings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/account"
                      className="cursor-pointer w-full flex items-center"
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>Account Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Log in</Button>
                </Link>
                <Link to="/login?tab=register">
                  <Button>Sign up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Nav */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link to="/browse" className="text-lg font-medium">
                  Find a Helper
                </Link>
                <Link to="/how-it-works" className="text-lg font-medium">
                  How it Works
                </Link>
                <Link to="/trust" className="text-lg font-medium">
                  Trust & Safety
                </Link>
                <div className="h-px bg-border my-4" />
                <Link to="/bookings" className="text-lg font-medium">
                  My Bookings
                </Link>
                <Link to="/account" className="text-lg font-medium">
                  Account Settings
                </Link>
                <div className="h-px bg-border my-4" />
                <Link to="/login">
                  <Button variant="outline" className="w-full justify-start">
                    Log in
                  </Button>
                </Link>
                <Link to="/login?tab=register">
                  <Button className="w-full justify-start mt-2">Sign up</Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <main className="flex-1 flex flex-col">{children}</main>
      <footer className="bg-card border-t py-12 mt-auto">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 text-primary mb-4">
              <Shield className="h-6 w-6 text-accent" />
              <span className="font-bold text-xl tracking-tight">
                TrustCare
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Connecting households with verified, trusted domestic helpers
              across India.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/browse?type=maid" className="hover:text-primary">
                  Maids
                </Link>
              </li>
              <li>
                <Link to="/browse?type=nanny" className="hover:text-primary">
                  Nannies
                </Link>
              </li>
              <li>
                <Link
                  to="/browse?type=babysitter"
                  className="hover:text-primary"
                >
                  Babysitters
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/about" className="hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/trust" className="hover:text-primary">
                  Trust & Safety
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">For Helpers</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/helper/register" className="hover:text-primary">
                  Join as a Helper
                </Link>
              </li>
              <li>
                <Link to="/helper" className="hover:text-primary">
                  Helper Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
