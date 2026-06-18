interface User {
  role: string;
  status: string;
}

interface UsersStatsProps {
  users: User[];
}

const UsersStats = ({ users }: UsersStatsProps) => {
  const stats = [
    { label: 'Total Users', value: users.length },
    { label: 'Students', value: users.filter((u) => u.role === 'student').length },
    { label: 'Instructors', value: users.filter((u) => u.role === 'instructor').length },
    { label: 'Suspended', value: users.filter((u) => u.status === 'suspended').length },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {stats.map((stat, i) => (
        <div key={i} className="dashboard-card-container text-center">
          <p className="text-primary text-3xl font-black">{stat.value}</p>
          <p className="text-text-secondary text-sm">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default UsersStats;
