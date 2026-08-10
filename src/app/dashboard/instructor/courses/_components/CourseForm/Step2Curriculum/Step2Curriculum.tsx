/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import TiptapEditor from '@/components/dashboard/Fields/TiptapEditor/TiptapEditor';
import { ChevronDown, ChevronUp, GripVertical, Plus, Settings, Trash2, Video } from 'lucide-react';
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
  const {
    fields: sectionFields,
    append: appendSection,
    remove: removeSection,
  } = useFieldArray({ control, name: 'sections' });

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Course Curriculum</h2>
        <p className="text-text-secondary mt-1 text-sm">
          Build your course content section by section.
        </p>
      </div>

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

      {errors.sections?.root?.message && (
        <p className="text-danger text-xs font-medium">{errors.sections.root.message}</p>
      )}

      <button
        type="button"
        onClick={() =>
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
          })
        }
        className="hover:border-primary hover:text-primary flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm border border-dashed border-slate-300 py-3.5 text-sm font-semibold text-slate-500 transition-all"
      >
        <Plus size={16} /> Add New Section
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
  };

  return (
    <div className="border-border overflow-hidden rounded border">
      <div className="flex items-center gap-3 bg-slate-50 px-4 py-3">
        <GripVertical size={16} className="cursor-grab text-slate-300" />
        <div className="flex-1">
          <input
            type="text"
            value={sectionTitle}
            onChange={onSectionTitleChange}
            placeholder={`Section ${sectionIndex + 1}: Title`}
            className="placeholder:text-text-placeholder w-full bg-transparent text-sm font-bold outline-none"
          />
          {sectionErrors?.title && (
            <p className="text-danger mt-0.5 text-xs">{sectionErrors.title.message}</p>
          )}
        </div>
        <span className="text-text-secondary text-xs">{lessonFields.length} lessons</span>
        {canRemove && (
          <button type="button" onClick={onRemoveSection} className="text-danger cursor-pointer">
            <Trash2 size={14} />
          </button>
        )}
      </div>

      <div className="space-y-2 divide-y divide-slate-50 p-3">
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

        <button
          type="button"
          onClick={handleAddLesson}
          className="hover:border-primary hover:text-primary flex w-full cursor-pointer items-center justify-center gap-2 rounded border border-dashed border-slate-200 px-3 py-2 text-xs font-semibold text-slate-400 transition-all duration-300"
        >
          <Plus size={13} /> Add Lesson
        </button>
      </div>
    </div>
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
  const [isExpanded, setIsExpanded] = useState(false);

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
    <div className="space-y-1 pt-2">
      <div className="flex flex-wrap items-center gap-3 rounded border border-slate-100 bg-white px-3 py-2.5">
        <Video size={14} className="text-primary shrink-0" />

        <div className="min-w-35 flex-1">
          <input
            type="text"
            value={title}
            onChange={onTitleChange}
            onBlur={onTitleBlur}
            placeholder={`Lesson ${lessonIndex + 1}: Title`}
            className="placeholder:text-text-placeholder w-full text-sm font-medium outline-none"
          />
        </div>

        <div className="min-w-40 flex-1">
          <input
            type="text"
            value={videoUrl}
            onChange={onVideoUrlChange}
            onBlur={onVideoUrlBlur}
            placeholder="Video URL (vimeo/youtube)"
            className={`w-full rounded-sm border px-2 py-1.5 text-xs transition-colors outline-none ${
              lessonErrors?.videoUrl
                ? 'text-danger border-red-300'
                : 'border-border text-text-secondary focus:border-emerald-300'
            }`}
          />
        </div>

        {/* Duration — input fields for better UX */}
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-1 rounded-sm border bg-[#F9FAFB] px-2.5 py-1.5 transition-colors ${
              hasDurationError
                ? 'border-red-300 focus-within:border-red-400 focus-within:ring-1 focus-within:ring-red-100'
                : 'border-border text-text-secondary focus-within:border-emerald-300 focus-within:ring-1 focus-within:ring-emerald-100'
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
              className="placeholder:text-text-placeholder w-6 bg-transparent text-center text-xs font-medium outline-none placeholder:font-normal"
            />
            <span className="text-text-secondary text-[10px] font-semibold">h</span>

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
              className="placeholder:text-text-placeholder w-6 bg-transparent text-center text-xs font-medium outline-none placeholder:font-normal"
            />
            <span className="text-text-secondary text-[10px] font-semibold">m</span>

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
              className="placeholder:text-text-placeholder w-6 bg-transparent text-center text-xs font-medium outline-none placeholder:font-normal"
            />
            <span className="text-text-secondary text-[10px] font-semibold">s</span>
          </div>
        </div>

        <label className="text-text-secondary flex cursor-pointer items-center gap-1.5 text-xs">
          <input
            type="checkbox"
            checked={free}
            onChange={(e) => onFreeChange(e.target.checked)}
            className="accent-primary"
          />
          Free
        </label>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className={`flex cursor-pointer items-center gap-1 rounded-sm px-2 py-1.5 text-xs transition-colors ${isExpanded ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          <Settings size={14} />
          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="text-danger ml-1 cursor-pointer rounded p-1 hover:bg-red-50"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>

      {(lessonErrors?.title || hasDurationError || lessonErrors?.videoUrl) && (
        <div className="flex flex-wrap gap-4 px-3 pb-1">
          {lessonErrors?.title && (
            <p className="text-danger text-xs">Title: {lessonErrors.title.message}</p>
          )}
          {lessonErrors?.videoUrl && (
            <p className="text-danger text-xs">Video: {lessonErrors.videoUrl.message}</p>
          )}
          {hasDurationError && <p className="text-danger text-xs">Duration: select hh:mm:ss</p>}
        </div>
      )}

      {/* Expanded Advanced Settings */}
      {isExpanded && (
        <div className="mt-2 space-y-6 rounded-sm border border-slate-200 bg-white p-4">
          <div className="space-y-4">
            <TiptapEditor
              control={control as any}
              name={`sections.${sectionIndex}.lessons.${lessonIndex}.description` as any}
              label="Lesson Description"
              placeholder="Briefly describe what this lesson covers..."
            />
            <TiptapEditor
              control={control as any}
              name={`sections.${sectionIndex}.lessons.${lessonIndex}.references` as any}
              label="References & Links"
              placeholder="Add useful links or reference materials here..."
            />
          </div>

          <div className="border-t border-slate-100 pt-4">
            <QuizBuilder
              control={control}
              errors={errors}
              sectionIndex={sectionIndex}
              lessonIndex={lessonIndex}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// ─── QuizBuilder Components ───

const QuizBuilder = ({ control, errors, sectionIndex, lessonIndex }: any) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.lessons.${lessonIndex}.quizzes`,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-700">Quizzes</h3>
        <button
          type="button"
          onClick={() =>
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
            })
          }
          className="text-primary flex items-center gap-1 text-xs font-medium hover:underline"
        >
          <Plus size={14} /> Add Quiz
        </button>
      </div>

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

      {fields.length === 0 && (
        <p className="text-xs text-slate-400 italic">No quizzes added yet.</p>
      )}
    </div>
  );
};

const QuizItem = ({ control, sectionIndex, lessonIndex, quizIndex, onRemove }: any) => {
  const {
    field: { value: title, onChange: onTitleChange },
  } = useController({
    control,
    name: `sections.${sectionIndex}.lessons.${lessonIndex}.quizzes.${quizIndex}.title`,
  });

  const {
    field: { value: passMark, onChange: onPassMarkChange },
  } = useController({
    control,
    name: `sections.${sectionIndex}.lessons.${lessonIndex}.quizzes.${quizIndex}.passMark`,
  });

  const {
    fields: questionFields,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.lessons.${lessonIndex}.quizzes.${quizIndex}.questions`,
  });

  return (
    <div className="space-y-4 rounded border border-slate-200 bg-slate-50 p-3">
      <div className="flex items-start gap-3">
        <div className="flex-1 space-y-3">
          <div className="flex gap-3">
            <div className="flex-1">
              <input
                type="text"
                value={title}
                onChange={onTitleChange}
                placeholder="Quiz Title (e.g. Next.js Basics)"
                className="focus:border-primary w-full rounded-sm border border-slate-200 bg-white px-3 py-1.5 text-sm outline-none"
              />
            </div>
            <div className="w-24">
              <input
                type="number"
                value={passMark}
                onChange={(e) => onPassMarkChange(Number(e.target.value))}
                placeholder="Pass Mark"
                className="focus:border-primary w-full rounded-sm border border-slate-200 bg-white px-3 py-1.5 text-sm outline-none"
              />
            </div>
          </div>

          <div className="border-primary/20 space-y-3 border-l-2 pl-2">
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

            <button
              type="button"
              onClick={() =>
                appendQuestion({
                  questionText: '',
                  reason: '',
                  options: [
                    { text: '', isCorrect: true },
                    { text: '', isCorrect: false },
                  ],
                })
              }
              className="text-primary bg-primary/5 flex items-center gap-1 rounded px-2 py-1 text-xs font-medium hover:underline"
            >
              <Plus size={12} /> Add Question
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={onRemove}
          className="text-danger cursor-pointer rounded p-1.5 hover:bg-red-100"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
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
  const {
    field: { value: questionText, onChange: onQuestionTextChange },
  } = useController({
    control,
    name: `sections.${sectionIndex}.lessons.${lessonIndex}.quizzes.${quizIndex}.questions.${questionIndex}.questionText`,
  });

  const {
    field: { value: reason, onChange: onReasonChange },
  } = useController({
    control,
    name: `sections.${sectionIndex}.lessons.${lessonIndex}.quizzes.${quizIndex}.questions.${questionIndex}.reason`,
  });

  const {
    fields: optionFields,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.lessons.${lessonIndex}.quizzes.${quizIndex}.questions.${questionIndex}.options`,
  });

  return (
    <div className="space-y-2 rounded border border-slate-100 bg-white p-3 shadow-sm">
      <div className="flex gap-2">
        <div className="flex-1 space-y-2">
          <input
            type="text"
            value={questionText}
            onChange={onQuestionTextChange}
            placeholder="Question text..."
            className="focus:border-primary w-full rounded-sm border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm outline-none focus:bg-white"
          />
          <input
            type="text"
            value={reason}
            onChange={onReasonChange}
            placeholder="Reason/Explanation (optional)..."
            className="focus:border-primary w-full rounded-sm border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-500 outline-none focus:bg-white"
          />
        </div>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="hover:text-danger h-fit cursor-pointer p-1 text-slate-400"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>

      <div className="mt-2 space-y-2">
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
          className="hover:text-primary flex items-center gap-1 text-[11px] font-medium text-slate-500"
        >
          <Plus size={10} /> Add Option
        </button>
      </div>
    </div>
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
    field: { value: text, onChange: onTextChange },
  } = useController({
    control,
    name: `sections.${sectionIndex}.lessons.${lessonIndex}.quizzes.${quizIndex}.questions.${questionIndex}.options.${optionIndex}.text`,
  });

  const {
    field: { value: isCorrect, onChange: onIsCorrectChange },
  } = useController({
    control,
    name: `sections.${sectionIndex}.lessons.${lessonIndex}.quizzes.${quizIndex}.questions.${questionIndex}.options.${optionIndex}.isCorrect`,
  });

  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={isCorrect}
        onChange={(e) => onIsCorrectChange(e.target.checked)}
        className="h-3.5 w-3.5 accent-emerald-500"
        title="Mark as correct option"
      />
      <input
        type="text"
        value={text}
        onChange={onTextChange}
        placeholder={`Option ${optionIndex + 1}`}
        className={`flex-1 border-b bg-transparent py-1 text-xs transition-colors outline-none ${isCorrect ? 'border-emerald-300 font-medium text-emerald-700' : 'focus:border-primary border-slate-200 text-slate-600'}`}
      />
      {canRemove && (
        <button type="button" onClick={onRemove} className="hover:text-danger p-0.5 text-slate-300">
          <Trash2 size={12} />
        </button>
      )}
    </div>
  );
};
