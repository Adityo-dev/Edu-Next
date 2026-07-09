/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { BookOpen, PlayCircle, Star, Users } from 'lucide-react';
import Image from 'next/image';

export default function SkillsAndTeacher({
  course,
  totalLessons,
}: {
  course: any;
  totalLessons: number;
}) {
  return (
    <>
      {/* What You'll Learn */}
      <div className="relative overflow-hidden rounded-md border border-slate-200 bg-white p-4 shadow-xs">
        <div
          className="prose prose-emerald prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed prose-p:mb-4 prose-ol:list-decimal prose-ul:list-disc prose-ol:ml-5 prose-ul:ml-5 prose-li:mb-2 marker:text-primary max-w-none text-slate-600"
          dangerouslySetInnerHTML={{ __html: course.whatYouLearn }}
        />
      </div>

      {/* Requirements */}
      <div className="relative overflow-hidden rounded-md border border-slate-200 bg-white p-4 shadow-xs">
        <div
          className="prose prose-emerald prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed prose-p:mb-4 prose-ol:list-decimal prose-ul:list-disc prose-ol:ml-5 prose-ul:ml-5 prose-li:mb-2 marker:text-primary max-w-none text-slate-600"
          dangerouslySetInnerHTML={{ __html: course.requirements }}
        />
      </div>

      {/* Curriculum */}
      <div className="relative overflow-hidden rounded-md border border-slate-200 bg-white p-4 shadow-xs">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Course Curriculum</h2>
          <span className="text-text-secondary text-sm">
            {course.curriculum.length} sections • {totalLessons} lessons • {course.duration}
          </span>
        </div>

        <Accordion type="multiple" defaultValue={['section-0']} className="space-y-2">
          {course.curriculum.map((section: any, si: number) => (
            <AccordionItem
              key={si}
              value={`section-${si}`}
              className="overflow-hidden rounded-sm border border-slate-100 data-[state=open]:border-emerald-100"
            >
              <AccordionTrigger className="bg-slate-50 px-5 py-4 hover:bg-emerald-50/50 hover:no-underline data-[state=open]:bg-emerald-50">
                <div className="flex items-center gap-3">
                  <BookOpen size={16} className="text-primary shrink-0" />
                  <span className="text-left text-sm font-semibold">{section.section}</span>
                </div>
                <span className="text-text-secondary mr-3 ml-auto text-xs">
                  {section.lessons.length} lessons
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-0 pb-0">
                <div className="divide-y divide-slate-50">
                  {section.lessons.map((lesson: any, li: number) => (
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
      <div className="relative overflow-hidden rounded-md border border-slate-200 bg-white p-4 shadow-xs">
        <h2 className="mb-6 text-xl font-semibold">About the Instructor</h2>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="border-primary/20 h-12 w-12 overflow-hidden rounded-full border-2">
            <Image
              src={course.instructor.image}
              alt={course.instructor.name}
              width={150}
              height={150}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{course.instructor.name}</h3>
            <p className="text-primary mb-4 text-sm font-medium">{course.instructor.title}</p>
            <div className="mb-4 flex flex-wrap gap-4 text-sm">
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
            <p className="text-text-secondary text-sm leading-relaxed">{course.instructor.bio}</p>
          </div>
        </div>
      </div>
    </>
  );
}
