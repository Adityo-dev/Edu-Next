import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useGetCourseReviewsQuery } from '@/redux/features/reviews/publicReview.api';
import { Skeleton } from '@/components/ui/skeleton';
import { IReview } from '@/types/review.types';

interface RelatedCourse {
  id: string | number;
  title: string;
  image: string;
  instructor: string;
  price: number;
  rating: number;
}

interface CourseData {
  id: string;
  rating?: number;
  relatedCourses: RelatedCourse[];
}

export default function ReviewsAndAbout({ course }: { course: CourseData }) {
  const { data, isLoading } = useGetCourseReviewsQuery(course.id);
  const reviewsData = data?.data;
  const stats = reviewsData?.stats;
  const reviews = reviewsData?.reviews || [];

  const ratingBreakdown = stats?.starPercentage
    ? [
        { stars: 5, percent: stats.starPercentage['5'] || 0 },
        { stars: 4, percent: stats.starPercentage['4'] || 0 },
        { stars: 3, percent: stats.starPercentage['3'] || 0 },
        { stars: 2, percent: stats.starPercentage['2'] || 0 },
        { stars: 1, percent: stats.starPercentage['1'] || 0 },
      ]
    : [
        { stars: 5, percent: 0 },
        { stars: 4, percent: 0 },
        { stars: 3, percent: 0 },
        { stars: 2, percent: 0 },
        { stars: 1, percent: 0 },
      ];

  const averageRating = stats?.averageRating || 0;
  return (
    <>
      {/* Reviews */}
      <div className="relative overflow-hidden rounded-md border border-slate-200 bg-white p-4 shadow-xs">
        <h2 className="mb-6 text-xl font-semibold">Student Reviews</h2>

        {/* Rating Overview */}
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center">
          {/* Big Number */}
          <div className="flex flex-col items-center justify-center rounded-md bg-[#F9FAFB] px-8 py-6 text-center">
            <span className="text-primary text-6xl font-black">{averageRating}</span>
            <div className="my-2 flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < averageRating ? '#ffc107' : 'none'}
                  color="#ffc107"
                />
              ))}
            </div>
            <span className="text-text-secondary text-sm">Course Rating</span>
          </div>

          {/* Breakdown */}
          <div className="flex-1 space-y-2">
            {ratingBreakdown.map((r: { stars: number; percent: number }) => (
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
        {isLoading ? (
          <div className="space-y-6">
            <div className="flex gap-4">
              <Skeleton className="h-11 w-11 shrink-0 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-16 w-full" />
              </div>
            </div>
          </div>
        ) : reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map((review: IReview) => {
              const studentName =
                typeof review.student === 'object' && review.student?.firstName
                  ? `${review.student.firstName} ${review.student.lastName}`
                  : 'Anonymous Student';
              const studentAvatar =
                typeof review.student === 'object' && review.student?.avatar
                  ? review.student.avatar
                  : 'https://i.pravatar.cc/150';
              const formattedDate = new Date(review.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });

              return (
                <div key={review?._id} className="flex gap-4">
                  <Image
                    src={studentAvatar}
                    alt={studentName}
                    width={44}
                    height={44}
                    className="h-11 w-11 shrink-0 rounded-full border-2 border-emerald-50 object-cover"
                  />
                  <div className="flex-1">
                    <div className="mb-1 flex items-center justify-between">
                      <h4 className="font-semibold">{studentName}</h4>
                      <span className="text-text-secondary text-xs">{formattedDate}</span>
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
                    <p className="text-text-secondary text-sm leading-relaxed">{review?.comment}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-text-secondary text-sm">No reviews yet for this course.</p>
        )}
      </div>

      {/* Related Courses */}
      <div className="relative overflow-hidden rounded-md border border-slate-200 bg-white p-4 shadow-xs">
        <h2 className="mb-4 text-xl font-semibold">Related Courses</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {course.relatedCourses.map((c: RelatedCourse) => (
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
