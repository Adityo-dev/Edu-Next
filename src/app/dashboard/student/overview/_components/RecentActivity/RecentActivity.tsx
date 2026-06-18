'use client';

const recentActivity = [
  {
    id: 1,
    type: 'lesson',
    text: 'Completed lesson "Flexbox Layout" in Web Development',
    time: '2 hours ago',
    icon: '✅',
  },
  {
    id: 2,
    type: 'certificate',
    text: 'Certificate earned for "Freelancing Masterclass"',
    time: 'Yesterday',
    icon: '🎓',
  },
  {
    id: 3,
    type: 'quiz',
    text: 'Scored 90% on JavaScript Fundamentals quiz',
    time: '2 days ago',
    icon: '🏆',
  },
  {
    id: 4,
    type: 'enroll',
    text: 'Enrolled in "Digital Marketing from Zero to Hero"',
    time: '3 days ago',
    icon: '📚',
  },
  {
    id: 5,
    type: 'live',
    text: 'Attended live session "CSS Grid Deep Dive"',
    time: '4 days ago',
    icon: '🎥',
  },
];

const RecentActivity = () => {
  return (
    <div className="dashboard-card-container">
      <h2 className="mb-5 text-lg font-bold">Recent Activity</h2>

      <div className="space-y-4">
        {recentActivity.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <span className="mt-0.5 shrink-0 text-lg">{activity.icon}</span>
            <div className="flex-1">
              <p className="text-sm leading-relaxed text-slate-600">{activity.text}</p>
              <p className="text-text-secondary mt-0.5 text-xs">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
