/* eslint-disable @typescript-eslint/no-explicit-any */

const CoursesStats = ({ courses }: { courses: any[] }) => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {[
        { label: 'Total Courses', value: courses.length },
        {
          label: 'Published',
          value: courses.filter((c) => c.status === 'published').length,
        },
        { label: 'Pending', value: courses.filter((c) => c.status === 'pending').length },
        { label: 'Draft', value: courses.filter((c) => c.status === 'draft').length },
      ].map((stat, i) => (
        <div
          key={i}
          className="rounded-md border border-slate-100 bg-white p-5 text-center shadow-xs"
        >
          <p className="text-primary text-3xl font-black">{stat.value}</p>
          <p className="text-text-secondary text-sm">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default CoursesStats;
