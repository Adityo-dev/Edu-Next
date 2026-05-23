'use client';

import { Edit, Star, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const reviewsData = [
  {
    id: 1,
    course: 'Freelancing: From Beginner to Pro',
    instructor: 'Sabbir Hossain',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600',
    rating: 5,
    review:
      'This course completely changed my life! I started freelancing after finishing it and now earn consistently every month. Highly recommended for anyone who wants to start their freelancing journey.',
    date: 'April 12, 2025',
    status: 'published',
  },
  {
    id: 2,
    course: 'Graphic Design with Adobe Illustrator',
    instructor: 'Mithila Rahman',
    image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=600',
    rating: 4,
    review:
      'Great course with very detailed explanations. The projects were practical and helped me build a strong portfolio. Would love more advanced content in future.',
    date: 'March 8, 2025',
    status: 'published',
  },
  {
    id: 3,
    course: 'Data Analytics with Python & Excel',
    instructor: 'Imran Hossain',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=600',
    rating: 5,
    review:
      'Excellent content! Very well structured and easy to follow. The instructor explains complex topics in a very simple way.',
    date: 'February 22, 2025',
    status: 'pending',
  },
];

const pendingReviewCourses = [
  {
    id: 4,
    course: 'Complete Web Development Bootcamp',
    instructor: 'Md. Rafiqul Islam',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=600',
  },
];

const MyReviewsPage = () => {
  const [editId, setEditId] = useState<number | null>(null);
  const [newRating, setNewRating] = useState(5);
  const [newText, setNewText] = useState('');

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-text-primary text-2xl font-black">My Reviews</h1>
          <p className="text-text-secondary mt-1 text-sm">
            Manage the reviews you have left for your courses.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total Reviews', value: reviewsData.length },
            {
              label: 'Published',
              value: reviewsData.filter((r) => r.status === 'published').length,
            },
            { label: 'Pending', value: reviewsData.filter((r) => r.status === 'pending').length },
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

        {/* My Reviews */}
        <div>
          <h2 className="mb-4 text-lg font-bold">Submitted Reviews</h2>
          <div className="space-y-4">
            {reviewsData.map((review) => (
              <div
                key={review.id}
                className="rounded-md border border-slate-100 bg-white p-5 shadow-xs"
              >
                <div className="flex gap-4">
                  <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-sm">
                    <Image src={review.image} alt={review.course} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex items-start justify-between gap-2">
                      <h3 className="text-sm font-bold">{review.course}</h3>
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                          review.status === 'published'
                            ? 'text-primary bg-emerald-50'
                            : 'bg-yellow-50 text-yellow-600'
                        }`}
                      >
                        {review.status === 'published' ? 'Published' : 'Pending Review'}
                      </span>
                    </div>

                    <p className="text-text-secondary mb-2 text-xs">{review.instructor}</p>

                    {/* Stars */}
                    <div className="mb-2 flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          fill={i < review.rating ? '#ffc107' : 'none'}
                          color="#ffc107"
                        />
                      ))}
                      <span className="ml-1 text-xs text-slate-500">{review.date}</span>
                    </div>

                    {editId === review.id ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <button key={i} onClick={() => setNewRating(i + 1)}>
                              <Star
                                size={20}
                                fill={i < newRating ? '#ffc107' : 'none'}
                                color="#ffc107"
                                className="cursor-pointer"
                              />
                            </button>
                          ))}
                        </div>
                        <textarea
                          value={newText}
                          onChange={(e) => setNewText(e.target.value)}
                          rows={3}
                          className="focus:border-primary w-full rounded-sm border border-slate-200 bg-slate-50 p-3 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
                          placeholder="Update your review..."
                        />
                        <div className="flex gap-2">
                          <button
                            className="bg-primary rounded-sm px-4 py-2 text-xs font-bold text-white"
                            onClick={() => setEditId(null)}
                          >
                            Save Changes
                          </button>
                          <button
                            className="rounded-sm border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-500"
                            onClick={() => setEditId(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-text-secondary mb-3 line-clamp-2 text-sm leading-relaxed">
                          {review.review}
                        </p>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditId(review.id);
                              setNewText(review.review);
                              setNewRating(review.rating);
                            }}
                            className="flex items-center gap-1.5 rounded-sm border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                          >
                            <Edit size={12} /> Edit
                          </button>
                          <button className="flex items-center gap-1.5 rounded-sm border border-red-100 px-3 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-50">
                            <Trash2 size={12} /> Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Reviews */}
        {pendingReviewCourses.length > 0 && (
          <div>
            <h2 className="mb-4 text-lg font-bold">Leave a Review</h2>
            {pendingReviewCourses.map((course) => (
              <div
                key={course.id}
                className="rounded-md border border-emerald-100 bg-emerald-50/50 p-5"
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-sm">
                    <Image src={course.image} alt={course.course} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold">{course.course}</p>
                    <p className="text-text-secondary text-xs">{course.instructor}</p>
                  </div>
                  <button className="bg-primary rounded-sm px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#2a6159]">
                    Write Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReviewsPage;
