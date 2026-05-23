// ─── 9. Reviews ───────────────────────────────────────────────────────────────
'use client';

import { Star, ThumbsUp } from 'lucide-react';
import Image from 'next/image';

const reviewsData = [
  {
    id: 1,
    student: 'Sumaiya Akter',
    image: 'https://i.pravatar.cc/150?u=sumaiya',
    course: 'Complete Web Development Bootcamp',
    rating: 5,
    text: 'This course completely changed my life! Best instructor on EduNext.',
    date: 'Apr 12, 2025',
    helpful: 12,
  },
  {
    id: 2,
    student: 'Nusrat Jahan',
    image: 'https://i.pravatar.cc/150?u=nusrat',
    course: 'Complete Web Development Bootcamp',
    rating: 4,
    text: 'Great course. Very detailed and practical. Would love more advanced content.',
    date: 'Mar 8, 2025',
    helpful: 8,
  },
  {
    id: 3,
    student: 'Arif Hossain',
    image: 'https://i.pravatar.cc/150?u=arif',
    course: 'React.js Advanced Masterclass',
    rating: 5,
    text: 'The best React course I have ever taken. Every concept is explained clearly.',
    date: 'Feb 22, 2025',
    helpful: 15,
  },
  {
    id: 4,
    student: 'Fatima Begum',
    image: 'https://i.pravatar.cc/150?u=fatima',
    course: 'JavaScript ES6+ Fundamentals',
    rating: 5,
    text: 'Excellent content. I now feel confident writing modern JavaScript.',
    date: 'Jan 10, 2025',
    helpful: 9,
  },
];

const ratingBreakdown = [
  { stars: 5, count: 142, percent: 77 },
  { stars: 4, count: 28, percent: 15 },
  { stars: 3, count: 10, percent: 5 },
  { stars: 2, count: 3, percent: 2 },
  { stars: 1, count: 2, percent: 1 },
];

const InstructorReviewsPage = () => {
  const avgRating = (
    ratingBreakdown.reduce((a, b) => a + b.stars * b.count, 0) /
    ratingBreakdown.reduce((a, b) => a + b.count, 0)
  ).toFixed(1);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto space-y-6">
        <div>
          <h1 className="text-text-primary text-2xl font-black">Reviews</h1>
          <p className="text-text-secondary mt-1 text-sm">See what your students are saying.</p>
        </div>

        {/* Rating Overview */}
        <div className="rounded-md border border-slate-100 bg-white p-6 shadow-xs">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex flex-col items-center justify-center rounded-md bg-[#F9FAFB] px-10 py-6 text-center">
              <span className="text-primary text-6xl font-black">{avgRating}</span>
              <div className="my-2 flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill="#ffc107" color="#ffc107" />
                ))}
              </div>
              <span className="text-text-secondary text-sm">Course Rating</span>
            </div>
            <div className="flex-1 space-y-2">
              {ratingBreakdown.map((r) => (
                <div key={r.stars} className="flex items-center gap-3">
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="bg-warning h-full rounded-full"
                      style={{ width: `${r.percent}%` }}
                    />
                  </div>
                  <div className="flex shrink-0 items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={11}
                        fill={i < r.stars ? '#ffc107' : 'none'}
                        color="#ffc107"
                      />
                    ))}
                  </div>
                  <span className="text-text-secondary w-12 text-right text-xs">{r.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviewsData.map((review) => (
            <div
              key={review.id}
              className="rounded-md border border-slate-100 bg-white p-5 shadow-xs"
            >
              <div className="flex gap-4">
                <Image
                  src={review.image}
                  alt={review.student}
                  width={44}
                  height={44}
                  className="h-11 w-11 shrink-0 rounded-full border-2 border-emerald-50"
                />
                <div className="flex-1">
                  <div className="mb-1 flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">{review.student}</h4>
                      <p className="text-text-secondary text-xs">{review.course}</p>
                    </div>
                    <span className="text-text-secondary text-xs">{review.date}</span>
                  </div>
                  <div className="mb-2 flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        fill={i < review.rating ? '#ffc107' : 'none'}
                        color="#ffc107"
                      />
                    ))}
                  </div>
                  <p className="text-text-secondary mb-3 text-sm leading-relaxed">{review.text}</p>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <ThumbsUp size={12} />
                    <span>{review.helpful} found this helpful</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructorReviewsPage;
