import { ILesson } from '@/types/courseManagement.types';
import { FileText, Link as LinkIcon, HelpCircle } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import QuizForm from './QuizForm';

interface LessonInfoTabsProps {
  currentLesson: ILesson | null;
}

export default function LessonInfoTabs({ currentLesson }: LessonInfoTabsProps) {
  const params = useParams();
  const courseId = params.id as string;
  const [activeTab, setActiveTab] = useState<'description' | 'reference' | 'quiz'>('description');

  return (
    <div className="border-subtle bg-pure-white text-text-secondary flex w-full flex-col border-t">
      {/* Tabs */}
      <div className="custom-scrollbar bg-section-slate overflow-x-auto border-b border-slate-200">
        <ul className="flex min-w-max items-center gap-6 px-4 pt-4 md:px-6">
          {['description', 'reference', 'quiz'].map((tabKey) => {
            const label =
              tabKey === 'description'
                ? 'Video Description'
                : tabKey === 'reference'
                  ? 'References'
                  : 'Quiz';
            return (
              <li key={tabKey}>
                <button
                  onClick={() => setActiveTab(tabKey as 'description' | 'reference' | 'quiz')}
                  className={`focus-visible:text-primary relative cursor-pointer pb-3 text-xs font-semibold transition-colors duration-300 outline-none ${
                    activeTab === tabKey ? 'text-primary' : 'hover:text-primary text-slate-500'
                  }`}
                >
                  {label}
                  <span
                    className={`bg-primary absolute bottom-0 left-0 h-[2px] transition-all duration-300 ease-out ${
                      activeTab === tabKey ? 'w-full opacity-100' : 'w-0 opacity-0'
                    }`}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Lesson Details Content */}
      <div className="bg-pure-white mb-8 p-5">
        <h1 className="text-text-primary mb-1 text-lg font-semibold md:text-xl">
          {currentLesson?.title || 'Lesson Title'}
        </h1>
        {currentLesson && (
          <p className="text-text-secondary mb-6 text-sm font-medium">
            Video Duration: {currentLesson.duration}
          </p>
        )}

        <div className="prose text-text-secondary max-w-none">
          {activeTab === 'description' &&
            (currentLesson?.description ? (
              <div dangerouslySetInnerHTML={{ __html: currentLesson.description }} />
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-10 text-center">
                <FileText className="mb-3 text-slate-300" size={32} strokeWidth={1.5} />
                <p className="text-text-secondary text-sm font-medium">
                  No description available for this lesson.
                </p>
              </div>
            ))}

          {activeTab === 'reference' &&
            (currentLesson?.references ? (
              <div dangerouslySetInnerHTML={{ __html: currentLesson.references }} />
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-10 text-center">
                <LinkIcon className="mb-3 text-slate-300" size={32} strokeWidth={1.5} />
                <p className="text-text-secondary text-sm font-medium">
                  No references available for this lesson.
                </p>
              </div>
            ))}

          {activeTab === 'quiz' &&
            (currentLesson?.quizzes && currentLesson.quizzes.length > 0 ? (
              <div className="not-prose space-y-8">
                {currentLesson.quizzes.map((quiz, qIdx) => (
                  <QuizForm
                    key={quiz._id || qIdx}
                    quiz={quiz}
                    courseId={courseId}
                    lessonId={currentLesson._id as string}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-10 text-center">
                <HelpCircle className="mb-3 text-slate-300" size={32} strokeWidth={1.5} />
                <p className="text-text-secondary text-sm font-medium">
                  No quiz available for this lesson yet.
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
