'use client';

import SectionHeader from '@/components/dashboard/SectionHeader/SectionHeader';
import StudentsStats from './_components/StudentsStats/StudentsStats';
import StudentsTable from './_components/StudentsTable/StudentsTable';

const InstructorStudentsPage = () => {
  return (
    <section className="space-y-6">
      <SectionHeader
        title="Students"
        description="View and manage students enrolled in your courses."
      />
      <StudentsStats />
      <StudentsTable />
    </section>
  );
};

export default InstructorStudentsPage;
