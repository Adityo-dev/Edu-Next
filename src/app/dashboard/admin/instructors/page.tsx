'use client';

import { CheckCircle, Eye, Users, XCircle } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const instructorsData = [
  {
    id: 1,
    name: 'Tanvir Ahmed',
    email: 'tanvir@example.com',
    expertise: 'Mobile App Development',
    experience: '5 years',
    courses: 3,
    status: 'pending',
    submittedDate: 'Apr 20, 2025',
    image: 'https://i.pravatar.cc/150?u=tanvir',
    bio: 'Experienced mobile developer with expertise in Flutter and React Native.',
    youtube: 'https://youtube.com/@tanvir',
  },
  {
    id: 2,
    name: 'Mithila Rahman',
    email: 'mithila@example.com',
    expertise: 'Graphic Design',
    experience: '4 years',
    courses: 2,
    status: 'pending',
    submittedDate: 'Apr 18, 2025',
    image: 'https://i.pravatar.cc/150?u=mithila',
    bio: 'Professional graphic designer with portfolio spanning 100+ projects.',
    youtube: '',
  },
  {
    id: 3,
    name: 'Md. Rafiqul Islam',
    email: 'rafiq@example.com',
    expertise: 'Web Development',
    experience: '8 years',
    courses: 8,
    status: 'approved',
    submittedDate: 'Oct 5, 2022',
    image: 'https://i.pravatar.cc/150?u=rafiq',
    bio: 'Senior web developer teaching since 2022.',
    youtube: 'https://youtube.com/@rafiq',
  },
  {
    id: 4,
    name: 'Farhan Hossain',
    email: 'farhan@example.com',
    expertise: 'UI/UX Design',
    experience: '6 years',
    courses: 4,
    status: 'approved',
    submittedDate: 'Jan 10, 2023',
    image: 'https://i.pravatar.cc/150?u=farhan',
    bio: 'UI/UX designer with expertise in Figma and design systems.',
    youtube: '',
  },
  {
    id: 5,
    name: 'Karim Molla',
    email: 'karim@example.com',
    expertise: 'Cybersecurity',
    experience: '7 years',
    courses: 0,
    status: 'rejected',
    submittedDate: 'Apr 10, 2025',
    image: 'https://i.pravatar.cc/150?u=karim',
    bio: 'Cybersecurity expert with CEH certification.',
    youtube: '',
  },
];

const statusConfig: Record<string, string> = {
  pending: 'bg-yellow-50 text-yellow-600',
  approved: 'bg-emerald-50 text-primary',
  rejected: 'bg-red-50 text-red-500',
};

const InstructorVerificationPage = () => {
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<(typeof instructorsData)[0] | null>(null);

  const filtered = instructorsData.filter((i) => filter === 'all' || i.status === filter);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto space-y-6">
        <div>
          <h1 className="text-text-primary text-2xl font-black">Instructor Verification</h1>
          <p className="text-text-secondary mt-1 text-sm">
            Review and approve instructor applications.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              label: 'Pending',
              value: instructorsData.filter((i) => i.status === 'pending').length,
              color: 'text-yellow-600',
            },
            {
              label: 'Approved',
              value: instructorsData.filter((i) => i.status === 'approved').length,
              color: 'text-primary',
            },
            {
              label: 'Rejected',
              value: instructorsData.filter((i) => i.status === 'rejected').length,
              color: 'text-red-500',
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="rounded-md border border-slate-100 bg-white p-5 text-center shadow-xs"
            >
              <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
              <p className="text-text-secondary text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex w-fit overflow-hidden rounded-sm border border-slate-200 bg-white shadow-xs">
          {['all', 'pending', 'approved', 'rejected'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-5 py-2.5 text-sm font-semibold capitalize transition-all ${filter === tab ? 'bg-primary text-white' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* List */}
          <div className="space-y-3 lg:col-span-2">
            {filtered.map((instructor) => (
              <div
                key={instructor.id}
                className={`cursor-pointer rounded-md border bg-white p-5 shadow-xs transition-all hover:border-emerald-100 ${selected?.id === instructor.id ? 'border-primary' : 'border-slate-100'}`}
                onClick={() => setSelected(instructor)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Image
                      src={instructor.image}
                      alt={instructor.name}
                      width={48}
                      height={48}
                      className="rounded-full border-2 border-emerald-50"
                    />
                    <div>
                      <h3 className="font-bold">{instructor.name}</h3>
                      <p className="text-text-secondary text-xs">{instructor.email}</p>
                      <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                        <span className="text-primary rounded-sm bg-emerald-50 px-2 py-0.5 font-semibold">
                          {instructor.expertise}
                        </span>
                        <span>{instructor.experience} exp.</span>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold capitalize ${statusConfig[instructor.status]}`}
                  >
                    {instructor.status}
                  </span>
                </div>

                {instructor.status === 'pending' && (
                  <div className="mt-4 flex gap-2">
                    <button className="bg-primary flex flex-1 items-center justify-center gap-2 rounded-sm py-2.5 text-xs font-bold text-white hover:bg-[#2a6159]">
                      <CheckCircle size={13} /> Approve
                    </button>
                    <button className="flex flex-1 items-center justify-center gap-2 rounded-sm border border-red-100 py-2.5 text-xs font-bold text-red-400 hover:bg-red-50">
                      <XCircle size={13} /> Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Detail Panel */}
          <div className="rounded-md border border-slate-100 bg-white p-6 shadow-xs lg:sticky lg:top-6 lg:self-start">
            {selected ? (
              <div>
                <div className="mb-5 flex flex-col items-center text-center">
                  <Image
                    src={selected.image}
                    alt={selected.name}
                    width={64}
                    height={64}
                    className="mb-3 rounded-full border-4 border-emerald-50 shadow-sm"
                  />
                  <h3 className="text-lg font-black">{selected.name}</h3>
                  <p className="text-text-secondary text-xs">{selected.email}</p>
                  <span
                    className={`mt-2 rounded-full px-3 py-1 text-xs font-bold capitalize ${statusConfig[selected.status]}`}
                  >
                    {selected.status}
                  </span>
                </div>
                <div className="space-y-3 text-sm">
                  {[
                    { label: 'Expertise', value: selected.expertise },
                    { label: 'Experience', value: selected.experience },
                    { label: 'Applied', value: selected.submittedDate },
                    { label: 'Courses Planned', value: selected.courses },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between border-b border-slate-50 pb-2">
                      <span className="text-text-secondary">{item.label}</span>
                      <span className="font-semibold">{item.value}</span>
                    </div>
                  ))}
                  <div>
                    <p className="text-text-secondary mb-1 text-xs">Bio</p>
                    <p className="text-sm leading-relaxed text-slate-600">{selected.bio}</p>
                  </div>
                  {selected.youtube && (
                    <a
                      href={selected.youtube}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary flex items-center gap-1.5 text-xs font-semibold hover:underline"
                    >
                      <Eye size={12} /> View YouTube Channel
                    </a>
                  )}
                </div>
                {selected.status === 'pending' && (
                  <div className="mt-5 flex gap-2">
                    <button className="bg-primary flex-1 rounded-sm py-3 text-sm font-bold text-white hover:bg-[#2a6159]">
                      Approve
                    </button>
                    <button className="flex-1 rounded-sm border border-red-100 py-3 text-sm font-bold text-red-400 hover:bg-red-50">
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Users size={36} className="mb-3 text-slate-200" />
                <p className="text-sm text-slate-400">Select an instructor to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorVerificationPage;
