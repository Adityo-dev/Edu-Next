'use client';

import CustomPagination from '@/components/dashboard/CustomPagination/CustomPagination';
import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';
import ReviewsListSkeleton from '@/components/dashboard/Skeletons/ReviewsListSkeleton';
import RenderStars from '@/components/shared/RenderStars/RenderStars';
import {
  useGetStudentSubmittedReviewsQuery,
  useUpdateStudentReviewMutation,
} from '@/redux/features/reviews/studentReview.api';
import { FormatDateTime } from '@/utils/formatDateTime';
import { MessageSquareOff } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import EmptyState from '@/components/dashboard/EmptyState/EmptyState';
import ErrorState from '@/components/dashboard/ErrorState/ErrorState';
import DynamicActionList from '@/components/dashboard/DynamicActionList/DynamicActionList';

const ReviewsList = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const [editId, setEditId] = useState<string | null>(null);
  const [newRating, setNewRating] = useState(5);
  const [newText, setNewText] = useState('');

  const {
    data: reviewsData,
    isLoading: isReviewsLoading,
    isFetching,
    isError,
    refetch,
  } = useGetStudentSubmittedReviewsQuery({
    page,
    limit: 10,
  });
  const [updateReview, { isLoading: isUpdating }] = useUpdateStudentReviewMutation();

  const handleUpdate = async () => {
    if (editId) {
      const res = await updateReview({ reviewId: editId, rating: newRating, comment: newText });
      if (res.error) {
        toast.error('Failed to update review. Please try again.');
      } else {
        toast.success('Review updated successfully!');
        setEditId(null);
      }
    }
  };

  const reviews = useMemo(() => reviewsData?.data || [], [reviewsData?.data]);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Submitted Reviews</h2>
        {isFetching && !isReviewsLoading && (
          <span className="animate-pulse text-xs font-medium text-slate-500">Updating...</span>
        )}
      </div>

      {isError ? (
        <ErrorState
          title="Failed to Load Reviews"
          message="We couldn't fetch your submitted reviews right now. Please try again."
          onRetry={refetch}
        />
      ) : isReviewsLoading ? (
        <ReviewsListSkeleton />
      ) : reviews.length === 0 ? (
        <EmptyState
          icon={MessageSquareOff}
          title="Share Your Learning Experience"
          description="You haven't submitted any course reviews yet. Your feedback is valuable—it helps instructors improve and guides other students in choosing the right courses. Enroll in a course, complete it, and let your voice be heard!"
          actionText="Explore Courses"
          actionHref="/courses"
        />
      ) : (
        <>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review?._id} className="dashboard-card-container p-3">
                <div className="grid grid-cols-[5rem_1fr] gap-x-4 gap-y-1">
                  {/* Image */}
                  <div className="relative row-span-1 h-12 w-20 shrink-0 overflow-hidden rounded-sm sm:row-span-2">
                    <Image
                      src={review?.course?.thumbnail}
                      alt={review?.course?.title}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Title & Badge */}
                  <div className="col-start-2 min-w-0 pt-0.5">
                    <div className="mb-1 flex flex-col items-start gap-1 sm:flex-row sm:justify-between sm:gap-2">
                      <h3 className="text-sm font-medium">{review?.course?.title}</h3>
                      <DynamicBadge
                        text={review?.status === 'published' ? 'Published' : 'Pending Review'}
                        color={review?.status === 'published' ? '#34796f' : '#ca8a04'}
                      />
                    </div>
                  </div>

                  {/* Body Content (Full width on mobile, Right column on desktop) */}
                  <div className="col-span-2 mt-2 min-w-0 sm:col-span-1 sm:col-start-2 sm:mt-0">
                    {/* Stars & Dates */}
                    <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                      <div className="flex items-center gap-0.5">
                        <RenderStars rating={review?.rating || 0} />
                      </div>
                      <div className="text-text-secondary flex flex-col gap-1 text-[11px] font-medium sm:flex-row sm:items-center sm:gap-2 sm:text-xs">
                        <span className="hidden text-slate-300 sm:inline">•</span>
                        <span>Created: {FormatDateTime(review?.createdAt)}</span>
                        {review?.updatedAt && review?.updatedAt !== review?.createdAt && (
                          <>
                            <span className="hidden text-slate-300 sm:inline">•</span>
                            <span className="text-slate-500 italic">
                              Updated: {FormatDateTime(review?.updatedAt)}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Edit Form or Review Text */}
                    {editId === review?._id ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <RenderStars rating={newRating} size={20} />
                          </div>
                          <input
                            type="number"
                            min="1"
                            max="5"
                            step="0.5"
                            value={newRating}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              if (val >= 1 && val <= 5) setNewRating(val);
                            }}
                            className="w-16 rounded-sm border border-slate-200 px-2 py-1 text-xs outline-none focus:border-emerald-500"
                          />
                        </div>
                        <textarea
                          value={newText}
                          onChange={(e) => setNewText(e.target.value)}
                          rows={10}
                          className="focus:border-primary w-full rounded-sm border border-slate-200 bg-slate-50 p-3 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
                          placeholder="Update your review..."
                          disabled={isUpdating}
                        />
                        <DynamicActionList
                          actions={[
                            {
                              type: 'save',
                              label: 'Save Changes',
                              onClick: handleUpdate,
                              isLoading: isUpdating,
                            },
                            {
                              type: 'close',
                              label: 'Cancel',
                              onClick: () => setEditId(null),
                              isLoading: isUpdating,
                            },
                          ]}
                        />
                      </div>
                    ) : (
                      <>
                        <div className="text-text-secondary mb-3 text-sm leading-relaxed wrap-break-word">
                          {review?.comment
                            ?.split(/\n\s*\n/)
                            .map((paragraph: string, index: number) => (
                              <p key={index} className="mb-1.5 whitespace-pre-wrap last:mb-0">
                                {paragraph}
                              </p>
                            ))}
                        </div>
                        <DynamicActionList
                          actions={[
                            {
                              type: 'edit',
                              label: 'Edit',
                              onClick: () => {
                                setEditId(review?._id);
                                setNewText(review?.comment);
                                setNewRating(review?.rating);
                              },
                            },
                          ]}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {reviewsData && reviewsData.totalPages > 1 && (
            <div className="mt-6">
              <CustomPagination meta={reviewsData} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ReviewsList;
