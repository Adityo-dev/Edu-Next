import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const recentStudents = [
  {
    name: 'Sumaiya Akter',
    course: 'Web Development',
    date: '2 hours ago',
    image: 'https://i.pravatar.cc/150?u=sumaiya',
  },
  {
    name: 'Nusrat Jahan',
    course: 'Web Development',
    date: 'Yesterday',
    image: 'https://i.pravatar.cc/150?u=nusrat',
  },
  {
    name: 'Arif Hossain',
    course: 'React.js Advanced',
    date: '2 days ago',
    image: 'https://i.pravatar.cc/150?u=arif',
  },
  {
    name: 'Rakib Ahmed',
    course: 'React.js Advanced',
    date: '3 days ago',
    image: 'https://i.pravatar.cc/150?u=rakib2',
  },
];

const RecentStudents = () => {
  return (
    <div className="rounded-md border border-slate-100 bg-white p-6 shadow-xs">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold">New Students</h2>
        <Link
          href="/dashboard/instructor/students"
          className="text-primary text-sm font-semibold hover:underline"
        >
          View All →
        </Link>
      </div>
      <div className="space-y-4">
        {recentStudents.map((student, i) => (
          <div key={i} className="flex items-center gap-3">
            <Image
              src={student.image}
              alt={student.name}
              width={36}
              height={36}
              className="rounded-full border-2 border-emerald-50"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{student.name}</p>
              <p className="text-text-secondary truncate text-xs">{student.course}</p>
            </div>
            <p className="text-text-secondary shrink-0 text-xs">{student.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentStudents;
