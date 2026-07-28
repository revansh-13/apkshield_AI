"use client";

import * as React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Shield, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE, NAV_LINKS } from "@/constants/site";

/**
 * Navbar — sticky top navigation bar for APKShield AI.
 *
 * Responsibilities:
 * - Display logo + product name
 * - Render nav links with smooth scroll for anchor hrefs
 * - Show a primary CTA button linking to /upload
 * - Transition background opacity on scroll
 * - Mobile-responsive with a hamburger menu
 *
 * Client Component: required for scroll listener and mobile menu state.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  };

  return (
    <header
      role="banner"
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "bg-transparent",
      )}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16"
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label={`${SITE.name} home`}
          className="flex items-center gap-2 text-foreground hover:text-foreground/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        >
          <Shield className="w-5 h-5 text-primary" aria-hidden="true" />
          <span className="font-semibold text-sm tracking-tight">
            {SITE.name}
          </span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-6" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm px-1"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/upload"
            className={cn(
              "inline-flex items-center justify-center gap-2",
              "rounded-lg bg-primary text-primary-foreground",
              "px-4 py-2 text-sm font-medium",
              "transition-colors hover:bg-primary/90",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            )}
          >
            Analyze APK
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((o) => !o)}
          className={cn(
            "md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
        >
          {mobileOpen ? (
            <X className="w-5 h-5" aria-hidden="true" />
          ) : (
            <Menu className="w-5 h-5" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-background/95 backdrop-blur-md border-b border-border px-4 pb-4"
        >
          <ul className="flex flex-col gap-1 pt-2" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block py-2 px-2 text-sm text-muted-foreground hover:text-foreground rounded-md transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/upload"
                onClick={() => setMobileOpen(false)}
                className="block text-center rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Analyze APK
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
