import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';
import MyCourseSkeleton from '@/components/dashboard/Skeletons/MyCourseSkeleton';
import { useGetInstructorCoursesQuery } from '@/redux/features/courseManagement/instructorCourse.api';
import { CircleDollarSign, Star, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const MyCourses = () => {
  // 1. RTK Query Hooks for Instructor my course
  const { data, isLoading } = useGetInstructorCoursesQuery(undefined);
  const courses = data?.data?.courses || [];

  return (
    <div className="dashboard-card-container">
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
        {isLoading ? (
          [...Array(3)].map((_, i) => <MyCourseSkeleton key={i} />)
        ) : courses.length > 0 ? (
          courses.slice(0, 5).map((course) => (
            <div
              key={course?._id || course?.id}
              className="flex items-center gap-4 rounded-sm border border-slate-100 p-4 transition-all hover:border-emerald-100"
            >
              <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-sm border border-slate-100">
                <Image
                  src={course?.thumbnail || '/placeholder-course.jpg'}
                  alt={course?.title || 'course'}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="mb-1 truncate text-sm font-semibold">{course?.title}</h4>
                <div className="text-text-secondary flex flex-wrap items-center gap-3 text-sm">
                  <span className="flex items-center gap-1">
                    <Users size={14} />
                    {course?.enrolledCount || 0} students
                  </span>
                  <span className="flex items-center gap-1">
                    <CircleDollarSign size={14} />
                    {course?.price === 0 ? 'Free' : `$${course?.price}`}
                  </span>
                  {course?.rating > 0 && (
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
          ))
        ) : (
          <p className="text-sm text-gray-500">No courses found.</p>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
