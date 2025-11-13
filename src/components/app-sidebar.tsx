"use client";
import * as React from "react";
import { IconInnerShadowTop, IconSettings } from "@tabler/icons-react";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { IAuthUser } from "@/types/user.interface";
import {
  Activity,
  Calendar,
  ClipboardList,
  Clock,
  FileText,
  Hospital,
  LayoutDashboard,
  Shield,
  Stethoscope,
  Users,
} from "lucide-react";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  authData: IAuthUser;
}

export function AppSidebar({ authData, ...props }: AppSidebarProps) {
  const navMainItems = [];

  // / Derive the final items array without mutation
  // const navItems = useMemo(() => {
  //   if (user?.role === "ADMIN") {
  //     return [
  //       ...items,
  //       {
  //         title: "Manage Doctors",
  //         url: "/admin/dashboard/manage-doctors",
  //         icon: IconSettings,
  //       },
  //       {
  //         title: "Manage Patients",
  //         url: "/admin/dashboard/manage-patients",
  //         icon: IconUsers,
  //       },
  //     ];
  //   }
  //   return items;
  // }, [items, user?.role]);

  if (authData?.role === "ADMIN") {
    navMainItems.push(
      {
        title: "Dashboard",
        url: "/admin/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Admins",
        url: "/admin/dashboard/manage-admin",
        icon: Shield,
      },
      {
        title: "Doctors",
        url: "/admin/dashboard/manage-doctors",
        icon: Stethoscope,
      },
      {
        title: "Patients",
        url: "/admin/dashboard/manage-patients",
        icon: Users,
      },
      {
        title: "Appointments",
        url: "/admin/dashboard/manage-appointments",
        icon: Calendar,
      },
      {
        title: "Schedules",
        url: "/admin/dashboard/manage-schedules",
        icon: Clock,
      },
      {
        title: "Specialties",
        url: "/admin/dashboard/manage-specialities",
        icon: Hospital,
      }
    );
  }

  if (authData?.role === "DOCTOR") {
    navMainItems.push(
      {
        title: "Dashboard",
        url: "/doctor/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Appointments",
        url: "/doctor/dashboard/appointments",
        icon: Calendar,
      },
      {
        title: "My Schedules",
        url: "/doctor/dashboard/my-schedules",
        icon: Clock,
      },
      {
        title: "Prescriptions",
        url: "/doctor/dashboard/prescriptions",
        icon: FileText,
      }
    );
  }

  if (authData?.role === "PATIENT") {
    navMainItems.push(
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "My Appointments",
        url: "/dashboard/my-appointments",
        icon: Calendar,
      },
      // {
      //   title: "Book Appointment",
      //   url: "/dashboard/my-prescriptions",
      //   icon: ClipboardList,
      // },
      {
        title: "My Prescriptions",
        url: "/dashboard/my-prescriptions",
        icon: FileText,
      },
      {
        title: "Health Records",
        url: "/dashboard/health-records",
        icon: Activity,
      }
    );
  }

  const data = {
    user: {
      name: "Example",
      email: authData?.email || "m@example.com",
      avatar: "https://i.ibb.co/nMxbRbGP/download.png",
      role: authData?.role,
    },
    navMain: navMainItems,

    navSecondary: [
      {
        title: "Settings",
        url: "#",
        icon: IconSettings,
      },
    ],
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Health Care.</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
