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

const OurJourney = () => {
  return (
    <section className="mx-auto max-w-400 px-4 py-12">
      <div className="mb-10 text-center">
        <h2 className="mb-4 text-3xl font-semibold tracking-tight md:text-4xl">
          Our <span className="text-primary italic">Journey</span>
        </h2>
        <p className="text-text-secondary mx-auto max-w-xl text-base leading-relaxed">
          From a small idea to a platform trusted by thousands — here is how EduNext grew.
        </p>
      </div>

      <div className="relative mx-auto max-w-4xl">
        {/* Center Line */}
        <div className="absolute top-0 left-1/2 hidden h-full w-px -translate-x-1/2 bg-emerald-200/50 md:block" />

        <div className="space-y-8">
          {timeline.map((item, i) => (
            <div
              key={i}
              className={`group relative flex flex-col gap-6 md:flex-row md:items-center ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Card */}
              <div className="bg-primary/5 w-full rounded-md border border-emerald-100/50 p-5 md:w-[calc(50%-2rem)]">
                <span className="text-primary mb-2 block text-xs font-black tracking-widest uppercase">
                  {item.year}
                </span>
                <h3 className="mb-2 text-lg font-semibold tracking-tight">{item.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
              </div>

              {/* Center Dot with Pulse Animation */}
              <div className="absolute left-1/2 hidden -translate-x-1/2 md:block">
                <div className="relative flex h-4 w-4 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-30"></span>
                  <span className="bg-primary relative inline-flex h-3 w-3 rounded-full ring-4 ring-emerald-50"></span>
                </div>
              </div>

              {/* Empty space for opposite side */}
              <div className="hidden md:block md:w-[calc(50%-2rem)]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurJourney;
