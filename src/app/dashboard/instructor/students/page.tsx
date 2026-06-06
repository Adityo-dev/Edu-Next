'use client';

import StudentsHeader from './_components/StudentsHeader/StudentsHeader';
import StudentsStats from './_components/StudentsStats/StudentsStats';
import StudentsTable from './_components/StudentsTable/StudentsTable';

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

const InstructorStudentsPage = () => {
  return (
    <div className="mx-auto space-y-6">
      <StudentsHeader />
      <StudentsStats studentsData={studentsData} />
      <StudentsTable />
    </div>
  );
};

export default InstructorStudentsPage;
