import type { Metadata } from 'next';
import { LegalDocument } from '@/components/layout/legal-document';

export const metadata: Metadata = {
  title: 'Privacy Policy | EqualSpace',
};

export default function PrivacyPage() {
  return (
    <LegalDocument
      title="Privacy Policy"
      intro="We take your privacy seriously. This page summarizes how early access registrations are handled while the full policy is being finalized."
      sections={[
        {
          heading: 'What we collect',
          body: 'When you reserve early access, we collect the details you provide in the form: your name, email address, city, the optional details you choose to share, and your confirmations that you are 18 or older and accept these terms.',
        },
        {
          heading: 'How we use it',
          body: 'We use your details to manage your early access registration and to send the updates you have asked for. We do not use your registration to create a dating profile.',
        },
        {
          heading: 'Full policy',
          body: 'A complete Privacy Policy will be published before EqualSpace launches. It will describe your rights, how long information is kept, and how you can ask for your details to be changed or removed.',
        },
      ]}
    />
  );
}
