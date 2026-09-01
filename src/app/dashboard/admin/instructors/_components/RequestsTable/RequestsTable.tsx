/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import CustomTable from '@/components/dashboard/CustomTable/CustomTable';
import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';
import DynamicActionList from '@/components/dashboard/DynamicActionList/DynamicActionList';
import EmptyState from '@/components/dashboard/EmptyState/EmptyState';
import { useModal } from '@/context/ModalContext';
import { useApproveBadgeRequestMutation } from '@/redux/features/admin/instructorManagement/adminInstructor.api';
import { TInstructorBadgeRequest } from '@/types/adminInstructor.types';
import { TColumn } from '@/types/custom-table.types';
import { Users } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';

const statusColorMap: Record<string, string> = {
  pending: '#eab308',
  approved: '#10b981',
  rejected: '#ef4444',
};

interface RequestsTableProps {
  instructors: TInstructorBadgeRequest[];
}

const RequestsTable = ({ instructors }: RequestsTableProps) => {
  const { openModal } = useModal();
  const [approveBadgeRequest, { isLoading }] = useApproveBadgeRequestMutation();

  const handleAction = async (id: string, action: 'approve' | 'reject') => {
    try {
      await approveBadgeRequest({ id, action }).unwrap();
      toast.success(`Request ${action}d successfully`);
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to update status');
      console.error('Failed to update status', error);
    }
  };

  const columns: TColumn<TInstructorBadgeRequest>[] = [
    {
      header: 'Instructor',
      cell: (row) => (
        <div className="flex items-center gap-3">
          <Image
            src={row?.avatar}
            alt={row?.fullName || `${row?.firstName} ${row?.lastName}`}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full border border-slate-100 object-cover"
          />
          <div>
            <p className="font-semibold">{row?.fullName}</p>
            <p className="text-text-secondary text-xs">{row?.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Expertise',
      cell: (row) => <p className="text-sm">{row?.areaOfExpertise?.join(', ') || 'N/A'}</p>,
    },
    {
      header: 'Experience',
      cell: (row) => <p className="text-sm">{row?.experienceYears} Years</p>,
    },
    {
      header: 'Status',
      cell: (row) => {
        const status = row?.badgeRequest?.status || 'unknown';
        return <DynamicBadge text={status} color={statusColorMap[status] || '#64748b'} />;
      },
    },
    {
      header: 'Actions',
      cell: (row) => {
        const actions = [];

        if (row?.badgeRequest?.status === 'pending') {
          actions.push(
            {
              type: 'save' as const,
              label: 'Approve',
              isLoading,
              onClick: () => handleAction(row?._id, 'approve'),
            },
            {
              type: 'suspend' as const,
              label: 'Reject',
              isLoading,
              onClick: () => handleAction(row?._id, 'reject'),
            },
          );
        }

        actions.push({
          type: 'view' as const,
          label: 'View',
          onClick: () => {
            openModal({
              view: 'INSTRUCTOR_BADGE_DETAILS',
              layout: 'DRAWER',
              title: 'Instructor Details',
              description: 'Review the details of the instructor request.',
              data: { instructor: row },
            });
          },
        });

        return <DynamicActionList actions={actions} />;
      },
    },
  ];

  return (
    <div>
      {instructors.length === 0 ? (
        <EmptyState
          title="No Requests Found"
          description="There are currently no instructor badge requests to display."
          icon={Users}
        />
      ) : (
        <CustomTable columns={columns} data={instructors} />
      )}
    </div>
  );
};

export default RequestsTable;
