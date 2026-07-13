/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Skeleton } from '@/components/ui/skeleton';
import {
  useGetWishlistsQuery,
  useRemoveWishlistMutation,
} from '@/redux/features/wishlist/wishlist.api';
import { Bookmark, Search } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import CourseCard from '../(home)/courses/_components/CourseCard/CourseCard';

const badgeColors: Record<string, string> = {
  Bestseller: '#f59e0b',
  New: '#3b82f6',
  Trending: '#ec4899',
};

const levelColors: Record<string, string> = {
  Beginner: '#22c55e',
  Intermediate: '#eab308',
  Advanced: '#ef4444',
};

export default function WishlistPage() {
  const { data, isLoading } = useGetWishlistsQuery({ limit: 50 });
  const [removeWishlist] = useRemoveWishlistMutation();

  const handleRemove = async (id: string) => {
    try {
      await removeWishlist(id).unwrap();
      toast.success('Removed from wishlist');
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to remove from wishlist');
    }
  };

  const courses =
    data?.data?.wishlists?.map((w) => ({
      id: w.course._id,
      title: w.course.title,
      instructor: w.course.instructor?.fullName || 'Instructor',
      instructorImage: w.course.instructor?.avatar || '',
      image: w.course.thumbnail || '',
      price: w.course.price,
      rating: w.course.rating || 0,
      enrolled: w.course.enrolledCount || 0,
      duration: (w.course as any).totalDuration || '',
      category: w.course.category || '',
      level: w.course.level || '',
      language: w.course.language || '',
      badge: w.course.badge || '',
      certificate: (w.course as any).hasCertificate || false,
    })) || [];

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* ── Hero Section  */}
      <div className="bg-primary mt-20 px-6 py-16 text-center">
        <div className="relative z-10 mx-auto max-w-400 px-6 text-center">
          <h1 className="mb-3 text-4xl font-bold text-white md:text-5xl">
            My <span className="text-yellow-400">Wishlist</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/75">
            All your saved courses in one place. Keep track of what you want to learn next and
            enroll whenever you are ready.
          </p>
        </div>
      </div>

      {/* ── Content Section  */}
      <section className="py-16">
        <div className="mx-auto max-w-400 px-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Saved Courses ({courses.length})</h2>
            <Link
              href="/courses"
              className="text-primary flex items-center gap-2 text-sm font-semibold hover:underline"
            >
              <Search size={16} />
              Discover More
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-sm border border-slate-100 bg-white shadow-xs"
                >
                  <Skeleton className="h-48 w-full rounded-none" />
                  <div className="p-4 pt-5">
                    <div className="mb-3 flex gap-2">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                    <Skeleton className="mb-2 h-5 w-full" />
                    <Skeleton className="mb-4 h-5 w-3/4" />
                    <div className="mb-3 flex items-center gap-2">
                      <Skeleton className="h-6 w-6 rounded-full" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="mb-4 h-4 w-full" />
                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                      <Skeleton className="h-7 w-20" />
                      <Skeleton className="h-6 w-24" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : courses.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  viewMode="grid"
                  badgeColors={badgeColors}
                  levelColors={levelColors}
                  onRemove={handleRemove}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white py-24 text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-50">
                <Bookmark size={32} className="text-slate-400" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-slate-800">Your wishlist is empty</h3>
              <p className="mb-8 max-w-md text-slate-500">
                You haven&apos;t saved any courses yet. Browse our extensive catalog and bookmark
                the ones you want to learn later!
              </p>
              <Link
                href="/courses"
                className="bg-primary rounded-sm px-5 py-3.5 font-semibold text-white shadow-sm transition-all hover:bg-[#2a6159] active:scale-95 sm:px-6 sm:py-4"
              >
                Browse Courses
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
