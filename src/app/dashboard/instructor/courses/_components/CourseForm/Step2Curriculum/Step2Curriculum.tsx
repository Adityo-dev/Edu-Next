/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { GripVertical, Plus, Trash2, Video } from 'lucide-react';
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
                durationHr: '',
                durationMin: '',
                durationSec: '',
                videoUrl: '',
                free: false,
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
      durationHr: '',
      durationMin: '',
      durationSec: '',
      videoUrl: '',
      free: false,
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
      <div className="flex flex-wrap items-center gap-3 rounded bg-white px-3 py-2.5">
        <Video size={14} className="text-primary shrink-0" />

        <div className="min-w-35 flex-1">
          <input
            type="text"
            value={title}
            onChange={onTitleChange}
            onBlur={onTitleBlur}
            placeholder={`Lesson ${lessonIndex + 1}: Title`}
            className="placeholder:text-text-placeholder w-full text-sm outline-none"
          />
        </div>

        <div className="min-w-40 flex-1">
          <input
            type="text"
            value={videoUrl}
            onChange={onVideoUrlChange}
            onBlur={onVideoUrlBlur}
            placeholder="Video URL (vimeo/youtube)"
            className={`w-full rounded-sm border px-2 py-1 text-xs outline-none ${
              lessonErrors?.videoUrl
                ? 'text-danger border-red-300'
                : 'border-border text-text-secondary focus:border-emerald-300'
            }`}
          />
        </div>

        {/* Duration — input fields for better UX */}
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-1 rounded-sm border bg-[#F9FAFB] px-2.5 py-1 transition-colors ${
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

        <label className="text-text-secondary flex cursor-pointer items-center gap-1 text-xs">
          <input
            type="checkbox"
            checked={free}
            onChange={(e) => onFreeChange(e.target.checked)}
            className="accent-primary"
          />
          Free
        </label>

        {canRemove && (
          <button type="button" onClick={onRemove} className="text-danger cursor-pointer">
            <Trash2 size={13} />
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
    </div>
  );
};
