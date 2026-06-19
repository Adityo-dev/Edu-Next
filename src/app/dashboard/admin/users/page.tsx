import SectionHeader from '@/components/dashboard/SectionHeader/SectionHeader';
import UsersStats from './_components/UsersStats/UsersStats';
import UsersTable from './_components/UsersTable/UsersTable';

const UsersManagementPage = () => {
  return (
    <div className="space-y-5">
      <SectionHeader
        title="Users Management"
        description="Manage all students and instructors on EduNext."
      />
      <UsersStats />
      <UsersTable />
    </div>
  );
};

export default UsersManagementPage;
