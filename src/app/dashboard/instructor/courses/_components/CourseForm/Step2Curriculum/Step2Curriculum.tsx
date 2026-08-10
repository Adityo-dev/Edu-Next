/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import InputField from '@/components/dashboard/Fields/InputField/InputField';
import {
  Accordion,
  AccordionContent,
  AccordionItem as AccordionItemUI,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useModal } from '@/context/ModalContext';
import { GripVertical, Plus, Settings, Trash2, Video } from 'lucide-react';
import { useState } from 'react';
import { Control, FieldErrors, useController, useFieldArray } from 'react-hook-form';
import { toast } from 'sonner';
import { CourseFormValues } from '../schema';

interface Step2CurriculumProps {
  control: Control<CourseFormValues>;
  errors: FieldErrors<CourseFormValues>;
  trigger: (fields?: any) => Promise<boolean>;
  getValues: (fields?: any) => any;
}

const Step2Curriculum = ({ control, errors, trigger, getValues }: Step2CurriculumProps) => {
  const [activeSection, setActiveSection] = useState<string>('section-0');

  const {
    fields: sectionFields,
    append: appendSection,
    remove: removeSection,
  } = useFieldArray({ control, name: 'sections' });

  const handleAddSection = () => {
    appendSection({
      title: '',
      lessons: [
        {
          title: '',
          description: '',
          references: '',
          durationHr: '',
          durationMin: '',
          durationSec: '',
          videoUrl: '',
          free: false,
          quizzes: [],
        },
      ],
    });
    setActiveSection(`section-${sectionFields.length}`);
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Course Curriculum</h2>
        <p className="text-text-secondary mt-1 text-sm">
          Build your course content module by module.
        </p>
      </div>

      <Accordion
        type="single"
        collapsible
        value={activeSection}
        onValueChange={setActiveSection}
        className="space-y-4"
      >
        {sectionFields.map((section, si) => (
          <SectionBlock
            key={section.id}
            sectionIndex={si}
            control={control}
            errors={errors}
            trigger={trigger}
            getValues={getValues}
            onRemoveSection={() => removeSection(si)}
            canRemove={sectionFields.length > 1}
          />
        ))}
      </Accordion>

      {errors.sections?.root?.message && (
        <p className="text-danger text-xs font-medium">{errors.sections.root.message}</p>
      )}

      <button
        type="button"
        onClick={handleAddSection}
        className="hover:border-primary hover:text-primary flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm border border-dashed border-slate-300 py-2.5 text-sm font-semibold text-slate-500 transition-all"
      >
        <Plus size={14} /> Add New Module
      </button>
    </div>
  );
};

export default Step2Curriculum;

// ─── SectionBlock Sub-component
interface SectionBlockProps {
  sectionIndex: number;
  control: Control<CourseFormValues>;
  errors: FieldErrors<CourseFormValues>;
  trigger: (fields?: any) => Promise<boolean>;
  getValues: (fields?: any) => any;
  onRemoveSection: () => void;
  canRemove: boolean;
}

const SectionBlock = ({
  sectionIndex,
  control,
  errors,
  trigger,
  getValues,
  onRemoveSection,
  canRemove,
}: SectionBlockProps) => {
  const { openModal } = useModal();
  const [activeLesson, setActiveLesson] = useState<string>('lesson-0');
  const {
    fields: lessonFields,
    append: appendLesson,
    remove: removeLesson,
  } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.lessons`,
  });

  const {
    field: { value: sectionTitle, onChange: onSectionTitleChange },
  } = useController({
    control,
    name: `sections.${sectionIndex}.title`,
  });

  const sectionErrors = errors.sections?.[sectionIndex];

  const handleAddLesson = async () => {
    const lastIdx = lessonFields.length - 1;
    const fieldNames = [
      `sections.${sectionIndex}.lessons.${lastIdx}.title`,
      `sections.${sectionIndex}.lessons.${lastIdx}.durationHr`,
      `sections.${sectionIndex}.lessons.${lastIdx}.durationMin`,
      `sections.${sectionIndex}.lessons.${lastIdx}.durationSec`,
      `sections.${sectionIndex}.lessons.${lastIdx}.videoUrl`,
    ];

    const lastLesson = getValues(`sections.${sectionIndex}.lessons.${lastIdx}`);
    if (!lastLesson?.title?.trim() || !lastLesson?.videoUrl?.trim()) {
      toast.error('Please fill in the current lesson before adding a new one.');
      await trigger(fieldNames as any);
      return;
    }

    const valid = await trigger(fieldNames as any);
    if (!valid) {
      toast.error('Please fix the errors in the current lesson before adding a new one.');
      return;
    }

    appendLesson({
      title: '',
      description: '',
      references: '',
      durationHr: '',
      durationMin: '',
      durationSec: '',
      videoUrl: '',
      free: false,
      quizzes: [],
    });
    setActiveLesson(`lesson-${lessonFields.length}`);
  };

  return (
    <AccordionItemUI
      value={`section-${sectionIndex}`}
      className="border-border overflow-hidden rounded border bg-white"
    >
      <div className="relative flex w-full items-center bg-slate-50">
        {/* Invisible trigger layer to make the whole row clickable */}
        <AccordionTrigger className="absolute inset-0 z-0 flex items-center justify-end px-4 hover:no-underline">
          <div className="flex-1" />
        </AccordionTrigger>

        {/* Foreground content layer */}
        <div className="pointer-events-none z-10 flex w-full items-center gap-3 px-4 py-3 pr-10">
          <div className="pointer-events-auto shrink-0 cursor-grab">
            <GripVertical size={16} className="text-slate-300" />
          </div>

          <div className="pointer-events-auto flex flex-1 flex-col justify-center">
            <input
              type="text"
              value={sectionTitle}
              onChange={onSectionTitleChange}
              placeholder={`Module ${sectionIndex + 1}: Title`}
              className="placeholder:text-text-placeholder w-full bg-transparent text-sm font-semibold outline-none"
            />
            {sectionErrors?.title && (
              <p className="text-danger mt-0.5 text-xs">{sectionErrors.title.message}</p>
            )}
          </div>

          <span className="text-text-secondary shrink-0 text-xs">
            {lessonFields.length} lessons
          </span>

          {canRemove && (
            <button
              type="button"
              onClick={() => {
                openModal({
                  view: 'DELETE_CONFIRM',
                  data: {
                    title: 'Delete Module',
                    deleteItem: sectionTitle || `Module ${sectionIndex + 1}`,
                    onConfirm: async () => onRemoveSection(),
                  },
                });
              }}
              className="text-danger pointer-events-auto ml-1 shrink-0 cursor-pointer rounded p-1 hover:bg-red-50"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>

      <AccordionContent>
        <div className="space-y-3 p-4">
          {lessonFields.length > 0 && (
            <Accordion
              type="single"
              collapsible
              value={activeLesson}
              onValueChange={setActiveLesson}
              className="space-y-3"
            >
              {lessonFields.map((lesson, li) => (
                <LessonRow
                  key={lesson.id}
                  sectionIndex={sectionIndex}
                  lessonIndex={li}
                  control={control}
                  errors={errors}
                  onRemove={() => removeLesson(li)}
                  canRemove={lessonFields.length > 1}
                />
              ))}
            </Accordion>
          )}

          <button
            type="button"
            onClick={handleAddLesson}
            className="hover:border-primary hover:text-primary flex w-full cursor-pointer items-center justify-center gap-2 rounded border border-dashed border-slate-200 px-3 py-2 text-xs font-semibold text-slate-400 transition-all duration-300"
          >
            <Plus size={14} /> Add Lesson
          </button>
        </div>
      </AccordionContent>
    </AccordionItemUI>
  );
};

// ─── LessonRow Sub-component

interface LessonRowProps {
  sectionIndex: number;
  lessonIndex: number;
  control: Control<CourseFormValues>;
  errors: FieldErrors<CourseFormValues>;
  onRemove: () => void;
  canRemove: boolean;
}

const LessonRow = ({
  sectionIndex,
  lessonIndex,
  control,
  errors,
  onRemove,
  canRemove,
}: LessonRowProps) => {
  const { openModal } = useModal();

  const {
    field: { value: title, onChange: onTitleChange, onBlur: onTitleBlur },
  } = useController({
    control,
    name: `sections.${sectionIndex}.lessons.${lessonIndex}.title`,
  });

  const {
    field: { value: durationHr, onChange: onDurationHrChange },
  } = useController({
    control,
    name: `sections.${sectionIndex}.lessons.${lessonIndex}.durationHr`,
  });

  const {
    field: { value: durationMin, onChange: onDurationMinChange },
  } = useController({
    control,
    name: `sections.${sectionIndex}.lessons.${lessonIndex}.durationMin`,
  });

  const {
    field: { value: durationSec, onChange: onDurationSecChange },
  } = useController({
    control,
    name: `sections.${sectionIndex}.lessons.${lessonIndex}.durationSec`,
  });

  const {
    field: { value: videoUrl, onChange: onVideoUrlChange, onBlur: onVideoUrlBlur },
  } = useController({
    control,
    name: `sections.${sectionIndex}.lessons.${lessonIndex}.videoUrl`,
  });

  const {
    field: { value: free, onChange: onFreeChange },
  } = useController({
    control,
    name: `sections.${sectionIndex}.lessons.${lessonIndex}.free`,
  });

  const lessonErrors = errors.sections?.[sectionIndex]?.lessons?.[lessonIndex];
  const hasDurationError = !!(
    lessonErrors?.durationHr ||
    lessonErrors?.durationMin ||
    lessonErrors?.durationSec
  );

  return (
    <AccordionItemUI
      value={`lesson-${lessonIndex}`}
      className="border-border overflow-hidden rounded border bg-white"
    >
      <div className="relative flex w-full items-center bg-slate-50">
        <AccordionTrigger className="absolute inset-0 z-0 flex items-center justify-end px-4 hover:no-underline">
          <div className="flex-1" />
        </AccordionTrigger>

        <div className="pointer-events-none z-10 flex w-full items-center gap-3 px-4 py-3 pr-10">
          <div className="pointer-events-auto shrink-0 cursor-grab">
            <Video size={14} className="text-slate-400" />
          </div>

          <div className="pointer-events-auto flex flex-1 flex-col justify-center">
            <input
              type="text"
              value={title}
              onChange={onTitleChange}
              onBlur={onTitleBlur}
              placeholder={`Lesson ${lessonIndex + 1}: Title`}
              className="placeholder:text-text-placeholder w-full bg-transparent text-sm font-semibold outline-none"
            />
            {lessonErrors?.title && (
              <p className="text-danger mt-0.5 text-xs">{lessonErrors.title.message}</p>
            )}
          </div>

          {canRemove && (
            <button
              type="button"
              onClick={() => {
                openModal({
                  view: 'DELETE_CONFIRM',
                  data: {
                    title: 'Delete Lesson',
                    deleteItem: title || `Lesson ${lessonIndex + 1}`,
                    onConfirm: async () => onRemove(),
                  },
                });
              }}
              className="text-danger pointer-events-auto ml-1 shrink-0 cursor-pointer rounded p-1 hover:bg-red-50"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>

      <AccordionContent className="p-4 pt-2">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="flex-1">
            <input
              type="text"
              value={videoUrl}
              onChange={onVideoUrlChange}
              onBlur={onVideoUrlBlur}
              placeholder="Video URL (youtube iframe)"
              className={`w-full rounded-md border px-3 py-2 text-sm transition-colors outline-none focus:ring-2 ${
                lessonErrors?.videoUrl
                  ? 'text-danger border-red-300 focus:ring-red-100'
                  : 'border-slate-200 text-slate-700 focus:border-emerald-300 focus:ring-emerald-100'
              }`}
            />
            {lessonErrors?.videoUrl && (
              <p className="text-danger mt-1 text-xs">{lessonErrors.videoUrl.message}</p>
            )}
          </div>

          <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto sm:flex-nowrap sm:justify-start">
            <div className="flex w-full items-center gap-4 sm:w-auto sm:justify-start">
              <div
                className={`flex flex-1 items-center justify-center gap-1 rounded border bg-slate-50 px-2 py-1.5 transition-colors sm:flex-none ${
                  hasDurationError
                    ? 'border-red-300 focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-100'
                    : 'border-slate-200 text-slate-700 focus-within:border-emerald-300 focus-within:ring-2 focus-within:ring-emerald-100'
                }`}
              >
                <input
                  type="text"
                  value={durationHr}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
                    onDurationHrChange(val);
                  }}
                  placeholder="0"
                  className="placeholder:text-text-placeholder w-full max-w-9 min-w-6 bg-transparent text-center text-xs font-medium outline-none placeholder:font-normal sm:w-6"
                />
                <span className="text-[10px] font-semibold text-slate-500">h</span>
                <div className="mx-0.5 h-3 w-px bg-slate-300" />
                <input
                  type="text"
                  value={durationMin}
                  onChange={(e) => {
                    let val = e.target.value.replace(/\D/g, '').slice(0, 2);
                    if (parseInt(val) > 59) val = '59';
                    onDurationMinChange(val);
                  }}
                  placeholder="00"
                  className="placeholder:text-text-placeholder w-full max-w-9 min-w-6 bg-transparent text-center text-xs font-medium outline-none placeholder:font-normal sm:w-6"
                />
                <span className="text-[10px] font-semibold text-slate-500">m</span>
                <div className="mx-0.5 h-3 w-px bg-slate-300" />
                <input
                  type="text"
                  value={durationSec}
                  onChange={(e) => {
                    let val = e.target.value.replace(/\D/g, '').slice(0, 2);
                    if (parseInt(val) > 59) val = '59';
                    onDurationSecChange(val);
                  }}
                  placeholder="00"
                  className="placeholder:text-text-placeholder w-full max-w-9 min-w-6 bg-transparent text-center text-xs font-medium outline-none placeholder:font-normal sm:w-6"
                />
                <span className="text-[10px] font-semibold text-slate-500">s</span>
              </div>

              <label className="flex shrink-0 cursor-pointer items-center gap-2 text-sm font-medium text-slate-600">
                <input
                  type="checkbox"
                  checked={free}
                  onChange={(e) => onFreeChange(e.target.checked)}
                  className="accent-primary h-4 w-4 rounded"
                />
                Free
              </label>
            </div>

            <button
              type="button"
              onClick={() => {
                openModal({
                  view: 'LESSON_DETAILS_DRAWER',
                  layout: 'DRAWER',
                  title: `Lesson Details: ${title || `Lesson ${lessonIndex + 1}`}`,
                  data: { control, errors, sectionIndex, lessonIndex },
                });
              }}
              className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-sm bg-slate-100 px-2 py-1.5 text-sm font-semibold transition-all duration-300 hover:bg-slate-200 sm:w-auto"
            >
              <Settings size={14} />
              <span>Details</span>
            </button>
          </div>
        </div>
        {hasDurationError && <p className="text-danger mt-1 text-xs">Duration: select hh:mm:ss</p>}
      </AccordionContent>
    </AccordionItemUI>
  );
};

// ─── QuizBuilder Components ───
export const QuizBuilder = ({ control, errors, sectionIndex, lessonIndex }: any) => {
  const [activeQuiz, setActiveQuiz] = useState<string>('quiz-0');

  const { fields, append, remove } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.lessons.${lessonIndex}.quizzes`,
  });

  const handleAddQuiz = () => {
    append({
      title: '',
      passMark: 80,
      questions: [
        {
          questionText: '',
          reason: '',
          options: [
            { text: '', isCorrect: true },
            { text: '', isCorrect: false },
          ],
        },
      ],
    });
    setActiveQuiz(`quiz-${fields.length}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-700">Quizzes</h3>
        <button
          type="button"
          onClick={handleAddQuiz}
          className="text-primary flex items-center gap-1 text-xs font-medium hover:underline"
        >
          <Plus size={14} /> Add Quiz
        </button>
      </div>

      {fields.length > 0 && (
        <Accordion
          type="single"
          collapsible
          value={activeQuiz}
          onValueChange={setActiveQuiz}
          className="mt-4 w-full space-y-4"
        >
          {fields.map((quiz, qIdx) => (
            <QuizItem
              key={quiz.id}
              control={control}
              errors={errors}
              sectionIndex={sectionIndex}
              lessonIndex={lessonIndex}
              quizIndex={qIdx}
              onRemove={() => remove(qIdx)}
            />
          ))}
        </Accordion>
      )}

      {fields.length === 0 && (
        <p className="text-xs text-slate-400 italic">No quizzes added yet.</p>
      )}
    </div>
  );
};

const QuizItem = ({ control, sectionIndex, lessonIndex, quizIndex, onRemove }: any) => {
  const { openModal } = useModal();
  const [activeQuestion, setActiveQuestion] = useState<string>('question-0');

  const {
    fields: questionFields,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.lessons.${lessonIndex}.quizzes.${quizIndex}.questions`,
  });

  const handleAddQuestion = () => {
    appendQuestion({
      questionText: '',
      reason: '',
      options: [
        { text: '', isCorrect: true },
        { text: '', isCorrect: false },
      ],
    });
    setActiveQuestion(`question-${questionFields.length}`);
  };

  return (
    <AccordionItemUI
      value={`quiz-${quizIndex}`}
      className="rounded-md border border-slate-200 bg-slate-50/50 px-4 shadow-sm"
    >
      <div className="flex w-full items-center justify-between">
        <AccordionTrigger className="flex-1 py-4 hover:no-underline">
          <span className="text-left text-sm font-semibold text-slate-800">
            Quiz {quizIndex + 1}
          </span>
        </AccordionTrigger>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            openModal({
              view: 'DELETE_CONFIRM',
              data: {
                title: 'Delete Quiz',
                deleteItem: `Quiz ${quizIndex + 1}`,
                onConfirm: async () => onRemove(),
              },
            });
          }}
          className="hover:text-danger z-10 rounded p-2 text-slate-400 transition-colors hover:bg-red-50"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <AccordionContent className="pt-2 pb-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div className="sm:col-span-3">
            <InputField
              control={control}
              name={
                `sections.${sectionIndex}.lessons.${lessonIndex}.quizzes.${quizIndex}.title` as any
              }
              label="Quiz Title"
              placeholder="e.g. Next.js Basics"
            />
          </div>
          <div className="sm:col-span-1">
            <InputField
              control={control}
              name={
                `sections.${sectionIndex}.lessons.${lessonIndex}.quizzes.${quizIndex}.passMark` as any
              }
              label="Pass Mark"
              type="number"
              placeholder="e.g. 80"
            />
          </div>
        </div>

        <div className="mt-4 space-y-4 border-l-2 border-slate-200 pl-4">
          {questionFields.length > 0 && (
            <Accordion
              type="single"
              collapsible
              value={activeQuestion}
              onValueChange={setActiveQuestion}
              className="mb-4 w-full space-y-4"
            >
              {questionFields.map((q, qIdx) => (
                <QuestionItem
                  key={q.id}
                  control={control}
                  sectionIndex={sectionIndex}
                  lessonIndex={lessonIndex}
                  quizIndex={quizIndex}
                  questionIndex={qIdx}
                  onRemove={() => removeQuestion(qIdx)}
                  canRemove={questionFields.length > 1}
                />
              ))}
            </Accordion>
          )}

          <button
            type="button"
            onClick={handleAddQuestion}
            className="text-primary flex items-center gap-1 text-sm font-medium hover:underline"
          >
            <Plus size={14} /> Add Question
          </button>
        </div>
      </AccordionContent>
    </AccordionItemUI>
  );
};

const QuestionItem = ({
  control,
  sectionIndex,
  lessonIndex,
  quizIndex,
  questionIndex,
  onRemove,
  canRemove,
}: any) => {
  const { openModal } = useModal();
  const {
    fields: optionFields,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.lessons.${lessonIndex}.quizzes.${quizIndex}.questions.${questionIndex}.options`,
  });

  return (
    <AccordionItemUI
      value={`question-${questionIndex}`}
      className="rounded-md border border-slate-100 bg-white px-4 shadow-sm"
    >
      <div className="flex w-full items-center justify-between">
        <AccordionTrigger className="flex-1 py-4 hover:no-underline">
          <span className="text-left text-sm font-medium text-slate-700">
            Question {questionIndex + 1}
          </span>
        </AccordionTrigger>
        {canRemove && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openModal({
                view: 'DELETE_CONFIRM',
                data: {
                  title: 'Delete Question',
                  deleteItem: `Question ${questionIndex + 1}`,
                  onConfirm: async () => onRemove(),
                },
              });
            }}
            className="hover:text-danger z-10 rounded p-2 text-slate-400 transition-colors hover:bg-red-50"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      <AccordionContent className="pt-2 pb-4">
        <div className="flex-1 space-y-4">
          <InputField
            control={control}
            name={
              `sections.${sectionIndex}.lessons.${lessonIndex}.quizzes.${quizIndex}.questions.${questionIndex}.questionText` as any
            }
            label={`Question ${questionIndex + 1}`}
            placeholder="Enter question text..."
          />
          <InputField
            control={control}
            name={
              `sections.${sectionIndex}.lessons.${lessonIndex}.quizzes.${quizIndex}.questions.${questionIndex}.reason` as any
            }
            label="Reason/Explanation (Optional)"
            placeholder="Why is the answer correct?..."
          />
        </div>

        <div className="mt-6 space-y-3">
          <p className="text-sm font-medium text-slate-700">Options</p>
          {optionFields.map((opt, oIdx) => (
            <OptionItem
              key={opt.id}
              control={control}
              sectionIndex={sectionIndex}
              lessonIndex={lessonIndex}
              quizIndex={quizIndex}
              questionIndex={questionIndex}
              optionIndex={oIdx}
              onRemove={() => removeOption(oIdx)}
              canRemove={optionFields.length > 2}
            />
          ))}

          <button
            type="button"
            onClick={() => appendOption({ text: '', isCorrect: false })}
            className="text-primary flex items-center gap-1 text-sm font-medium hover:underline"
          >
            <Plus size={14} /> Add Option
          </button>
        </div>
      </AccordionContent>
    </AccordionItemUI>
  );
};

const OptionItem = ({
  control,
  sectionIndex,
  lessonIndex,
  quizIndex,
  questionIndex,
  optionIndex,
  onRemove,
  canRemove,
}: any) => {
  const {
    field: { value: isCorrect, onChange: onIsCorrectChange },
  } = useController({
    control,
    name: `sections.${sectionIndex}.lessons.${lessonIndex}.quizzes.${quizIndex}.questions.${questionIndex}.options.${optionIndex}.isCorrect`,
  });

  return (
    <div className="flex items-start gap-3">
      <div className="flex h-11 items-center pt-5.5">
        <input
          type="checkbox"
          checked={isCorrect}
          onChange={(e) => onIsCorrectChange(e.target.checked)}
          className="accent-primary h-4 w-4 cursor-pointer rounded border-slate-300"
          title="Mark as correct option"
        />
      </div>

      <div className="flex-1">
        <InputField
          control={control}
          name={
            `sections.${sectionIndex}.lessons.${lessonIndex}.quizzes.${quizIndex}.questions.${questionIndex}.options.${optionIndex}.text` as any
          }
          placeholder={`Option ${optionIndex + 1}`}
        />
      </div>

      {canRemove && (
        <div className="flex h-11 items-center pt-5.5">
          <button
            type="button"
            onClick={onRemove}
            className="hover:text-danger rounded p-1 text-slate-400 transition-colors hover:bg-red-50"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}
    </div>
  );
};
