const studentsData = [
  {
    id: 1,
    name: 'Sumaiya Akter',
    email: 'sumaiya@example.com',
    image: 'https://i.pravatar.cc/150?u=sumaiya',
    course: 'Complete Web Development Bootcamp',
    progress: 72,
    rating: 5,
    enrolledDate: 'Jan 15, 2025',
    lastActive: '2 hours ago',
  },
  {
    id: 2,
    name: 'Nusrat Jahan',
    email: 'nusrat@example.com',
    image: 'https://i.pravatar.cc/150?u=nusrat',
    course: 'Complete Web Development Bootcamp',
    progress: 45,
    rating: 4,
    enrolledDate: 'Feb 2, 2025',
    lastActive: 'Yesterday',
  },
  {
    id: 3,
    name: 'Arif Hossain',
    email: 'arif@example.com',
    image: 'https://i.pravatar.cc/150?u=arif',
    course: 'React.js Advanced Masterclass',
    progress: 88,
    rating: 5,
    enrolledDate: 'Feb 10, 2025',
    lastActive: '3 days ago',
  },
  {
    id: 4,
    name: 'Rakib Ahmed',
    email: 'rakib@example.com',
    image: 'https://i.pravatar.cc/150?u=rakib2',
    course: 'React.js Advanced Masterclass',
    progress: 30,
    rating: 0,
    enrolledDate: 'Mar 1, 2025',
    lastActive: '1 week ago',
  },
  {
    id: 5,
    name: 'Fatima Begum',
    email: 'fatima@example.com',
    image: 'https://i.pravatar.cc/150?u=fatima',
    course: 'JavaScript ES6+ Fundamentals',
    progress: 100,
    rating: 5,
    enrolledDate: 'Nov 5, 2024',
    lastActive: '2 weeks ago',
  },
  {
    id: 6,
    name: 'Tanvir Islam',
    email: 'tanvir2@example.com',
    image: 'https://i.pravatar.cc/150?u=tanvir2',
    course: 'Complete Web Development Bootcamp',
    progress: 15,
    rating: 0,
    enrolledDate: 'Apr 10, 2025',
    lastActive: 'Today',
  },
];

const StudentsStats = () => {
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
        <div key={i} className="dashboard-card-container text-center">
          <p className="text-primary text-3xl font-black">{stat.value}</p>
          <p className="text-text-secondary text-sm">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default StudentsStats;
