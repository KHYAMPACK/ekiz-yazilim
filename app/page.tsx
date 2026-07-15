import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import FaqSection from "@/components/FaqSection";
import FirstClientNote from "@/components/FirstClientNote";
import FloatingContact from "@/components/FloatingContact";
import FounderSection from "@/components/FounderSection";
import HeroIntake from "@/components/HeroIntake";
import ProcessSection from "@/components/ProcessSection";
import Reveal from "@/components/Reveal";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroIntake />
        <Reveal>
          <AboutSection />
        </Reveal>
        <Reveal delay={40}>
          <ProcessSection />
        </Reveal>
        <Reveal delay={40}>
          <FirstClientNote />
        </Reveal>
        <Reveal delay={40}>
          <FounderSection />
        </Reveal>
        <Reveal delay={40}>
          <FaqSection />
        </Reveal>
        <Reveal delay={40}>
          <ContactSection />
        </Reveal>
      </main>
      <Reveal>
        <SiteFooter />
      </Reveal>
      <FloatingContact />
    </>
  );
}
