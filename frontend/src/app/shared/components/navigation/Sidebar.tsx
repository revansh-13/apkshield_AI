"use client";

import Link from "next/link";
import { Shield } from "lucide-react";
import { SITE } from "@/constants/site";
import { APP_NAV_LINKS } from "@/constants/navigation";
import { SidebarItem } from "./SidebarItem";

export function Sidebar() {
  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-card">
      <div className="flex h-16 items-center px-6 border-b border-border">
        <Link 
          href="/" 
          className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          aria-label={`${SITE.name} home`}
        >
          <Shield className="h-5 w-5 text-primary" aria-hidden="true" />
          <span className="font-semibold tracking-tight text-foreground">{SITE.name}</span>
        </Link>
      </div>

      <nav aria-label="Application navigation" className="flex-1 overflow-y-auto p-4 space-y-1">
        {APP_NAV_LINKS.map((link) => (
          <SidebarItem key={link.href} item={link} />
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex flex-col gap-1 px-3 py-2">
          <span className="text-xs font-medium text-foreground">v{SITE.version}</span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{SITE.envName}</span>
        </div>
      </div>
    </aside>
  );
}
