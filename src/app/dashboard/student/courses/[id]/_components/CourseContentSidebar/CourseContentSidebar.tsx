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
      className={`z-10 flex w-full shrink-0 flex-col bg-white text-slate-900 shadow-xs lg:h-full lg:w-[420px] xl:w-[450px] ${isMobile ? 'border-b border-slate-200' : 'border-l border-slate-200'}`}
    >
      {/* Mobile Toggle Button */}
      {isMobile && (
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="flex w-full items-center justify-between bg-slate-50 p-4 transition-colors hover:bg-slate-100"
        >
          <div className="flex items-center gap-2">
            <BookOpen size={18} className="text-emerald-600" />
            <span className="font-semibold text-slate-800">Course Curriculum</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-500">
              {completedLessons}/{totalLessons}
            </span>
            <ChevronDown
              size={18}
              className={`text-slate-500 transition-transform duration-200 ${
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
        <div className="sticky top-0 z-20 border-b border-slate-200 bg-white p-5 pb-4 shadow-sm">
          <div className="relative mb-4">
            <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search course lessons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md border border-slate-200 bg-slate-50 py-2 pr-4 pl-9 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <h3 className="mb-1 text-sm font-semibold text-slate-900">
              {completedLessons} / {totalLessons} lessons completed • Progress{' '}
              {Math.round(progressPercentage)}%
            </h3>
            <p className="mb-2 text-xs text-slate-500">Complete all lessons to get certificate</p>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Accordion Modules */}
        <div className="custom-scrollbar max-h-[60vh] flex-1 overflow-y-auto lg:max-h-none">
          {filteredSections.length === 0 ? (
            <div className="p-6 text-center text-sm text-slate-500">No lessons found.</div>
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
                  className="border-b border-slate-200"
                >
                  <AccordionTrigger className="bg-slate-50 px-5 py-4 transition-colors hover:bg-slate-100 hover:no-underline data-[state=open]:bg-white">
                    <div className="flex w-full flex-col items-start gap-1 pr-4 text-left">
                      <span className="text-sm font-semibold text-slate-800">{section.title}</span>
                      <span className="text-xs font-normal text-slate-500">
                        {section.lessons.length} lessons
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-white pt-0 pb-0">
                    <div className="flex flex-col divide-y divide-slate-100">
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
                                ? 'border-emerald-500 bg-emerald-50/60'
                                : 'border-transparent hover:bg-slate-50'
                            }`}
                          >
                            <div className="mt-0.5 shrink-0">
                              {isCompleted ? (
                                <CheckCircle
                                  size={16}
                                  className="text-emerald-500 drop-shadow-sm"
                                />
                              ) : isActive ? (
                                <PlayCircle
                                  size={16}
                                  className="fill-emerald-100 text-emerald-600"
                                />
                              ) : (
                                <PlayCircle
                                  size={16}
                                  className="text-slate-300 transition-colors hover:text-slate-400"
                                />
                              )}
                            </div>
                            <div className="flex flex-1 flex-col">
                              <span
                                className={`text-sm ${
                                  isActive ? 'font-semibold text-emerald-900' : 'text-slate-700'
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
