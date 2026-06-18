'use client';

import Image from 'next/image';

interface PendingCourse {
  id: number;
  course: string;
  instructor: string;
  image: string;
}

interface LeaveReviewProps {
  courses: PendingCourse[];
}

const LeaveReview = ({ courses }: LeaveReviewProps) => {
  if (courses.length === 0) return null;

  return (
    <div>
      <h2 className="mb-4 text-lg font-bold">Leave a Review</h2>
      {courses.map((course) => (
        <div
          key={course.id}
          className="dashboard-card-container border-emerald-100 bg-emerald-50/50"
        >
          <div className="flex items-center gap-4">
            <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-sm">
              <Image src={course.image} alt={course.course} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold">{course.course}</p>
              <p className="text-text-secondary text-xs">{course.instructor}</p>
            </div>
            <button className="bg-primary rounded-sm px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#2a6159]">
              Write Review
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeaveReview;
