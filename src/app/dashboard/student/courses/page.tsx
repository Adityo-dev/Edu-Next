'use client';

import { useState } from 'react';
import CoursesHeader from './_components/CoursesHeader/CoursesHeader';
import CoursesStats from './_components/CoursesStats/CoursesStats';
import CoursesFilter from './_components/CoursesFilter/CoursesFilter';
import CoursesGrid from './_components/CoursesGrid/CoursesGrid';

const myCoursesData = [
  {
    id: 1,
    title: 'Complete Web Development Bootcamp',
    instructor: 'Md. Rafiqul Islam',
    instructorImage: 'https://i.pravatar.cc/150?u=rafiq',
    category: 'Web Development',
    progress: 72,
    totalLessons: 48,
    completedLessons: 34,
    duration: '24 hrs',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=600',
    status: 'in-progress',
    enrolledDate: 'Jan 2025',
    lastAccessed: '2 hours ago',
    certificate: false,
  },
  {
    id: 2,
    title: 'UI/UX Design Masterclass with Figma',
    instructor: 'Farhan Hossain',
    instructorImage: 'https://i.pravatar.cc/150?u=farhan',
    category: 'UI/UX Design',
    progress: 45,
    totalLessons: 36,
    completedLessons: 16,
    duration: '18 hrs',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=600',
    status: 'in-progress',
    enrolledDate: 'Feb 2025',
    lastAccessed: 'Yesterday',
    certificate: false,
  },
  {
    id: 3,
    title: 'Freelancing: From Beginner to Pro',
    instructor: 'Sabbir Hossain',
    instructorImage: 'https://i.pravatar.cc/150?u=sabbir',
    category: 'Freelancing',
    progress: 100,
    totalLessons: 24,
    completedLessons: 24,
    duration: '12 hrs',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600',
    status: 'completed',
    enrolledDate: 'Dec 2024',
    lastAccessed: '2 weeks ago',
    certificate: true,
  },
  {
    id: 4,
    title: 'Graphic Design with Adobe Illustrator',
    instructor: 'Mithila Rahman',
    instructorImage: 'https://i.pravatar.cc/150?u=mithila',
    category: 'Graphic Design',
    progress: 100,
    totalLessons: 40,
    completedLessons: 40,
    duration: '20 hrs',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=600',
    status: 'completed',
    enrolledDate: 'Nov 2024',
    lastAccessed: '1 month ago',
    certificate: true,
  },
  {
    id: 5,
    title: 'Data Analytics with Python & Excel',
    instructor: 'Imran Hossain',
    instructorImage: 'https://i.pravatar.cc/150?u=imran',
    category: 'Data Analytics',
    progress: 100,
    totalLessons: 44,
    completedLessons: 44,
    duration: '22 hrs',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=600',
    status: 'completed',
    enrolledDate: 'Oct 2024',
    lastAccessed: '2 months ago',
    certificate: true,
  },
  {
    id: 6,
    title: 'Digital Marketing from Zero to Hero',
    instructor: 'Nasrin Sultana',
    instructorImage: 'https://i.pravatar.cc/150?u=nasrin',
    category: 'Digital Marketing',
    progress: 20,
    totalLessons: 30,
    completedLessons: 6,
    duration: '15 hrs',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600',
    status: 'in-progress',
    enrolledDate: 'Mar 2025',
    lastAccessed: '3 days ago',
    certificate: false,
  },
];

const MyCourses = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'in-progress' | 'completed'>('all');

  const filtered = myCoursesData.filter((c) => {
    const matchSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || c.status === filter;
    return matchSearch && matchFilter;
  });

  const totalCompleted = myCoursesData.filter((c) => c.status === 'completed').length;
  const totalInProgress = myCoursesData.filter((c) => c.status === 'in-progress').length;
  const totalCertificates = myCoursesData.filter((c) => c.certificate).length;

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <CoursesHeader />

        {/* Stats */}
        <CoursesStats
          totalCourses={myCoursesData.length}
          totalInProgress={totalInProgress}
          totalCompleted={totalCompleted}
          totalCertificates={totalCertificates}
        />

        {/* Filter and Search */}
        <CoursesFilter
          filter={filter}
          setFilter={setFilter}
          search={search}
          setSearch={setSearch}
          totalCourses={myCoursesData.length}
          totalInProgress={totalInProgress}
          totalCompleted={totalCompleted}
        />

        {/* Courses Grid */}
        <CoursesGrid courses={filtered} />
      </div>
    </div>
  );
};

export default MyCourses;
