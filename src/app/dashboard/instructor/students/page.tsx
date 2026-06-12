'use client';

import StudentsHeader from './_components/StudentsHeader/StudentsHeader';
import StudentsStats from './_components/StudentsStats/StudentsStats';
import StudentsTable from './_components/StudentsTable/StudentsTable';

const InstructorStudentsPage = () => {
  return (
    <div className="mx-auto space-y-6">
      <StudentsHeader />
      <StudentsStats />
      <StudentsTable />
    </div>
  );
};

export default InstructorStudentsPage;
