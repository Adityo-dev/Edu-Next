'use client';

import { ArrowDown, ArrowUp, Headset } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const faqData = [
  {
    id: 1,
    question: 'How Do I Enroll in a Course?',
    answer:
      'Simply browse our course catalog, select your desired course, and click "Enroll Now". Complete the payment via bKash, Nagad, or Rocket — and you will get instant access to all course materials.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000',
  },
  {
    id: 2,
    question: 'Will I Get a Certificate After Completing?',
    answer:
      'Yes! Once you complete all lessons and pass the required quizzes, EduNext will automatically generate a PDF certificate for you to download and share with employers.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000',
  },
  {
    id: 3,
    question: 'Can I Watch the Videos at My Own Pace?',
    answer:
      'Absolutely! All video lessons are pre-recorded and available 24/7. You can pause, rewind, and rewatch any lesson anytime — no deadline pressure.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1000',
  },
  {
    id: 4,
    question: 'Are There Any Live Classes Available?',
    answer:
      'Yes! Many instructors on EduNext offer live sessions via Zoom or Google Meet. You will get notified before each live class and can join directly from your dashboard.',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1000',
  },
  {
    id: 5,
    question: 'How Secure is My Payment Information?',
    answer:
      'All transactions on EduNext are processed through SSLCommerz — a fully secured and trusted payment gateway used across Bangladesh. Your data is 100% safe.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1000', // Reliable padlock/security image
  },
  {
    id: 6,
    question: 'Can I Access Courses on My Mobile Device?',
    answer:
      'Absolutely! EduNext is fully optimized for all devices. You can seamlessly watch lessons, take quizzes, and track your progress on your smartphone or tablet.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000', // Clear mobile phone usage
  },
  {
    id: 7,
    question: 'What If I Need Help During a Course?',
    answer:
      'Every course features a dedicated Q&A section. You can ask questions, engage with fellow students, and get direct answers from your instructors or teaching assistants.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000', // Team collaboration/support
  },
];

const AUTOPLAY_INTERVAL = 20000;

const FAQSection = () => {
  const [activeId, setActiveId] = useState(faqData[0].id);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const stateRef = useRef({
    isHovered: false,
    isAutoPlaying: true,
    elapsed: 0,
    lastTime: 0,
  });

  useEffect(() => {
    stateRef.current.isHovered = isHovered;
    stateRef.current.isAutoPlaying = isAutoPlaying;
  }, [isHovered, isAutoPlaying]);

  useEffect(() => {
    stateRef.current.elapsed = 0;
    stateRef.current.lastTime = Date.now();

    let animationFrameId: number;

    const animate = () => {
      const now = Date.now();
      const delta = now - stateRef.current.lastTime;
      stateRef.current.lastTime = now;

      // Only progress if not hovered and still autoplaying
      if (!stateRef.current.isHovered && stateRef.current.isAutoPlaying) {
        stateRef.current.elapsed += delta;
        const nextProgress = Math.min((stateRef.current.elapsed / AUTOPLAY_INTERVAL) * 100, 100);
        setProgress(nextProgress);

        if (stateRef.current.elapsed >= AUTOPLAY_INTERVAL) {
          setActiveId((currentId) => {
            const currentIndex = faqData.findIndex((item) => item.id === currentId);
            const nextIndex = (currentIndex + 1) % faqData.length;
            return faqData[nextIndex].id;
          });
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [activeId]);

  const handleManualClick = (id: number) => {
    setIsAutoPlaying(false);
    if (activeId !== id) {
      setActiveId(id);
    }
  };

  return (
    <section className="mx-auto max-w-400 px-4 py-12">
      {/* Header */}
      <div className="mb-8 flex flex-col items-center text-center">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Frequently Asked Questions
        </h2>
        <p className="text-text-secondary mt-3 max-w-2xl text-base leading-relaxed">
          Bringing the future to learning means fostering innovation, adaptability, and growth by
          embracing trends, refining skills, and ensuring competitiveness in a rapidly evolving
          digital landscape.
        </p>
      </div>

      {/* Main Light Gradient Container */}
      <div
        className="flex flex-col justify-between gap-6 overflow-hidden rounded-md border border-slate-100 p-6 md:gap-8 lg:flex-row lg:items-center lg:gap-12"
        style={{ background: 'linear-gradient(160deg, #fdf9f0 0%, #f5f8f5 50%, #eef5f0 100%)' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex w-full flex-col lg:w-1/2">
          {faqData.map((faq) => {
            const isActive = activeId === faq?.id;

            return (
              <div
                key={faq?.id}
                onClick={() => handleManualClick(faq?.id)}
                className="relative cursor-pointer py-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className={`text-base font-bold sm:text-lg ${isActive && 'text-primary'}`}>
                    {faq?.question}
                  </h3>
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      isActive
                        ? 'border-primary/20 bg-primary/10 text-primary'
                        : 'text-text-secondary hover:text-text-primary/50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {isActive ? (
                      <ArrowDown size={16} strokeWidth={2.5} />
                    ) : (
                      <ArrowUp size={16} strokeWidth={2.5} />
                    )}
                  </div>
                </div>

                {/* Expandable Answer */}
                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    isActive ? 'mt-2 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden pr-10">
                    <p className="text-text-secondary text-sm leading-relaxed sm:text-base">
                      {faq?.answer}
                    </p>
                  </div>
                </div>

                {/* Bottom Border / Progress Bar */}
                <div className="absolute bottom-0 left-0 h-0.5 w-full bg-slate-100">
                  {isActive && (
                    <div
                      className="bg-primary h-full transition-none"
                      style={{ width: `${progress}%` }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Side: Image & Floating Card */}
        <div className="w-full lg:w-1/2">
          {/* Image Container */}
          <div className="relative aspect-video max-h-100 w-full overflow-hidden rounded-md">
            {faqData.map((faq) => {
              const isActive = activeId === faq?.id;
              return (
                <Image
                  key={`img-${faq?.id}`}
                  width={600}
                  height={600}
                  src={faq?.image}
                  alt={faq?.question}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
                    isActive ? 'z-10 opacity-100' : 'z-0 opacity-0'
                  }`}
                />
              );
            })}
          </div>

          {/* Floating Card */}
          <div className="relative z-30 mx-auto -mt-8 w-[92%] overflow-hidden rounded-md border border-slate-100 bg-white p-4 shadow-xl sm:-mt-12 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-slate-100 bg-slate-50">
                <Headset size={24} />
              </div>
              <div>
                <h4 className="mb-0.5 font-semibold">Still have questions?</h4>
                <p className="text-text-secondary text-xs leading-relaxed sm:text-sm">
                  Can&apos;t find the answer you&apos;re looking for? Chat with our friendly support
                  team.
                </p>
              </div>
            </div>

            {/* Support CTA Line on Card */}
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
              <span className="text-text-secondary text-xs font-semibold sm:text-sm">
                We usually respond within 2 hours
              </span>
              <span className="text-primary cursor-pointer text-xs font-semibold hover:underline sm:text-sm">
                Contact Support →
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
