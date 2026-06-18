'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import {
  Award,
  BookOpen,
  CheckCircle,
  Clock,
  Globe,
  Heart,
  MonitorPlay,
  PlayCircle,
  Share2,
  Star,
  Users,
  Video,
  Wifi,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// ─── Mock Data ────────────────────────────────────────────────────────────────

const course = {
  id: 1,
  title: 'Complete Web Development Bootcamp 2025',
  subtitle:
    'Master HTML, CSS, JavaScript, React, Node.js and more — from beginner to job-ready developer.',
  instructor: {
    name: 'Md. Rafiqul Islam',
    title: 'Senior Web Developer & Instructor',
    image: 'https://i.pravatar.cc/150?u=rafiq',
    students: '4.2k',
    courses: 8,
    rating: 4.9,
    bio: 'Rafiqul is a senior web developer with over 8 years of industry experience. He has worked with top tech companies and has been teaching web development on EduNext for the past 3 years. His courses are known for being practical, detailed, and beginner-friendly.',
  },
  category: 'Web Development',
  level: 'Beginner',
  language: 'বাংলা',
  rating: 4.9,
  totalReviews: 320,
  enrolled: '1.2k',
  duration: '24 hrs',
  lessons: 48,
  lastUpdated: 'April 2025',
  price: 1500,
  badge: 'Best Seller',
  certificate: true,
  image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1000',

  whatYouLearn: [
    'Build real-world websites from scratch using HTML & CSS',
    'Master JavaScript fundamentals and ES6+ features',
    'Develop modern web apps with React.js',
    'Build backend APIs with Node.js and Express',
    'Connect your app to a database using MongoDB',
    'Deploy your projects live on the internet',
    'Understand Git & GitHub for version control',
    'Build a complete portfolio to get hired as a developer',
  ],

  requirements: [
    'No prior programming experience needed — we start from zero',
    'A computer with internet access (Windows, Mac, or Linux)',
    'Willingness to learn and practice consistently',
    'Basic computer skills (browsing, file management)',
  ],

  curriculum: [
    {
      section: 'Getting Started',
      lessons: [
        { title: 'Course Introduction & Setup', duration: '10:00', free: true },
        { title: 'How the Web Works', duration: '15:00', free: true },
        { title: 'Installing VS Code & Extensions', duration: '08:00', free: false },
      ],
    },
    {
      section: 'HTML Fundamentals',
      lessons: [
        { title: 'HTML Document Structure', duration: '20:00', free: false },
        { title: 'Semantic HTML Tags', duration: '18:00', free: false },
        { title: 'HTML Forms & Inputs', duration: '22:00', free: false },
        { title: 'HTML Project: Personal Portfolio', duration: '45:00', free: false },
      ],
    },
    {
      section: 'CSS & Styling',
      lessons: [
        { title: 'CSS Basics & Selectors', duration: '25:00', free: false },
        { title: 'Flexbox & Grid Layout', duration: '30:00', free: false },
        { title: 'Responsive Design & Media Queries', duration: '28:00', free: false },
        { title: 'CSS Animations & Transitions', duration: '20:00', free: false },
      ],
    },
    {
      section: 'JavaScript',
      lessons: [
        { title: 'JavaScript Variables & Data Types', duration: '22:00', free: false },
        { title: 'Functions, Loops & Arrays', duration: '35:00', free: false },
        { title: 'DOM Manipulation', duration: '30:00', free: false },
        { title: 'ES6+ Modern JavaScript', duration: '40:00', free: false },
      ],
    },
    {
      section: 'React.js',
      lessons: [
        { title: 'Introduction to React', duration: '20:00', free: false },
        { title: 'Components, Props & State', duration: '35:00', free: false },
        { title: 'Hooks: useState & useEffect', duration: '40:00', free: false },
        { title: 'Building a Full React Project', duration: '60:00', free: false },
      ],
    },
  ],

  reviews: [
    {
      id: 1,
      name: 'Sumaiya Akter',
      image: 'https://i.pravatar.cc/150?u=sumaiya',
      rating: 5,
      date: 'March 2025',
      text: 'This is the best web development course I have ever taken. The instructor explains everything clearly and the projects are very practical. Highly recommended!',
    },
    {
      id: 2,
      name: 'Nusrat Jahan',
      image: 'https://i.pravatar.cc/150?u=nusrat',
      rating: 5,
      date: 'February 2025',
      text: 'I started with zero knowledge and now I can build full websites. The curriculum is well-structured and the live session was very helpful.',
    },
    {
      id: 3,
      name: 'Arif Hossain',
      image: 'https://i.pravatar.cc/150?u=arif',
      rating: 4,
      date: 'January 2025',
      text: 'Great course overall. The JavaScript section was very detailed. Got my first freelancing project after completing this course!',
    },
  ],

  relatedCourses: [
    {
      id: 2,
      title: 'UI/UX Design Masterclass',
      price: 1800,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=600',
      instructor: 'Farhan Hossain',
    },
    {
      id: 7,
      title: 'Mobile App Development with Flutter',
      price: 2000,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=600',
      instructor: 'Tanvir Ahmed',
    },
    {
      id: 9,
      title: 'Machine Learning & AI Basics',
      price: 2200,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600',
      instructor: 'Rakibul Hasan',
    },
  ],
};

const ratingBreakdown = [
  { stars: 5, percent: 72 },
  { stars: 4, percent: 18 },
  { stars: 3, percent: 6 },
  { stars: 2, percent: 3 },
  { stars: 1, percent: 1 },
];

// ─── Component ────────────────────────────────────────────────────────────────

const CourseDetailsPage = () => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const totalLessons = course.curriculum.reduce((acc, s) => acc + s.lessons.length, 0);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* ── Hero Banner ──────────────────────────────────────────────────────── */}
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
            <h1 className="mb-4 text-3xl leading-tight font-black text-white md:text-5xl">
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
              <Image
                src={course.instructor.image}
                alt={course.instructor.name}
                width={44}
                height={44}
                className="rounded-full border-2 border-white/20"
              />
              <div>
                <p className="text-xs text-white/50">Your Instructor</p>
                <p className="font-bold text-white">{course.instructor.name}</p>
                <p className="text-xs text-white/60">{course.instructor.title}</p>
              </div>
              <div className="ml-4 flex items-center gap-4 border-l border-white/10 pl-4">
                <div className="text-center">
                  <p className="text-sm font-black text-white">{course.instructor.rating}</p>
                  <p className="text-xs text-white/50">Rating</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-black text-white">{course.instructor.students}</p>
                  <p className="text-xs text-white/50">Students</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-black text-white">{course.instructor.courses}</p>
                  <p className="text-xs text-white/50">Courses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-400 px-6 py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* ── Left: Course Content ─────────────────────────────────────────── */}
          <div className="min-w-0 flex-1 space-y-6">
            {/* What You'll Learn */}
            <div className="rounded-md border border-slate-100 bg-white p-8 shadow-xs">
              <h2 className="mb-6 text-2xl font-bold">What You Will Learn</h2>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {course.whatYouLearn.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-primary mt-0.5 shrink-0" />
                    <span className="text-sm leading-relaxed text-slate-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="rounded-md border border-slate-100 bg-white p-8 shadow-xs">
              <h2 className="mb-6 text-2xl font-bold">Requirements</h2>
              <ul className="space-y-3">
                {course.requirements.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                    <span className="bg-primary mt-1.5 h-2 w-2 shrink-0 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Curriculum */}
            <div className="rounded-md border border-slate-100 bg-white p-8 shadow-xs">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Course Curriculum</h2>
                <span className="text-text-secondary text-sm">
                  {course.curriculum.length} sections • {totalLessons} lessons • {course.duration}
                </span>
              </div>

              <Accordion type="multiple" defaultValue={['section-0']} className="space-y-2">
                {course.curriculum.map((section, si) => (
                  <AccordionItem
                    key={si}
                    value={`section-${si}`}
                    className="overflow-hidden rounded-sm border border-slate-100 data-[state=open]:border-emerald-100"
                  >
                    <AccordionTrigger className="bg-slate-50 px-5 py-4 hover:bg-emerald-50/50 hover:no-underline data-[state=open]:bg-emerald-50">
                      <div className="flex items-center gap-3">
                        <BookOpen size={16} className="text-primary shrink-0" />
                        <span className="text-left text-sm font-bold">{section.section}</span>
                      </div>
                      <span className="text-text-secondary mr-3 ml-auto text-xs">
                        {section.lessons.length} lessons
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-0 pb-0">
                      <div className="divide-y divide-slate-50">
                        {section.lessons.map((lesson, li) => (
                          <div
                            key={li}
                            className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50"
                          >
                            <div className="flex items-center gap-3">
                              <PlayCircle
                                size={16}
                                className={lesson.free ? 'text-primary' : 'text-slate-300'}
                              />
                              <span className="text-sm text-slate-600">{lesson.title}</span>
                              {lesson.free && (
                                <span className="text-primary rounded-sm bg-emerald-50 px-2 py-0.5 text-xs font-semibold">
                                  Free Preview
                                </span>
                              )}
                            </div>
                            <span className="text-text-secondary text-xs">{lesson.duration}</span>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Instructor */}
            <div className="rounded-md border border-slate-100 bg-white p-8 shadow-xs">
              <h2 className="mb-6 text-2xl font-bold">About the Instructor</h2>
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                <div className="shrink-0">
                  <Image
                    src={course.instructor.image}
                    alt={course.instructor.name}
                    width={100}
                    height={100}
                    className="rounded-full border-4 border-emerald-50 shadow-sm"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{course.instructor.name}</h3>
                  <p className="text-primary mb-4 text-sm font-medium">{course.instructor.title}</p>
                  <div className="mb-4 flex flex-wrap gap-4 text-sm text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <Star size={14} fill="#ffc107" color="#ffc107" />
                      <span className="font-bold">{course.instructor.rating}</span> Rating
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users size={14} className="text-primary" />
                      {course.instructor.students} Students
                    </span>
                    <span className="flex items-center gap-1.5">
                      <BookOpen size={14} className="text-primary" />
                      {course.instructor.courses} Courses
                    </span>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {course.instructor.bio}
                  </p>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="rounded-md border border-slate-100 bg-white p-8 shadow-xs">
              <h2 className="mb-6 text-2xl font-bold">Student Reviews</h2>

              {/* Rating Overview */}
              <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center">
                {/* Big Number */}
                <div className="flex flex-col items-center justify-center rounded-md bg-[#F9FAFB] px-8 py-6 text-center">
                  <span className="text-primary text-6xl font-black">{course.rating}</span>
                  <div className="my-2 flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={16} fill={i < 5 ? '#ffc107' : 'none'} color="#ffc107" />
                    ))}
                  </div>
                  <span className="text-text-secondary text-sm">Course Rating</span>
                </div>

                {/* Breakdown */}
                <div className="flex-1 space-y-2">
                  {ratingBreakdown.map((r) => (
                    <div key={r.stars} className="flex items-center gap-3">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="bg-warning h-full rounded-full transition-all"
                          style={{ width: `${r.percent}%` }}
                        />
                      </div>
                      <div className="flex shrink-0 items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={11}
                            fill={i < r.stars ? '#ffc107' : 'none'}
                            color="#ffc107"
                          />
                        ))}
                      </div>
                      <span className="text-text-secondary w-8 text-right text-xs">
                        {r.percent}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="mb-6" />

              {/* Review Cards */}
              <div className="space-y-6">
                {course.reviews.map((review) => (
                  <div key={review.id} className="flex gap-4">
                    <Image
                      src={review.image}
                      alt={review.name}
                      width={44}
                      height={44}
                      className="h-11 w-11 shrink-0 rounded-full border-2 border-emerald-50"
                    />
                    <div className="flex-1">
                      <div className="mb-1 flex items-center justify-between">
                        <h4 className="font-semibold">{review.name}</h4>
                        <span className="text-text-secondary text-xs">{review.date}</span>
                      </div>
                      <div className="mb-2 flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            fill={i < review.rating ? '#ffc107' : 'none'}
                            color="#ffc107"
                          />
                        ))}
                      </div>
                      <p className="text-text-secondary text-sm leading-relaxed">{review.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Courses */}
            <div className="rounded-md border border-slate-100 bg-white p-8 shadow-xs">
              <h2 className="mb-6 text-2xl font-bold">Related Courses</h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                {course.relatedCourses.map((c) => (
                  <Link
                    href={`/courses/${c.id}`}
                    key={c.id}
                    className="group overflow-hidden rounded-md border border-slate-100 transition-all duration-300 hover:border-emerald-100 hover:shadow-sm"
                  >
                    <div className="relative h-36 overflow-hidden">
                      <Image
                        src={c.image}
                        alt={c.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="group-hover:text-primary mb-1 line-clamp-2 text-sm font-bold transition-colors">
                        {c.title}
                      </h4>
                      <p className="text-text-secondary mb-2 text-xs">{c.instructor}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-primary font-bold">৳{c.price.toLocaleString()}</span>
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                          <Star size={11} fill="#ffc107" color="#ffc107" />
                          {c.rating}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Sticky Buy Card ───────────────────────────────────────── */}
          <aside className="w-full lg:sticky lg:top-24 lg:w-80 lg:shrink-0">
            <div className="overflow-hidden rounded-md border border-slate-100 bg-white shadow-sm">
              {/* Course Thumbnail */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image src={course.image} alt={course.title} fill className="object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <div className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-white/90 shadow-lg transition-all hover:scale-105">
                    <PlayCircle size={28} className="text-primary ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-sm bg-black/70 px-3 py-1 text-xs font-medium text-white">
                  Preview this course
                </span>
              </div>

              {/* Price & Actions */}
              <div className="p-6">
                {/* Price */}
                <div className="mb-5">
                  <span className="text-primary text-4xl font-black">
                    ৳{course.price.toLocaleString()}
                  </span>
                </div>

                {/* Enroll Button */}
                <button className="bg-secondary mb-3 w-full cursor-pointer rounded-sm py-4 text-base font-bold text-white shadow-sm shadow-orange-100 transition-all hover:bg-[#d98c0a] active:scale-95">
                  Enroll Now
                </button>

                {/* Wishlist + Share */}
                <div className="mb-6 flex gap-3">
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-sm border py-3 text-sm font-semibold transition-all active:scale-95 ${
                      isWishlisted
                        ? 'border-red-200 bg-red-50 text-red-500'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
                    {isWishlisted ? 'Wishlisted' : 'Wishlist'}
                  </button>
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-sm border border-slate-200 py-3 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-50 active:scale-95">
                    <Share2 size={16} />
                    Share
                  </button>
                </div>

                <Separator className="mb-5" />

                {/* Course Includes */}
                <h4 className="mb-4 text-sm font-bold">This Course Includes:</h4>
                <ul className="space-y-3">
                  {[
                    { icon: <MonitorPlay size={16} />, text: `${course.duration} on-demand video` },
                    { icon: <BookOpen size={16} />, text: `${totalLessons} lessons` },
                    { icon: <Video size={16} />, text: 'Live sessions via Zoom' },
                    { icon: <Wifi size={16} />, text: 'Full lifetime access' },
                    { icon: <Globe size={16} />, text: `Language: ${course.language}` },
                    { icon: <Award size={16} />, text: 'Certificate of completion' },
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-slate-600">
                      <span className="text-primary">{item.icon}</span>
                      {item.text}
                    </li>
                  ))}
                </ul>

                <Separator className="my-5" />

                {/* Money Back */}
                <div className="flex items-start gap-3 rounded-sm bg-emerald-50 p-4">
                  <CheckCircle size={18} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-slate-700">7-Day Money-Back Guarantee</p>
                    <p className="text-text-secondary mt-0.5 text-xs leading-relaxed">
                      Not satisfied? Get a full refund within 7 days — no questions asked.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
