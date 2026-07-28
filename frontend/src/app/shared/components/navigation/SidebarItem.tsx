"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { AppNavLink } from "@/constants/navigation";

interface SidebarItemProps {
  item: AppNavLink;
  onClick?: () => void;
}

export function SidebarItem({ item, onClick }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = item.exact 
    ? pathname === item.href 
    : pathname.startsWith(item.href);

  return (
    <Link
      href={item.href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      )}
    >
      <item.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} aria-hidden="true" />
      {item.label}
    </Link>
  );
}
