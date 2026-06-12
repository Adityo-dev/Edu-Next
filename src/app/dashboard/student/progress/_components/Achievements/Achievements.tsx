'use client';

const Achievements = () => {
  return (
    <div className="dashboard-card-container">
      <h3 className="mb-4 text-base font-bold">Achievements</h3>
      <div className="grid grid-cols-3 gap-3">
        {[
          { emoji: '🔥', label: '7-Day Streak', earned: true },
          { emoji: '🎓', label: 'First Cert', earned: true },
          { emoji: '⚡', label: 'Fast Learner', earned: true },
          { emoji: '🏆', label: 'Top Scorer', earned: false },
          { emoji: '📚', label: '5 Courses', earned: false },
          { emoji: '💎', label: 'Pro Learner', earned: false },
        ].map((badge, i) => (
          <div
            key={i}
            className={`flex flex-col items-center rounded-sm p-3 text-center transition-all ${
              badge.earned
                ? 'border border-emerald-100 bg-emerald-50'
                : 'border border-slate-100 bg-slate-50 opacity-40'
            }`}
          >
            <span className="mb-1 text-2xl">{badge.emoji}</span>
            <span className="text-[10px] leading-tight font-semibold text-slate-600">
              {badge.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
