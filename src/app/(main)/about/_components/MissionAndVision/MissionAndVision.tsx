import { Target, Lightbulb } from 'lucide-react';

const MissionAndVision = () => {
  return (
    <section className="mx-auto max-w-400 px-4 pb-12 lg:pb-16">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* ── Mission Card ── */}
        <div className="group relative rounded-md border border-slate-100 bg-white p-6 text-center shadow-xs transition-all duration-300 hover:border-emerald-100 hover:shadow-sm">
          <div className="bg-primary mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
            <Target size={28} />
          </div>
          <h3 className="mb-2 text-lg font-semibold tracking-tight text-slate-800">Our Mission</h3>
          <p className="text-text-secondary text-sm leading-relaxed">
            To make high-quality digital education accessible to every student in Bangladesh. We
            strive to empower learners with real-world, job-ready skills that bridge the gap between
            traditional education and the modern digital economy.
          </p>
        </div>

        {/* ── Vision Card ── */}
        <div className="group relative rounded-md border border-slate-100 bg-white p-6 text-center shadow-xs transition-all duration-300 hover:border-emerald-100 hover:shadow-sm">
          <div className="bg-primary mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
            <Lightbulb size={28} />
          </div>
          <h3 className="mb-2 text-lg font-semibold tracking-tight text-slate-800">Our Vision</h3>
          <p className="text-text-secondary text-sm leading-relaxed">
            To become the most trusted and comprehensive e-learning platform in Bangladesh, creating
            a thriving community where millions of students and instructors connect, learn, and grow
            together seamlessly.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionAndVision;
