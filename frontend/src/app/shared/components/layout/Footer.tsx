import Link from "next/link";
import { Shield, ExternalLink } from "lucide-react";
import { SITE } from "@/constants/site";

/**
 * Footer — site-wide footer for APKShield AI.
 *
 * Responsibilities:
 * - Display logo and tagline
 * - List the technology stack
 * - Link to GitHub
 * - Show license and copyright notice
 *
 * Server Component: no interactivity or browser APIs required.
 */

const TECH_STACK = [
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "shadcn/ui",
  "Framer Motion",
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="border-t border-border bg-background mt-auto"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" aria-hidden="true" />
              <span className="font-semibold text-sm text-foreground">
                {SITE.name}
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
              {SITE.description}
            </p>
          </div>

          {/* Stack */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-medium text-foreground uppercase tracking-wider">
              Built With
            </h3>
            <ul className="flex flex-col gap-2" role="list">
              {TECH_STACK.map((tech) => (
                <li
                  key={tech}
                  className="text-xs text-muted-foreground"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-medium text-foreground uppercase tracking-wider">
              Project
            </h3>
            <ul className="flex flex-col gap-2" role="list">
              <li>
                <Link
                  href={SITE.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View APKShield AI source code on GitHub"
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  GitHub
                </Link>
              </li>
              <li className="text-xs text-muted-foreground">MIT License</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground">
            &copy; {year} {SITE.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
