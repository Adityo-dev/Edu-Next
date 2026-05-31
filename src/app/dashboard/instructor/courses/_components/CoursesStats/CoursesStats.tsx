/* eslint-disable @typescript-eslint/no-explicit-any */
import { BookOpen, CheckCircle, Clock, FileText } from 'lucide-react';

const CoursesStats = ({ courses }: { courses: any[] }) => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {[
        {
          label: 'Total Courses',
          value: courses.length,
          icon: <BookOpen className="h-5 w-5 text-slate-400" />,
        },
        {
          label: 'Published',
          value: courses.filter((c) => c.status === 'published').length,
          icon: <CheckCircle className="h-5 w-5 text-emerald-500" />,
        },
        {
          label: 'Pending',
          value: courses.filter((c) => c.status === 'pending').length,
          icon: <Clock className="h-5 w-5 text-amber-500" />,
        },
        {
          label: 'Draft',
          value: courses.filter((c) => c.status === 'draft').length,
          icon: <FileText className="h-5 w-5 text-slate-400" />,
        },
      ].map((stat, i) => (
        <div
          key={i}
          className="flex items-center justify-between rounded-md border border-slate-100 bg-white p-5 text-left shadow-xs"
        >
          <div>
            <p className="text-primary text-3xl font-black">{stat.value}</p>
            <p className="text-text-secondary text-sm">{stat.label}</p>
          </div>

          <div className="flex items-center justify-center">{stat.icon}</div>
        </div>
      ))}
    </div>
  );
};

export default CoursesStats;
