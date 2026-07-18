/* eslint-disable @typescript-eslint/no-explicit-any */
import { Award, BookOpen, Clock, Globe, Star, Users, Video } from 'lucide-react';
import Image from 'next/image';

export default function CourseDetailsHero({
  course,
  totalLessons,
}: {
  course: any;
  totalLessons: number;
}) {
  return (
    <div className="relative overflow-hidden bg-slate-950 pt-20">
      {/* Background Image with Neutral Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover opacity-50 mix-blend-luminosity"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-slate-950/95 via-slate-950/80 to-slate-900/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-400 px-4 py-10 sm:px-6 sm:py-16">
        <div className="max-w-3xl">
          {/* Badges Row */}
          <div className="mb-4 flex flex-wrap items-center gap-2 sm:mb-5">
            {course.badge && (
              <span className="bg-secondary rounded-sm px-3 py-1 text-xs font-bold text-white">
                {course.badge}
              </span>
            )}
            <span className="rounded-sm bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              {course.category}
            </span>
            <span className="rounded-sm bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              {course.level}
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-3 text-2xl leading-tight font-black text-white sm:mb-4 sm:text-3xl md:text-4xl">
            {course.title}
          </h1>

          {/* Subtitle */}
          <p className="mb-6 max-w-2xl text-sm leading-relaxed text-white/70 sm:mb-7 sm:text-base">
            {course.subtitle}
          </p>

          {/* Rating Bar */}
          <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill="#ffc107"
                    color="#ffc107"
                    className="sm:h-[15px] sm:w-[15px]"
                  />
                ))}
              </div>
              <span className="font-bold text-yellow-400">{course.rating}</span>
              <span className="text-white/50">({course.totalReviews} reviews)</span>
            </div>

            <div className="flex items-center gap-1.5 text-white/70">
              <Users size={14} className="text-white/50" />
              <span>
                <span className="font-semibold text-white">{course.enrolled}</span> students
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-white/70">
              <Clock size={14} className="text-white/50" />
              <span>
                <span className="font-semibold text-white">{course.duration}</span> length
              </span>
            </div>
          </div>

          {/* Info Pills */}
          <div className="mb-8 flex flex-wrap gap-2">
            {[
              { icon: <BookOpen size={13} />, text: `${totalLessons} Lessons` },
              { icon: <Globe size={13} />, text: course.language },
              { icon: <Video size={13} />, text: 'Live Sessions' },
              { icon: <Award size={13} />, text: 'Certificate Included' },
              { icon: <Clock size={13} />, text: `Updated ${course.lastUpdated}` },
            ].map((pill, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 rounded-sm border border-white/10 bg-white/10 px-3 py-1.5 text-[11px] text-white/80 backdrop-blur-sm sm:text-xs"
              >
                <span className="text-white/50">{pill.icon}</span>
                {pill.text}
              </div>
            ))}
          </div>

          {/* Instructor */}
          <div className="flex w-full [scrollbar-width:none] items-center gap-3 overflow-x-auto rounded-md border border-white/10 bg-white/5 p-3 backdrop-blur-sm [-ms-overflow-style:none] sm:w-fit sm:gap-4 sm:p-4 [&::-webkit-scrollbar]:hidden">
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-white/20 sm:h-12 sm:w-12">
              <Image
                src={course.instructor.image}
                alt={course.instructor.name}
                width={150}
                height={150}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="shrink-0">
              <p className="text-[10px] text-white/50 sm:text-xs">Your Instructor</p>
              <p className="text-[13px] font-semibold text-white sm:text-base">
                {course.instructor.name}
              </p>
              <p className="text-[10px] text-white/60 sm:text-xs">{course.instructor.title}</p>
            </div>

            <div className="ml-2 flex shrink-0 items-center gap-4 border-l border-white/10 pl-4 sm:ml-4 sm:pl-5">
              <div className="text-center">
                <p className="text-xs font-bold text-white sm:text-sm">
                  {course.instructor.rating}
                </p>
                <p className="text-[10px] text-white/50 sm:text-xs">Rating</p>
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-white sm:text-sm">
                  {course.instructor.students}
                </p>
                <p className="text-[10px] text-white/50 sm:text-xs">Students</p>
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-white sm:text-sm">
                  {course.instructor.courses}
                </p>
                <p className="text-[10px] text-white/50 sm:text-xs">Courses</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
