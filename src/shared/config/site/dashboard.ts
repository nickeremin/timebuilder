import { type SidebarNavItem } from "@/shared/types"

export interface DashboardConfig {
  sidebarNav: SidebarNavItem[]
}

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: "Account",
      href: "/dashboard/account",
      items: [],
    },
    {
      title: "Statistics",
      href: "/dashboard/statistics",
      items: [],
    },
    {
      title: "Builders",
      href: "/dashboard/builders",
      items: [],
    },
  ],
}
