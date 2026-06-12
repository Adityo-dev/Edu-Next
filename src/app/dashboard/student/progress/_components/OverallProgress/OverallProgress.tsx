'use client';

const OverallProgress = () => {
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
              strokeDashoffset={`${2 * Math.PI * 50 * (1 - 0.55)}`}
              className="transition-all duration-700"
            />
          </svg>
          <div className="absolute text-center">
            <p className="text-primary text-2xl font-black">55%</p>
            <p className="text-text-secondary text-xs">Overall</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {[
          { label: 'Lessons Done', value: '100/182', percent: 55 },
          { label: 'Quizzes Passed', value: '4/5', percent: 80 },
          { label: 'Courses Done', value: '3/6', percent: 50 },
        ].map((item, i) => (
          <div key={i}>
            <div className="mb-1 flex justify-between text-xs">
              <span className="font-medium text-slate-600">{item.label}</span>
              <span className="text-primary font-bold">{item.value}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className="bg-primary h-full rounded-full"
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
