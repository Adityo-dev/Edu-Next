'use client';

import { Edit, Eye, MoreVertical, Plus, Search, Star, Trash2, Users, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

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

const statusConfig: Record<string, string> = {
  published: 'bg-emerald-50 text-primary',
  pending: 'bg-yellow-50 text-yellow-600',
  draft: 'bg-slate-100 text-slate-500',
};

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
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-text-primary text-2xl font-black">My Courses</h1>
            <p className="text-text-secondary mt-1 text-sm">Manage and track all your courses.</p>
          </div>
          <Link
            href="/dashboard/instructor/courses/create"
            className="bg-primary flex items-center gap-2 rounded-sm px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#2a6159]"
          >
            <Plus size={16} />
            Create New Course
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: 'Total Courses', value: coursesData.length },
            {
              label: 'Published',
              value: coursesData.filter((c) => c.status === 'published').length,
            },
            { label: 'Pending', value: coursesData.filter((c) => c.status === 'pending').length },
            { label: 'Draft', value: coursesData.filter((c) => c.status === 'draft').length },
          ].map((stat, i) => (
            <div
              key={i}
              className="rounded-md border border-slate-100 bg-white p-5 text-center shadow-xs"
            >
              <p className="text-primary text-3xl font-black">{stat.value}</p>
              <p className="text-text-secondary text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-fit overflow-hidden rounded-sm border border-slate-200 bg-white shadow-xs">
            {['all', 'published', 'pending', 'draft'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-2.5 text-sm font-semibold capitalize transition-all ${
                  filter === tab ? 'bg-primary text-white' : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search size={15} className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses..."
              className="focus:border-primary w-64 rounded-sm border border-slate-200 bg-white py-2.5 pr-4 pl-10 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Courses Table */}
        <div className="overflow-hidden rounded-md border border-slate-100 bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="px-5 py-4 text-left text-xs font-bold tracking-wider text-slate-500 uppercase">
                    Course
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-bold tracking-wider text-slate-500 uppercase">
                    Students
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-bold tracking-wider text-slate-500 uppercase">
                    Revenue
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-bold tracking-wider text-slate-500 uppercase">
                    Rating
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-bold tracking-wider text-slate-500 uppercase">
                    Status
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-bold tracking-wider text-slate-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((course) => (
                  <tr key={course.id} className="transition-colors hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-sm">
                          <Image
                            src={course.image}
                            alt={course.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="line-clamp-1 font-bold">{course.title}</p>
                          <p className="text-text-secondary text-xs">
                            {course.lessons} lessons • {course.createdAt}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Users size={14} />
                        {course.students.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-primary font-bold">
                        ৳{course.revenue.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      {course.rating > 0 ? (
                        <div className="flex items-center gap-1">
                          <Star size={13} fill="#ffc107" color="#ffc107" />
                          <span className="font-semibold">{course.rating}</span>
                          <span className="text-text-secondary text-xs">({course.reviews})</span>
                        </div>
                      ) : (
                        <span className="text-text-secondary text-xs">No reviews</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-bold capitalize ${statusConfig[course.status]}`}
                      >
                        {course.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="relative flex items-center gap-2">
                        <Link
                          href={`/courses/${course.id}`}
                          className="flex h-8 w-8 items-center justify-center rounded-sm border border-slate-200 text-slate-500 hover:bg-slate-50"
                        >
                          <Eye size={14} />
                        </Link>
                        <Link
                          href={`/dashboard/instructor/courses/${course.id}/edit`}
                          className="flex h-8 w-8 items-center justify-center rounded-sm border border-slate-200 text-slate-500 hover:bg-slate-50"
                        >
                          <Edit size={14} />
                        </Link>
                        <button
                          onClick={() => setOpenMenu(openMenu === course.id ? null : course.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-sm border border-slate-200 text-slate-500 hover:bg-slate-50"
                        >
                          <MoreVertical size={14} />
                        </button>
                        {openMenu === course.id && (
                          <div className="absolute top-9 right-0 z-20 w-36 rounded-sm border border-slate-100 bg-white shadow-md">
                            <button className="flex w-full items-center gap-2 px-4 py-2.5 text-xs font-semibold text-red-500 hover:bg-red-50">
                              <Trash2 size={13} /> Delete Course
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorCoursesPage;
