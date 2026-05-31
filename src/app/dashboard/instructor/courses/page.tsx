'use client';

import { useState } from 'react';
import CoursesHeader from './_components/CoursesHeader/CoursesHeader';
import CoursesStats from './_components/CoursesStats/CoursesStats';
import CoursesFilter from './_components/CoursesFilter/CoursesFilter';
import CoursesTable from './_components/CoursesTable/CoursesTable';

const coursesData = [
  {
    id: 1,
    title: 'Complete Web Development Bootcamp',
    category: 'Web Development',
    students: 320,
    revenue: 18000,
    rating: 4.9,
    reviews: 89,
    lessons: 48,
    status: 'published',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=600',
    createdAt: 'Jan 2025',
  },
  {
    id: 2,
    title: 'React.js Advanced Masterclass',
    category: 'Web Development',
    students: 210,
    revenue: 12600,
    rating: 4.8,
    reviews: 54,
    lessons: 36,
    status: 'published',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600',
    createdAt: 'Feb 2025',
  },
  {
    id: 3,
    title: 'Node.js & Express API Development',
    category: 'Web Development',
    students: 0,
    revenue: 0,
    rating: 0,
    reviews: 0,
    lessons: 24,
    status: 'pending',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=600',
    createdAt: 'Apr 2025',
  },
  {
    id: 4,
    title: 'JavaScript ES6+ Fundamentals',
    category: 'Web Development',
    students: 180,
    revenue: 9000,
    rating: 4.7,
    reviews: 42,
    lessons: 28,
    status: 'published',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600',
    createdAt: 'Nov 2024',
  },
  {
    id: 5,
    title: 'CSS & Tailwind Mastery',
    category: 'Web Development',
    students: 0,
    revenue: 0,
    rating: 0,
    reviews: 0,
    lessons: 20,
    status: 'draft',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=600',
    createdAt: 'Apr 2025',
  },
];

const InstructorCoursesPage = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const filtered = coursesData.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || c.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <CoursesHeader />

        {/* Stats */}
        <CoursesStats courses={coursesData} />

        {/* Filters */}
        <CoursesFilter
          filter={filter}
          setFilter={setFilter}
          search={search}
          setSearch={setSearch}
        />

        {/* Courses Table */}
        <CoursesTable filtered={filtered} openMenu={openMenu} setOpenMenu={setOpenMenu} />
      </div>
    </div>
  );
};

export default InstructorCoursesPage;
