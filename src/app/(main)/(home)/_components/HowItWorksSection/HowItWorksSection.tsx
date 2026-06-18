'use client';

import {
  BookOpen,
  CheckCircle,
  GraduationCap,
  Search,
  Trophy,
  Upload,
  Video,
  Wallet,
} from 'lucide-react';
import { useState } from 'react';

const studentSteps = [
  {
    id: 1,
    icon: <Search size={26} />,
    title: 'Browse Courses',
    desc: 'Explore courses by category. You can preview selected lessons for free — no login required.',
  },
  {
    id: 2,
    icon: <BookOpen size={26} />,
    title: 'Enroll & Pay Securely',
    desc: 'Pay easily with bKash, Nagad, or Rocket via SSLCommerz. Your transaction is 100% secure.',
  },
  {
    id: 3,
    icon: <GraduationCap size={26} />,
    title: 'Learn at Your Own Pace',
    desc: 'Watch video lessons, attend live sessions via Zoom or Google Meet, and complete quizzes anytime.',
  },
  {
    id: 4,
    icon: <Trophy size={26} />,
    title: 'Earn Your Certificate',
    desc: 'Finish the course, pass the quiz, and instantly download your PDF certificate to boost your career.',
  },
];

const instructorSteps = [
  {
    id: 1,
    icon: <Upload size={26} />,
    title: 'Create Your Course',
    desc: 'Build your course with video lessons, quizzes, and resources using our easy course builder.',
  },
  {
    id: 2,
    icon: <CheckCircle size={26} />,
    title: 'Get Verified & Approved',
    desc: 'Our admin team reviews your profile and course. Once approved, your course goes live on EduNext.',
  },
  {
    id: 3,
    icon: <Video size={26} />,
    title: 'Teach & Go Live',
    desc: 'Host live sessions via Zoom or Google Meet, engage with students, and grow your audience.',
  },
  {
    id: 4,
    icon: <Wallet size={26} />,
    title: 'Earn & Withdraw',
    desc: 'Track your earnings from your dashboard and request a withdrawal anytime — quickly and easily.',
  },
];

const HowItWorksSection = () => {
  const [activeTab, setActiveTab] = useState<'student' | 'instructor'>('student');

  const steps = activeTab === 'student' ? studentSteps : instructorSteps;

  return (
    <section className="bg-[#F9FAFB] py-20">
      <div className="mx-auto max-w-400 px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl leading-tight font-bold tracking-tight md:text-5xl">
            How <span className="text-primary">EduNext</span> Works
          </h2>
          <p className="text-text-secondary mx-auto max-w-xl text-lg leading-relaxed">
            Whether you are here to learn or to teach — EduNext makes the process simple,
            transparent, and rewarding.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="mb-12 flex justify-center">
          <div className="flex rounded-sm border border-slate-200 bg-white p-1 shadow-xs">
            <button
              onClick={() => setActiveTab('student')}
              className={`cursor-pointer rounded-sm px-8 py-2.5 text-sm font-semibold transition-all duration-300 ${
                activeTab === 'student'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-secondary hover:text-primary'
              }`}
            >
              For Students
            </button>
            <button
              onClick={() => setActiveTab('instructor')}
              className={`cursor-pointer rounded-sm px-8 py-2.5 text-sm font-semibold transition-all duration-300 ${
                activeTab === 'instructor'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-secondary hover:text-primary'
              }`}
            >
              For Instructors
            </button>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.id} className="group relative">
              <div className="relative rounded-md border border-slate-100 bg-white p-8 text-center shadow-xs transition-all duration-300 hover:border-emerald-100 hover:shadow-sm">
                {/* Step Number */}
                <span className="text-primary/15 absolute top-4 right-5 text-5xl font-black">
                  {step.id}
                </span>

                {/* Icon */}
                <div className="bg-primary mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full text-white shadow-sm transition-all duration-300 group-hover:scale-105">
                  {step.icon}
                </div>

                {/* Title */}
                <h3 className="mb-3 text-xl font-bold">{step.title}</h3>

                {/* Description */}
                <p className="text-text-secondary leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
