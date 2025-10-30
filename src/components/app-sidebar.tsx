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
import checkAuthStatus from "@/utility/auth";

const { user } = await checkAuthStatus();
// console.log(user);
const navMainItems = [
  {
    title: "Dashboard",
    url: "#",
    icon: IconDashboard,
  },
  // {
  //   title: "Lifecycle",
  //   url: "#",
  //   icon: IconListDetails,
  // },
  // {
  //   title: "Analytics",
  //   url: "#",
  //   icon: IconChartBar,
  // },
  // {
  //   title: "Projects",
  //   url: "#",
  //   icon: IconFolder,
  // },
  // {
  //   title: "Add Doctor",
  //   url: "/dashboard/add-doctor",
  //   icon: IconUsers,
  // },
];

if (user?.role === "ADMIN") {
  navMainItems.push(
    {
      title: "Manage Doctors",
      url: "/dashboard/admin/manage-doctors",
      icon: IconUsers,
    },
    {
      title: "Manage Patients",
      url: "/dashboard/admin/manage-patients",
      icon: IconUsers,
    }
  );
}

const data = {
  user: {
    name: user?.name ?? "Example",
    email: user?.email ?? "m@example.com",
    avatar: user?.profilePhoto ?? "https://i.ibb.co/nMxbRbGP/download.png",
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
