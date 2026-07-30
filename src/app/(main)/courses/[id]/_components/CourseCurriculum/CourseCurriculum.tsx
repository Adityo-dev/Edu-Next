'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { BookOpen, Lock, PlayCircle, X } from 'lucide-react';
import { useState } from 'react';

interface Lesson {
  title: string;
  duration: string;
  free: boolean;
  videoUrl?: string;
}

interface Section {
  section: string;
  lessons: Lesson[];
}

interface CourseCurriculumProps {
  curriculum: Section[];
  totalLessons: number;
  duration: string;
}

// Helper to extract Youtube video ID from url
const getYouTubeID = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export default function CourseCurriculum({
  curriculum,
  totalLessons,
  duration,
}: CourseCurriculumProps) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState<string>('');

  const handlePlayVideo = (lesson: Lesson) => {
    if (lesson.videoUrl) {
      const videoId = getYouTubeID(lesson.videoUrl);
      if (videoId) {
        setSelectedVideo(videoId);
        setVideoTitle(lesson.title);
      }
    }
  };

  return (
    <>
      <div className="relative overflow-hidden rounded-md border border-slate-200 bg-white p-4 shadow-xs">
        <div className="mb-4 flex flex-col gap-1 sm:mb-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold sm:text-xl">Course Curriculum</h2>
          <span className="text-text-secondary text-xs sm:text-sm">
            {curriculum?.length || 0} Modules • {totalLessons} lessons • {duration}
          </span>
        </div>

        <Accordion type="multiple" defaultValue={['section-0']} className="space-y-2">
          {curriculum?.map((section, si) => (
            <AccordionItem
              key={si}
              value={`section-${si}`}
              className="overflow-hidden rounded-sm border border-slate-100 data-[state=open]:border-emerald-100"
            >
              <AccordionTrigger className="bg-slate-50 px-4 py-4 hover:bg-emerald-50/50 hover:no-underline data-[state=open]:bg-emerald-50 sm:px-5">
                <div className="flex min-w-0 flex-1 items-center gap-3 pr-2 text-left">
                  <BookOpen size={16} className="text-primary shrink-0" />
                  <span className="text-sm leading-tight font-semibold">{section.section}</span>
                </div>
                <span className="text-text-secondary mr-2 shrink-0 text-xs whitespace-nowrap sm:mr-3">
                  {section.lessons.length} lessons
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-0 pb-0">
                <div className="divide-y divide-slate-50">
                  {section.lessons.map((lesson, li) => (
                    <div
                      key={li}
                      onClick={() => handlePlayVideo(lesson)}
                      className={`flex items-start justify-between gap-3 px-4 py-3.5 sm:items-center sm:gap-4 sm:px-5 ${
                        lesson.videoUrl ? 'cursor-pointer hover:bg-slate-50' : ''
                      }`}
                    >
                      <div className="flex min-w-0 flex-1 items-start gap-3 sm:items-center">
                        <div className="mt-0.5 shrink-0 sm:mt-0">
                          {lesson.videoUrl ? (
                            <PlayCircle size={16} className="text-primary" />
                          ) : (
                            <Lock size={16} className="text-slate-300" />
                          )}
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                          <span className="text-sm leading-tight text-slate-600">
                            {lesson.title}
                          </span>
                          {lesson.free && (
                            <span className="text-primary w-fit shrink-0 rounded-sm bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap sm:text-xs">
                              Free Preview
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-text-secondary mt-0.5 shrink-0 text-xs whitespace-nowrap sm:mt-0">
                        {lesson.duration}
                      </span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <Dialog open={!!selectedVideo} onOpenChange={(open) => !open && setSelectedVideo(null)}>
        <DialogContent
          showCloseButton={false}
          className="w-[95vw] max-w-5xl gap-0 overflow-hidden rounded-md border border-slate-800 bg-black p-0 shadow-2xl xl:max-w-6xl"
        >
          <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
            <DialogTitle className="flex items-center gap-2.5 text-base leading-none font-semibold text-white sm:text-lg">
              <PlayCircle className="text-primary h-5 w-5 shrink-0" />
              <span className="line-clamp-1">{videoTitle}</span>
            </DialogTitle>
            <button
              onClick={() => setSelectedVideo(null)}
              className="hover:bg-danger cursor-pointer rounded-full bg-white/10 p-2 text-white/70 transition-all outline-none hover:text-white"
            >
              <X size={18} strokeWidth={2.5} />
            </button>
          </div>
          <div className="relative aspect-video w-full">
            {selectedVideo && (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0&modestbranding=1`}
                title={videoTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-none"
              ></iframe>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
