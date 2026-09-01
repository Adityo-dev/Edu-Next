'use client';

import CustomPagination from '@/components/dashboard/CustomPagination/CustomPagination';
import DynamicActionList from '@/components/dashboard/DynamicActionList/DynamicActionList';
import LeaveReviewSkeleton from '@/components/dashboard/Skeletons/LeaveReviewSkeleton';
import { useModal } from '@/context/ModalContext';
import { useGetStudentUnreviewedCoursesQuery } from '@/redux/features/reviews/studentReview.api';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

const LeaveReview = () => {
  const { openModal } = useModal();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const {
    data: unreviewedData,
    isLoading,
    isFetching,
  } = useGetStudentUnreviewedCoursesQuery({
    page,
    limit: 12,
  });

  const courses = useMemo(() => unreviewedData?.data || [], [unreviewedData?.data]);

  if (isLoading) {
    return <LeaveReviewSkeleton />;
  }

  if (courses.length === 0) return null;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Leave a Review</h2>
        {isFetching && !isLoading && (
          <span className="animate-pulse text-xs font-medium text-slate-500">Updating...</span>
        )}
      </div>
      <div className="space-y-4">
        {courses.map((course) => (
          <div key={course?._id} className="dashboard-card-container p-3">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-20 shrink-0 overflow-hidden rounded-sm">
                  <Image
                    src={course?.thumbnail}
                    alt={course?.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex-1">
                  <p className="line-clamp-2 text-sm font-medium">{course?.title}</p>
                  <p className="text-text-secondary mt-1 text-xs">
                    {course?.instructor
                      ? `${course?.instructor?.firstName} ${course?.instructor?.lastName}`
                      : 'Unknown Instructor'}
                  </p>
                </div>
              </div>
              <DynamicActionList
                actions={[
                  {
                    type: 'edit',
                    label: 'Write Review',
                    onClick: () =>
                      openModal({
                        view: 'WRITE_REVIEW',
                        data: course,
                        title: `Write Review for ${course?.title}`,
                      }),
                  },
                ]}
              />
            </div>
          </div>
        ))}
      </div>

      {unreviewedData && unreviewedData.totalPages > 1 && (
        <div className="mt-4">
          <CustomPagination meta={unreviewedData} />
        </div>
      )}
    </div>
  );
};

export default LeaveReview;
