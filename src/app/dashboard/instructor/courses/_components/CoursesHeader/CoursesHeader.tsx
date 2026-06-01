import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import SectionHeader from '@/components/dashboard/SectionHeader/SectionHeader';

const CoursesHeader = () => {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <SectionHeader title="My Courses" description="Manage and track all your courses." />
      <DynamicActionButton label="Create New Course" showIcon />
    </div>
  );
};

export default CoursesHeader;
