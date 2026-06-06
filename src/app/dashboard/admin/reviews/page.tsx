'use client';

import { CheckCircle, Star, Trash2, XCircle } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const reviewsData = [
  {
    id: 1,
    student: 'Sumaiya Akter',
    studentImage: 'https://i.pravatar.cc/150?u=sumaiya',
    course: 'Complete Web Development Bootcamp',
    instructor: 'Md. Rafiqul Islam',
    rating: 5,
    text: 'This course completely changed my life! Best instructor on EduNext. Highly recommended for anyone starting web development.',
    date: 'Apr 22, 2025',
    status: 'pending',
  },
  {
    id: 2,
    student: 'Nusrat Jahan',
    studentImage: 'https://i.pravatar.cc/150?u=nusrat',
    course: 'UI/UX Design Masterclass',
    instructor: 'Farhan Hossain',
    rating: 1,
    text: 'Waste of money. The instructor barely explains anything. Very disappointed with this course.',
    date: 'Apr 21, 2025',
    status: 'pending',
  },
  {
    id: 3,
    student: 'Arif Hossain',
    studentImage: 'https://i.pravatar.cc/150?u=arif',
    course: 'React.js Advanced Masterclass',
    instructor: 'Md. Rafiqul Islam',
    rating: 5,
    text: 'The best React course I have ever taken. Every concept is explained clearly with real-world examples.',
    date: 'Apr 20, 2025',
    status: 'pending',
  },
  {
    id: 4,
    student: 'Rakib Ahmed',
    studentImage: 'https://i.pravatar.cc/150?u=rakib2',
    course: 'Digital Marketing',
    instructor: 'Nasrin Sultana',
    rating: 4,
    text: 'Very practical course. I started getting freelancing work after completing just half of the course.',
    date: 'Apr 18, 2025',
    status: 'approved',
  },
  {
    id: 5,
    student: 'Spam User',
    studentImage: 'https://i.pravatar.cc/150?u=spam',
    course: 'Freelancing Masterclass',
    instructor: 'Sabbir Hossain',
    rating: 5,
    text: 'BUY CHEAP COURSES AT WWW.FAKECOURSE.COM!!!',
    date: 'Apr 17, 2025',
    status: 'rejected',
  },
];

const ReviewModerationPage = () => {
  const [filter, setFilter] = useState('pending');

  const filtered = reviewsData.filter((r) => filter === 'all' || r.status === filter);

  const isSpam = (text: string) =>
    text.includes('WWW.') || text.includes('http') || text.toUpperCase() === text;

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto space-y-6">
        <div>
          <h1 className="text-text-primary text-2xl font-black">Review Moderation</h1>
          <p className="text-text-secondary mt-1 text-sm">
            Approve or reject student reviews before they go public.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              label: 'Pending',
              value: reviewsData.filter((r) => r.status === 'pending').length,
              color: 'text-yellow-600',
            },
            {
              label: 'Approved',
              value: reviewsData.filter((r) => r.status === 'approved').length,
              color: 'text-primary',
            },
            {
              label: 'Rejected',
              value: reviewsData.filter((r) => r.status === 'rejected').length,
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

        {/* Reviews */}
        <div className="space-y-4">
          {filtered.map((review) => (
            <div
              key={review.id}
              className={`rounded-md border bg-white p-5 shadow-xs ${review.status === 'pending' ? 'border-yellow-100' : isSpam(review.text) ? 'border-red-100' : 'border-slate-100'}`}
            >
              <div className="flex gap-4">
                <Image
                  src={review.studentImage}
                  alt={review.student}
                  width={44}
                  height={44}
                  className="h-11 w-11 shrink-0 rounded-full border-2 border-emerald-50"
                />
                <div className="flex-1">
                  <div className="mb-1 flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="font-bold">{review.student}</p>
                      <p className="text-text-secondary text-xs">
                        {review.course} • {review.instructor}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {isSpam(review.text) && (
                        <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-500">
                          ⚠️ Spam Detected
                        </span>
                      )}
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-bold capitalize ${review.status === 'pending' ? 'bg-yellow-50 text-yellow-600' : review.status === 'approved' ? 'text-primary bg-emerald-50' : 'bg-red-50 text-red-500'}`}
                      >
                        {review.status}
                      </span>
                    </div>
                  </div>
                  <div className="mb-2 flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        fill={i < review.rating ? '#ffc107' : 'none'}
                        color="#ffc107"
                      />
                    ))}
                    <span className="text-text-secondary ml-2 text-xs">{review.date}</span>
                  </div>
                  <p className="text-text-secondary mb-4 text-sm leading-relaxed">{review.text}</p>
                  {review.status === 'pending' && (
                    <div className="flex gap-2">
                      <button className="bg-primary flex items-center gap-2 rounded-sm px-5 py-2 text-xs font-bold text-white hover:bg-[#2a6159]">
                        <CheckCircle size={13} /> Approve
                      </button>
                      <button className="flex items-center gap-2 rounded-sm border border-red-100 px-5 py-2 text-xs font-bold text-red-400 hover:bg-red-50">
                        <XCircle size={13} /> Reject
                      </button>
                      <button className="flex items-center gap-2 rounded-sm border border-slate-200 px-5 py-2 text-xs font-bold text-slate-500 hover:bg-slate-50">
                        <Trash2 size={13} /> Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewModerationPage;
