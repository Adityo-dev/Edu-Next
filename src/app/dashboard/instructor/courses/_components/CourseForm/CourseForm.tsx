/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import SectionHeader from '@/components/dashboard/SectionHeader/SectionHeader';

import {
  useCreateCourseMutation,
  useUpdateCourseContentMutation,
} from '@/redux/features/courseManagement/instructorCourse.api';
import { useUploadImageMutation } from '@/redux/features/upload/uploadApi';

import { CourseFormValues, LAST_STEP_INDEX, STEPS, STEP_FIELDS, courseSchema } from './schema';
import Step1BasicInfo from './Step1BasicInfo/Step1BasicInfo';
import Step2Curriculum from './Step2Curriculum/Step2Curriculum';
import Step3Pricing from './Step3Pricing/Step3Pricing';
import Step4Publish from './Step4Publish/Step4Publish';

// ─── Helpers
const calcTotalDuration = (sections: CourseFormValues['sections']) => {
  let totalSeconds = 0;
  sections.forEach((s) =>
    s.lessons.forEach((l) => {
      const h = parseInt(l.durationHr || '0', 10);
      const m = parseInt(l.durationMin || '0', 10);
      const sec = parseInt(l.durationSec || '0', 10);
      if (!isNaN(h) && !isNaN(m) && !isNaN(sec)) totalSeconds += h * 3600 + m * 60 + sec;
    }),
  );
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.round((totalSeconds % 3600) / 60);
  return `${hrs} hrs ${mins} mins`;
};

const formatDuration = (hr: string, min: string, sec: string) =>
  `${(hr || '0').padStart(2, '0')}:${(min || '0').padStart(2, '0')}:${(sec || '0').padStart(2, '0')}`;

const LOCAL_STORAGE_KEY = 'edu-next-course-draft';

interface ICourseFormProps {
  mode: 'create' | 'edit';
  initialData?: CourseFormValues;
  courseId?: string;
}

const CourseForm = ({ mode, initialData, courseId }: ICourseFormProps) => {
  const router = useRouter();
  const [createCourse, { isLoading: isCreating }] = useCreateCourseMutation();
  const [updateCourse, { isLoading: isUpdating }] = useUpdateCourseContentMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();

  const isSaving = isCreating || isUpdating;

  const defaultValues: CourseFormValues = initialData || {
    thumbnail: '',
    title: '',
    subtitle: '',
    category: '',
    level: '',
    language: '',
    hasCertificate: false,
    description: '',
    tags: [],
    requirements: '',
    whatYouLearn: '',
    sections: [
      {
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
      },
    ],
    price: '',
    estimatedPrice: '',
  };

  const {
    control,
    handleSubmit,
    trigger,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues,
    mode: 'onTouched',
  });

  // Re-populate from localStorage on mount (only in create mode)
  useEffect(() => {
    if (mode === 'create') {
      const savedDraft = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedDraft) {
        try {
          const parsed = JSON.parse(savedDraft);
          reset(parsed);
        } catch (e) {
          console.error('Failed to parse course draft', e);
        }
      }
    }
  }, [mode, reset]);

  // Re-populate if initialData changes (useful for edit mode if fetched asynchronously)
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      reset(initialData);
    }
  }, [initialData, mode, reset]);

  // Auto-save to localStorage on change (only in create mode)
  useEffect(() => {
    if (mode === 'create') {
      const subscription = watch((value) => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
      });
      return () => subscription.unsubscribe();
    }
  }, [mode, watch]);

  const [step, setStep] = useState(0);
  const isLastStep = step === LAST_STEP_INDEX;

  // Read initial step from URL query params
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const stepParam = params.get('step');
      if (stepParam) {
        const parsed = parseInt(stepParam, 10);
        if (!isNaN(parsed) && parsed >= 0 && parsed <= LAST_STEP_INDEX) {
          setStep(parsed);
        }
      }
    }
  }, []);

  // Sync step to URL query param
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (url.searchParams.get('step') !== step.toString()) {
        url.searchParams.set('step', step.toString());
        window.history.replaceState({}, '', url.toString());
      }
    }
  }, [step]);

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
        hasCertificate: data.hasCertificate,
        requirements: data.requirements,
        whatYouLearn: data.whatYouLearn,
        totalDuration: calcTotalDuration(data.sections),
        sections: data.sections.map((section, sIdx) => ({
          title: section.title,
          order: sIdx + 1,
          lessons: section.lessons.map((lesson, lIdx) => ({
            title: lesson.title,
            duration: formatDuration(lesson.durationHr, lesson.durationMin, lesson.durationSec),
            videoUrl: lesson.videoUrl,
            isFree: lesson.free,
            order: lIdx + 1,
          })),
        })),
      };

      if (mode === 'create') {
        await createCourse(payload as any).unwrap();
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        toast.success('Course created and saved as draft!');
      } else {
        if (!courseId) throw new Error('Course ID is required for editing.');
        await updateCourse({ id: courseId, payload: payload as any }).unwrap();
        toast.success('Course updated successfully!');
      }

      router.push('/dashboard/instructor/courses');
    } catch (err: any) {
      console.error('Course operation failed:', err);
      toast.error(err?.data?.message || 'Operation failed. Please try again.');
    }
  };

  const handleSaveClick = () => {
    if (!isLastStep) return;
    handleSubmit(onSubmit)();
  };

  return (
    <section className="space-y-5">
      <SectionHeader
        title={mode === 'create' ? 'Create New Course' : 'Edit Course'}
        description={
          mode === 'create'
            ? 'Fill in the details to publish your course on EduNext.'
            : 'Update your course details and curriculum.'
        }
      />

      {/* Step Progress */}
      <div className="dashboard-card-container">
        <div className="flex items-center gap-2">
          {STEPS.map((s, i) => (
            <div key={i} className="flex flex-1 items-center">
              <button
                type="button"
                onClick={() => setStep(i)}
                className={`flex cursor-pointer items-center gap-2 text-sm font-semibold transition-all ${
                  i === step
                    ? 'text-primary'
                    : i < step
                      ? 'text-text-secondary'
                      : 'text-text-secondary'
                }`}
              >
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                    i === step
                      ? 'bg-primary text-white'
                      : i < step
                        ? 'text-primary bg-emerald-100'
                        : 'text-text-secondary bg-slate-100'
                  }`}
                >
                  {i < step ? '✓' : i + 1}
                </div>
                <span className="hidden sm:block">{s}</span>
              </button>
              {i < STEPS.length - 1 && (
                <ChevronRight size={16} className="text-text-secondary/50 mx-2 flex-1" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-card-container">
        {/* Step 1: Basic Info */}
        {step === 0 && (
          <Step1BasicInfo
            control={control}
            errors={errors}
            watchedThumbnail={watchedThumbnail}
            isUploading={isUploading}
            handleThumbnailChange={handleThumbnailChange}
          />
        )}

        {/* Step 2: Curriculum */}
        {step === 1 && (
          <Step2Curriculum
            control={control}
            errors={errors}
            trigger={trigger}
            getValues={getValues}
          />
        )}

        {/* Step 3: Pricing */}
        {step === 2 && (
          <Step3Pricing
            control={control}
            errors={errors}
            watchedPrice={watchedPrice}
            watchedEstimatedPrice={watchedEstimatedPrice}
          />
        )}

        {/* Step 4: Publish */}
        {step === 3 && (
          <Step4Publish
            watchedThumbnail={watchedThumbnail}
            watchedTitle={watchedTitle}
            watchedCategory={watchedCategory}
            watchedLevel={watchedLevel}
            watchedTags={watchedTags}
            watchedRequirements={watchedRequirements}
            watchedWhatYouLearn={watchedWhatYouLearn}
            watchedSections={watchedSections}
            watchedPrice={watchedPrice}
          />
        )}

        {/* Navigation */}
        <div className="border-border mt-6 flex items-center justify-between border-t pt-4">
          <button
            type="button"
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="cursor-pointer rounded-sm border border-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40"
          >
            ← Previous
          </button>
          {!isLastStep ? (
            <button
              type="button"
              onClick={handleNext}
              className="bg-primary cursor-pointer rounded-sm px-6 py-2.5 text-sm font-bold text-white hover:bg-[#2a6159]"
            >
              Next →
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSaveClick}
              disabled={isSaving}
              className="bg-secondary cursor-pointer rounded-sm px-8 py-2.5 text-sm font-bold text-white hover:bg-[#d98c0a] disabled:cursor-none disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : mode === 'create' ? 'Save as Draft' : 'Save Changes'}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default CourseForm;
