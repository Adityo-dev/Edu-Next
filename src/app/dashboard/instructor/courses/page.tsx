'use client';

import CoursesHeader from './_components/CoursesHeader/CoursesHeader';
import CoursesStats from './_components/CoursesStats/CoursesStats';
import CoursesTable from './_components/CoursesTable/CoursesTable';

const InstructorCoursesPage = () => {
  return (
    <div className="mx-auto space-y-6">
      <CoursesHeader />
      <CoursesStats />
      <CoursesTable />
    </div>
  );
};

export default InstructorCoursesPage;
