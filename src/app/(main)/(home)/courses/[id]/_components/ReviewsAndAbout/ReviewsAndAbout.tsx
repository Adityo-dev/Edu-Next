/* eslint-disable @typescript-eslint/no-explicit-any */
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ReviewsAndAbout({
  course,
  ratingBreakdown,
}: {
  course: any;
  ratingBreakdown: any[];
}) {
  return (
    <>
      {/* Reviews */}
      <div className="relative overflow-hidden rounded-md border border-slate-200 bg-white p-4 shadow-xs">
        <h2 className="mb-6 text-xl font-semibold">Student Reviews</h2>

        {/* Rating Overview */}
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center">
          {/* Big Number */}
          <div className="flex flex-col items-center justify-center rounded-md bg-[#F9FAFB] px-8 py-6 text-center">
            <span className="text-primary text-6xl font-black">{course.rating}</span>
            <div className="my-2 flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} fill={i < 5 ? '#ffc107' : 'none'} color="#ffc107" />
              ))}
            </div>
            <span className="text-text-secondary text-sm">Course Rating</span>
          </div>

          {/* Breakdown */}
          <div className="flex-1 space-y-2">
            {ratingBreakdown.map((r: any) => (
              <div key={r.stars} className="flex items-center gap-3">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="bg-warning h-full rounded-full transition-all"
                    style={{ width: `${r.percent}%` }}
                  />
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={11}
                      fill={i < r.stars ? '#ffc107' : 'none'}
                      color="#ffc107"
                    />
                  ))}
                </div>
                <span className="text-text-secondary w-8 text-right text-xs">{r.percent}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-border mb-6 h-px w-full" />

        {/* Review Cards */}
        <div className="space-y-6">
          {course.reviews.map((review: any) => (
            <div key={review?.id} className="flex gap-4">
              <Image
                src={review?.image}
                alt={review?.name}
                width={44}
                height={44}
                className="h-11 w-11 shrink-0 rounded-full border-2 border-emerald-50"
              />
              <div className="flex-1">
                <div className="mb-1 flex items-center justify-between">
                  <h4 className="font-semibold">{review?.name}</h4>
                  <span className="text-text-secondary text-xs">{review?.date}</span>
                </div>
                <div className="mb-2 flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      fill={i < review?.rating ? '#ffc107' : 'none'}
                      color="#ffc107"
                    />
                  ))}
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">{review?.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Related Courses */}
      <div className="relative overflow-hidden rounded-md border border-slate-200 bg-white p-4 shadow-xs">
        <h2 className="mb-4 text-xl font-semibold">Related Courses</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {course.relatedCourses.map((c: any) => (
            <Link
              href={`/courses/${c.id}`}
              key={c.id}
              className="group overflow-hidden rounded-md border border-slate-100 transition-all duration-300 hover:border-emerald-100 hover:shadow-sm"
            >
              <div className="relative h-36 overflow-hidden">
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h4 className="group-hover:text-primary mb-1 line-clamp-2 text-sm font-bold transition-colors">
                  {c.title}
                </h4>
                <p className="text-text-secondary mb-2 text-xs">{c.instructor}</p>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-bold">৳{c.price.toLocaleString()}</span>
                  <span className="flex items-center gap-1 text-xs text-slate-500">
                    <Star size={11} fill="#ffc107" color="#ffc107" />
                    {c.rating}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
