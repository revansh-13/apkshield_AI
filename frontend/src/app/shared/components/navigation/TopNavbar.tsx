"use client";

import { usePathname } from "next/navigation";
import { ThemeToggle } from "../ui/ThemeToggle";
import { MobileSidebar } from "./MobileSidebar";
import { APP_NAV_LINKS } from "@/constants/navigation";

export function TopNavbar() {
  const pathname = usePathname();
  
  // Find current page title from navigation links
  // If we're on a deeper route like /analysis/123, we'll need a dynamic way to set this later,
  // but for now finding the matching nav link works perfectly.
  const currentNav = APP_NAV_LINKS.find(link => pathname.startsWith(link.href));
  const pageTitle = currentNav?.label || "APKShield AI";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/95 px-4 md:px-8 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <MobileSidebar />
      
      <div className="flex-1 flex items-center gap-4">
        <h2 className="text-sm font-medium tracking-tight text-foreground lg:text-base">
          {pageTitle}
        </h2>
        {/* Breadcrumb reserved for future use */}
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        {/* Reserved area for user menu / avatar */}
      </div>
    </header>
  );
}
