import Image from 'next/image';
import Link from 'next/link';

const recentUsers = [
  {
    name: 'Sumaiya Akter',
    role: 'Student',
    date: '2 hours ago',
    image: 'https://i.pravatar.cc/150?u=sumaiya',
  },
  {
    name: 'Md. Rafiqul Islam',
    role: 'Instructor',
    date: 'Yesterday',
    image: 'https://i.pravatar.cc/150?u=rafiq',
  },
  {
    name: 'Nusrat Jahan',
    role: 'Student',
    date: '2 days ago',
    image: 'https://i.pravatar.cc/150?u=nusrat',
  },
  {
    name: 'Farhan Hossain',
    role: 'Instructor',
    date: '3 days ago',
    image: 'https://i.pravatar.cc/150?u=farhan',
  },
];

const RecentUsers = () => {
  return (
    <div className="dashboard-card-container">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold">Recent Users</h2>
        <Link
          href="/dashboard/admin/users"
          className="text-primary text-sm font-semibold hover:underline"
        >
          View All →
        </Link>
      </div>
      <div className="space-y-4">
        {recentUsers.map((user, i) => (
          <div key={i} className="flex items-center gap-3">
            <Image
              src={user.image}
              alt={user.name}
              width={36}
              height={36}
              className="rounded-full border-2 border-emerald-50"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{user.name}</p>
              <p className="text-text-secondary text-xs">{user.role}</p>
            </div>
            <p className="text-text-secondary shrink-0 text-xs">{user.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentUsers;
