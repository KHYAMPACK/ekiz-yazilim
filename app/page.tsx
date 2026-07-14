import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import FaqSection from "@/components/FaqSection";
import FirstClientNote from "@/components/FirstClientNote";
import FounderSection from "@/components/FounderSection";
import HeroIntake from "@/components/HeroIntake";
import ProcessSection from "@/components/ProcessSection";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroIntake />
        <AboutSection />
        <ProcessSection />
        <FirstClientNote />
        <FounderSection />
        <FaqSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
