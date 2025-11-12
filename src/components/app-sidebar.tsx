"use client";
import * as React from "react";
import {
  IconDashboard,
  IconInnerShadowTop,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

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

  navMainItems.push(
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Manage Doctors",
      url: "/admin/dashboard/manage-doctors",
      icon: IconUsers,
    },
    {
      title: "Manage Patients",
      url: "/admin/dashboard/manage-patients",
      icon: IconUsers,
    }
  );

  // if (user?.role === "ADMIN") {
  //   navMainItems.push(
  //     {
  //       title: "Dashboard",
  //       url: "/admin/dashboard",
  //       icon: IconDashboard,
  //     },
  //     {
  //       title: "Manage Doctors",
  //       url: "/admin/dashboard/manage-doctors",
  //       icon: IconUsers,
  //     },
  //     {
  //       title: "Manage Patients",
  //       url: "/admin/dashboard/manage-patients",
  //       icon: IconUsers,
  //     }
  //   );
  // }

  // if (user?.role === "DOCTOR") {
  //   navMainItems.push({
  //     title: "Dashboard",
  //     url: "/doctor/dashboard",
  //     icon: IconDashboard,
  //   });
  // }

  const data = {
    user: {
      name: "Example",
      email: authData?.email || "m@example.com",
      avatar: "https://i.ibb.co/nMxbRbGP/download.png",
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
