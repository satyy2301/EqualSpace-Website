import type { Metadata } from 'next';
import { LegalDocument } from '@/components/layout/legal-document';

export const metadata: Metadata = {
  title: 'Terms & Conditions | EqualSpace',
};

export default function TermsPage() {
  return (
    <LegalDocument
      title="Terms & Conditions"
      intro="These terms apply to the early access registration on the EqualSpace website. The full terms for the EqualSpace application will be published before launch."
      sections={[
        {
          heading: 'Eligibility',
          body: 'EqualSpace is intended for adults aged 18 and over. By reserving early access you confirm that you meet this requirement.',
        },
        {
          heading: 'Early access',
          body: 'Reserving early access does not guarantee an invitation or a place on the platform. Details about access, timing, and any costs will be shared before they apply.',
        },
        {
          heading: 'Full terms',
          body: 'Complete terms of use will be published before EqualSpace launches.',
        },
      ]}
    />
  );
}
