import { Target, Heart, Shield, Globe, Lightbulb, TrendingUp } from 'lucide-react';

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

const OurValues = () => {
  return (
    <section className="mx-auto max-w-400 px-4 py-12 lg:py-16">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-semibold tracking-tight md:text-4xl">
          Our Core <span className="text-primary italic">Values</span>
        </h2>
        <p className="text-text-secondary mx-auto max-w-xl text-base leading-relaxed">
          Everything we build and every decision we make is guided by these core values.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {values.map((value, i) => (
          <div
            key={i}
            className="group relative rounded-md border border-slate-100 bg-white p-6 text-center shadow-xs transition-all duration-300 hover:border-emerald-100 hover:shadow-sm"
          >
            <div className="bg-primary mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
              {value.icon}
            </div>
            <h3 className="mb-2 text-lg font-semibold tracking-tight text-slate-800">
              {value.title}
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed">{value.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurValues;
