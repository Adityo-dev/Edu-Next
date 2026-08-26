import { CheckCircle } from 'lucide-react';
import Image from 'next/image';

const OurStory = () => {
  return (
    <section id="journey" className="mx-auto max-w-400 px-4 py-12">
      <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-12">
        {/* Image */}
        <div className="w-full lg:w-[40%]">
          <div className="relative overflow-hidden rounded-md border border-slate-100 bg-white p-2 shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000"
              alt="Our Story"
              width={600}
              height={420}
              className="h-auto w-full rounded object-cover"
            />
            {/* Floating Badge */}
            <div className="absolute bottom-6 left-6 rounded-md border border-emerald-100 bg-white/90 p-3 shadow-sm backdrop-blur-md">
              <p className="text-primary text-xl font-semibold">3+ Years</p>
              <p className="text-text-secondary text-sm">of empowering learners</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="w-full lg:w-[60%]">
          <h2 className="mb-4 text-3xl font-semibold tracking-tight md:text-4xl">
            Our <span className="text-primary italic">Story</span>
          </h2>
          <p className="text-text-secondary mb-3 text-base leading-relaxed">
            EduNext was founded with one clear mission — to make high-quality digital education
            accessible to every student in Bangladesh, regardless of their background or location.
          </p>
          <p className="text-text-secondary mb-6 text-base leading-relaxed">
            We noticed that many talented young people across Bangladesh lacked access to quality
            tech and freelancing education. So we built EduNext — a platform where verified
            instructors can share their expertise, and students can learn, grow, and earn
            certificates that actually matter.
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
    </section>
  );
};

export default OurStory;
