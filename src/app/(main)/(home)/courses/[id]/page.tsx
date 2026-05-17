import CourseDetailsHero from './_components/CourseDetailsHero/CourseDetailsHero';
import ReviewsAndAbout from './_components/ReviewsAndAbout/ReviewsAndAbout';
import SkillsAndTeacher from './_components/SkillsAndTeacher/SkillsAndTeacher';

function LendingCourseDetailsPage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <CourseDetailsHero />
      <SkillsAndTeacher />
      <ReviewsAndAbout />
    </main>
  );
}

export default LendingCourseDetailsPage;
