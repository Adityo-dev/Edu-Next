/* eslint-disable @typescript-eslint/no-explicit-any */
import blueBadge from '@/assets/badge/blue.svg';
import bronzeBadge from '@/assets/badge/bronze.svg';
import silverBadge from '@/assets/badge/silver.svg';

import { BookOpen, Briefcase, Star, Users } from 'lucide-react';
import Image from 'next/image';

export default function SkillsAndTeacher({ course }: { course: any }) {
  const proseClasses =
    'prose prose-emerald prose-headings:font-semibold prose-h1:text-2xl sm:prose-h1:text-3xl prose-h2:text-xl sm:prose-h2:text-2xl prose-h3:text-lg sm:prose-h3:text-xl prose-p:leading-relaxed prose-p:mb-4 prose-ol:list-decimal prose-ul:list-disc prose-ol:ml-4 sm:prose-ol:ml-5 prose-ul:ml-4 sm:prose-ul:ml-5 prose-li:mb-2 marker:text-primary max-w-none text-slate-600 text-sm sm:text-base';

  return (
    <>
      {/* Description */}
      {course?.description && (
        <div className="relative overflow-hidden rounded-md border border-slate-200 bg-white p-4">
          <div className={proseClasses} dangerouslySetInnerHTML={{ __html: course.description }} />
        </div>
      )}

      {/* What You'll Learn */}
      {course?.whatYouLearn && (
        <div className="relative overflow-hidden rounded-md border border-slate-200 bg-white p-4 shadow-xs">
          <div className={proseClasses} dangerouslySetInnerHTML={{ __html: course.whatYouLearn }} />
        </div>
      )}

      {/* Requirements */}
      {course?.requirements && (
        <div className="relative overflow-hidden rounded-md border border-slate-200 bg-white p-4 shadow-xs">
          <div className={proseClasses} dangerouslySetInnerHTML={{ __html: course.requirements }} />
        </div>
      )}

      {/* Instructor */}
      <div className="relative overflow-hidden rounded-md border border-slate-200 bg-white p-4 shadow-xs">
        <h2 className="mb-4 text-lg font-semibold sm:mb-6 sm:text-xl">About the Instructor</h2>
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left">
          <div className="relative shrink-0">
            <div className="border-primary/20 relative h-16 w-16 overflow-hidden rounded-full border-2 sm:h-20 sm:w-20">
              <Image
                src={course?.instructor?.image}
                alt={course?.instructor?.name}
                width={150}
                height={150}
                className="h-full w-full object-cover"
              />
            </div>
            {course?.instructor?.badge && (
              <div
                className="absolute right-0.5 bottom-0 flex h-6 w-6 items-center justify-center rounded-full shadow-sm sm:h-7 sm:w-7"
                title={`Instructor Level: ${course?.instructor?.badge}`}
              >
                {course?.instructor?.badge === 'bronze' && (
                  <Image
                    src={bronzeBadge}
                    alt="Bronze Badge"
                    className="h-full w-full object-contain"
                  />
                )}
                {course?.instructor?.badge === 'silver' && (
                  <Image
                    src={silverBadge}
                    alt="Silver Badge"
                    className="h-full w-full object-contain"
                  />
                )}
                {course?.instructor?.badge === 'blue' && (
                  <Image
                    src={blueBadge}
                    alt="Blue Badge"
                    className="h-full w-full object-contain"
                  />
                )}
              </div>
            )}
          </div>
          <div className="w-full min-w-0">
            <div className="flex items-center justify-center gap-2 sm:justify-start">
              <h3 className="truncate text-base font-semibold sm:text-lg">
                {course?.instructor?.name}
              </h3>
            </div>
            <p className="text-primary mb-4 text-xs font-medium wrap-break-word sm:text-sm">
              {course?.instructor?.title}
            </p>
            <div className="mb-4 flex flex-wrap justify-center gap-x-3 gap-y-2 text-xs sm:justify-start sm:gap-4 sm:text-sm">
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <Star size={14} fill="#ffc107" color="#ffc107" />
                <span className="font-semibold">{course?.instructor?.rating}</span> Rating
              </span>
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <Users size={14} className="text-primary" />
                {course?.instructor?.students} Students
              </span>
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <BookOpen size={14} className="text-primary" />
                {course?.instructor?.courses} Courses
              </span>
              {course?.instructor?.experienceYears ? (
                <span className="flex items-center gap-1.5 whitespace-nowrap">
                  <Briefcase size={14} className="text-primary" />
                  {course?.instructor?.experienceYears} Years Exp.
                </span>
              ) : null}
            </div>
            <p className="text-text-secondary text-xs leading-relaxed wrap-break-word sm:text-sm">
              {course?.instructor?.bio}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
