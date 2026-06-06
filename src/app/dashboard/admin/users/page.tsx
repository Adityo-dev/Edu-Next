'use client';

import { Ban, Search, Trash2, UserCheck, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const usersData = [
  {
    id: 1,
    name: 'Sumaiya Akter',
    email: 'sumaiya@example.com',
    role: 'student',
    status: 'active',
    joinDate: 'Jan 15, 2025',
    courses: 6,
    image: 'https://i.pravatar.cc/150?u=sumaiya',
  },
  {
    id: 2,
    name: 'Md. Rafiqul Islam',
    email: 'rafiq@example.com',
    role: 'instructor',
    status: 'active',
    joinDate: 'Oct 5, 2022',
    courses: 8,
    image: 'https://i.pravatar.cc/150?u=rafiq',
  },
  {
    id: 3,
    name: 'Nusrat Jahan',
    email: 'nusrat@example.com',
    role: 'student',
    status: 'active',
    joinDate: 'Feb 2, 2025',
    courses: 3,
    image: 'https://i.pravatar.cc/150?u=nusrat',
  },
  {
    id: 4,
    name: 'Farhan Hossain',
    email: 'farhan@example.com',
    role: 'instructor',
    status: 'suspended',
    joinDate: 'Jan 10, 2023',
    courses: 4,
    image: 'https://i.pravatar.cc/150?u=farhan',
  },
  {
    id: 5,
    name: 'Arif Hossain',
    email: 'arif@example.com',
    role: 'student',
    status: 'active',
    joinDate: 'Mar 1, 2025',
    courses: 2,
    image: 'https://i.pravatar.cc/150?u=arif',
  },
  {
    id: 6,
    name: 'Nasrin Sultana',
    email: 'nasrin@example.com',
    role: 'instructor',
    status: 'active',
    joinDate: 'Jun 15, 2023',
    courses: 3,
    image: 'https://i.pravatar.cc/150?u=nasrin',
  },
  {
    id: 7,
    name: 'Rakib Ahmed',
    email: 'rakib@example.com',
    role: 'student',
    status: 'suspended',
    joinDate: 'Apr 10, 2025',
    courses: 1,
    image: 'https://i.pravatar.cc/150?u=rakib2',
  },
];

const UsersManagementPage = () => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = usersData.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    const matchStatus = statusFilter === 'all' || u.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto space-y-6">
        <div>
          <h1 className="text-text-primary text-2xl font-black">Users Management</h1>
          <p className="text-text-secondary mt-1 text-sm">
            Manage all students and instructors on EduNext.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: 'Total Users', value: usersData.length },
            { label: 'Students', value: usersData.filter((u) => u.role === 'student').length },
            {
              label: 'Instructors',
              value: usersData.filter((u) => u.role === 'instructor').length,
            },
            { label: 'Suspended', value: usersData.filter((u) => u.status === 'suspended').length },
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
          <div className="flex flex-wrap gap-2">
            <div className="flex overflow-hidden rounded-sm border border-slate-200 bg-white shadow-xs">
              {['all', 'student', 'instructor'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setRoleFilter(tab)}
                  className={`px-4 py-2.5 text-sm font-semibold capitalize transition-all ${roleFilter === tab ? 'bg-primary text-white' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex overflow-hidden rounded-sm border border-slate-200 bg-white shadow-xs">
              {['all', 'active', 'suspended'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setStatusFilter(tab)}
                  className={`px-4 py-2.5 text-sm font-semibold capitalize transition-all ${statusFilter === tab ? 'bg-primary text-white' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="relative">
            <Search size={15} className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users..."
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
                  {['User', 'Role', 'Status', 'Courses', 'Join Date', 'Actions'].map((h) => (
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
                {filtered.map((user) => (
                  <tr key={user.id} className="transition-colors hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Image
                          src={user.image}
                          alt={user.name}
                          width={36}
                          height={36}
                          className="rounded-full border-2 border-emerald-50"
                        />
                        <div>
                          <p className="font-bold">{user.name}</p>
                          <p className="text-text-secondary text-xs">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-bold capitalize ${user.role === 'instructor' ? 'bg-blue-50 text-blue-600' : 'text-primary bg-emerald-50'}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${user.status === 'active' ? 'text-primary bg-emerald-50' : 'bg-red-50 text-red-500'}`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${user.status === 'active' ? 'bg-primary' : 'bg-red-500'}`}
                        />
                        {user.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-slate-600">{user.courses}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-text-secondary text-xs">{user.joinDate}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          className={`flex h-8 w-8 items-center justify-center rounded-sm border transition-all ${user.status === 'active' ? 'border-orange-100 text-orange-400 hover:bg-orange-50' : 'text-primary border-emerald-100 hover:bg-emerald-50'}`}
                        >
                          {user.status === 'active' ? <Ban size={14} /> : <UserCheck size={14} />}
                        </button>
                        <button className="flex h-8 w-8 items-center justify-center rounded-sm border border-red-100 text-red-400 transition-all hover:bg-red-50">
                          <Trash2 size={14} />
                        </button>
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

export default UsersManagementPage;
