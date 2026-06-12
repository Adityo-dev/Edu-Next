'use client';

import { CheckCircle, Eye, Search, Trash2, X, XCircle } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

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
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = coursesData.filter((c) => {
    const matchSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || c.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto space-y-6">
        <div>
          <h1 className="text-text-primary text-2xl font-black">Courses Management</h1>
          <p className="text-text-secondary mt-1 text-sm">
            Approve, reject or manage all courses on EduNext.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: 'Total Courses', value: coursesData.length },
            {
              label: 'Published',
              value: coursesData.filter((c) => c.status === 'published').length,
            },
            {
              label: 'Pending Review',
              value: coursesData.filter((c) => c.status === 'pending').length,
            },
            {
              label: 'Total Students',
              value: coursesData.reduce((a, b) => a + b.students, 0).toLocaleString(),
            },
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
            {['all', 'published', 'pending'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-5 py-2.5 text-sm font-semibold capitalize transition-all ${filter === tab ? 'bg-primary text-white' : 'text-slate-500 hover:bg-slate-50'}`}
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

        {/* Table */}
        <div className="dashboard-card-container overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  {[
                    'Course',
                    'Instructor',
                    'Category',
                    'Students',
                    'Price',
                    'Status',
                    'Actions',
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-4 text-left text-xs font-bold tracking-wider text-slate-500 uppercase"
                    >
                      {h}
                    </th>
                  ))}
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
                        <p className="line-clamp-2 max-w-xs text-sm font-bold">{course.title}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm text-slate-600">{course.instructor}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-primary rounded-sm bg-emerald-50 px-2.5 py-1 text-xs font-semibold">
                        {course.category}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-slate-600">{course.students}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-primary font-bold">
                        ৳{course.price.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-bold capitalize ${course.status === 'published' ? 'text-primary bg-emerald-50' : 'bg-yellow-50 text-yellow-600'}`}
                      >
                        {course.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button className="flex h-8 w-8 items-center justify-center rounded-sm border border-slate-200 text-slate-500 transition-all hover:bg-slate-50">
                          <Eye size={14} />
                        </button>
                        {course.status === 'pending' && (
                          <>
                            <button className="text-primary flex h-8 w-8 items-center justify-center rounded-sm border border-emerald-100 transition-all hover:bg-emerald-50">
                              <CheckCircle size={14} />
                            </button>
                            <button className="flex h-8 w-8 items-center justify-center rounded-sm border border-red-100 text-red-400 transition-all hover:bg-red-50">
                              <XCircle size={14} />
                            </button>
                          </>
                        )}
                        {course.status === 'published' && (
                          <button className="flex h-8 w-8 items-center justify-center rounded-sm border border-red-100 text-red-400 transition-all hover:bg-red-50">
                            <Trash2 size={14} />
                          </button>
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

export default CoursesManagementPage;
