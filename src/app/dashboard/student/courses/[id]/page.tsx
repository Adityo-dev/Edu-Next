'use client';

import { Loader2 } from 'lucide-react';
import { use, useEffect, useState, useCallback, useMemo, useRef } from 'react';
import {
  useGetCoursePlaybackDataQuery,
  useMarkLessonAsCompleteMutation,
} from '@/redux/features/courseManagement/studentCourse.api';
import { ILesson } from '@/types/courseManagement.types';
import VideoPlayer from './_components/VideoPlayer/VideoPlayer';
import LessonInfoTabs from './_components/LessonInfoTabs/LessonInfoTabs';
import CourseContentSidebar, {
  ICourseSection,
} from './_components/CourseContentSidebar/CourseContentSidebar';

export default function CoursePlayerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data, isLoading } = useGetCoursePlaybackDataQuery(id);
  const [markLessonAsComplete] = useMarkLessonAsCompleteMutation();

  const courseData = data?.data?.course;
  const progressData = data?.data?.progress;

  const [selectedLesson, setSelectedLesson] = useState<ILesson | null>(null);

  // The actual lesson to display
  const currentLesson = selectedLesson || (courseData?.sections?.[0]?.lessons?.[0] ?? null);

  // Flatten all lessons to calculate Next/Prev easily
  const allLessons = useMemo(() => {
    if (!courseData?.sections) return [];
    return courseData.sections.flatMap((section: ICourseSection) => section.lessons) as ILesson[];
  }, [courseData]);

  // Calculate Next and Prev lessons
  const currentLessonIndex = useMemo(() => {
    if (!currentLesson) return -1;
    return allLessons.findIndex((l) => l._id === currentLesson._id);
  }, [currentLesson, allLessons]);

  const prevLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
  const nextLesson =
    currentLessonIndex !== -1 && currentLessonIndex < allLessons.length - 1
      ? allLessons[currentLessonIndex + 1]
      : null;

  const handlePrevLesson = () => {
    if (prevLesson) setSelectedLesson(prevLesson);
  };

  const handleNextLesson = () => {
    if (nextLesson) setSelectedLesson(nextLesson);
  };

  // --- Completion Tracking State ---
  const completionFiredRef = useRef(false);

  // Reset when the user switches lessons
  useEffect(() => {
    completionFiredRef.current = false;
  }, [currentLesson?._id]);

  // Fire lesson completion
  const fireCompletion = useCallback(
    (reason: string) => {
      if (completionFiredRef.current) return;
      if (!currentLesson?._id || !courseData?._id) return;

      const isAlreadyCompleted = progressData?.completedLessons?.includes(
        currentLesson._id as string,
      );
      if (isAlreadyCompleted) return;

      console.log(`[Completion] ✅ ${reason} — marking lesson complete`);
      markLessonAsComplete({
        courseId: courseData._id,
        lessonId: currentLesson._id as string,
      });
      completionFiredRef.current = true;
    },
    [currentLesson, courseData, progressData, markLessonAsComplete],
  );

  const handleReachedEnd = useCallback(() => {
    fireCompletion('Video position reached 99%+');
  }, [fireCompletion]);

  const handleVideoEnded = useCallback(() => {
    fireCompletion('Video playback ended');
  }, [fireCompletion]);

  const handleFullScreen = () => {
    // Basic full screen implementation for the container
    const playerContainer = document.getElementById('video-player-container');
    if (playerContainer) {
      if (!document.fullscreenElement) {
        playerContainer.requestFullscreen().catch((err) => {
          console.error(
            `Error attempting to enable full-screen mode: ${err.message} (${err.name})`,
          );
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-50">
        <Loader2 className="h-10 w-10 animate-spin text-emerald-500" />
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-50">
        <p className="text-lg font-medium text-slate-500">Course not found or access denied.</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col bg-slate-50 lg:flex-row">
      {/* Left Side on Desktop: Video Player & Tabs */}
      <div className="flex w-full flex-col overflow-hidden lg:flex-1">
        {/* Video Player Container */}
        <div
          id="video-player-container"
          className="relative aspect-video w-full bg-slate-950 shadow-md"
        >
          <VideoPlayer
            videoUrl={currentLesson?.videoUrl || ''}
            title={currentLesson?.title || ''}
            onVideoEnded={handleVideoEnded}
            onReachedEnd={handleReachedEnd}
          />
        </div>

        {/* Mobile Only: Course Curriculum inserted here between Video and Tabs */}
        <div className="block w-full lg:hidden">
          <CourseContentSidebar
            courseData={courseData}
            progressData={progressData}
            currentLessonId={currentLesson?._id as string}
            onSelectLesson={setSelectedLesson}
            isMobile={true}
          />
        </div>

        {/* Tabs and Navigation */}
        <div className="custom-scrollbar flex-1 overflow-y-auto">
          <LessonInfoTabs
            currentLesson={currentLesson}
            onPrevLesson={handlePrevLesson}
            onNextLesson={handleNextLesson}
            hasNext={!!nextLesson}
            hasPrev={!!prevLesson}
            onFullScreen={handleFullScreen}
          />
        </div>
      </div>

      {/* Right Side: Curriculum Sidebar (Desktop Only) */}
      <div className="hidden lg:flex">
        <CourseContentSidebar
          courseData={courseData}
          progressData={progressData}
          currentLessonId={currentLesson?._id as string}
          onSelectLesson={setSelectedLesson}
          isMobile={false}
        />
      </div>
    </div>
  );
}
