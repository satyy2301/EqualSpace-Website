import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero-section';
import { TwoWaysSection } from '@/components/sections/two-ways-section';
import { JourneySection } from '@/components/sections/journey-section';
import { ExperienceSection } from '@/components/sections/experience-section';
import { MatchingSection } from '@/components/sections/matching-section';
import { TrustSection } from '@/components/sections/trust-section';
import { LotusSection } from '@/components/sections/lotus-section';
import { CommunitySection } from '@/components/sections/community-section';
import { RegistrationSection } from '@/components/sections/registration-section';
import { FaqSection } from '@/components/sections/faq-section';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TwoWaysSection />
        <JourneySection />
        <ExperienceSection />
        <MatchingSection />
        <TrustSection />
        <LotusSection />
        <CommunitySection />
        <RegistrationSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
