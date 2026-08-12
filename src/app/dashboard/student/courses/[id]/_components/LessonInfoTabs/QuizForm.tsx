'use client';

import { useSubmitQuizMutation } from '@/redux/features/courseManagement/studentCourse.api';
import { IQuiz } from '@/types/courseManagement.types';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface QuizFormProps {
  quiz: IQuiz;
  courseId: string;
  lessonId: string;
}

export default function QuizForm({ quiz, courseId, lessonId }: QuizFormProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitQuiz, { isLoading }] = useSubmitQuizMutation();

  const handleOptionChange = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmit = async () => {
    // Validate if all questions have been answered
    if (Object.keys(answers).length < quiz.questions.length) {
      toast.error('Please answer all questions before submitting.');
      return;
    }

    const formattedAnswers = Object.entries(answers).map(([questionId, optionId]) => ({
      questionId,
      optionId,
    }));

    console.log('Submitting Quiz Payload:', {
      courseId,
      lessonId,
      quizId: quiz._id,
      answers: formattedAnswers,
    });

    try {
      await submitQuiz({
        courseId,
        lessonId,
        quizId: quiz._id as string,
        answers: formattedAnswers,
      }).unwrap();
      toast.success('Quiz submitted successfully!');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Quiz submit error:', error);
      const errorMessage = error?.data?.message || 'Failed to submit quiz. Please try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="rounded-md border border-slate-200 bg-slate-50 p-6">
      <h3 className="mb-1 text-lg font-bold text-slate-800">{quiz.title}</h3>
      <p className="mb-6 text-sm font-medium text-slate-500">Pass Mark: {quiz.passMark}%</p>

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
                    checked={answers[q._id as string] === opt._id}
                    onChange={() => handleOptionChange(q._id as string, opt._id as string)}
                    className="accent-primary h-4 w-4"
                  />
                  {opt.text}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="bg-primary flex items-center justify-center gap-2 rounded-sm px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:brightness-110 disabled:pointer-events-none disabled:opacity-70"
        >
          {isLoading ? <Loader2 size={16} className="animate-spin" /> : null}
          Submit Quiz
        </button>
      </div>
    </div>
  );
}
