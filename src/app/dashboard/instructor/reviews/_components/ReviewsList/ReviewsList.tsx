'use client';

import DynamicTableFilterBar from '@/components/dashboard/DynamicTableFilterBar/DynamicTableFilterBar';
import EmptyState from '@/components/dashboard/EmptyState/EmptyState';
import useSetSearchQueryInURL from '@/hooks/useSetSearchQueryInURL';
import { useGetInstructorReviewsQuery } from '@/redux/features/reviews/instructorReview.api';
import { ITableFilter } from '@/types/table-filter.types';
import { FormatDateTime } from '@/utils/formatDateTime';
import { Loader2, Star } from 'lucide-react';
import Image from 'next/image';

const ReviewsList = () => {
  const { getQueryObject } = useSetSearchQueryInURL();
  const queryParams = getQueryObject();

  const currentPage = Number(queryParams.page) || 1;
  const ratingFilter =
    queryParams.rating && queryParams.rating !== 'all' ? Number(queryParams.rating) : undefined;
  const searchKeyword = queryParams.search || undefined;

  const { data, isLoading, isFetching } = useGetInstructorReviewsQuery({
    page: currentPage,
    limit: 10,
    rating: ratingFilter,
    search: searchKeyword,
  });

  const filterFields: ITableFilter[] = [
    {
      name: 'rating',
      type: 'select',
      placeholder: 'Filter by Rating',
      options: [
        { label: 'All Ratings', value: 'all' },
        { label: '5 Stars', value: '5' },
        { label: '4 Stars', value: '4' },
        { label: '3 Stars', value: '3' },
        { label: '2 Stars', value: '2' },
        { label: '1 Star', value: '1' },
      ],
    },
    {
      name: 'search',
      type: 'search',
      placeholder: 'Search by course...',
    },
  ];

  return (
    <div className="space-y-4">
      <DynamicTableFilterBar fields={filterFields} />

      {isLoading || isFetching ? (
        <div className="flex h-40 items-center justify-center">
          <Loader2 className="text-primary animate-spin" size={32} />
        </div>
      ) : data?.data && data.data.length > 0 ? (
        <div className="space-y-4">
          {data.data.map((review) => {
            const studentName =
              review.student && typeof review.student !== 'string'
                ? `${review.student.firstName} ${review.student.lastName}`
                : 'Unknown Student';
            const avatarSrc =
              review.student && typeof review.student !== 'string'
                ? review.student.avatar
                : '/fallback-avatar.png';

            return (
              <div key={review._id} className="dashboard-card-container shadow-none">
                <div className="flex gap-4">
                  <Image
                    src={avatarSrc}
                    alt={studentName}
                    width={44}
                    height={44}
                    className="h-11 w-11 shrink-0 rounded-full border-2 border-emerald-50 object-cover"
                  />
                  <div className="flex-1">
                    <div className="mb-1 flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{studentName}</h4>
                        <p className="text-text-secondary text-xs">
                          {review.course?.title || 'Unknown Course'}
                        </p>
                      </div>
                      <span className="text-text-secondary text-xs">
                        {review.createdAt ? FormatDateTime(review.createdAt) : ''}
                      </span>
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
                    <p className="text-text-secondary mb-3 text-sm leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="No Reviews Found"
          description="No reviews found matching your filters."
          icon={Star}
        />
      )}
    </div>
  );
};

export default ReviewsList;
