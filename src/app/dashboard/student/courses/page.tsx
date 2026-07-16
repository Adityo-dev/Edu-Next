'use client';

import CoursesHeader from './_components/CoursesHeader/CoursesHeader';
import CoursesStats from './_components/CoursesStats/CoursesStats';
import MyCourse from './_components/MyCourse/MyCourse';

const MyCourses = () => {
  return (
    <section className="space-y-6">
      <CoursesHeader />
      <CoursesStats />
      <MyCourse />
    </section>
  );
};

export default MyCourses;
