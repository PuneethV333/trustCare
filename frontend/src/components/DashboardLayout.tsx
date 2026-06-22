import React from "react";
import {
  Link,
} from "react-router-dom";
import {
  Shield,
  Calendar,
  User,
  LayoutDashboard,
  FileText,
  Users,
  CheckCircle,
  Settings,
  Bell,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/Avatar";
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
} from "../components/ui/Sidebar";

export function DashboardLayout({
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