import type { Metadata } from "next";
import { Navbar } from "@/app/shared/components/navigation/Navbar";
import { Footer } from "@/app/shared/components/layout/Footer";
import { HeroSection } from "@/app/features/homepage/HeroSection";
import { FeatureGrid } from "@/app/features/homepage/FeatureGrid";
import { PipelineSection } from "@/app/features/homepage/PipelineSection";
import { WhySection } from "@/app/features/homepage/WhySection";

/**
 * Homepage — public marketing page for APKShield AI.
 *
 * This is a Server Component. It composes feature sections and shared layout
 * components. It contains no business logic or data fetching.
 *
 * Route: / (via marketing route group)
 * Task: F2.1
 */

export const metadata: Metadata = {
  title: "APKShield AI — Android APK Security Analysis",
  description:
    "Upload an Android APK and receive deterministic security analysis with AI-powered explanations across permissions, components, certificates, URLs and more.",
  openGraph: {
    title: "APKShield AI — Android APK Security Analysis",
    description:
      "Upload an Android APK and receive deterministic security analysis with AI-powered explanations.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex flex-col flex-1">
        <HeroSection />
        <FeatureGrid />
        <PipelineSection />
        <WhySection />
      </main>
      <Footer />
    </>
  );
}
