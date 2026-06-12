'use client';

import CoursesHeader from './_components/CoursesHeader/CoursesHeader';
import CoursesStats from './_components/CoursesStats/CoursesStats';
import CoursesTable from './_components/CoursesTable/CoursesTable';

const coursesData = [
  {
    id: 1,
    title: 'Complete Web Development Bootcamp',
    instructor: 'Md. Rafiqul Islam',
    category: 'Web Development',
    students: 320,
    price: 1500,
    status: 'published',
    submittedDate: 'Jan 10, 2025',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=600',
  },
  {
    id: 2,
    title: 'UI/UX Design Masterclass with Figma',
    instructor: 'Farhan Hossain',
    category: 'UI/UX Design',
    students: 210,
    price: 1800,
    status: 'published',
    submittedDate: 'Feb 5, 2025',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=600',
  },
  {
    id: 3,
    title: 'Node.js & Express API Development',
    instructor: 'Md. Rafiqul Islam',
    category: 'Web Development',
    students: 0,
    price: 1600,
    status: 'pending',
    submittedDate: 'Apr 18, 2025',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=600',
  },
  {
    id: 4,
    title: 'Digital Marketing from Zero to Hero',
    instructor: 'Nasrin Sultana',
    category: 'Digital Marketing',
    students: 180,
    price: 1200,
    status: 'published',
    submittedDate: 'Mar 1, 2025',
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f5a07d?q=80&w=600',
  },
  {
    id: 5,
    title: 'Advanced Python Programming',
    instructor: 'Imran Hossain',
    category: 'Data Analytics',
    students: 0,
    price: 1800,
    status: 'pending',
    submittedDate: 'Apr 20, 2025',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=600',
  },
  {
    id: 6,
    title: 'Freelancing Masterclass',
    instructor: 'Sabbir Hossain',
    category: 'Freelancing',
    students: 240,
    price: 999,
    status: 'published',
    submittedDate: 'Dec 1, 2024',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600',
  },
];

const CoursesManagementPage = () => {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto space-y-6">
        <CoursesHeader />
        <CoursesStats courses={coursesData} />
        <CoursesTable />
      </div>
    </div>
  );
};

export default CoursesManagementPage;
