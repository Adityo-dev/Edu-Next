import { Award, BookOpen, Star, Users } from 'lucide-react';

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
        className="overflow-hidden rounded-md border border-slate-100 p-6"
        style={{ background: 'linear-gradient(160deg, #fdf9f0 0%, #f5f8f5 50%, #eef5f0 100%)' }}
      >
        <div className="grid grid-cols-2 gap-y-8 md:grid-cols-4 md:divide-x md:divide-slate-200/60">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center text-center">
              <div className="text-primary mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50">
                {stat.icon}
              </div>
              <h3 className="mb-2 text-2xl font-bold tracking-tight md:text-3xl">{stat.value}</h3>
              <p className="text-text-secondary text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStats;
