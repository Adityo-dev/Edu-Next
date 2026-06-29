/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronRight, GripVertical, Plus, Trash2, Video, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import ImageUploadField from '@/components/dashboard/Fields/ImageUploadField/ImageUploadField';
import InputField from '@/components/dashboard/Fields/InputField/InputField';
import SelectField from '@/components/dashboard/Fields/SelectField/SelectField';
import TextAreaField from '@/components/dashboard/Fields/TextAreaField/TextAreaField';
import SectionHeader from '@/components/dashboard/SectionHeader/SectionHeader';

import { useCreateCourseMutation } from '@/redux/features/courseManagement/instructorCourse.api';
import { useUploadImageMutation } from '@/redux/features/upload/uploadApi';
import { useState } from 'react';
import { Control, FieldErrors, useController } from 'react-hook-form';

// ─── Zod Schema ────────────────────────────────────────────────────────────────

const lessonSchema = z.object({
  title: z.string().min(1, 'Lesson title is required'),
  durationMin: z
    .string()
    .min(1, 'Required')
    .regex(/^\d{1,3}$/, 'Invalid'),
  durationSec: z
    .string()
    .min(1, 'Required')
    .regex(/^\d{1,2}$/, 'Invalid'),
  videoUrl: z.string().min(1, 'Video URL is required').url('Must be a valid URL'),
  free: z.boolean(),
});

const sectionSchema = z.object({
  title: z.string().min(1, 'Section title is required'),
  lessons: z.array(lessonSchema).min(1, 'At least one lesson is required'),
});

const courseSchema = z.object({
  // Step 1 — Basic Info
  thumbnail: z.string().min(1, 'Course thumbnail is required'),
  title: z.string().min(3, 'Course title must be at least 3 characters'),
  subtitle: z.string().min(5, 'Subtitle must be at least 5 characters'),
  category: z.string().min(1, 'Please select a category'),
  level: z.string().min(1, 'Please select a level'),
  language: z.string().min(1, 'Please select a language'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  tags: z.array(z.string()).min(1, 'Add at least one tag'),
  requirements: z.array(z.string()).min(1, 'Add at least one requirement'),
  whatYouLearn: z.array(z.string()).min(1, 'Add at least one learning outcome'),
  // Step 2 — Curriculum
  sections: z.array(sectionSchema).min(1, 'At least one section is required'),
  // Step 3 — Pricing
  price: z
    .string()
    .min(1, 'Price is required')
    .regex(/^\d+$/, 'Price must be a valid number')
    .refine((v) => parseInt(v) >= 100, 'Minimum price is ৳100'),
  estimatedPrice: z
    .string()
    .optional()
    .refine((v) => !v || /^\d+$/.test(v), 'Estimated price must be a valid number'),
});

type CourseFormValues = z.infer<typeof courseSchema>;

// ─── Constants ─────────────────────────────────────────────────────────────────

const STEPS = ['Basic Info', 'Curriculum', 'Pricing', 'Publish'] as const;
const LAST_STEP_INDEX = STEPS.length - 1;

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

const MINUTE_OPTIONS = Array.from({ length: 60 }, (_, i) => i.toString());
const SECOND_OPTIONS = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

const STEP_FIELDS: Record<number, (keyof CourseFormValues)[]> = {
  0: [
    'thumbnail',
    'title',
    'subtitle',
    'category',
    'level',
    'language',
    'description',
    'tags',
    'requirements',
    'whatYouLearn',
  ],
  1: ['sections'],
  2: ['price', 'estimatedPrice'],
};

// ─── Helpers ────────────────────────────────────────────────────────────────────

const calcTotalDuration = (sections: CourseFormValues['sections']) => {
  let totalSeconds = 0;
  sections.forEach((s) =>
    s.lessons.forEach((l) => {
      const m = parseInt(l.durationMin || '0', 10);
      const sec = parseInt(l.durationSec || '0', 10);
      if (!isNaN(m) && !isNaN(sec)) totalSeconds += m * 60 + sec;
    }),
  );
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.round((totalSeconds % 3600) / 60);
  return `${hrs} hrs ${mins} mins`;
};

const formatDuration = (min: string, sec: string) =>
  `${min || '0'}:${(sec || '0').padStart(2, '0')}`;

const formatDurationPreview = (min: string, sec: string) => {
  if (!min && !sec) return '';
  return `${min || '0'}m ${(sec || '0').padStart(2, '0')}s`;
};

// ─── Reusable Tag/List Input ────────────────────────────────────────────────────

interface TagListFieldProps {
  label: string;
  placeholder: string;
  required?: boolean;
  control: Control<CourseFormValues>;
  name: 'tags' | 'requirements' | 'whatYouLearn';
  error?: string;
}

const TagListField = ({
  label,
  placeholder,
  required,
  control,
  name,
  error,
}: TagListFieldProps) => {
  const [draft, setDraft] = useState('');
  const {
    field: { value, onChange },
  } = useController({ control, name });

  const items: string[] = value || [];

  const addItem = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    if (items.includes(trimmed)) {
      toast.error('Already added');
      return;
    }
    onChange([...items, trimmed]);
    setDraft('');
  };

  const removeItem = (idx: number) => {
    onChange(items.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addItem();
            }
          }}
          placeholder={placeholder}
          className={`focus:border-primary w-full rounded-sm border bg-[#F9FAFB] px-4 py-3 text-sm transition-all outline-none focus:bg-white focus:ring-2 focus:ring-emerald-100 ${
            error ? 'border-red-300' : 'border-slate-200'
          }`}
        />
        <button
          type="button"
          onClick={addItem}
          className="hover:bg-primary shrink-0 rounded-sm border border-slate-200 px-4 text-sm font-semibold text-slate-500 transition-all hover:text-white"
        >
          <Plus size={15} />
        </button>
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      {items.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {items.map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700"
            >
              {item}
              <button type="button" onClick={() => removeItem(i)} className="hover:text-red-500">
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Component ─────────────────────────────────────────────────────────────────

const CreateCoursePage = () => {
  const router = useRouter();
  const [createCourse, { isLoading: isCreating }] = useCreateCourseMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();

  const {
    control,
    handleSubmit,
    trigger,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      thumbnail: '',
      title: '',
      subtitle: '',
      category: '',
      level: '',
      language: '',
      description: '',
      tags: [],
      requirements: [],
      whatYouLearn: [],
      sections: [
        {
          title: 'Getting Started',
          lessons: [{ title: '', durationMin: '', durationSec: '', videoUrl: '', free: false }],
        },
      ],
      price: '',
      estimatedPrice: '',
    },
    mode: 'onTouched',
  });

  const {
    fields: sectionFields,
    append: appendSection,
    remove: removeSection,
  } = useFieldArray({ control, name: 'sections' });

  const [step, setStep] = useState(0);
  const isLastStep = step === LAST_STEP_INDEX;

  // eslint-disable-next-line react-hooks/incompatible-library
  const watchedPrice = watch('price');
  const watchedEstimatedPrice = watch('estimatedPrice');
  const watchedTitle = watch('title');
  const watchedThumbnail = watch('thumbnail');
  const watchedCategory = watch('category');
  const watchedLevel = watch('level');
  const watchedSections = watch('sections');
  const watchedTags = watch('tags');
  const watchedRequirements = watch('requirements');
  const watchedWhatYouLearn = watch('whatYouLearn');

  const handleNext = async () => {
    const fields = STEP_FIELDS[step];
    const valid = fields ? await trigger(fields as any) : true;
    if (valid) setStep((s) => Math.min(s + 1, LAST_STEP_INDEX));
  };

  // ── Block Enter key from ever submitting the form on non-final steps ──
  const handleFormKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!isLastStep) handleNext();
    }
  };

  const handleThumbnailChange = async (file: File | null) => {
    if (!file) {
      setValue('thumbnail', '', { shouldValidate: true });
      return;
    }
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await uploadImage(formData).unwrap();
      setValue('thumbnail', res.data.url, { shouldValidate: true });
      toast.success('Thumbnail uploaded successfully');
    } catch (err) {
      console.error('Thumbnail upload failed:', err);
      toast.error('Thumbnail upload failed. Try again.');
    }
  };

  const onSubmit = async (data: CourseFormValues) => {
    try {
      const payload = {
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        price: parseFloat(data.price),
        estimatedPrice: data.estimatedPrice
          ? parseFloat(data.estimatedPrice)
          : parseFloat(data.price),
        thumbnail: data.thumbnail,
        category: data.category,
        level: data.level,
        language: data.language,
        tags: data.tags,
        hasCertificate: true,
        requirements: data.requirements,
        whatYouLearn: data.whatYouLearn,
        totalDuration: calcTotalDuration(data.sections),
        sections: data.sections.map((section, sIdx) => ({
          title: section.title,
          order: sIdx + 1,
          lessons: section.lessons.map((lesson, lIdx) => ({
            title: lesson.title,
            duration: formatDuration(lesson.durationMin, lesson.durationSec),
            videoUrl: lesson.videoUrl,
            isFree: lesson.free,
            order: lIdx + 1,
          })),
        })),
      };

      await createCourse(payload as any).unwrap();
      toast.success('Course submitted for review!');
      router.push('/dashboard/instructor/courses');
    } catch (err: any) {
      console.error('Course creation failed:', err);
      toast.error(err?.data?.message || 'Failed to create course. Please try again.');
    }
  };

  // ── Decoupled, explicit submit trigger — never fires implicitly ──
  const handlePublishClick = () => {
    if (!isLastStep) return; // hard guard: can never fire unless actually on Publish step
    handleSubmit(onSubmit)();
  };

  return (
    <div className="mx-auto space-y-6">
      <SectionHeader
        title="Create New Course"
        description="Fill in the details to publish your course on EduNext."
      />

      {/* Step Progress */}
      <div className="dashboard-card-container">
        <div className="flex items-center gap-2">
          {STEPS.map((s, i) => (
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
              {i < STEPS.length - 1 && (
                <ChevronRight size={16} className="mx-2 flex-1 text-slate-200" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── No more <form onSubmit>; submit is fully manual & decoupled ── */}
      <div onKeyDown={handleFormKeyDown}>
        <div className="rounded-md border border-slate-100 bg-white p-6 shadow-xs">
          {/* ── Step 1: Basic Info ── */}
          {step === 0 && (
            <div className="space-y-5">
              <h2 className="text-lg font-bold">Basic Information</h2>

              <ImageUploadField
                label="Course Thumbnail"
                subLabel="PNG, JPG max 5MB"
                value={watchedThumbnail}
                onChange={handleThumbnailChange}
                error={isUploading ? undefined : errors.thumbnail?.message}
                required
              />
              {isUploading && (
                <p className="text-primary text-xs font-medium">Uploading thumbnail...</p>
              )}

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

                <div className="sm:col-span-2">
                  <TagListField
                    label="Tags"
                    placeholder="e.g. nextjs — press Enter or +"
                    required
                    control={control}
                    name="tags"
                    error={errors.tags?.message as string | undefined}
                  />
                </div>

                <div className="sm:col-span-2">
                  <TagListField
                    label="Requirements"
                    placeholder="e.g. Basic HTML & CSS — press Enter or +"
                    required
                    control={control}
                    name="requirements"
                    error={errors.requirements?.message as string | undefined}
                  />
                </div>

                <div className="sm:col-span-2">
                  <TagListField
                    label="What You'll Learn"
                    placeholder="e.g. Next.js App Router — press Enter or +"
                    required
                    control={control}
                    name="whatYouLearn"
                    error={errors.whatYouLearn?.message as string | undefined}
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
                  trigger={trigger}
                  getValues={getValues}
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
                    lessons: [
                      { title: '', durationMin: '', durationSec: '', videoUrl: '', free: false },
                    ],
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

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InputField
                  label="Course Price (BDT)"
                  name="price"
                  control={control}
                  type="text"
                  placeholder="1500"
                  required
                  error={errors.price?.message}
                />
                <div>
                  <InputField
                    label="Estimated / Original Price (BDT)"
                    name="estimatedPrice"
                    control={control}
                    type="text"
                    placeholder="e.g. 2500 (shown as strikethrough)"
                    error={errors.estimatedPrice?.message}
                  />
                  <p className="mt-1 text-xs text-slate-400">
                    Optional — shows a discount badge to students. Leave empty to skip.
                  </p>
                </div>
              </div>

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
                    {watchedEstimatedPrice && (
                      <div className="flex justify-between text-slate-400">
                        <span>Estimated Price</span>
                        <span className="line-through">
                          ৳{parseInt(watchedEstimatedPrice).toLocaleString()}
                        </span>
                      </div>
                    )}
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
                    label: 'Thumbnail',
                    value: watchedThumbnail ? 'Uploaded' : 'Not set',
                    done: !!watchedThumbnail,
                  },
                  { label: 'Course Title', value: watchedTitle || 'Not set', done: !!watchedTitle },
                  {
                    label: 'Category',
                    value: watchedCategory || 'Not set',
                    done: !!watchedCategory,
                  },
                  { label: 'Level', value: watchedLevel || 'Not set', done: !!watchedLevel },
                  {
                    label: 'Tags',
                    value: `${watchedTags?.length ?? 0} added`,
                    done: (watchedTags?.length ?? 0) > 0,
                  },
                  {
                    label: 'Requirements',
                    value: `${watchedRequirements?.length ?? 0} added`,
                    done: (watchedRequirements?.length ?? 0) > 0,
                  },
                  {
                    label: "What You'll Learn",
                    value: `${watchedWhatYouLearn?.length ?? 0} added`,
                    done: (watchedWhatYouLearn?.length ?? 0) > 0,
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
            {!isLastStep ? (
              <button
                type="button"
                onClick={handleNext}
                className="bg-primary rounded-sm px-6 py-2.5 text-sm font-bold text-white hover:bg-[#2a6159]"
              >
                Next →
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePublishClick}
                disabled={isCreating}
                className="bg-secondary rounded-sm px-8 py-2.5 text-sm font-bold text-white hover:bg-[#d98c0a] disabled:opacity-50"
              >
                {isCreating ? 'Submitting...' : 'Submit for Review'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── SectionBlock Sub-component ────────────────────────────────────────────────

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

    appendLesson({ title: '', durationMin: '', durationSec: '', videoUrl: '', free: false });
  };

  return (
    <div className="overflow-hidden rounded-sm border border-slate-200">
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
  const hasDurationError = !!(lessonErrors?.durationMin || lessonErrors?.durationSec);
  const preview = formatDurationPreview(durationMin, durationSec);

  return (
    <div className="space-y-1 pt-2">
      <div className="flex flex-wrap items-center gap-3 rounded-sm bg-white px-3 py-2.5">
        <Video size={14} className="shrink-0 text-slate-300" />

        <div className="min-w-35 flex-1">
          <input
            type="text"
            value={title}
            onChange={onTitleChange}
            onBlur={onTitleBlur}
            placeholder={`Lesson ${lessonIndex + 1}: Title`}
            className="w-full text-sm outline-none placeholder:text-slate-400"
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
                ? 'border-red-300 text-red-500'
                : 'border-slate-200 text-slate-500 focus:border-emerald-300'
            }`}
          />
        </div>

        {/* Duration — dropdown selectors + live preview */}
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-1 rounded-sm border bg-[#F9FAFB] px-2 py-1.5 ${
              hasDurationError ? 'border-red-300' : 'border-slate-200'
            }`}
          >
            <select
              value={durationMin}
              onChange={(e) => onDurationMinChange(e.target.value)}
              className="cursor-pointer bg-transparent text-center text-xs font-medium text-slate-600 outline-none"
            >
              <option value="" disabled>
                mm
              </option>
              {MINUTE_OPTIONS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <span className="text-xs font-bold text-slate-300">:</span>
            <select
              value={durationSec}
              onChange={(e) => onDurationSecChange(e.target.value)}
              className="cursor-pointer bg-transparent text-center text-xs font-medium text-slate-600 outline-none"
            >
              <option value="" disabled>
                ss
              </option>
              {SECOND_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          {preview && (
            <span className="text-primary bg-primary/5 rounded-full px-2 py-1 text-[10px] font-semibold whitespace-nowrap">
              {preview}
            </span>
          )}
        </div>

        <label className="flex cursor-pointer items-center gap-1 text-xs text-slate-400">
          <input
            type="checkbox"
            checked={free}
            onChange={(e) => onFreeChange(e.target.checked)}
            className="accent-primary"
          />
          Free
        </label>

        {canRemove && (
          <button type="button" onClick={onRemove} className="text-slate-300 hover:text-red-400">
            <Trash2 size={13} />
          </button>
        )}
      </div>

      {(lessonErrors?.title || hasDurationError || lessonErrors?.videoUrl) && (
        <div className="flex flex-wrap gap-4 px-3 pb-1">
          {lessonErrors?.title && (
            <p className="text-xs text-red-500">Title: {lessonErrors.title.message}</p>
          )}
          {lessonErrors?.videoUrl && (
            <p className="text-xs text-red-500">Video: {lessonErrors.videoUrl.message}</p>
          )}
          {hasDurationError && <p className="text-xs text-red-500">Duration: select mm:ss</p>}
        </div>
      )}
    </div>
  );
};

export default CreateCoursePage;
