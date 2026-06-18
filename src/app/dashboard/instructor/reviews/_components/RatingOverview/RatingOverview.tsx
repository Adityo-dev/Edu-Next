import { Star } from 'lucide-react';

const ratingBreakdown = [
  { stars: 5, count: 142, percent: 77 },
  { stars: 4, count: 28, percent: 15 },
  { stars: 3, count: 10, percent: 5 },
  { stars: 2, count: 3, percent: 2 },
  { stars: 1, count: 2, percent: 1 },
];

const avgRating = (
  ratingBreakdown.reduce((a, b) => a + b.stars * b.count, 0) /
  ratingBreakdown.reduce((a, b) => a + b.count, 0)
).toFixed(1);

const RatingOverview = () => {
  return (
    <div className="dashboard-card-container p-4">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="bg-primary/10 flex flex-col items-center justify-center rounded-md px-10 py-4 text-center">
          <span className="text-primary text-6xl font-semibold">{avgRating}</span>
          <div className="my-2 flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} fill="#ffc107" color="#ffc107" />
            ))}
          </div>
          <span className="text-text-secondary text-sm">Course Rating</span>
        </div>
        <div className="flex-1 space-y-2">
          {ratingBreakdown.map((r) => (
            <div key={r.stars} className="flex items-center gap-3">
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="bg-warning h-full rounded-full"
                  style={{ width: `${r.percent}%` }}
                />
              </div>
              <div className="flex shrink-0 items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={11} fill={i < r.stars ? '#ffc107' : 'none'} color="#ffc107" />
                ))}
              </div>
              <span className="text-text-secondary w-12 text-right text-sm">{r.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RatingOverview;
