'use client';

import SectionHeader from '@/components/dashboard/SectionHeader/SectionHeader';
import CoursesStats from './_components/CoursesStats/CoursesStats';
import CoursesTable from './_components/CoursesTable/CoursesTable';

const CoursesManagementPage = () => {
  return (
    <div className="space-y-5">
      <SectionHeader
        title="Courses Management"
        description="Approve, reject or manage all courses on EduNext."
      />
      <CoursesStats />
      <CoursesTable />
    </div>
  );
};

export default CoursesManagementPage;
