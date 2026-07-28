/**
 * Site-wide static constants for APKShield AI.
 *
 * All copy, links, and configuration for the marketing site live here.
 * Keeping copy out of JSX makes it easy to update without touching component logic.
 */

export const SITE = {
  name: "APKShield AI",
  tagline: "Android APK Security Analysis",
  description:
    "Upload an Android APK and receive deterministic security analysis with AI-powered explanations across permissions, components, certificates, URLs and more.",
  githubUrl: "https://github.com",
  version: "0.1.0",
  envName: "Development Build",
} as const;

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#pipeline" },
  { label: "GitHub", href: SITE.githubUrl, external: true },
];

export interface FeatureCard {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export const FEATURE_CARDS: FeatureCard[] = [
  {
    id: "manifest",
    title: "Manifest",
    description:
      "Detects dangerous manifest flags, exported activities, debug mode, backup settings, and cleartext traffic permissions.",
    iconName: "FileText",
  },
  {
    id: "permissions",
    title: "Permissions",
    description:
      "Classifies requested permissions by risk level — dangerous, signature, and normal — with actionable context.",
    iconName: "ShieldAlert",
  },
  {
    id: "components",
    title: "Components",
    description:
      "Audits exported Activities, Services, Receivers, and Providers for unprotected exposure and intent vulnerabilities.",
    iconName: "Layers",
  },
  {
    id: "urls",
    title: "URLs",
    description:
      "Extracts hardcoded URLs and endpoints, flagging insecure HTTP, suspicious domains, and exposed API routes.",
    iconName: "Globe",
  },
  {
    id: "certificates",
    title: "Certificates",
    description:
      "Validates signing certificate properties including key strength, algorithm, validity period, and debug signatures.",
    iconName: "BadgeCheck",
  },
  {
    id: "strings",
    title: "Strings",
    description:
      "Scans for hardcoded secrets, API keys, credentials, and sensitive data patterns embedded in the application.",
    iconName: "KeyRound",
  },
] as const;

export interface PipelineStep {
  id: string;
  label: string;
  description: string;
  iconName: string;
}

export const PIPELINE_STEPS: PipelineStep[] = [
  {
    id: "apk",
    label: "APK Upload",
    description: "The APK file is uploaded and validated.",
    iconName: "Upload",
  },
  {
    id: "parser",
    label: "Parser",
    description: "Extracts manifest, DEX bytecode, resources, and certificates.",
    iconName: "ScanSearch",
  },
  {
    id: "risk-engine",
    label: "Risk Engine",
    description: "Applies deterministic rules to produce categorized findings.",
    iconName: "Cpu",
  },
  {
    id: "ai-engine",
    label: "AI Engine",
    description: "Generates natural language explanations and recommendations.",
    iconName: "BrainCircuit",
  },
  {
    id: "dashboard",
    label: "Dashboard",
    description: "Results are visualized with risk scores and exportable data.",
    iconName: "LayoutDashboard",
  },
] as const;

export interface WhyCard {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export const WHY_CARDS: WhyCard[] = [
  {
    id: "deterministic",
    title: "Deterministic Analysis",
    description:
      "Every finding is produced by verifiable, rule-based logic — not probabilistic guesses. You always know why a flag was raised.",
    iconName: "CheckCircle",
  },
  {
    id: "ai-explanations",
    title: "AI Explanations",
    description:
      "Gemini-powered summaries translate technical findings into clear executive context and remediation guidance.",
    iconName: "Sparkles",
  },
  {
    id: "modular",
    title: "Modular Architecture",
    description:
      "A clean, layered backend pipeline — Loader, Parser, Risk Engine, AI Engine — designed for maintainability and extension.",
    iconName: "GitBranch",
  },
] as const;
