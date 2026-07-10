import {
  Award,
  BookOpen,
  CheckCircle,
  Globe,
  Heart,
  Lightbulb,
  Shield,
  Star,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// ─── Data ─────────────────────────────────────────────────────────────────────

const stats = [
  { icon: <Users size={24} />, value: '5,000+', label: 'Students Enrolled' },
  { icon: <BookOpen size={24} />, value: '120+', label: 'Total Courses' },
  { icon: <Star size={24} />, value: '50+', label: 'Verified Instructors' },
  { icon: <Award size={24} />, value: '98%', label: 'Satisfaction Rate' },
];

const values = [
  {
    icon: <Target size={28} />,
    title: 'Quality First',
    desc: 'Every course on EduNext is reviewed and approved by our admin team to ensure the highest quality learning experience.',
  },
  {
    icon: <Heart size={28} />,
    title: 'Student Centered',
    desc: 'We build every feature with students in mind — from free previews to certificates and live sessions.',
  },
  {
    icon: <Shield size={28} />,
    title: 'Trust & Transparency',
    desc: 'From secure payments via SSLCommerz to transparent instructor earnings — we believe in full transparency.',
  },
  {
    icon: <Globe size={28} />,
    title: 'Accessible Learning',
    desc: 'Learn from anywhere in Bangladesh — on mobile, tablet, or desktop — at your own pace, anytime.',
  },
  {
    icon: <Lightbulb size={28} />,
    title: 'Practical Skills',
    desc: 'Our courses focus on real-world, job-ready skills that help students land freelancing gigs and full-time jobs.',
  },
  {
    icon: <TrendingUp size={28} />,
    title: 'Continuous Growth',
    desc: 'We constantly add new courses and improve the platform based on student and instructor feedback.',
  },
];

const whyChooseUs = [
  'Verified instructors approved by our admin team',
  'Live sessions via Zoom & Google Meet',
  'Auto-generated PDF certificates on course completion',
  'Secure payment via bKash, Nagad & Rocket',
  'Free preview lessons — no login required',
  'Real-time notifications & support ticket system',
  'Mobile-friendly learning experience',
  'Transparent instructor earnings & wallet system',
];

const timeline = [
  {
    year: '2022',
    title: 'The Idea',
    desc: 'EduNext was born from a simple idea — make quality digital education accessible to every student in Bangladesh.',
  },
  {
    year: '2023',
    title: 'Platform Launch',
    desc: 'We launched our beta platform with 10 courses and 5 instructors. Within 3 months, we had 500+ enrolled students.',
  },
  {
    year: '2024',
    title: 'Rapid Growth',
    desc: 'Crossed 2,000 students, 30+ verified instructors, and 60+ courses. Introduced live sessions and certificate system.',
  },
  {
    year: '2025',
    title: 'Where We Are Now',
    desc: '5,000+ students, 50+ instructors, 120+ courses. EduNext is now one of the most trusted e-learning platforms in Bangladesh.',
  },
];

// ─── Component
const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="bg-primary mt-20 px-6 py-16 text-center">
        <div className="relative z-10 mx-auto max-w-400 px-6 text-center">
          <h1 className="mb-3 text-4xl font-bold text-white md:text-5xl">
            We Are <span className="text-yellow-400">EduNext</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/75">
            Bangladesh&apos;s growing online learning platform — connecting passionate students with
            verified instructors to build real, job-ready digital skills.
          </p>
        </div>
      </div>

      {/* ── Our Story + Mission ───────────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-400 px-6">
          <div className="flex flex-col items-center gap-16 lg:flex-row">
            {/* Image */}
            <div className="w-full lg:w-1/2">
              <div className="relative overflow-hidden rounded-md shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000"
                  alt="Our Story"
                  width={600}
                  height={420}
                  className="h-auto w-full object-cover"
                />
                {/* Floating Badge */}
                <div className="absolute bottom-6 left-6 rounded-md border border-emerald-100 bg-white p-4 shadow-md">
                  <p className="text-primary text-2xl font-black">3+ Years</p>
                  <p className="text-text-secondary text-sm">of empowering learners</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="w-full lg:w-1/2">
              <h2 className="mb-5 text-4xl leading-tight font-bold tracking-tight md:text-5xl">
                Our <span className="text-primary">Story</span> & Mission
              </h2>
              <p className="text-text-secondary mb-5 text-lg leading-relaxed">
                EduNext was founded with one clear mission — to make high-quality digital education
                accessible to every student in Bangladesh, regardless of their background or
                location.
              </p>
              <p className="text-text-secondary mb-8 text-lg leading-relaxed">
                We noticed that many talented young people across Bangladesh lacked access to
                quality tech and freelancing education. So we built EduNext — a platform where
                verified instructors can share their expertise, and students can learn, grow, and
                earn certificates that actually matter.
              </p>

              {/* Mission Points */}
              <div className="space-y-3">
                {[
                  'Make digital skills accessible to all Bangladeshis',
                  'Connect students with real, verified industry experts',
                  'Create a fair and transparent earning system for instructors',
                  'Build the largest Bangla e-learning community',
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-primary mt-0.5 shrink-0" />
                    <span className="text-text-secondary text-sm leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────────── */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-400 px-6">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center rounded-md border border-white/10 bg-white/10 p-8 text-center backdrop-blur-sm"
              >
                <div className="mb-4 text-white/70">{stat.icon}</div>
                <h3 className="mb-1 text-4xl font-black text-white">{stat.value}</h3>
                <p className="text-sm text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-400 px-6">
          <div className="mb-14 text-center">
            <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Our <span className="text-primary">Journey</span>
            </h2>
            <p className="text-text-secondary mx-auto max-w-xl text-lg leading-relaxed">
              From a small idea to a platform trusted by thousands — here is how EduNext grew.
            </p>
          </div>

          <div className="relative mx-auto max-w-3xl">
            {/* Center Line */}
            <div className="absolute top-0 left-1/2 hidden h-full w-0.5 -translate-x-1/2 bg-slate-100 md:block" />

            <div className="space-y-10">
              {timeline.map((item, i) => (
                <div
                  key={i}
                  className={`relative flex flex-col gap-6 md:flex-row md:items-center ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Card */}
                  <div className="w-full rounded-md border border-slate-100 bg-white p-6 shadow-xs transition-all duration-300 hover:border-emerald-100 hover:shadow-sm md:w-[calc(50%-2rem)]">
                    <span className="text-primary mb-2 block text-xs font-black tracking-widest uppercase">
                      {item.year}
                    </span>
                    <h3 className="mb-2 text-lg font-bold">{item.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
                  </div>

                  {/* Center Dot */}
                  <div className="bg-primary absolute left-1/2 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-white shadow-sm md:block" />

                  {/* Empty space for opposite side */}
                  <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Values ───────────────────────────────────────────────────────── */}
      <section className="bg-[#F9FAFB] py-20">
        <div className="mx-auto max-w-400 px-6">
          <div className="mb-14 text-center">
            <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Our Core <span className="text-primary">Values</span>
            </h2>
            <p className="text-text-secondary mx-auto max-w-xl text-lg leading-relaxed">
              Everything we build and every decision we make is guided by these core values.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, i) => (
              <div
                key={i}
                className="group rounded-md border border-slate-100 bg-white p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-emerald-100 hover:shadow-md hover:shadow-emerald-100/40"
              >
                <div className="bg-primary mb-5 inline-flex h-14 w-14 items-center justify-center rounded-md text-white shadow-sm transition-all duration-300 group-hover:scale-105">
                  {value.icon}
                </div>
                <h3 className="mb-3 text-lg font-bold">{value.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose EduNext ───────────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-400 px-6">
          <div className="flex flex-col items-center gap-16 lg:flex-row">
            {/* Left Content */}
            <div className="w-full lg:w-1/2">
              <h2 className="mb-5 text-4xl leading-tight font-bold tracking-tight md:text-5xl">
                Why Choose <span className="text-primary">EduNext?</span>
              </h2>
              <p className="text-text-secondary mb-8 text-lg leading-relaxed">
                There are many e-learning platforms out there — but EduNext is built specifically
                for Bangladeshi students and instructors, with features that truly matter.
              </p>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {whyChooseUs.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-sm bg-emerald-50/50 p-3">
                    <CheckCircle size={16} className="text-primary mt-0.5 shrink-0" />
                    <span className="text-sm leading-relaxed text-slate-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-1/2">
              <div className="relative">
                <div className="overflow-hidden rounded-md shadow-sm">
                  <Image
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000"
                    alt="Why Choose EduNext"
                    width={600}
                    height={420}
                    className="h-auto w-full object-cover"
                  />
                </div>
                {/* Floating Card */}
                <div className="absolute -right-5 -bottom-5 rounded-md border border-emerald-100 bg-white p-5 shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-full text-white">
                      <Star size={20} fill="currentColor" />
                    </div>
                    <div>
                      <p className="text-primary text-xl font-black">4.9/5</p>
                      <p className="text-text-secondary text-xs">Average Platform Rating</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="bg-[#F9FAFB] py-20">
        <div className="mx-auto max-w-400 px-6">
          <div className="bg-primary relative overflow-hidden rounded-md px-8 py-16 text-center shadow-sm">
            {/* Dot Grid */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(#ffffff 1.5px, transparent 1px)`,
                backgroundSize: '28px 28px',
              }}
            />
            {/* SVG Circles */}
            <div className="absolute -right-12 -bottom-12 opacity-10">
              <svg width="300" height="300" viewBox="0 0 400 400" fill="none">
                <circle cx="200" cy="200" r="198" stroke="#ffffff" strokeWidth="2" />
                <circle cx="200" cy="200" r="150" stroke="#ffffff" strokeWidth="2" />
                <circle cx="200" cy="200" r="100" stroke="#ffffff" strokeWidth="2" />
              </svg>
            </div>

            <div className="relative z-10 flex flex-col items-center">
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
                <span className="h-2 w-2 animate-pulse rounded-full bg-yellow-400" />
                <span className="text-sm font-medium text-white">Join 5,000+ Students Today</span>
              </div>

              <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
                Ready to Start <span className="text-yellow-400">Learning?</span>
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-lg leading-relaxed text-white/70">
                Start building your future with EduNext. Learn from verified instructors, earn
                certificates, and unlock new career opportunities.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/courses"
                  className="bg-secondary cursor-pointer rounded-sm px-10 py-4 text-lg font-bold text-white shadow-sm shadow-orange-300/30 transition-all hover:scale-105 active:scale-95"
                >
                  Explore All Courses
                </Link>
                <Link
                  href="/register"
                  className="cursor-pointer rounded-sm border border-white/30 bg-white/10 px-10 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20 active:scale-95"
                >
                  Register Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
