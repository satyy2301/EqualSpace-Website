'use client';

import type { ReactNode } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Mark } from '@/components/ui/mark';
import { eyebrow, sectionHeading, sectionWrap } from '@/lib/styles';

const FAQS: { question: ReactNode; answer: ReactNode }[] = [
  {
    question: 'What is EqualSpace?',
    answer:
      'EqualSpace is a dating app for adults in India. You do not swipe through hundreds of people. You get a few introductions each morning, or you post an anonymous thought and let someone come to you.',
  },
  {
    question: 'How does a match start?',
    answer: (
      <>
        Two ways. In the morning you receive <Mark>3 to 5</Mark> profiles. Or you post a thought with no public comments, and a like becomes a private match offer. Either way, you both answer <Mark>5 questions</Mark> before the chat opens. You can keep up to <Mark>5 chats</Mark> at a time.
      </>
    ),
  },
  {
    question: 'Who can join?',
    answer:
      'Adults 18 and over. The form asks your city, what you are looking for, and confirms you accept the Privacy Policy and Terms.',
  },
  {
    question: <>What does the <Mark>1:1</Mark> city balance mean?</>,
    answer:
      'In each city we keep an equal number of women and men, so neither side is buried in messages. If one side is full, new people wait until there is room. If you do not identify as a woman or a man, say so on the form. We will tell you how your city list works before you get an invite.',
  },
  {
    question: 'When does it launch, and is early access free?',
    answer:
      'The app is not open yet, and there is no public launch date. This form is the only way onto the list we invite from. Each city keeps an equal number of women and men, so one side can fill while the other still has room. Invites go out in the order people joined, as each city opens. Join now and you are in that order. Wait, and you are behind everyone who registered today, or you wait again once your side of the city is full. Reserving a spot costs nothing. Any free period or fee is explained in the email before it applies.',
  },
  {
    question: 'What happens to the details I submit?',
    answer:
      'We store your name, email, city, and the optional answers you choose, plus your confirmations that you are 18 or older and that you accept the terms. We use them only to run this list and email you updates. We do not turn this form into a dating profile. Read the Privacy Policy and Terms on this site. A fuller policy will replace these pages before the app opens.',
  },
  {
    question: 'How do I get an invite?',
    answer:
      'Use the form on this page. One email holds one place, in the order you join. We email people on that list as each city opens, and a full side does not get new invites until a place opens. If that email is already registered, the form will say so.',
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
            <AccordionItem key={index} value={`item-${index}`} className="border-lotus-blush">
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
