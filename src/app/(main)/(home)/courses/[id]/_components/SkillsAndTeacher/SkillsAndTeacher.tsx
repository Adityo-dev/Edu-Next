/* eslint-disable @typescript-eslint/no-explicit-any */
import blueBadge from '@/assets/badge/blue.svg';
import bronzeBadge from '@/assets/badge/bronze.svg';
import silverBadge from '@/assets/badge/silver.svg';

import { BookOpen, Star, Users, Briefcase } from 'lucide-react';
import Image from 'next/image';

export default function SkillsAndTeacher({ course }: { course: any }) {
  return (
    <>
      {/* What You'll Learn */}
      <div className="relative overflow-hidden rounded-md border border-slate-200 bg-white p-4 shadow-xs">
        <div
          className="prose prose-emerald prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed prose-p:mb-4 prose-ol:list-decimal prose-ul:list-disc prose-ol:ml-5 prose-ul:ml-5 prose-li:mb-2 marker:text-primary max-w-none text-slate-600"
          dangerouslySetInnerHTML={{ __html: course?.whatYouLearn }}
        />
      </div>

      {/* Requirements */}
      <div className="relative overflow-hidden rounded-md border border-slate-200 bg-white p-4 shadow-xs">
        <div
          className="prose prose-emerald prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed prose-p:mb-4 prose-ol:list-decimal prose-ul:list-disc prose-ol:ml-5 prose-ul:ml-5 prose-li:mb-2 marker:text-primary max-w-none text-slate-600"
          dangerouslySetInnerHTML={{ __html: course?.requirements }}
        />
      </div>

      {/* Instructor */}
      <div className="relative overflow-hidden rounded-md border border-slate-200 bg-white p-4 shadow-xs">
        <h2 className="mb-6 text-xl font-semibold">About the Instructor</h2>
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left">
          <div className="relative shrink-0">
            <div className="border-primary/20 relative h-16 w-16 overflow-hidden rounded-full border-2">
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
                className="absolute right-0.5 bottom-0 flex h-5 w-5 items-center justify-center rounded-full shadow-sm sm:h-6 sm:w-6"
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
          <div>
            <div className="flex items-center justify-center gap-2 sm:justify-start">
              <h3 className="text-base font-semibold">{course?.instructor?.name}</h3>
            </div>
            <p className="text-primary mb-4 text-sm font-medium">{course?.instructor?.title}</p>
            <div className="mb-4 flex flex-wrap justify-center gap-4 text-sm sm:justify-start">
              <span className="flex items-center gap-1.5">
                <Star size={14} fill="#ffc107" color="#ffc107" />
                <span className="font-semibold">{course?.instructor?.rating}</span> Rating
              </span>
              <span className="flex items-center gap-1.5">
                <Users size={14} className="text-primary" />
                {course?.instructor?.students} Students
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen size={14} className="text-primary" />
                {course?.instructor?.courses} Courses
              </span>
              {course?.instructor?.experienceYears ? (
                <span className="flex items-center gap-1.5">
                  <Briefcase size={14} className="text-primary" />
                  {course?.instructor?.experienceYears} Years Exp.
                </span>
              ) : null}
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">{course?.instructor?.bio}</p>
          </div>
        </div>
      </div>
    </>
  );
}
