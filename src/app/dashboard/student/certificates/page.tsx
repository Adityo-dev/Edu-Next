'use client';

import { Award, Download, ExternalLink, Search } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const certificatesData = [
  {
    id: 1,
    course: 'Freelancing: From Beginner to Pro',
    instructor: 'Sabbir Hossain',
    completedDate: 'April 10, 2025',
    category: 'Freelancing',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600',
    certificateId: 'EDN-2025-001',
  },
  {
    id: 2,
    course: 'Graphic Design with Adobe Illustrator',
    instructor: 'Mithila Rahman',
    completedDate: 'March 5, 2025',
    category: 'Graphic Design',
    image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=600',
    certificateId: 'EDN-2025-002',
  },
  {
    id: 3,
    course: 'Data Analytics with Python & Excel',
    instructor: 'Imran Hossain',
    completedDate: 'February 20, 2025',
    category: 'Data Analytics',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=600',
    certificateId: 'EDN-2025-003',
  },
];

const inProgressCourses = [
  { title: 'Complete Web Development Bootcamp', progress: 72 },
  { title: 'UI/UX Design Masterclass', progress: 45 },
  { title: 'Digital Marketing from Zero to Hero', progress: 20 },
];

const CertificatesPage = () => {
  const [search, setSearch] = useState('');

  const filtered = certificatesData.filter((c) =>
    c.course.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-text-primary text-2xl font-black">My Certificates</h1>
            <p className="text-text-secondary mt-1 text-sm">
              Download and share your earned certificates.
            </p>
          </div>
          <div className="relative">
            <Search size={15} className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search certificates..."
              className="focus:border-primary w-64 rounded-sm border border-slate-200 bg-white py-2.5 pr-4 pl-10 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div className="rounded-md border border-slate-100 bg-white p-5 text-center shadow-xs">
            <p className="text-primary text-3xl font-black">{certificatesData.length}</p>
            <p className="text-text-secondary text-sm">Certificates Earned</p>
          </div>
          <div className="rounded-md border border-slate-100 bg-white p-5 text-center shadow-xs">
            <p className="text-3xl font-black text-blue-500">{inProgressCourses.length}</p>
            <p className="text-text-secondary text-sm">In Progress</p>
          </div>
          <div className="col-span-2 rounded-md border border-slate-100 bg-white p-5 text-center shadow-xs sm:col-span-1">
            <p className="text-3xl font-black text-yellow-500">50%</p>
            <p className="text-text-secondary text-sm">Overall Completion</p>
          </div>
        </div>

        {/* Earned Certificates */}
        <div>
          <h2 className="mb-4 text-lg font-bold">Earned Certificates</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((cert) => (
              <div
                key={cert.id}
                className="group overflow-hidden rounded-md border border-slate-100 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-emerald-100 hover:shadow-md"
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={cert.image}
                    alt={cert.course}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <div className="rounded-full border-4 border-yellow-400 bg-yellow-400/20 p-3">
                      <Award size={32} className="text-yellow-400" />
                    </div>
                  </div>
                  <span className="bg-primary absolute top-3 left-3 rounded-sm px-2.5 py-1 text-xs font-bold text-white">
                    {cert.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="mb-1 line-clamp-2 text-sm leading-snug font-bold">
                    {cert.course}
                  </h3>
                  <p className="text-text-secondary mb-1 text-xs">{cert.instructor}</p>
                  <p className="text-text-secondary mb-4 text-xs">
                    Completed: {cert.completedDate}
                  </p>

                  <div className="mb-4 rounded-sm bg-slate-50 px-3 py-2">
                    <p className="text-text-secondary text-xs">Certificate ID</p>
                    <p className="text-primary text-xs font-bold">{cert.certificateId}</p>
                  </div>

                  <div className="flex gap-2">
                    <button className="bg-primary flex flex-1 items-center justify-center gap-1.5 rounded-sm py-2.5 text-xs font-bold text-white transition-all hover:bg-[#2a6159] active:scale-95">
                      <Download size={13} />
                      Download PDF
                    </button>
                    <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-slate-200 text-slate-500 transition-all hover:bg-slate-50">
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* In Progress */}
        <div>
          <h2 className="mb-4 text-lg font-bold">Certificates in Progress</h2>
          <div className="space-y-3">
            {inProgressCourses.map((course, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-md border border-slate-100 bg-white p-5 shadow-xs"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-slate-200">
                  <Award size={18} className="text-slate-300" />
                </div>
                <div className="flex-1">
                  <p className="mb-2 text-sm font-bold">{course.title}</p>
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="bg-primary h-full rounded-full"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <span className="text-primary text-xs font-bold">{course.progress}%</span>
                  </div>
                </div>
                <span className="text-text-secondary text-xs">{100 - course.progress}% left</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificatesPage;
