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
  useGetAdminCoursesQuery,
  useUpdateCourseStatusMutation,
} from '@/redux/features/courseManagement/adminCourse.api';
import { useDeleteCourseMutation } from '@/redux/features/courseManagement/instructorCourse.api';

import { ICourse, TCourseLevel, TCourseStatus } from '@/types/courseManagement.types';
import { TColumn } from '@/types/custom-table.types';
import { ITableFilter } from '@/types/table-filter.types';
import {
  AlertTriangle,
  BookOpen,
  CheckCircle,
  HelpCircle,
  Star,
  Users,
  XCircle,
} from 'lucide-react';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

interface ICourseRow {
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
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=600';

const mapCourseToRow = (course: ICourse): ICourseRow => ({
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
});

const CourseManagementTable = () => {
  const { getQueryObject } = useSetSearchQueryInURL();
  const [actingRowId, setActingRowId] = useState<string | null>(null);

  // 1. Reading current query data from the URL
  const queryParams = getQueryObject();
  const currentStatus = (queryParams.status as 'all' | TCourseStatus) || 'all';
  const currentPage = Number(queryParams.page) || 1;
  const currentLimit = Number(queryParams.limit) || 10;
  const currentSearchUrl = queryParams.search || '';

  // 2. RTK Query Hook
  const { data, isLoading, isError, refetch } = useGetAdminCoursesQuery({
    search: currentSearchUrl || undefined,
    status: currentStatus === 'all' ? undefined : currentStatus,
    page: currentPage,
    limit: currentLimit,
  });

  const [updateCourseStatus, { isLoading: isUpdatingStatus }] = useUpdateCourseStatusMutation();
  const [deleteCourse, { isLoading: isDeleting }] = useDeleteCourseMutation();

  const rows: ICourseRow[] = useMemo(() => {
    return (data?.data?.courses ?? []).map(mapCourseToRow);
  }, [data]);

  // Fixed: Expanded type union to include 'suspended' and mapped corresponding reason structures
  const handleStatusUpdate = async (
    row: ICourseRow,
    status: 'published' | 'rejected' | 'suspended',
    reason?: string,
  ) => {
    const confirmed = window.confirm(
      `Are you sure you want to change this course status to ${status}?`,
    );
    if (!confirmed) return;

    try {
      setActingRowId(row?.id);
      const payload = {
        status,
        ...(status === 'rejected' && reason && { rejectedReason: reason }),
        ...(status === 'suspended' && reason && { suspendedReason: reason }),
      };
      await updateCourseStatus({ id: row?.id, payload }).unwrap();
      toast.success(`Course status updated to ${status} successfully.`);
    } catch {
      toast.error('Failed to update course status. Please try again.');
    } finally {
      setActingRowId(null);
    }
  };

  const handleDelete = async (row: ICourseRow) => {
    const confirmed = window.confirm(
      `Permanently delete "${row?.title}"? This action cannot be undone.`,
    );
    if (!confirmed) return;

    try {
      setActingRowId(row?.id);
      await deleteCourse(row?.id).unwrap();
      toast.success('Course has been successfully removed from the system.');
    } catch {
      toast.error('Failed to delete course. Please try again.');
    } finally {
      setActingRowId(null);
    }
  };

  const CourseTableConfig: TColumn<ICourseRow>[] = [
    {
      header: 'COURSE',
      cell: (row) => {
        const isValidUrl =
          row?.thumbnail &&
          (row.thumbnail.startsWith('http://') || row.thumbnail.startsWith('https://'));
        const imageSrc = isValidUrl ? row.thumbnail : FALLBACK_IMAGE;

        return (
          <div className="flex items-center gap-3 py-1">
            <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-sm border border-slate-100">
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
              <span className="text-text-secondary text-xs capitalize">Level: {row?.level}</span>
            </div>
          </div>
        );
      },
    },
    {
      header: 'CATEGORY',
      cell: (row) => (
        <span className="text-primary rounded-sm bg-emerald-50 px-2.5 py-1 text-xs font-semibold">
          {row?.category}
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
      header: 'ENROLLED',
      cell: (row) => (
        <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600">
          <Users size={15} className="text-slate-400" />
          <span>{row?.enrolledCount?.toLocaleString()}</span>
        </div>
      ),
    },
    {
      header: 'RATING',
      cell: (row) => (
        <div className="flex items-center gap-1">
          <Star size={14} className="fill-amber-400 text-amber-400" />
          <span className="text-sm font-semibold text-slate-700">
            {row?.rating > 0 ? row.rating.toFixed(1) : 0}
          </span>
        </div>
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
        const tableActions: {
          type: 'view' | 'save' | 'close' | 'delete' | 'suspend';
          onClick: () => void;
          isLoading?: boolean;
        }[] = [
          {
            type: 'view',
            onClick: () => {
              window.open(`/courses/${row?.slug}`, '_blank');
            },
          },
        ];

        if (row?.status === 'pending') {
          tableActions.push(
            {
              type: 'save',
              onClick: () => {
                handleStatusUpdate(row, 'published');
              },
              isLoading: actingRowId === row?.id && isUpdatingStatus,
            },
            {
              type: 'close',
              onClick: () => {
                const reason = prompt('Enter rejection reason:');
                if (reason) handleStatusUpdate(row, 'rejected', reason);
              },
              isLoading: actingRowId === row?.id && isUpdatingStatus,
            },
          );
        } else if (row?.status === 'published') {
          tableActions.push({
            type: 'suspend',
            onClick: () => {
              const reason = prompt('Enter reason for suspension:');
              // Fixed: Correctly passes 'suspended' instead of 'rejected' string literal
              if (reason) handleStatusUpdate(row, 'suspended', reason);
            },
            isLoading: actingRowId === row?.id && isUpdatingStatus,
          });
        } else {
          tableActions.push({
            type: 'delete',
            onClick: () => {
              handleDelete(row);
            },
            isLoading: actingRowId === row?.id && isDeleting,
          });
        }

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
        { label: 'Suspended', value: 'suspended' }, // Added to filter bar options
      ],
    },
    {
      type: 'search',
      name: 'search',
      placeholder: 'Search by course title...',
    },
  ];

  return (
    <div className="dashboard-card-container space-y-4 p-3">
      <DynamicTableFilterBar fields={CourseFilters} />

      {isError ? (
        <ErrorState
          title="Failed to load courses"
          message="We couldn't load the course list from the server right now. Please check your network connection and retry."
          onRetry={refetch}
        />
      ) : isLoading ? (
        <TableSkeleton />
      ) : rows.length === 0 ? (
        <EmptyState
          title="No Courses Found"
          icon={BookOpen}
          description="There are no registered courses found in the database matching your criteria."
        />
      ) : (
        <>
          <CustomTable columns={CourseTableConfig} data={rows} />
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
