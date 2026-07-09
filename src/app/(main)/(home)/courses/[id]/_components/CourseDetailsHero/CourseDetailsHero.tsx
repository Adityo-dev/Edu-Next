/* eslint-disable @typescript-eslint/no-explicit-any */
import { Award, BookOpen, Clock, Globe, Star, Users, Video } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CourseDetailsHero({
  course,
  totalLessons,
}: {
  course: any;
  totalLessons: number;
}) {
  return (
    <div className="relative overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image src={course.image} alt={course.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-linear-to-r from-[#0f2724]/95 via-[#0f2724]/85 to-[#0f2724]/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-400 px-6 py-16">
        <div className="max-w-3xl">
          {/* Breadcrumb */}
          <div className="mb-5 flex items-center gap-2 text-xs text-white/50">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <span>/</span>
            <Link href="/courses" className="transition-colors hover:text-white">
              Courses
            </Link>
            <span>/</span>
            <Link href="/courses" className="transition-colors hover:text-white">
              {course.category}
            </Link>
            <span>/</span>
            <span className="line-clamp-1 text-white/80">{course.title}</span>
          </div>

          {/* Badges Row */}
          <div className="mb-5 flex flex-wrap items-center gap-2">
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
          <h1 className="mb-4 text-3xl leading-tight font-black text-white md:text-4xl">
            {course.title}
          </h1>

          {/* Subtitle */}
          <p className="mb-7 max-w-2xl text-base leading-relaxed text-white/65">
            {course.subtitle}
          </p>

          {/* Rating Bar */}
          <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} fill="#ffc107" color="#ffc107" />
                ))}
              </div>
              <span className="font-bold text-yellow-400">{course.rating}</span>
              <span className="text-white/50">({course.totalReviews} reviews)</span>
            </div>

            <span className="text-white/25">•</span>

            <span className="flex items-center gap-1.5 text-white/70">
              <Users size={14} className="text-white/50" />
              <span>
                <span className="font-semibold text-white">{course.enrolled}</span> students
                enrolled
              </span>
            </span>

            <span className="text-white/25">•</span>

            <span className="flex items-center gap-1.5 text-white/70">
              <Clock size={14} className="text-white/50" />
              <span>
                <span className="font-semibold text-white">{course.duration}</span> total length
              </span>
            </span>
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
                className="flex items-center gap-1.5 rounded-sm border border-white/10 bg-white/10 px-3 py-1.5 text-xs text-white/80 backdrop-blur-sm"
              >
                <span className="text-white/50">{pill.icon}</span>
                {pill.text}
              </div>
            ))}
          </div>

          {/* Instructor */}
          <div className="flex w-fit items-center gap-3 rounded-sm border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
            <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-white/20">
              <Image
                src={course.instructor.image}
                alt={course.instructor.name}
                width={150}
                height={150}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="text-xs text-white/50">Your Instructor</p>
              <p className="font-semibold text-white">{course.instructor.name}</p>
              <p className="text-xs text-white/60">{course.instructor.title}</p>
            </div>
            <div className="ml-4 flex items-center gap-4 border-l border-white/10 pl-4">
              <div className="text-center">
                <p className="text-sm font-bold text-white">{course.instructor.rating}</p>
                <p className="text-xs text-white/50">Rating</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-white">{course.instructor.students}</p>
                <p className="text-xs text-white/50">Students</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-white">{course.instructor.courses}</p>
                <p className="text-xs text-white/50">Courses</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
