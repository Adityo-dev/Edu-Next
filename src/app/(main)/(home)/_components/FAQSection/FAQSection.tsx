'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const faqData = [
  {
    id: 1,
    question: 'How Do I Enroll in a Course?',
    answer:
      "To enroll in a course, simply browse our catalog, select the course you're interested in, and click the 'Enroll Now' button. You'll be guided through the payment and registration process.",
  },
  {
    id: 2,
    question: 'Is Financial Aid Available?',
    answer:
      'Yes, we offer financial aid for selected courses. You can apply directly through the course details page by submitting the required documentation.',
  },
  {
    id: 3,
    question: 'What Happens If I Miss a Class?',
    answer:
      "If you miss a class, don't worry! All course materials, including recorded sessions, will be available for you to catch up at your own pace you can access them anytime.",
  },
  {
    id: 4,
    question: 'What Is the Course Duration?',
    answer:
      'Course duration varies depending on the subject. Most of our professional courses range from 4 to 12 weeks with flexible learning schedules.',
  },
  {
    id: 5,
    question: 'Can I Interact with Other Learners?',
    answer:
      'Absolutely! We provide dedicated community forums and live Q&A sessions where you can interact with fellow students and instructors.',
  },
];

const FAQSection = () => {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-400 px-6">
        <div className="flex flex-col gap-12 lg:flex-row">
          {/* Left Side - Content */}
          <div className="w-full lg:w-2/5">
            <h2 className="mb-4 text-5xl leading-tight font-bold text-[#0F172A]">
              Need Help? Check <br /> Our <span className="text-[#34796F]">FAQs</span>
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-slate-500">
              Find answers to common questions in our FAQs to guide you through your learning
              experience.
            </p>
            <button className="cursor-pointer rounded-sm bg-[#F59E0B] px-8 py-3 font-bold text-white shadow-md shadow-orange-100 transition-all hover:bg-[#d98c0a] active:scale-95">
              Contact Us
            </button>
          </div>

          {/* Right Side - Accordion */}
          <div className="w-full lg:w-3/5">
            <div className="space-y-2">
              {faqData.map((faq) => (
                <div key={faq.id} className="overflow-hidden border-b border-slate-200">
                  <button
                    onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                    className="flex w-full cursor-pointer items-center justify-between py-6 text-left transition-colors hover:text-[#34796F]"
                  >
                    <span
                      className={`text-xl font-bold ${openId === faq.id ? 'text-[#0F172A]' : 'text-slate-700'}`}
                    >
                      {faq.question}
                    </span>
                    {openId === faq.id ? (
                      <ChevronUp className="text-slate-500" size={22} />
                    ) : (
                      <ChevronDown className="text-slate-500" size={22} />
                    )}
                  </button>

                  {/* Accordion Content with Animation */}
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      openId === faq.id ? 'mb-6 max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="pr-8 leading-relaxed text-slate-500">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
