import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';
import { useGetInstructorCoursesQuery } from '@/redux/features/courseManagement/instructorCourse.api';
import { CircleDollarSign, Star, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const MyCourses = () => {
  // 1. RTK Query Hooks for Instructor my course
  const { data } = useGetInstructorCoursesQuery(undefined);
  console.log(data?.data?.courses, 'data');

  return (
    <div className="dashboard-card-container p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">My Courses</h2>
        <Link
          href="/dashboard/instructor/courses"
          className="text-primary text-sm font-medium hover:underline"
        >
          View All →
        </Link>
      </div>
      <div className="space-y-4">
        {data?.data?.courses?.slice(0, 5).map((course) => (
          <div
            key={course?.id}
            className="flex items-center gap-4 rounded-sm border border-slate-100 p-4 transition-all hover:border-emerald-100"
          >
            <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-sm">
              <Image src={course?.thumbnail} alt={course?.title} fill className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="mb-1 truncate text-sm font-semibold">{course?.title}</h4>
              <div className="text-text-secondary flex flex-wrap items-center gap-3 text-sm">
                <span className="flex items-center gap-1">
                  <Users size={14} />
                  {course?.enrolledCount} students
                </span>
                <span className="flex items-center gap-1">
                  <CircleDollarSign size={14} />
                  {course?.price}
                </span>
                {course?.rating && (
                  <span className="flex items-center gap-1">
                    <Star size={14} fill="#ffc107" color="#ffc107" />
                    {course?.rating}
                  </span>
                )}
              </div>
            </div>

            <DynamicBadge
              text={course?.status}
              color={course?.status === 'published' ? '#34796f' : '#f59e0b'}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
