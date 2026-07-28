"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, Shield } from "lucide-react";
import { SITE } from "@/constants/site";
import { APP_NAV_LINKS } from "@/constants/navigation";
import { SidebarItem } from "./SidebarItem";
import { cn } from "@/lib/utils";

export function MobileSidebar() {
  const [isOpen, setIsOpen] = React.useState(false);

  // Close sidebar on escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // Lock body scroll when open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        className="lg:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-card border-r border-border shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex h-16 items-center justify-between px-6 border-b border-border">
          <Link 
            href="/" 
            className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            onClick={() => setIsOpen(false)}
          >
            <Shield className="h-5 w-5 text-primary" aria-hidden="true" />
            <span className="font-semibold tracking-tight text-foreground">{SITE.name}</span>
          </Link>
          <button
            type="button"
            className="p-2 -mr-2 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation menu"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {APP_NAV_LINKS.map((link) => (
            <SidebarItem 
              key={link.href} 
              item={link} 
              onClick={() => setIsOpen(false)} 
            />
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex flex-col gap-1 px-3 py-2">
            <span className="text-xs font-medium text-foreground">v{SITE.version}</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{SITE.envName}</span>
          </div>
        </div>
      </div>
    </>
  );
}
