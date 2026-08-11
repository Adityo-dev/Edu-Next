'use client';

import { useGetStudentOverallProgressQuery } from '@/redux/features/progress/studentProgress.api';

const OverallProgress = () => {
  const { data, isLoading } = useGetStudentOverallProgressQuery();
  const overallProgress = data?.data;

  const percentage = overallProgress?.overallPercentage || 0;

  const items = [
    {
      label: 'Lessons Done',
      value: `${overallProgress?.lessonsDone?.completed || 0}/${overallProgress?.lessonsDone?.total || 0}`,
      percent: overallProgress?.lessonsDone?.total
        ? (overallProgress.lessonsDone.completed / overallProgress.lessonsDone.total) * 100
        : 0,
    },
    {
      label: 'Quizzes Passed',
      value: `${overallProgress?.quizzesPassed?.completed || 0}/${overallProgress?.quizzesPassed?.total || 0}`,
      percent: overallProgress?.quizzesPassed?.total
        ? (overallProgress.quizzesPassed.completed / overallProgress.quizzesPassed.total) * 100
        : 0,
    },
    {
      label: 'Courses Done',
      value: `${overallProgress?.coursesDone?.completed || 0}/${overallProgress?.coursesDone?.total || 0}`,
      percent: overallProgress?.coursesDone?.total
        ? (overallProgress.coursesDone.completed / overallProgress.coursesDone.total) * 100
        : 0,
    },
  ];

  return (
    <div className="dashboard-card-container">
      <h3 className="mb-5 text-base font-bold">Overall Progress</h3>

      {/* Big Circle */}
      <div className="mb-5 flex flex-col items-center">
        <div className="relative flex h-32 w-32 items-center justify-center">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" fill="none" stroke="#f1f5f9" strokeWidth="12" />
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#34796f"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 50}`}
              strokeDashoffset={`${2 * Math.PI * 50 * (1 - percentage / 100)}`}
              className="transition-all duration-700"
            />
          </svg>
          <div className="absolute text-center">
            <p className="text-primary text-2xl font-black">{isLoading ? '-' : `${percentage}%`}</p>
            <p className="text-text-secondary text-xs">Overall</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i}>
            <div className="mb-1 flex justify-between text-xs">
              <span className="font-medium text-slate-600">{item.label}</span>
              <span className="text-primary font-bold">{isLoading ? '-' : item.value}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className="bg-primary h-full rounded-full transition-all duration-700"
                style={{ width: `${item.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverallProgress;
