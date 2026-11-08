import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero-section';
import { MatchingSection } from '@/components/sections/matching-section';
import { JourneySection } from '@/components/sections/journey-section';
import { TrustSection } from '@/components/sections/trust-section';
import { RegistrationSection } from '@/components/sections/registration-section';
import { FaqSection } from '@/components/sections/faq-section';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <MatchingSection />
        <JourneySection />
        <TrustSection />
        <RegistrationSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
