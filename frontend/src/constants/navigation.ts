import { LucideIcon, Upload, LayoutDashboard, FileSearch, History, Settings } from "lucide-react";

export interface AppNavLink {
  label: string;
  href: string;
  icon: LucideIcon;
  exact?: boolean;
}

export const APP_NAV_LINKS: AppNavLink[] = [
  {
    label: "Upload",
    href: "/upload",
    icon: Upload,
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Findings",
    href: "/findings",
    icon: FileSearch,
  },
  {
    label: "History",
    href: "/history",
    icon: History,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];
