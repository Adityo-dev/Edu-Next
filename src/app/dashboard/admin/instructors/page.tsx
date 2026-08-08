'use client';

import ErrorState from '@/components/dashboard/ErrorState/ErrorState';
import SectionHeader from '@/components/dashboard/SectionHeader/SectionHeader';
import TableSkeleton from '@/components/dashboard/Skeletons/TableSkeleton';
import { useGetBadgeRequestsQuery } from '@/redux/features/admin/instructorManagement/adminInstructor.api';
import InstructorsStats from './_components/InstructorsStats/InstructorsStats';
import RequestsTable from './_components/RequestsTable/RequestsTable';

const InstructorBadgeRequestsPage = () => {
  const { data, isLoading, isError, refetch } = useGetBadgeRequestsQuery({ page: 1, limit: 10 });

  const instructors = data?.data?.instructors || [];

  return (
    <div className="mx-auto space-y-5">
      <div>
        <SectionHeader
          title="Instructor Badge Requests"
          description="Review and approve instructor badge applications."
        />
        <div className="mt-5">
          <InstructorsStats pendingCount={data?.data?.pagination?.total || instructors.length} />
        </div>
      </div>

      {isLoading ? (
        <TableSkeleton columns={5} />
      ) : isError ? (
        <ErrorState
          title="Failed to load badge requests"
          message="We couldn't load the requests from the server right now. Please check your network connection and retry."
          onRetry={refetch}
        />
      ) : (
        <RequestsTable instructors={instructors} />
      )}
    </div>
  );
};

export default InstructorBadgeRequestsPage;
