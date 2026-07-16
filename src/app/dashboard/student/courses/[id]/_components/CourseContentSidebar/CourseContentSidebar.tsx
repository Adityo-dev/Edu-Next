/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Search, CheckCircle, PlayCircle, ChevronDown, BookOpen } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ILesson } from '@/types/courseManagement.types';

export interface ICourseSection {
  _id?: string;
  title: string;
  lessons: ILesson[];
}

export interface ICourseData {
  lessonsCount: number;
  sections: ICourseSection[];
}

export interface IProgressData {
  completedLessonsCount: number;
  percentage: number;
  completedLessons: string[];
}

interface CourseContentSidebarProps {
  courseData: ICourseData;
  progressData?: IProgressData;
  currentLessonId: string | undefined;
  onSelectLesson: (lesson: ILesson) => void;
  isMobile?: boolean;
}

export default function CourseContentSidebar({
  courseData,
  progressData,
  currentLessonId,
  onSelectLesson,
  isMobile = false,
}: CourseContentSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const totalLessons = courseData?.lessonsCount || 0;
  const completedLessons = progressData?.completedLessonsCount || 0;
  const progressPercentage = progressData?.percentage || 0;

  const filteredSections = courseData.sections
    .map((section: ICourseSection) => {
      const filteredLessons = section.lessons.filter((lesson: ILesson) =>
        lesson.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      if (
        section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        filteredLessons.length > 0
      ) {
        return {
          ...section,
          lessons: section.title.toLowerCase().includes(searchQuery.toLowerCase())
            ? section.lessons
            : filteredLessons,
        };
      }
      return null;
    })
    .filter((section): section is ICourseSection => section !== null);

  return (
    <div
      className={`bg-pure-white text-text-primary z-10 flex w-full shrink-0 flex-col shadow-xs lg:h-full lg:w-[420px] xl:w-[450px] ${isMobile ? 'border-subtle border-b' : 'border-subtle border-l'}`}
    >
      {/* Mobile Toggle Button */}
      {isMobile && (
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-section-slate hover:bg-teal-accent flex w-full items-center justify-between p-4 transition-colors"
        >
          <div className="flex items-center gap-2">
            <BookOpen size={18} className="text-primary" />
            <span className="text-text-primary font-semibold">Course Curriculum</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="border-subtle bg-pure-white text-text-secondary rounded-md border px-2 py-1 text-xs font-medium">
              {completedLessons}/{totalLessons}
            </span>
            <ChevronDown
              size={18}
              className={`text-text-secondary transition-transform duration-200 ${
                isMobileOpen ? 'rotate-180' : ''
              }`}
            />
          </div>
        </button>
      )}

      {/* Main Content (Hidden on mobile if not open) */}
      <div
        className={`${isMobile ? (isMobileOpen ? 'flex' : 'hidden') : 'flex'} flex-1 flex-col overflow-hidden`}
      >
        {/* Sidebar Header: Search & Progress */}
        <div className="border-subtle bg-pure-white sticky top-0 z-20 border-b p-5 pb-4 shadow-sm">
          <div className="relative mb-4">
            <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search course lessons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="focus:border-primary focus:ring-primary border-subtle bg-section-slate text-text-primary placeholder:text-text-placeholder w-full rounded-md border py-2 pr-4 pl-9 text-sm transition-colors focus:ring-1 focus:outline-none"
            />
          </div>

          <div>
            <h3 className="text-text-primary mb-1 text-sm font-semibold">
              {completedLessons} / {totalLessons} lessons completed • Progress{' '}
              {Math.round(progressPercentage)}%
            </h3>
            <p className="text-text-secondary mb-2 text-xs">
              Complete all lessons to get certificate
            </p>
            <div className="bg-teal-accent h-1.5 w-full overflow-hidden rounded-full">
              <div
                className="bg-primary h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Accordion Modules */}
        <div className="custom-scrollbar max-h-[60vh] flex-1 overflow-y-auto lg:max-h-none">
          {filteredSections.length === 0 ? (
            <div className="text-text-secondary p-6 text-center text-sm">No lessons found.</div>
          ) : (
            <Accordion
              type="multiple"
              defaultValue={courseData.sections.map(
                (_: ICourseSection, i: number) => `section-${i}`,
              )}
              className="w-full"
            >
              {filteredSections.map((section: ICourseSection, si: number) => (
                <AccordionItem
                  key={section._id || si}
                  value={`section-${si}`}
                  className="border-subtle border-b"
                >
                  <AccordionTrigger className="bg-section-slate hover:bg-teal-accent data-[state=open]:bg-pure-white px-5 py-4 transition-colors hover:no-underline">
                    <div className="flex w-full flex-col items-start gap-1 pr-4 text-left">
                      <span className="text-text-primary text-sm font-semibold">
                        {section.title}
                      </span>
                      <span className="text-text-secondary text-xs font-normal">
                        {section.lessons.length} lessons
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-pure-white pt-0 pb-0">
                    <div className="divide-subtle flex flex-col divide-y">
                      {section.lessons.map((lesson: ILesson) => {
                        const isActive = currentLessonId === lesson._id;
                        const isCompleted = progressData?.completedLessons?.includes(
                          lesson._id as string,
                        );

                        return (
                          <button
                            key={lesson._id}
                            onClick={() => onSelectLesson(lesson)}
                            className={`flex items-start gap-3 border-l-2 px-5 py-3 text-left transition-colors duration-200 ${
                              isActive
                                ? 'border-primary bg-primary/10'
                                : 'hover:bg-section-slate border-transparent'
                            }`}
                          >
                            <div className="mt-0.5 shrink-0">
                              {isCompleted ? (
                                <CheckCircle size={16} className="text-primary drop-shadow-sm" />
                              ) : isActive ? (
                                <PlayCircle size={16} className="fill-primary/20 text-primary" />
                              ) : (
                                <PlayCircle
                                  size={16}
                                  className="text-text-placeholder hover:text-text-secondary transition-colors"
                                />
                              )}
                            </div>
                            <div className="flex flex-1 flex-col">
                              <span
                                className={`text-sm ${
                                  isActive ? 'text-primary font-semibold' : 'text-text-secondary'
                                }`}
                              >
                                {lesson.title}
                              </span>
                              <span className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                                {lesson.duration}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </div>
    </div>
  );
}
