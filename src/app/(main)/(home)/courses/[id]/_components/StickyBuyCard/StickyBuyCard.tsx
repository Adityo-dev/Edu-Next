/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import { Separator } from '@/components/ui/separator';
import { useModal } from '@/context/ModalContext';
import { useIsAuthenticated } from '@/redux/features/auth/authSlice';
import { useInitiatePaymentMutation } from '@/redux/features/payment/paymentApi';
import {
  useAddWishlistMutation,
  useGetWishlistsQuery,
  useRemoveWishlistMutation,
} from '@/redux/features/wishlist/wishlist.api';
import { useAppSelector } from '@/redux/hooks';
import {
  Award,
  BookOpen,
  CheckCircle,
  Globe,
  Heart,
  MonitorPlay,
  PlayCircle,
  Share2,
  Video,
  Wifi,
} from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';

export default function StickyBuyCard({
  course,
  totalLessons,
}: {
  course: any;
  totalLessons: number;
}) {
  const { data: wishlistData } = useGetWishlistsQuery({ limit: 50 });
  const [addWishlist, { isLoading: isAdding }] = useAddWishlistMutation();
  const [removeWishlist, { isLoading: isRemoving }] = useRemoveWishlistMutation();

  const isWishlisted =
    wishlistData?.data?.wishlists?.some((w) => w.course?._id === course.id) || false;

  const isAuthenticated = useAppSelector(useIsAuthenticated);
  const { openModal } = useModal();
  const [initiatePayment, { isLoading: isInitiatingPayment }] = useInitiatePaymentMutation();

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      openModal({ view: 'LOGIN_REQUIRED' });
      return;
    }

    try {
      const res = await initiatePayment(course.id).unwrap();
      if (res.success && res.data?.paymentUrl) {
        window.location.href = res.data.paymentUrl;
      } else {
        toast.error('Failed to initiate payment');
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Something went wrong while initiating payment');
    }
  };

  const handleWishlistToggle = async () => {
    if (!isAuthenticated) {
      openModal({ view: 'LOGIN_REQUIRED' });
      return;
    }

    try {
      if (isWishlisted) {
        await removeWishlist(course.id).unwrap();
        toast.success('Removed from wishlist');
      } else {
        await addWishlist({ courseId: course.id }).unwrap();
        toast.success('Added to wishlist');
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Something went wrong');
    }
  };

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';

    if (navigator.share) {
      try {
        await navigator.share({
          title: course.title,
          text: `Check out this course: ${course.title}`,
          url: url,
        });
        return;
      } catch (error: any) {
        if (error.name === 'AbortError') return;
        console.log('Native sharing failed, falling back to clipboard...');
      }
    }

    // Fallback if navigator.share doesn't exist or fails
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    } catch {
      toast.error('Failed to copy link');
    }
  };

  return (
    <aside className="w-full lg:sticky lg:top-24 lg:w-96 lg:shrink-0">
      <div className="relative overflow-hidden rounded-md border border-slate-200 bg-white p-4 shadow-xs">
        {/* Course Thumbnail */}
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="overflow-hidden rounded-sm object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <div className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-white/90 shadow-lg transition-all hover:scale-105">
              <PlayCircle size={28} className="text-primary ml-0.5" />
            </div>
          </div>
          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-sm bg-black/70 px-3 py-1 text-xs font-medium text-white">
            Preview this course
          </span>
        </div>

        {/* Price & Actions */}
        <div className="pt-4">
          {/* Price */}
          <div className="mb-5">
            <span className="text-primary text-3xl font-black">
              ৳{course.price.toLocaleString()}
            </span>
          </div>

          {/* Enroll Button */}
          <DynamicActionButton
            label="Enroll Now"
            className="w-full"
            onClick={handleEnroll}
            isLoading={isInitiatingPayment}
            disabled={isInitiatingPayment}
          />

          {/* Wishlist + Share */}
          <div className="mt-3 mb-6 flex gap-4">
            <button
              onClick={handleWishlistToggle}
              disabled={isAdding || isRemoving}
              className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-sm border py-3 text-sm font-semibold transition-all active:scale-95 ${
                isWishlisted
                  ? 'border-red-200 bg-red-50 text-red-500'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              } disabled:cursor-not-allowed disabled:opacity-70`}
            >
              <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
              {isWishlisted ? 'Wishlisted' : 'Wishlist'}
            </button>
            <button
              onClick={handleShare}
              className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-sm border border-slate-200 py-3 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-50 active:scale-95"
            >
              <Share2 size={16} />
              Share
            </button>
          </div>

          <Separator className="mb-5" />

          {/* Course Includes */}
          <h4 className="mb-4 text-sm font-semibold">This Course Includes:</h4>
          <ul className="space-y-3">
            {[
              { icon: <MonitorPlay size={16} />, text: `${course.duration} on-demand video` },
              { icon: <BookOpen size={16} />, text: `${totalLessons} lessons` },
              { icon: <Video size={16} />, text: 'Live sessions via Zoom' },
              { icon: <Wifi size={16} />, text: 'Full lifetime access' },
              { icon: <Globe size={16} />, text: `Language: ${course.language}` },
              { icon: <Award size={16} />, text: 'Certificate of completion' },
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-slate-600">
                <span className="text-primary">{item.icon}</span>
                {item.text}
              </li>
            ))}
          </ul>

          <Separator className="my-4" />

          {/* Money Back */}
          <div className="flex items-start gap-3 rounded-sm bg-emerald-50 p-4">
            <CheckCircle size={18} className="text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-primary text-sm font-semibold">7-Day Money-Back Guarantee</p>
              <p className="text-text-secondary mt-0.5 text-xs leading-relaxed">
                Not satisfied? Get a full refund within 7 days — no questions asked.
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
