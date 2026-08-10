import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import { ILesson } from '@/types/courseManagement.types';
import { ArrowLeft, ArrowRight, Maximize } from 'lucide-react';
import { useState } from 'react';

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
    <div className="border-subtle bg-pure-white text-text-secondary flex w-full flex-col border-t">
      {/* Navigation Bar */}
      <div className="border-subtle flex items-center justify-between gap-2 border-b px-3 py-4 md:px-6">
        <DynamicActionButton
          label="Prev"
          icon={ArrowLeft}
          showIcon
          onClick={onPrevLesson}
          disabled={!hasPrev}
          className={`h-9! ${
            !hasPrev
              ? 'bg-teal-accent! text-text-placeholder! pointer-events-none border-transparent!'
              : ''
          }`}
        />

        <button
          onClick={onFullScreen}
          className="text-text-secondary hover:bg-teal-accent hover:text-text-primary flex shrink-0 items-center justify-center gap-1.5 rounded-md p-2 text-xs font-medium whitespace-nowrap transition-colors sm:px-3 sm:py-2 sm:text-sm"
          title="Full Screen"
        >
          <Maximize size={18} className="shrink-0" />
          <span className="hidden sm:inline">Full Screen</span>
        </button>

        <DynamicActionButton
          label="Next"
          icon={ArrowRight}
          showIcon
          onClick={onNextLesson}
          disabled={!hasNext}
          className={`h-9! ${
            !hasNext
              ? 'bg-teal-accent! text-text-placeholder! pointer-events-none border-transparent!'
              : ''
          }`}
        />
      </div>

      {/* Tabs */}
      <div className="custom-scrollbar bg-section-slate overflow-x-auto px-4 pt-4 md:px-6">
        <div className="border-subtle flex min-w-max items-center gap-4 border-b sm:gap-6">
          <button
            onClick={() => setActiveTab('description')}
            className={`px-3 py-2 text-sm font-semibold whitespace-nowrap transition-colors sm:px-4 ${
              activeTab === 'description'
                ? 'border-primary bg-pure-white text-primary border-b-2'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Video Description
          </button>
          <button
            onClick={() => setActiveTab('reference')}
            className={`px-3 py-2 text-sm font-semibold whitespace-nowrap transition-colors sm:px-4 ${
              activeTab === 'reference'
                ? 'border-primary bg-pure-white text-primary border-b-2'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            References
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-3 py-2 text-sm font-semibold whitespace-nowrap transition-colors sm:px-4 ${
              activeTab === 'quiz'
                ? 'border-primary bg-pure-white text-primary border-b-2'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Quiz
          </button>
        </div>
      </div>

      {/* Lesson Details Content */}
      <div className="bg-pure-white mb-8 p-4 md:p-6">
        <h1 className="text-text-primary mb-1 text-xl font-bold md:text-2xl">
          {currentLesson?.title || 'Lesson Title'}
        </h1>
        {currentLesson && (
          <p className="text-text-secondary mb-6 text-sm font-medium">
            Duration: {currentLesson.duration}
          </p>
        )}

        <div className="prose text-text-secondary max-w-none">
          {activeTab === 'description' &&
            (currentLesson?.description ? (
              <div dangerouslySetInnerHTML={{ __html: currentLesson.description }} />
            ) : (
              <p className="text-text-placeholder leading-relaxed italic">
                No description available for this lesson.
              </p>
            ))}

          {activeTab === 'reference' &&
            (currentLesson?.references ? (
              <div dangerouslySetInnerHTML={{ __html: currentLesson.references }} />
            ) : (
              <p className="text-text-placeholder leading-relaxed italic">
                No references available for this lesson.
              </p>
            ))}

          {activeTab === 'quiz' &&
            (currentLesson?.quizzes && currentLesson.quizzes.length > 0 ? (
              <div className="not-prose space-y-8">
                {currentLesson.quizzes.map((quiz, qIdx) => (
                  <div
                    key={quiz._id || qIdx}
                    className="rounded-md border border-slate-200 bg-slate-50 p-6"
                  >
                    <h3 className="mb-1 text-lg font-bold text-slate-800">{quiz.title}</h3>
                    <p className="mb-6 text-sm font-medium text-slate-500">
                      Pass Mark: {quiz.passMark}%
                    </p>

                    <div className="space-y-6">
                      {quiz.questions.map((q, qIndex) => (
                        <div key={q._id || qIndex} className="space-y-3">
                          <h4 className="font-semibold text-slate-700">
                            {qIndex + 1}. {q.questionText}
                          </h4>
                          <div className="space-y-2 pl-4">
                            {q.options.map((opt, oIndex) => (
                              <label
                                key={opt._id || oIndex}
                                className="flex cursor-pointer items-center gap-2 text-sm text-slate-600 transition-colors hover:text-slate-800"
                              >
                                <input
                                  type="radio"
                                  name={`question-${q._id}`}
                                  value={opt._id}
                                  className="accent-primary h-4 w-4"
                                />
                                {opt.text}
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-text-placeholder leading-relaxed italic">
                No quiz available for this lesson yet.
              </p>
            ))}
        </div>
      </div>
    </div>
  );
}
