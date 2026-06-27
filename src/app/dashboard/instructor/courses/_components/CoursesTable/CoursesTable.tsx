/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import CustomPagination from '@/components/dashboard/CustomPagination/CustomPagination';
import CustomTable from '@/components/dashboard/CustomTable/CustomTable';
import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';
import DynamicTableActions from '@/components/dashboard/DynamicTableActions/DynamicTableActions';
import DynamicTableFilterBar from '@/components/dashboard/DynamicTableFilterBar/DynamicTableFilterBar';
import EmptyState from '@/components/dashboard/EmptyState/EmptyState';
import ErrorState from '@/components/dashboard/ErrorState/ErrorState';
import TableSkeleton from '@/components/dashboard/Skeletons/TableSkeleton';
import useSetSearchQueryInURL from '@/hooks/useSetSearchQueryInURL';
import {
  useDeleteCourseMutation,
  useGetInstructorCoursesQuery,
  useSubmitPublishRequestMutation,
} from '@/redux/features/courseManagement/instructorCourse.api';

import { ICourse, TCourseLevel, TCourseStatus } from '@/types/courseManagement.types';
import { TColumn } from '@/types/custom-table.types';
import { ITableFilter } from '@/types/table-filter.types';
import { AlertTriangle, BookOpen, CheckCircle, HelpCircle, Star, XCircle } from 'lucide-react';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

interface IInstructorCourseRow {
  id: string;
  slug: string;
  title: string;
  thumbnail: string;
  category: string;
  level: TCourseLevel;
  price: number;
  status: TCourseStatus;
  enrolledCount: number;
  rating: number;
  lessonsCount: number;
  createdAt: string;
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=600';

const mapCourseToRow = (course: ICourse): IInstructorCourseRow => ({
  id: course._id,
  slug: course.slug,
  title: course.title,
  thumbnail: course.thumbnail,
  category: course.category,
  level: course.level,
  price: course.price,
  status: course.status,
  enrolledCount: course.enrolledCount ?? 0,
  rating: course.rating ?? 0,
  lessonsCount: course.lessonsCount ?? 0,
  createdAt: course.createdAt
    ? new Date(course.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : 'N/A',
});

const CourseManagementTable = () => {
  const { getQueryObject } = useSetSearchQueryInURL();
  const [actingRowId, setActingRowId] = useState<string | null>(null);

  // 1. Reading URL Query States
  const queryParams = getQueryObject();
  const currentStatus = (queryParams.status as 'all' | TCourseStatus) || 'all';
  const currentPage = Number(queryParams.page) || 1;
  const currentLimit = Number(queryParams.limit) || 10;
  const currentSearchUrl = queryParams.search || '';

  // 2. RTK Query Hooks for Instructor Dashboard
  const { data, isLoading, isError, refetch } = useGetInstructorCoursesQuery({
    status: currentStatus === 'all' ? undefined : currentStatus,
    page: currentPage,
    limit: currentLimit,
  });

  const [submitPublishRequest, { isLoading: isSubmittingPublish }] =
    useSubmitPublishRequestMutation();
  const [deleteCourse, { isLoading: isDeleting }] = useDeleteCourseMutation();

  const rows: IInstructorCourseRow[] = useMemo(() => {
    return (data?.data?.courses ?? []).map(mapCourseToRow);
  }, [data]);

  // Client side local search logic if backend query search filter isn't active for instructor route
  const filteredRows = useMemo(() => {
    if (!currentSearchUrl) return rows;
    return rows.filter((row) => row.title.toLowerCase().includes(currentSearchUrl.toLowerCase()));
  }, [rows, currentSearchUrl]);

  const handlePublishRequest = async (row: IInstructorCourseRow) => {
    const confirmed = window.confirm(`Submit publish review request for "${row.title}"?`);
    if (!confirmed) return;

    try {
      setActingRowId(row.id);
      await submitPublishRequest(row.id).unwrap();
      toast.success('Publish request submitted for admin review successfully.');
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to submit publish request.');
    } finally {
      setActingRowId(null);
    }
  };

  const handleDeleteCourse = async (row: IInstructorCourseRow) => {
    const confirmed = window.confirm(
      `Permanently delete "${row.title}"? This action cannot be undone.`,
    );
    if (!confirmed) return;

    try {
      setActingRowId(row.id);
      await deleteCourse(row.id).unwrap();
      toast.success('Course deleted successfully.');
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to delete course.');
    } finally {
      setActingRowId(null);
    }
  };

  const CourseTableConfig: TColumn<IInstructorCourseRow>[] = [
    {
      header: 'COURSE',
      cell: (row) => {
        const isValidUrl =
          row?.thumbnail &&
          (row.thumbnail.startsWith('http://') || row.thumbnail.startsWith('https://'));
        const imageSrc = isValidUrl ? row.thumbnail : FALLBACK_IMAGE;

        return (
          <div className="flex items-center gap-3 py-1">
            <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-sm border border-white/5">
              <Image
                src={imageSrc}
                alt={row?.title}
                fill
                className="object-cover"
                unoptimized={!isValidUrl}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-text-primary line-clamp-1 max-w-62.5 text-sm font-semibold">
                {row?.title}
              </span>
              <span className="text-text-secondary mt-0.5 text-xs">
                {row?.lessonsCount} lessons • {row?.createdAt}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      header: 'STUDENTS',
      cell: (row) => (
        <span className="text-sm font-medium text-slate-600">
          {row?.enrolledCount?.toLocaleString()}
        </span>
      ),
    },
    {
      header: 'PRICE',
      cell: (row) => (
        <span className="text-primary font-bold">৳{row?.price?.toLocaleString()}</span>
      ),
    },
    {
      header: 'RATING',
      cell: (row) => (
        <>
          {row?.rating > 0 ? (
            <div className="flex items-center gap-1.5">
              <Star size={13} className="fill-amber-400 text-amber-400" />
              <span className="text-sm font-semibold text-slate-700">{row?.rating.toFixed(1)}</span>
            </div>
          ) : (
            <span className="text-text-secondary text-xs">No reviews</span>
          )}
        </>
      ),
    },
    {
      header: 'Level',
      cell: (row) => (
        <>
          {row?.level ? (
            <span className="text-sm font-semibold text-slate-700">{row?.level}</span>
          ) : (
            <span className="text-text-secondary text-xs">No level</span>
          )}
        </>
      ),
    },
    {
      header: 'STATUS',
      cell: (row) => {
        const isPublished = row?.status === 'published';
        const isPending = row?.status === 'pending';
        const isRejected = row?.status === 'rejected';
        const isSuspended = row?.status === 'suspended';

        return (
          <DynamicBadge
            text={row?.status}
            color={
              isPublished
                ? '#34796f'
                : isPending
                  ? '#d97706'
                  : isRejected
                    ? '#ef4444'
                    : isSuspended
                      ? '#dc2626'
                      : '#64748b'
            }
            icon={
              isPublished
                ? CheckCircle
                : isPending
                  ? HelpCircle
                  : isRejected
                    ? XCircle
                    : AlertTriangle
            }
          />
        );
      },
    },
    {
      header: 'ACTION',
      cell: (row) => {
        // Fixed: Removed 'isSuspended' as it wasn't being read directly
        const isDraft = row?.status === 'draft';
        const isRejected = row?.status === 'rejected';

        const tableActions: any[] = [
          {
            type: 'view',
            onClick: () => {
              window.open(`/courses/${row?.slug}`, '_blank');
            },
          },
        ];

        // 1. If Draft or Rejected, Instructor can edit, submit for review, or delete course
        if (isDraft || isRejected) {
          tableActions.push(
            {
              type: 'edit',
              onClick: () => {
                console.log('Editing course:', row?.id);
              },
            },
            {
              type: 'save',
              label: 'Publish Request',
              onClick: () => {
                handlePublishRequest(row);
              },
              isLoading: actingRowId === row?.id && isSubmittingPublish,
            },
            {
              type: 'delete',
              onClick: () => {
                handleDeleteCourse(row);
              },
              isLoading: actingRowId === row?.id && isDeleting,
            },
          );
        }

        // 2. If Published, Instructor can only view or live edit contents
        if (row?.status === 'published') {
          tableActions.push({
            type: 'edit',
            onClick: () => {
              console.log('Editing live content for course:', row?.id);
            },
          });
        }

        // 3. If Suspended (row?.status === 'suspended'), no action except view is allowed

        return <DynamicTableActions actions={tableActions} />;
      },
    },
  ];

  const CourseFilters: ITableFilter[] = [
    {
      type: 'tabs',
      name: 'status-filter',
      placeholder: 'Status',
      options: [
        { label: 'All Status', value: 'all' },
        { label: 'Published', value: 'published' },
        { label: 'Pending', value: 'pending' },
        { label: 'Draft', value: 'draft' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'Suspended', value: 'suspended' },
      ],
    },
    {
      type: 'search',
      name: 'search',
      placeholder: 'Search courses...',
    },
  ];

  return (
    <div className="dashboard-card-container space-y-4 p-3">
      <DynamicTableFilterBar fields={CourseFilters} />

      {isError ? (
        <ErrorState
          title="Failed to load your courses"
          message="We couldn't load your courses from the server. Please check your network connection and retry."
          onRetry={refetch}
        />
      ) : isLoading ? (
        <TableSkeleton />
      ) : filteredRows.length === 0 ? (
        <EmptyState
          title="No Courses Found"
          icon={BookOpen}
          description="You haven't created any courses matching these parameters yet."
        />
      ) : (
        <>
          <CustomTable columns={CourseTableConfig} data={filteredRows} />
          {data?.data?.pagination && (
            <CustomPagination
              meta={{
                total: data.data.pagination.total,
                page: data.data.pagination.page,
                limit: data.data.pagination.limit,
                totalPages: data.data.pagination.totalPages,
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CourseManagementTable;
