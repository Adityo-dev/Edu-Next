import { useState } from 'react';
import { Maximize, ArrowLeft, ArrowRight } from 'lucide-react';
import { ILesson } from '@/types/courseManagement.types';

interface LessonInfoTabsProps {
  currentLesson: ILesson | null;
  onPrevLesson: () => void;
  onNextLesson: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  onFullScreen: () => void;
}

export default function LessonInfoTabs({
  currentLesson,
  onPrevLesson,
  onNextLesson,
  hasNext,
  hasPrev,
  onFullScreen,
}: LessonInfoTabsProps) {
  const [activeTab, setActiveTab] = useState<'description' | 'reference' | 'quiz'>('description');

  return (
    <div className="flex w-full flex-col border-t border-slate-200 bg-white text-slate-600">
      {/* Navigation Bar */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-200 px-3 py-4 md:px-6">
        <button
          onClick={onPrevLesson}
          disabled={!hasPrev}
          className={`flex shrink-0 items-center justify-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium whitespace-nowrap transition-colors sm:px-4 sm:py-2 sm:text-sm ${
            hasPrev
              ? 'bg-emerald-500 text-white hover:bg-emerald-600'
              : 'cursor-not-allowed bg-slate-100 text-slate-400'
          }`}
        >
          <ArrowLeft size={16} className="shrink-0" />
          <span className="hidden sm:inline">Previous Lesson</span>
          <span className="sm:hidden">Prev</span>
        </button>

        <button
          onClick={onFullScreen}
          className="flex shrink-0 items-center justify-center gap-1.5 rounded-md p-2 text-xs font-medium whitespace-nowrap text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 sm:px-3 sm:py-2 sm:text-sm"
          title="Full Screen"
        >
          <Maximize size={18} className="shrink-0" />
          <span className="hidden sm:inline">Full Screen</span>
        </button>

        <button
          onClick={onNextLesson}
          disabled={!hasNext}
          className={`flex shrink-0 items-center justify-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium whitespace-nowrap transition-colors sm:px-4 sm:py-2 sm:text-sm ${
            hasNext
              ? 'bg-emerald-500 text-white hover:bg-emerald-600'
              : 'cursor-not-allowed bg-slate-100 text-slate-400'
          }`}
        >
          <span className="hidden sm:inline">Next Lesson</span>
          <span className="sm:hidden">Next</span>
          <ArrowRight size={16} className="shrink-0" />
        </button>
      </div>

      {/* Tabs */}
      <div className="custom-scrollbar overflow-x-auto bg-slate-50 px-4 pt-4 md:px-6">
        <div className="flex min-w-max items-center gap-4 border-b border-slate-200 sm:gap-6">
          <button
            onClick={() => setActiveTab('description')}
            className={`px-3 py-2 text-sm font-semibold whitespace-nowrap transition-colors sm:px-4 ${
              activeTab === 'description'
                ? 'border-b-2 border-emerald-500 bg-white text-emerald-600'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Video Description
          </button>
          <button
            onClick={() => setActiveTab('reference')}
            className={`px-3 py-2 text-sm font-semibold whitespace-nowrap transition-colors sm:px-4 ${
              activeTab === 'reference'
                ? 'border-b-2 border-emerald-500 bg-white text-emerald-600'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            References
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-3 py-2 text-sm font-semibold whitespace-nowrap transition-colors sm:px-4 ${
              activeTab === 'quiz'
                ? 'border-b-2 border-emerald-500 bg-white text-emerald-600'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Quiz
          </button>
        </div>
      </div>

      {/* Lesson Details Content */}
      <div className="mb-8 bg-white p-4 md:p-6">
        <h1 className="mb-1 text-xl font-bold text-slate-900 md:text-2xl">
          {currentLesson?.title || 'Lesson Title'}
        </h1>
        {currentLesson && (
          <p className="mb-6 text-sm font-medium text-slate-500">
            Duration: {currentLesson.duration}
          </p>
        )}

        <div className="prose max-w-none text-slate-600">
          {activeTab === 'description' && (
            <p className="leading-relaxed">
              Welcome to this lesson on <strong>{currentLesson?.title}</strong>. In this video, we
              will cover the foundational concepts you need to succeed. Make sure to code along and
              practice the examples shown in the video.
            </p>
          )}
          {activeTab === 'reference' && (
            <p className="leading-relaxed">No references available for this lesson.</p>
          )}
          {activeTab === 'quiz' && (
            <p className="leading-relaxed text-slate-500 italic">
              No quiz available for this lesson yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
