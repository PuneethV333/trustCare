import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  useLocation,
} from "react-router-dom";
import {
  Shield,
  Home,
  Search,
  Calendar,
  User,
  LayoutDashboard,
  FileText,
  Users,
  CheckCircle,
  Menu,
  X,
  LogOut,
  Settings,
  Bell,
} from "lucide-react";
import { Button } from "./components/ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/Avatar";
import { Sheet, SheetContent, SheetTrigger } from "./components/ui/Sheet";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "./components/ui/Sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/DropdownMenu";
// --- PLACEHOLDER PAGES ---
import HomePage from "./pages/Household/Home";
import LoginPage from "./pages/Household/Login";
import BrowsePage from "./pages/Household/Browse";
import ProfileDetailPage from "./pages/Household/ProfileDetail";
import BookingFlowPage from "./pages/Household/BookingFlow";
import MyBookingsPage from "./pages/Household/MyBookings";
import AccountPage from "./pages/Household/Account";
import HelperDashboardPage from "./pages/Helper/Dashboard";
import HelperProfileSetupPage from "./pages/Helper/ProfileSetup";
import HelperJobHistoryPage from "./pages/Helper/JobHistory";
import AdminDashboardPage from "./pages/Admin/Dashboard";
import AdminVerificationQueuePage from "./pages/Admin/VerificationQueue";
import AdminManageUsersPage from "./pages/Admin/ManageUsers";
// --- ROLE SWITCHER COMPONENT ---
function RoleSwitcher() {
  const location = useLocation();
  const currentRole = location.pathname.startsWith("/admin")
    ? "admin"
    : location.pathname.startsWith("/helper")
      ? "helper"
      : "household";
  return (
    <div className="fixed bottom-4 right-4 z-50 bg-card border shadow-lg rounded-full p-1 flex items-center gap-1">
      <Link to="/">
        <Button
          variant={currentRole === "household" ? "default" : "ghost"}
          size="sm"
          className="rounded-full px-4"
        >
          Household
        </Button>
      </Link>
      <Link to="/helper">
        <Button
          variant={currentRole === "helper" ? "default" : "ghost"}
          size="sm"
          className="rounded-full px-4"
        >
          Helper
        </Button>
      </Link>
      <Link to="/admin">
        <Button
          variant={currentRole === "admin" ? "default" : "ghost"}
          size="sm"
          className="rounded-full px-4"
        >
          Admin
        </Button>
      </Link>
    </div>
  );
}
// --- LAYOUTS ---
function HouseholdLayout({ children }: { children: React.ReactNode }) {
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
            <Link to="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link to="/login?tab=register">
              <Button>Sign up</Button>
            </Link>

            {/* Logged in state demo */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8 border border-border">
                    <AvatarImage
                      src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                      alt="@user"
                    />

                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Priya Sharma
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      priya@example.com
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
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
function DashboardLayout({
  children,
  role,
}: {
  children: React.ReactNode;
  role: "helper" | "admin";
}) {
  const menuItems =
    role === "helper"
      ? [
          {
            title: "Dashboard",
            icon: LayoutDashboard,
            url: "/helper",
          },
          {
            title: "Job Requests",
            icon: Bell,
            url: "/helper/requests",
          },
          {
            title: "My Schedule",
            icon: Calendar,
            url: "/helper/schedule",
          },
          {
            title: "Job History",
            icon: FileText,
            url: "/helper/history",
          },
          {
            title: "Profile & Docs",
            icon: User,
            url: "/helper/profile",
          },
        ]
      : [
          {
            title: "Dashboard",
            icon: LayoutDashboard,
            url: "/admin",
          },
          {
            title: "Verification Queue",
            icon: CheckCircle,
            url: "/admin/verifications",
          },
          {
            title: "Manage Users",
            icon: Users,
            url: "/admin/users",
          },
          {
            title: "Bookings & Disputes",
            icon: FileText,
            url: "/admin/bookings",
          },
          {
            title: "Settings",
            icon: Settings,
            url: "/admin/settings",
          },
        ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background font-sans">
        <Sidebar>
          <SidebarContent>
            <div className="p-4 flex items-center gap-2 text-primary">
              <Shield className="h-6 w-6 text-accent" />
              <span className="font-bold text-xl tracking-tight">
                TrustCare{" "}
                <span className="text-sm font-normal text-muted-foreground">
                  {role === "admin" ? "Admin" : "Partner"}
                </span>
              </span>
            </div>
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link to={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 border-b bg-card flex items-center px-4 justify-between sticky top-0 z-30">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="font-semibold text-lg hidden sm:block">
                {role === "admin" ? "Admin Portal" : "Helper Dashboard"}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Avatar className="h-8 w-8 border border-border">
                <AvatarImage
                  src={
                    role === "admin"
                      ? "https://i.pravatar.cc/150?u=admin"
                      : "https://i.pravatar.cc/150?u=helper"
                  }
                />

                <AvatarFallback>{role === "admin" ? "A" : "H"}</AvatarFallback>
              </Avatar>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* HOUSEHOLD ROUTES */}
        <Route
          path="/"
          element={
            <HouseholdLayout>
              <HomePage />
            </HouseholdLayout>
          }
        />

        <Route
          path="/login"
          element={
            <HouseholdLayout>
              <LoginPage />
            </HouseholdLayout>
          }
        />

        <Route
          path="/browse"
          element={
            <HouseholdLayout>
              <BrowsePage />
            </HouseholdLayout>
          }
        />

        <Route
          path="/helper/:id"
          element={
            <HouseholdLayout>
              <ProfileDetailPage />
            </HouseholdLayout>
          }
        />

        <Route
          path="/book/:id"
          element={
            <HouseholdLayout>
              <BookingFlowPage />
            </HouseholdLayout>
          }
        />

        <Route
          path="/bookings"
          element={
            <HouseholdLayout>
              <MyBookingsPage />
            </HouseholdLayout>
          }
        />

        <Route
          path="/account"
          element={
            <HouseholdLayout>
              <AccountPage />
            </HouseholdLayout>
          }
        />

        {/* HELPER ROUTES */}
        <Route
          path="/helper"
          element={
            <DashboardLayout role="helper">
              <HelperDashboardPage />
            </DashboardLayout>
          }
        />

        <Route
          path="/helper/profile"
          element={
            <DashboardLayout role="helper">
              <HelperProfileSetupPage />
            </DashboardLayout>
          }
        />

        <Route
          path="/helper/history"
          element={
            <DashboardLayout role="helper">
              <HelperJobHistoryPage />
            </DashboardLayout>
          }
        />

        <Route
          path="/helper/*"
          element={
            <DashboardLayout role="helper">
              <Navigate to="/helper" replace />
            </DashboardLayout>
          }
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <DashboardLayout role="admin">
              <AdminDashboardPage />
            </DashboardLayout>
          }
        />

        <Route
          path="/admin/verifications"
          element={
            <DashboardLayout role="admin">
              <AdminVerificationQueuePage />
            </DashboardLayout>
          }
        />

        <Route
          path="/admin/users"
          element={
            <DashboardLayout role="admin">
              <AdminManageUsersPage />
            </DashboardLayout>
          }
        />

        <Route
          path="/admin/*"
          element={
            <DashboardLayout role="admin">
              <Navigate to="/admin" replace />
            </DashboardLayout>
          }
        />
      </Routes>
      <RoleSwitcher />
    </BrowserRouter>
  );
}
