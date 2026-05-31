/* eslint-disable @typescript-eslint/no-explicit-any */

interface StudentsStatsProps {
  studentsData: any[];
}

const StudentsStats = ({ studentsData }: StudentsStatsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {[
        { label: 'Total Students', value: studentsData.length },
        {
          label: 'Active This Week',
          value: studentsData.filter((s) =>
            ['2 hours ago', 'Yesterday', 'Today'].includes(s.lastActive),
          ).length,
        },
        { label: 'Completed', value: studentsData.filter((s) => s.progress === 100).length },
        { label: 'With Reviews', value: studentsData.filter((s) => s.rating > 0).length },
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

export default StudentsStats;
