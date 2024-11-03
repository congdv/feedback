import { LandingContent } from "@/components/landing/landing-content";
import { LandingFeature } from "@/components/landing/landing-feature";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingHero } from "@/components/landing/landing-hero";
import { LandingNavbar } from "@/components/landing/landing-navbar";

export default function LandingPage() {
  return(
    <div className="h-full">
      <LandingNavbar/>
      <LandingHero/>
      <LandingContent/>
      <LandingFeature/>
      <LandingFooter/>
    </div>
  )
}