'use client';

import CustomTable from '@/components/dashboard/CustomTable/CustomTable';
import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';
import DynamicTableActions from '@/components/dashboard/DynamicTableActions/DynamicTableActions';
import DynamicTableFilterBar from '@/components/dashboard/DynamicTableFilterBar/DynamicTableFilterBar';
import EmptyState from '@/components/dashboard/EmptyState/EmptyState';
import ErrorState from '@/components/dashboard/ErrorState/ErrorState';
import TableSkeleton from '@/components/dashboard/Skeletons/TableSkeleton';
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserStatusMutation,
} from '@/redux/features/admin/userManagement/userManagement.api';
import { TColumn } from '@/types/custom-table.types';
import { ITableFilter } from '@/types/table-filter.types';
import { TUserListItem, TUserRole, TUserStatus } from '@/types/userRole.types';
import { FormatDateTime } from '@/utils/formatDateTime';
import { GraduationCap, ShieldCheck, ShieldX, User, User2, UserStar } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

interface IUserRow {
  id: string;
  initial: string;
  name: string;
  email: string;
  role: TUserRole;
  status: TUserStatus;
  isVerified: boolean;
  joinDate: string;
}

const mapUserToRow = (user: TUserListItem): IUserRow => ({
  id: user._id,
  initial: user.firstName?.[0]?.toUpperCase() ?? '?',
  name: `${user.firstName} ${user.lastName}`.trim(),
  email: user.email,
  role: user.role,
  status: user.isSuspended ? 'suspended' : 'active',
  isVerified: user.isVerified,
  joinDate: user.createdAt,
});

const UsersTable = () => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | TUserRole>('all');
  const [actingRowId, setActingRowId] = useState<string | null>(null);

  const { data, isLoading, isError, refetch } = useGetUsersQuery(
    roleFilter === 'all' ? undefined : { role: roleFilter },
  );

  const [updateUserStatus, { isLoading: isUpdatingStatus }] = useUpdateUserStatusMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const rows: IUserRow[] = useMemo(() => {
    const allRows = (data?.data ?? []).map(mapUserToRow);

    if (!search.trim()) return allRows;

    const query = search.trim().toLowerCase();
    return allRows.filter(
      (row) => row?.name.toLowerCase().includes(query) || row?.email.toLowerCase().includes(query),
    );
  }, [data, search]);

  const handleToggleStatus = async (row: IUserRow) => {
    const nextStatus: TUserStatus = row?.status === 'active' ? 'suspended' : 'active';

    const confirmed = window.confirm(
      nextStatus === 'suspended'
        ? `Suspend ${row?.name}'s account? They won't be able to log in.`
        : `Activate ${row?.name}'s account again?`,
    );
    if (!confirmed) return;

    try {
      setActingRowId(row?.id);
      await updateUserStatus({ id: row?.id, status: nextStatus }).unwrap();
      toast.success(`${row?.name}'s account is now ${nextStatus}.`);
    } catch {
      toast.error('Failed to update user status. Please try again.');
    } finally {
      setActingRowId(null);
    }
  };

  const handleDelete = async (row: IUserRow) => {
    const confirmed = window.confirm(
      `Permanently delete ${row?.name}'s account? This cannot be undone.`,
    );
    if (!confirmed) return;

    try {
      setActingRowId(row?.id);
      await deleteUser(row?.id).unwrap();
      toast.success(`${row?.name}'s account has been deleted.`);
    } catch {
      toast.error('Failed to delete user. Please try again.');
    } finally {
      setActingRowId(null);
    }
  };

  const UsersTableConfig: TColumn<IUserRow>[] = [
    {
      header: 'USER',
      cell: (row) => (
        <div className="flex items-center gap-2.5">
          <div className="bg-primary/10 text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
            {row?.initial}
          </div>
          <div className="flex flex-col">
            <span className="text-text-primary font-semibold">{row?.name}</span>
            <span className="text-text-secondary text-xs">{row?.email}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'ROLE',
      cell: (row) => (
        <div className="flex items-center gap-1.5">
          <DynamicBadge
            text={row?.role}
            color={
              row?.role === 'admin' ? '#7c3aed' : row?.role === 'instructor' ? '#2563eb' : '#e96600'
            }
            icon={
              row?.role === 'admin' ? UserStar : row?.role === 'instructor' ? GraduationCap : User
            }
          />
          {row?.role === 'instructor' && row?.isVerified && (
            <ShieldCheck size={14} className="text-primary" />
          )}
        </div>
      ),
    },
    {
      header: 'STATUS',
      cell: (row) => (
        <DynamicBadge
          text={row?.status}
          color={row?.status === 'active' ? '#28a745' : '#dc3545'}
          icon={row?.status === 'active' ? ShieldCheck : ShieldX}
        />
      ),
    },
    {
      header: 'JOIN DATE',
      cell: (row) => FormatDateTime(row?.joinDate),
    },
    {
      header: 'ACTION',
      cell: (row) => (
        <DynamicTableActions
          actions={[
            {
              type: row?.status === 'active' ? 'suspend' : 'save',
              onClick: () => handleToggleStatus(row),
              isLoading: actingRowId === row?.id && isUpdatingStatus,
            },
            {
              type: 'delete',
              onClick: () => handleDelete(row),
              isLoading: actingRowId === row?.id && isDeleting,
            },
          ]}
        />
      ),
    },
  ];

  const UsersFilters: ITableFilter[] = [
    {
      type: 'select',
      name: 'role-filter',
      placeholder: 'Role',
      options: [
        { label: 'All', value: 'all' },
        { label: 'Admin', value: 'admin' },
        { label: 'Student', value: 'student' },
        { label: 'Instructor', value: 'instructor' },
      ],
      onChange: (val) => setRoleFilter(val as 'all' | TUserRole),
      value: roleFilter,
    },
    {
      type: 'search',
      name: 'search',
      placeholder: 'Search by name or email...',
      onChange: (val) => setSearch(val),
      value: search,
    },
  ];

  return (
    <div className="dashboard-card-container space-y-5 p-3">
      <DynamicTableFilterBar
        fields={UsersFilters}
        filter={roleFilter}
        setFilter={(val) => setRoleFilter(val as 'all' | TUserRole)}
        search={search}
        setSearch={setSearch}
      />

      {isError ? (
        <ErrorState
          title="Failed to load users"
          message="We couldn't load the user list from the server right now. Please check your network connection and retry."
          onRetry={refetch}
        />
      ) : isLoading ? (
        <TableSkeleton />
      ) : rows.length === 0 ? (
        <EmptyState
          title="No Users Found"
          icon={User2}
          description="There are no registered users found in the database. New users, students, or instructors will appear here once they register on the platform."
        />
      ) : (
        <CustomTable columns={UsersTableConfig} data={rows} />
      )}
    </div>
  );
};

export default UsersTable;
