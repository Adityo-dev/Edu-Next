'use client';

import CustomPagination from '@/components/dashboard/CustomPagination/CustomPagination';
import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import { useModal } from '@/context/ModalContext';
import { useGetStudentUnreviewedCoursesQuery } from '@/redux/features/reviews/studentReview.api';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

const LeaveReview = () => {
  const { openModal } = useModal();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const { data: unreviewedData, isLoading } = useGetStudentUnreviewedCoursesQuery({
    page,
    limit: 10,
  });

  const courses = unreviewedData?.data || [];

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="text-primary animate-spin" size={24} />
      </div>
    );
  }

  if (courses.length === 0) return null;

  return (
    <div>
      <h2 className="mb-3 text-lg font-semibold">Leave a Review</h2>
      {courses.map((course) => (
        <div
          key={course?._id}
          className="dashboard-card-container border-emerald-100 bg-emerald-50/50 p-4"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-sm">
                <Image src={course?.thumbnail} alt={course?.title} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <p className="line-clamp-2 text-sm font-semibold">{course?.title}</p>
                <p className="text-text-secondary mt-1 text-xs">
                  {course?.instructor
                    ? `${course?.instructor?.firstName} ${course?.instructor?.lastName}`
                    : 'Unknown Instructor'}
                </p>
              </div>
            </div>
            <DynamicActionButton
              label="Write Review"
              onClick={() =>
                openModal({
                  view: 'WRITE_REVIEW',
                  data: course,
                  title: `Write Review for ${course?.title}`,
                })
              }
              className="h-11! w-full sm:w-auto"
            />
          </div>
        </div>
      ))}

      {unreviewedData && unreviewedData.totalPages > 1 && (
        <div className="mt-4">
          <CustomPagination meta={unreviewedData} />
        </div>
      )}
    </div>
  );
};

export default LeaveReview;
