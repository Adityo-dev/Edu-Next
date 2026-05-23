'use client';

import { Download, Mail, Search, Star, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

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
  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');

  const courses = ['all', ...Array.from(new Set(studentsData.map((s) => s.course)))];

  const filtered = studentsData.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    const matchCourse = courseFilter === 'all' || s.course === courseFilter;
    return matchSearch && matchCourse;
  });

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-text-primary text-2xl font-black">Students</h1>
            <p className="text-text-secondary mt-1 text-sm">
              View and manage students enrolled in your courses.
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-sm border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 shadow-xs hover:bg-slate-50">
            <Download size={15} />
            Export CSV
          </button>
        </div>

        {/* Stats */}
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
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="focus:border-primary cursor-pointer rounded-sm border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium shadow-xs outline-none"
          >
            {courses.map((c) => (
              <option key={c} value={c}>
                {c === 'all' ? 'All Courses' : c}
              </option>
            ))}
          </select>
          <div className="relative">
            <Search size={15} className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search students..."
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
        <div className="overflow-hidden rounded-md border border-slate-100 bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="px-5 py-4 text-left text-xs font-bold tracking-wider text-slate-500 uppercase">
                    Student
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-bold tracking-wider text-slate-500 uppercase">
                    Course
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-bold tracking-wider text-slate-500 uppercase">
                    Progress
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-bold tracking-wider text-slate-500 uppercase">
                    Rating
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-bold tracking-wider text-slate-500 uppercase">
                    Last Active
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-bold tracking-wider text-slate-500 uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((student) => (
                  <tr key={student.id} className="transition-colors hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Image
                          src={student.image}
                          alt={student.name}
                          width={36}
                          height={36}
                          className="rounded-full border-2 border-emerald-50"
                        />
                        <div>
                          <p className="font-bold">{student.name}</p>
                          <p className="text-text-secondary text-xs">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="line-clamp-1 max-w-xs text-xs text-slate-600">
                        {student.course}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={`h-full rounded-full ${student.progress === 100 ? 'bg-yellow-400' : 'bg-primary'}`}
                            style={{ width: `${student.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-600">
                          {student.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      {student.rating > 0 ? (
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={12}
                              fill={i < student.rating ? '#ffc107' : 'none'}
                              color="#ffc107"
                            />
                          ))}
                        </div>
                      ) : (
                        <span className="text-text-secondary text-xs">No review</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-text-secondary text-xs">{student.lastActive}</span>
                    </td>
                    <td className="px-5 py-4">
                      <button className="flex items-center gap-1.5 rounded-sm border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50">
                        <Mail size={12} /> Message
                      </button>
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

export default InstructorStudentsPage;
