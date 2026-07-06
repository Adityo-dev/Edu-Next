'use client';

import DynamicTableFilterBar from '@/components/dashboard/DynamicTableFilterBar/DynamicTableFilterBar';
import useSetSearchQueryInURL from '@/hooks/useSetSearchQueryInURL';
import {
  useDeleteReviewByAdminMutation,
  useGetAdminReviewsQuery,
  usePublishReviewMutation,
  useRejectReviewMutation,
} from '@/redux/features/reviews/adminReview.api';

import EmptyState from '@/components/dashboard/EmptyState/EmptyState';
import { ITableFilter } from '@/types/table-filter.types';
import { Loader2, Star } from 'lucide-react';
import ReviewCard from './_components/ReviewCard/ReviewCard';

const ReviewsList = () => {
  const { getQueryObject } = useSetSearchQueryInURL();
  const queryParams = getQueryObject();

  const currentPage = Number(queryParams.page) || 1;
  const currentStatus = queryParams.status === 'all' ? undefined : queryParams.status;
  const searchKeyword = queryParams.search || undefined;

  const { data, isLoading, isFetching } = useGetAdminReviewsQuery({
    page: currentPage,
    limit: 10,
    status: currentStatus,
    search: searchKeyword,
  });

  const [publishReview, { isLoading: isPublishing }] = usePublishReviewMutation();
  const [rejectReview, { isLoading: isRejecting }] = useRejectReviewMutation();
  const [deleteReview, { isLoading: isDeleting }] = useDeleteReviewByAdminMutation();

  const handleApprove = async (id: string) => {
    if (!confirm('Are you sure you want to approve and publish this review?')) return;
    try {
      await publishReview(id).unwrap();
    } catch (error) {
      console.error('Failed to approve review:', error);
    }
  };

  const handleReject = async (id: string) => {
    const reason = prompt('Enter rejection reason:');
    if (!reason) return;
    try {
      await rejectReview({ reviewId: id, rejectionReason: reason }).unwrap();
    } catch (error) {
      console.error('Failed to reject review:', error);
    }
  };

  const handleDelete = async (id: string) => {
    const reason = prompt('Enter reason for deleting this review:');
    if (!reason) return;
    try {
      await deleteReview({ reviewId: id, reason }).unwrap();
      alert('Review deleted successfully.');
    } catch (error) {
      console.error('Failed to delete review:', error);
    }
  };

  const filterFields: ITableFilter[] = [
    {
      name: 'status',
      type: 'tabs',
      placeholder: 'Filter by Status',
      options: [
        { label: 'All Status', value: 'all' },
        { label: 'Pending', value: 'pending' },
        { label: 'Published', value: 'published' },
        { label: 'Rejected', value: 'rejected' },
      ],
    },
    {
      name: 'search',
      type: 'search',
      placeholder: 'Search by comment or course...',
    },
  ];

  return (
    <div className="space-y-6">
      <DynamicTableFilterBar fields={filterFields} />

      {isLoading || isFetching ? (
        <div className="flex h-40 items-center justify-center">
          <Loader2 className="text-primary animate-spin" size={32} />
        </div>
      ) : data?.data && data.data.length > 0 ? (
        <div className="space-y-4">
          {data.data.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              isPublishing={isPublishing}
              isRejecting={isRejecting}
              isDeleting={isDeleting}
              onApprove={handleApprove}
              onReject={handleReject}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Reviews Found"
          description="No reviews found matching the filters."
          icon={Star}
        />
      )}
    </div>
  );
};

export default ReviewsList;
