/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronRight, GripVertical, Plus, Trash2, Upload, Video } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import SectionHeader from '@/components/dashboard/SectionHeader/SectionHeader';

// ─── Zod Schema ────────────────────────────────────────────────────────────────

const lessonSchema = z.object({
  title: z.string().min(1, 'Lesson title is required'),
  duration: z
    .string()
    .min(1, 'Duration is required')
    .regex(/^\d{1,2}:\d{2}$/, 'Format must be mm:ss or h:mm'),
  free: z.boolean(),
});

const sectionSchema = z.object({
  title: z.string().min(1, 'Section title is required'),
  lessons: z.array(lessonSchema).min(1, 'At least one lesson is required'),
});

const courseSchema = z.object({
  // Step 1
  title: z.string().min(3, 'Course title must be at least 3 characters'),
  subtitle: z.string().min(5, 'Subtitle must be at least 5 characters'),
  category: z.string().min(1, 'Please select a category'),
  level: z.string().min(1, 'Please select a level'),
  language: z.string().min(1, 'Please select a language'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  // Step 2
  sections: z.array(sectionSchema).min(1, 'At least one section is required'),
  // Step 3
  price: z
    .string()
    .min(1, 'Price is required')
    .regex(/^\d+$/, 'Price must be a valid number')
    .refine((v) => parseInt(v) >= 100, 'Minimum price is ৳100'),
});

type CourseFormValues = z.infer<typeof courseSchema>;

// ─── Constants ─────────────────────────────────────────────────────────────────

const steps = ['Basic Info', 'Curriculum', 'Pricing', 'Publish'];

const CATEGORY_OPTIONS = [
  'Web Development',
  'UI/UX Design',
  'Digital Marketing',
  'Freelancing',
  'Graphic Design',
  'Data Analytics',
  'Mobile App Development',
  'Cybersecurity',
  'Machine Learning & AI',
].map((c) => ({ value: c, label: c }));

const LEVEL_OPTIONS = [
  { value: 'Beginner', label: 'Beginner' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Advanced', label: 'Advanced' },
];

const LANGUAGE_OPTIONS = [
  { value: 'বাংলা', label: 'বাংলা' },
  { value: 'English', label: 'English' },
];

// ─── Step field map for per-step validation ────────────────────────────────────

const STEP_FIELDS: Record<number, (keyof CourseFormValues)[]> = {
  0: ['title', 'subtitle', 'category', 'level', 'language', 'description'],
  1: ['sections'],
  2: ['price'],
};

// ─── Component ─────────────────────────────────────────────────────────────────

const CreateCoursePage = () => {
  const {
    control,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: '',
      subtitle: '',
      category: '',
      level: '',
      language: '',
      description: '',
      sections: [
        {
          title: 'Getting Started',
          lessons: [{ title: '', duration: '', free: false }],
        },
      ],
      price: '',
    },
    mode: 'onTouched',
  });

  const {
    fields: sectionFields,
    append: appendSection,
    remove: removeSection,
  } = useFieldArray({ control, name: 'sections' });

  const [step, setStep] = useState(0);
  // eslint-disable-next-line react-hooks/incompatible-library
  const watchedPrice = watch('price');
  const watchedTitle = watch('title');
  const watchedCategory = watch('category');
  const watchedLevel = watch('level');
  const watchedSections = watch('sections');

  const handleNext = async () => {
    const fields = STEP_FIELDS[step];
    const valid = await trigger(fields as any);
    if (valid) setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const onSubmit = (data: CourseFormValues) => {
    console.log('Course submitted:', data);
    alert('Course submitted for review!');
  };

  return (
    <div className="mx-auto space-y-6">
      {/* Header */}
      <SectionHeader
        title="Create New Course"
        description="Fill in the details to publish your course on EduNext."
      />

      {/* Step Progress */}
      <div className="rounded-md border border-slate-100 bg-white p-5 shadow-xs">
        <div className="flex items-center gap-2">
          {steps.map((s, i) => (
            <div key={i} className="flex flex-1 items-center">
              <button
                type="button"
                onClick={() => setStep(i)}
                className={`flex items-center gap-2 text-sm font-semibold transition-all ${
                  i === step ? 'text-primary' : i < step ? 'text-slate-400' : 'text-slate-300'
                }`}
              >
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                    i === step
                      ? 'bg-primary text-white'
                      : i < step
                        ? 'text-primary bg-emerald-100'
                        : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {i < step ? '✓' : i + 1}
                </div>
                <span className="hidden sm:block">{s}</span>
              </button>
              {i < steps.length - 1 && (
                <ChevronRight size={16} className="mx-2 flex-1 text-slate-200" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="rounded-md border border-slate-100 bg-white p-6 shadow-xs">
          {/* ── Step 1: Basic Info ── */}
          {step === 0 && (
            <div className="space-y-5">
              <h2 className="text-lg font-bold">Basic Information</h2>

              {/* Thumbnail */}
              <div>
                <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
                  Course Thumbnail
                </label>
                <div className="hover:border-primary flex h-40 w-full cursor-pointer items-center justify-center rounded-sm border-2 border-dashed border-slate-200 bg-slate-50 transition-all hover:bg-emerald-50/30">
                  <div className="text-center">
                    <Upload size={24} className="mx-auto mb-2 text-slate-300" />
                    <p className="text-sm font-medium text-slate-400">Click to upload thumbnail</p>
                    <p className="text-xs text-slate-400">PNG, JPG max 2MB</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <InputField
                    label="Course Title"
                    name="title"
                    control={control}
                    placeholder="e.g. Complete Web Development Bootcamp"
                    required
                    error={errors.title?.message}
                  />
                </div>

                <div className="sm:col-span-2">
                  <InputField
                    label="Subtitle"
                    name="subtitle"
                    control={control}
                    placeholder="Brief description of your course"
                    required
                    error={errors.subtitle?.message}
                  />
                </div>

                <SelectField
                  label="Category"
                  name="category"
                  control={control}
                  options={CATEGORY_OPTIONS}
                  placeholder="Select category"
                  required
                  error={errors.category?.message}
                />

                <SelectField
                  label="Level"
                  name="level"
                  control={control}
                  options={LEVEL_OPTIONS}
                  placeholder="Select level"
                  required
                  error={errors.level?.message}
                />

                <SelectField
                  label="Language"
                  name="language"
                  control={control}
                  options={LANGUAGE_OPTIONS}
                  placeholder="Select language"
                  required
                  error={errors.language?.message}
                />

                <div className="sm:col-span-2">
                  <TextAreaField
                    label="Description"
                    name="description"
                    control={control}
                    placeholder="Describe what students will learn in this course..."
                    required
                    rows={5}
                    error={errors.description?.message}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ── Step 2: Curriculum ── */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-lg font-bold">Course Curriculum</h2>
              <p className="text-sm text-slate-500">
                Build your course content section by section.
              </p>

              {sectionFields.map((section, si) => (
                <SectionBlock
                  key={section.id}
                  sectionIndex={si}
                  control={control}
                  errors={errors}
                  onRemoveSection={() => removeSection(si)}
                  canRemove={sectionFields.length > 1}
                />
              ))}

              {errors.sections?.root?.message && (
                <p className="text-xs font-medium text-red-500">{errors.sections.root.message}</p>
              )}

              <button
                type="button"
                onClick={() =>
                  appendSection({
                    title: '',
                    lessons: [{ title: '', duration: '', free: false }],
                  })
                }
                className="hover:border-primary hover:text-primary flex w-full items-center justify-center gap-2 rounded-sm border border-dashed border-slate-300 py-3.5 text-sm font-semibold text-slate-500 transition-all"
              >
                <Plus size={16} /> Add New Section
              </button>
            </div>
          )}

          {/* ── Step 3: Pricing ── */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-lg font-bold">Pricing</h2>
              <div className="rounded-sm border border-emerald-100 bg-emerald-50 p-4 text-sm text-slate-600">
                💡 EduNext deducts a{' '}
                <span className="text-primary font-bold">20% platform commission</span> from each
                sale. You keep the remaining 80%.
              </div>

              <InputField
                label="Course Price (BDT)"
                name="price"
                control={control}
                type="text"
                placeholder="1500"
                required
                error={errors.price?.message}
              />

              {watchedPrice && !errors.price && (
                <div className="rounded-sm border border-slate-100 bg-white p-5">
                  <h3 className="mb-3 text-sm font-bold">Revenue Breakdown</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Course Price</span>
                      <span className="font-semibold">
                        ৳{parseInt(watchedPrice).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-red-500">
                      <span>Platform Commission (20%)</span>
                      <span>- ৳{(parseInt(watchedPrice) * 0.2).toLocaleString()}</span>
                    </div>
                    <div className="h-px bg-slate-100" />
                    <div className="flex justify-between font-bold">
                      <span>You Earn Per Sale</span>
                      <span className="text-primary">
                        ৳{(parseInt(watchedPrice) * 0.8).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Step 4: Publish ── */}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-lg font-bold">Ready to Publish</h2>
              <div className="space-y-3">
                {[
                  {
                    label: 'Course Title',
                    value: watchedTitle || 'Not set',
                    done: !!watchedTitle,
                  },
                  {
                    label: 'Category',
                    value: watchedCategory || 'Not set',
                    done: !!watchedCategory,
                  },
                  {
                    label: 'Level',
                    value: watchedLevel || 'Not set',
                    done: !!watchedLevel,
                  },
                  {
                    label: 'Curriculum',
                    value: `${watchedSections?.length ?? 0} sections`,
                    done: (watchedSections?.length ?? 0) > 0,
                  },
                  {
                    label: 'Price',
                    value: watchedPrice ? `৳${watchedPrice}` : 'Not set',
                    done: !!watchedPrice,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between rounded-sm border p-4 ${
                      item.done
                        ? 'border-emerald-100 bg-emerald-50/50'
                        : 'border-red-100 bg-red-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                          item.done ? 'bg-primary text-white' : 'bg-red-100 text-red-500'
                        }`}
                      >
                        {item.done ? '✓' : '!'}
                      </div>
                      <span className="text-sm font-semibold">{item.label}</span>
                    </div>
                    <span className="text-xs text-slate-500">{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-sm border border-yellow-100 bg-yellow-50 p-4 text-xs text-slate-600">
                📋 After submission, your course will be reviewed by our admin team. You will be
                notified once it is approved.
              </div>
            </div>
          )}

          {/* ── Navigation ── */}
          <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="rounded-sm border border-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40"
            >
              ← Previous
            </button>
            {step < steps.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="bg-primary rounded-sm px-6 py-2.5 text-sm font-bold text-white hover:bg-[#2a6159]"
              >
                Next →
              </button>
            ) : (
              <button
                type="submit"
                className="bg-secondary rounded-sm px-8 py-2.5 text-sm font-bold text-white hover:bg-[#d98c0a]"
              >
                Submit for Review
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

// ─── SectionBlock Sub-component ────────────────────────────────────────────────

import InputField from '@/components/dashboard/Fields/InputField/InputField';
import SelectField from '@/components/dashboard/Fields/SelectField/SelectField';
import TextAreaField from '@/components/dashboard/Fields/TextAreaField/TextAreaField';
import { useState } from 'react';
import { Control, FieldErrors, useController } from 'react-hook-form';

interface SectionBlockProps {
  sectionIndex: number;
  control: Control<CourseFormValues>;
  errors: FieldErrors<CourseFormValues>;
  onRemoveSection: () => void;
  canRemove: boolean;
}

const SectionBlock = ({
  sectionIndex,
  control,
  errors,
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

  return (
    <div className="overflow-hidden rounded-sm border border-slate-200">
      {/* Section Header */}
      <div className="flex items-center gap-3 bg-slate-50 px-4 py-3">
        <GripVertical size={16} className="cursor-grab text-slate-300" />
        <div className="flex-1">
          <input
            type="text"
            value={sectionTitle}
            onChange={onSectionTitleChange}
            placeholder={`Section ${sectionIndex + 1}: Title`}
            className="w-full bg-transparent text-sm font-bold outline-none placeholder:text-slate-400"
          />
          {sectionErrors?.title && (
            <p className="mt-0.5 text-xs text-red-500">{sectionErrors.title.message}</p>
          )}
        </div>
        <span className="text-xs text-slate-400">{lessonFields.length} lessons</span>
        {canRemove && (
          <button
            type="button"
            onClick={onRemoveSection}
            className="text-slate-300 hover:text-red-400"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>

      {/* Lessons */}
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
          onClick={() => appendLesson({ title: '', duration: '', free: false })}
          className="hover:border-primary hover:text-primary flex w-full items-center gap-2 rounded-sm border border-dashed border-slate-200 px-3 py-2 text-xs font-semibold text-slate-400 transition-all"
        >
          <Plus size={13} /> Add Lesson
        </button>
      </div>
    </div>
  );
};

// ─── LessonRow Sub-component ───────────────────────────────────────────────────

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
    field: { value: duration, onChange: onDurationChange, onBlur: onDurationBlur },
  } = useController({
    control,
    name: `sections.${sectionIndex}.lessons.${lessonIndex}.duration`,
  });

  const {
    field: { value: free, onChange: onFreeChange },
  } = useController({
    control,
    name: `sections.${sectionIndex}.lessons.${lessonIndex}.free`,
  });

  const lessonErrors = errors.sections?.[sectionIndex]?.lessons?.[lessonIndex];

  return (
    <div className="space-y-1 pt-2">
      <div className="flex items-center gap-3 rounded-sm bg-white px-3 py-2.5">
        <Video size={14} className="shrink-0 text-slate-300" />

        {/* Lesson Title */}
        <div className="flex-1">
          <input
            type="text"
            value={title}
            onChange={onTitleChange}
            onBlur={onTitleBlur}
            placeholder={`Lesson ${lessonIndex + 1}: Title`}
            className="w-full text-sm outline-none placeholder:text-slate-400"
          />
        </div>

        {/* Duration — professional styled input */}
        <div className="relative">
          <input
            type="text"
            value={duration}
            onChange={onDurationChange}
            onBlur={(e) => {
              // Auto-format: if user types "1030" → "10:30"
              const raw = e.target.value.replace(/\D/g, '');
              if (raw.length >= 3 && !e.target.value.includes(':')) {
                const mins = raw.slice(0, raw.length - 2);
                const secs = raw.slice(-2);
                onDurationChange(`${mins}:${secs}`);
              }
              onDurationBlur();
            }}
            placeholder="mm:ss"
            maxLength={5}
            className={`w-16 rounded-sm border py-1 text-center text-xs transition-colors outline-none ${
              lessonErrors?.duration
                ? 'border-red-300 text-red-500 focus:border-red-400'
                : 'border-slate-200 text-slate-500 focus:border-emerald-300'
            }`}
          />
        </div>

        {/* Free toggle */}
        <label className="flex cursor-pointer items-center gap-1 text-xs text-slate-400">
          <input
            type="checkbox"
            checked={free}
            onChange={(e) => onFreeChange(e.target.checked)}
            className="accent-primary"
          />
          Free
        </label>

        {/* Remove */}
        {canRemove && (
          <button type="button" onClick={onRemove} className="text-slate-300 hover:text-red-400">
            <Trash2 size={13} />
          </button>
        )}
      </div>

      {/* Inline errors for lesson row */}
      {(lessonErrors?.title || lessonErrors?.duration) && (
        <div className="flex gap-4 px-3 pb-1">
          {lessonErrors?.title && (
            <p className="text-xs text-red-500">Title: {lessonErrors.title.message}</p>
          )}
          {lessonErrors?.duration && (
            <p className="text-xs text-red-500">Duration: {lessonErrors.duration.message}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CreateCoursePage;
