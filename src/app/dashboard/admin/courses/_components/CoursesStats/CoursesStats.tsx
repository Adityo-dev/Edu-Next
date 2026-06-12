interface Course {
  status: string;
  students: number;
}

interface CoursesStatsProps {
  courses: Course[];
}

const CoursesStats = ({ courses }: CoursesStatsProps) => {
  const stats = [
    { label: 'Total Courses', value: courses.length },
    { label: 'Published', value: courses.filter((c) => c.status === 'published').length },
    { label: 'Pending Review', value: courses.filter((c) => c.status === 'pending').length },
    {
      label: 'Total Students',
      value: courses.reduce((a, b) => a + b.students, 0).toLocaleString(),
    },
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

export default CoursesStats;
