import { Users, BookOpen, Star, Award } from 'lucide-react';

const stats = [
  { icon: <Users size={24} />, value: '5,000+', label: 'Students Enrolled' },
  { icon: <BookOpen size={24} />, value: '120+', label: 'Total Courses' },
  { icon: <Star size={24} />, value: '50+', label: 'Verified Instructors' },
  { icon: <Award size={24} />, value: '98%', label: 'Satisfaction Rate' },
];

const AboutStats = () => {
  return (
    <section className="mx-auto max-w-400 px-4 py-12">
      <div
        className="overflow-hidden rounded-md border border-slate-100 p-6 lg:p-10"
        style={{ background: 'linear-gradient(160deg, #fdf9f0 0%, #f5f8f5 50%, #eef5f0 100%)' }}
      >
        <div className="grid grid-cols-2 gap-y-8 md:grid-cols-4 md:divide-x md:divide-slate-200/60">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center text-center">
              <div className="text-primary mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
                {stat.icon}
              </div>
              <h3 className="mb-2 text-3xl font-bold tracking-tight text-slate-800 md:text-4xl">
                {stat.value}
              </h3>
              <p className="text-text-secondary text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStats;
