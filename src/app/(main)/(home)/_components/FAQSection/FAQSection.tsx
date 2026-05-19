'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqData = [
  {
    id: 1,
    question: 'How Do I Enroll in a Course?',
    answer:
      'Simply browse our course catalog, select your desired course, and click "Enroll Now". Complete the payment via bKash, Nagad, or Rocket — and you will get instant access to all course materials.',
  },
  {
    id: 2,
    question: 'Will I Get a Certificate After Completing a Course?',
    answer:
      'Yes! Once you complete all lessons and pass the required quizzes, EduNext will automatically generate a PDF certificate for you to download and share with employers.',
  },
  {
    id: 3,
    question: 'Can I Watch the Course Videos at My Own Pace?',
    answer:
      'Absolutely! All video lessons are pre-recorded and available 24/7. You can pause, rewind, and rewatch any lesson anytime — no deadline pressure.',
  },
  {
    id: 4,
    question: 'Are There Any Live Classes Available?',
    answer:
      'Yes! Many instructors on EduNext offer live sessions via Zoom or Google Meet. You will get notified before each live class and can join directly from your dashboard.',
  },
  {
    id: 5,
    question: 'How Do Instructors Receive Their Payments?',
    answer:
      'Instructors earn money from every course sale. After the platform commission is deducted, the remaining amount is added to their EduNext wallet. They can then request a withdrawal which the admin approves and processes.',
  },
  {
    id: 6,
    question: 'Is My Payment Information Secure?',
    answer:
      'Yes, all transactions on EduNext are processed through SSLCommerz — a fully secured and trusted payment gateway used across Bangladesh.',
  },
  {
    id: 7,
    question: 'What If I Face Any Problem with a Course?',
    answer:
      'You can submit a support ticket directly from your dashboard. Our admin team will review your issue and respond as soon as possible to help resolve it.',
  },
];

const FAQSection = () => {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-400 px-6">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-start">
          {/* Left Sticky Side */}
          <div className="top-24 w-full lg:sticky lg:w-2/5">
            <h2 className="mb-4 text-4xl leading-tight font-bold tracking-tight md:text-5xl">
              Got <span className="text-primary">Questions?</span> <br /> We Have Answers.
            </h2>

            <p className="text-text-secondary mb-8 text-lg leading-relaxed">
              Everything you need to know about EduNext. Can not find the answer you are looking
              for? Contact our support team.
            </p>

            {/* Stats */}
            <div className="mb-8 flex gap-8">
              <div>
                <h4 className="text-primary text-3xl font-black">5k+</h4>
                <p className="text-text-secondary text-sm">Happy Students</p>
              </div>
              <div className="w-px bg-slate-100" />
              <div>
                <h4 className="text-primary text-3xl font-black">50+</h4>
                <p className="text-text-secondary text-sm">Expert Instructors</p>
              </div>
              <div className="w-px bg-slate-100" />
              <div>
                <h4 className="text-primary text-3xl font-black">120+</h4>
                <p className="text-text-secondary text-sm">Total Courses</p>
              </div>
            </div>

            <button className="bg-secondary cursor-pointer rounded-sm px-8 py-3 font-bold text-white shadow-md shadow-orange-100 transition-all hover:bg-[#d98c0a] active:scale-95">
              Contact Support
            </button>
          </div>

          {/* Right Side - Shadcn Accordion */}
          <div className="w-full lg:w-3/5">
            <Accordion type="single" collapsible defaultValue="item-1">
              {faqData.map((faq, index) => (
                <AccordionItem
                  key={faq.id}
                  value={`item-${faq.id}`}
                  className="group data-[state=open]:bg-primary mb-2 overflow-hidden rounded-md border-none bg-[#F9FAFB] px-6 transition-all duration-300 data-[state=open]:shadow-sm data-[state=open]:shadow-emerald-100"
                >
                  <AccordionTrigger className="cursor-pointer gap-4 py-5 hover:no-underline [&>svg]:hidden">
                    <div className="flex items-center gap-4">
                      <span className="text-text-secondary text-sm font-black group-data-[state=open]:text-white/50">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-left text-lg font-semibold group-data-[state=open]:text-white">
                        {faq.question}
                      </span>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="text-text-secondary pb-5 leading-relaxed group-data-[state=open]:text-white/80">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
