'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { eyebrow, sectionHeading, sectionWrap } from '@/lib/styles';

const FAQS = [
  {
    question: 'What is EqualSpace?',
    answer:
      'EqualSpace is a new dating app built around real connection. Instead of endless swiping, it helps you look past first impressions and find people who share your values, your pace, and what you are looking for.',
  },
  {
    question: 'How is EqualSpace different from traditional dating apps?',
    answer:
      'Rather than endless swiping, you get fewer, better introductions, clear profiles, and easy conversation starters that help you get to know each other before you meet.',
  },
  {
    question: 'Who is EqualSpace designed for?',
    answer:
      'EqualSpace is designed for adults aged 18 and over who want a more thoughtful way to meet people and are ready for a relationship that grows with intention.',
  },
  {
    question: 'When will the application launch?',
    answer:
      'We are not sharing a launch date yet. Join the beta list and we will send you news as soon as there is something to tell.',
  },
  {
    question: 'Is early access free?',
    answer:
      'Yes, for a small group. Free access is limited to the first few members, so join the list now. If you are one of the lucky ones, we will send you an invite by email soon.',
  },
  {
    question: 'How will my personal information be handled?',
    answer:
      'We collect only what is needed to manage your early access registration and send the updates you have asked for. A full Privacy Policy will be published before launch and will explain exactly how your information is handled.',
  },
  {
    question: 'How do I get invited to the platform?',
    answer:
      'Reserve your early access using the form on this page. Invitations will be shared with people on the early access list as the platform opens.',
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-20 bg-lotus-white py-32 sm:py-40">
      <div className={`${sectionWrap} grid gap-16 lg:grid-cols-12 lg:gap-10`}>
        <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
          <p className={eyebrow}>Questions</p>
          <h2 className={`${sectionHeading} mt-6`}>
            A few things worth <em className="italic text-lotus-plum">knowing.</em>
          </h2>
        </div>

        <Accordion type="single" collapsible className="lg:col-span-7 lg:col-start-6">
          {FAQS.map((faq, index) => (
            <AccordionItem key={faq.question} value={`item-${index}`} className="border-lotus-blush">
              <AccordionTrigger className="py-7 text-left font-serif text-2xl font-normal text-lotus-brown hover:no-underline sm:text-[1.7rem]">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base leading-[1.8] text-lotus-plum">
                <div className="pb-8 pr-10">{faq.answer}</div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
