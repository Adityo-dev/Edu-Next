/* eslint-disable no-unused-vars */
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { CheckCircle, PlayCircle } from 'lucide-react';
import { use, useState } from 'react';

// Helper to extract Youtube video ID from url
const getYouTubeID = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// --- Mock Data ---
const mockCurriculum = [
  {
    section: 'Getting Started',
    lessons: [
      {
        id: '1',
        title: 'Course Introduction',
        duration: '5:00',
        videoUrl:
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        completed: true,
      },
      {
        id: '2',
        title: 'Setting up the environment',
        duration: '12:30',
        videoUrl: 'https://www.youtube.com/watch?v=SqcY0GlETPk',
        completed: false,
      },
    ],
  },
  {
    section: 'Core Concepts',
    lessons: [
      {
        id: '3',
        title: 'Understanding React',
        duration: '15:20',
        videoUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8',
        completed: false,
      },
      {
        id: '4',
        title: 'State and Props',
        duration: '20:00',
        videoUrl: 'https://www.youtube.com/watch?v=Ke90Tje7VS0',
        completed: false,
      },
    ],
  },
];

export default function CoursePlayerPage({ params }: { params: Promise<{ id: string }> }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id } = use(params);
  const [currentLesson, setCurrentLesson] = useState(mockCurriculum[0].lessons[0]);

  // Determine if it's a YouTube URL or a direct video file (mp4)
  const isYouTube =
    currentLesson.videoUrl?.includes('youtube') || currentLesson.videoUrl?.includes('youtu.be');
  const videoId = isYouTube ? getYouTubeID(currentLesson.videoUrl) : null;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col bg-slate-50 lg:flex-row">
      {/* Left Side: Video Player & Content */}
      <div className="flex w-full flex-col lg:flex-1">
        {/* Video Player (Theater Mode Style) */}
        <div className="relative aspect-video w-full bg-slate-950 shadow-md">
          {isYouTube ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
              title={currentLesson.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          ) : (
            <video
              key={currentLesson.videoUrl} // Force re-render when video changes
              className="absolute inset-0 h-full w-full"
              controls
              controlsList="nodownload"
              autoPlay
              src={currentLesson.videoUrl}
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        <div className="mx-auto w-full max-w-5xl p-6 md:p-8">
          <h1 className="mb-2 text-2xl font-bold text-slate-900 md:text-3xl">
            {currentLesson.title}
          </h1>
          <p className="mb-8 font-medium text-slate-500">Duration: {currentLesson.duration}</p>

          <div className="prose max-w-none">
            <h3 className="mb-3 text-lg font-semibold text-slate-900">About this lesson</h3>
            <p className="leading-relaxed text-slate-600">
              Welcome to this lesson on <strong>{currentLesson.title}</strong>. In this video, we
              will cover the foundational concepts you need to succeed. Make sure to code along and
              practice the examples shown in the video. If you have any questions, feel free to use
              the Q&A section below (coming soon).
            </p>
          </div>
        </div>
      </div>

      {/* Right Side: Curriculum Sidebar */}
      <div className="z-10 flex w-full shrink-0 flex-col border-slate-200 bg-white shadow-xs lg:h-full lg:w-[420px] lg:border-l xl:w-[480px]">
        <div className="sticky top-0 z-20 border-b border-slate-200 bg-white p-5">
          <h2 className="text-lg font-bold text-slate-900">Course Content</h2>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-500"
              style={{ width: '25%' }}
            ></div>
          </div>
          <p className="mt-2 text-xs font-medium text-slate-500">1 of 4 lessons completed</p>
        </div>

        <div className="custom-scrollbar flex-1 overflow-y-auto p-4">
          <Accordion type="multiple" defaultValue={['section-0']} className="space-y-3">
            {mockCurriculum.map((section, si) => (
              <AccordionItem
                key={si}
                value={`section-${si}`}
                className="overflow-hidden rounded-md border border-slate-200"
              >
                <AccordionTrigger className="bg-slate-50 px-4 py-3 transition-colors hover:bg-slate-100 hover:no-underline data-[state=open]:border-b data-[state=open]:border-slate-200 data-[state=open]:bg-slate-50">
                  <div className="flex items-center gap-3">
                    <span className="text-left text-sm font-semibold text-slate-800">
                      {section.section}
                    </span>
                  </div>
                  <span className="text-xs font-normal text-slate-500">
                    {section.lessons.length} lessons
                  </span>
                </AccordionTrigger>
                <AccordionContent className="bg-white px-0 pb-0">
                  <div className="divide-y divide-slate-100">
                    {section.lessons.map((lesson) => {
                      const isActive = currentLesson.id === lesson.id;
                      return (
                        <div
                          key={lesson.id}
                          onClick={() => setCurrentLesson(lesson)}
                          className={`flex cursor-pointer items-start gap-3 px-4 py-3 transition-all duration-200 ${
                            isActive
                              ? 'border-l-[3px] border-emerald-500 bg-emerald-50/60 shadow-inner'
                              : 'border-l-[3px] border-transparent hover:bg-slate-50'
                          }`}
                        >
                          <div className="mt-0.5 shrink-0">
                            {lesson.completed ? (
                              <CheckCircle size={16} className="text-emerald-500 drop-shadow-sm" />
                            ) : isActive ? (
                              <PlayCircle size={16} className="fill-emerald-100 text-emerald-600" />
                            ) : (
                              <PlayCircle
                                size={16}
                                className="text-slate-300 transition-colors hover:text-slate-400"
                              />
                            )}
                          </div>
                          <div className="flex flex-1 flex-col">
                            <span
                              className={`text-sm ${isActive ? 'font-semibold text-emerald-900' : 'text-slate-700'}`}
                            >
                              {lesson.title}
                            </span>
                            <span className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                              {lesson.duration}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
