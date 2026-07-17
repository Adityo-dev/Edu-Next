'use client';

import CustomPagination from '@/components/dashboard/CustomPagination/CustomPagination';
import {
  useGetStudentSubmittedReviewsQuery,
  useUpdateStudentReviewMutation,
} from '@/redux/features/reviews/studentReview.api';
import { FormatDateTime } from '@/utils/formatDateTime';
import { Edit, Loader2, Star } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

const ReviewsList = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const [editId, setEditId] = useState<string | null>(null);
  const [newRating, setNewRating] = useState(5);
  const [newText, setNewText] = useState('');

  const { data: reviewsData, isLoading: isReviewsLoading } = useGetStudentSubmittedReviewsQuery({
    page,
    limit: 10,
  });
  const [updateReview, { isLoading: isUpdating }] = useUpdateStudentReviewMutation();

  const handleUpdate = async () => {
    if (editId) {
      await updateReview({ reviewId: editId, rating: newRating, comment: newText });
      setEditId(null);
    }
  };

  const reviews = reviewsData?.data || [];

  if (isReviewsLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="text-primary animate-spin" size={24} />
      </div>
    );
  }

  if (reviews.length === 0) return null;

  return (
    <div>
      <h2 className="mb-3 text-lg font-semibold">Submitted Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review._id} className="dashboard-card-container">
            <div className="flex gap-4">
              <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-sm">
                <Image
                  src={review.course.thumbnail}
                  alt={review.course.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="mb-1 flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold">{review.course.title}</h3>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      review.status === 'published'
                        ? 'text-primary bg-emerald-50'
                        : 'bg-yellow-50 text-yellow-600'
                    }`}
                  >
                    {review.status === 'published' ? 'Published' : 'Pending Review'}
                  </span>
                </div>

                <p className="text-text-secondary mb-2 text-xs">
                  {review.course.instructor
                    ? `${review.course.instructor.firstName} ${review.course.instructor.lastName}`
                    : 'Unknown Instructor'}
                </p>

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
                  <span className="ml-1 text-xs text-slate-500">
                    {FormatDateTime(review.createdAt)}
                  </span>
                </div>

                {editId === review._id ? (
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
                      disabled={isUpdating}
                    />
                    <div className="flex gap-2">
                      <button
                        className="bg-primary rounded-sm px-4 py-2 text-xs font-bold text-white disabled:opacity-50"
                        onClick={handleUpdate}
                        disabled={isUpdating}
                      >
                        {isUpdating ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button
                        className="rounded-sm border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-500 disabled:opacity-50"
                        onClick={() => setEditId(null)}
                        disabled={isUpdating}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-text-secondary mb-3 line-clamp-2 text-sm leading-relaxed">
                      {review.comment}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditId(review._id);
                          setNewText(review.comment);
                          setNewRating(review.rating);
                        }}
                        className="flex items-center gap-1.5 rounded-sm border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                      >
                        <Edit size={12} /> Edit
                      </button>
                    </div>
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
    </div>
  );
};

export default ReviewsList;
