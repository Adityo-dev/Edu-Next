/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import SectionHeader from '@/components/dashboard/SectionHeader/SectionHeader';

import { useCreateCourseMutation } from '@/redux/features/courseManagement/instructorCourse.api';
import { useUploadImageMutation } from '@/redux/features/upload/uploadApi';
import { useState } from 'react';

import {
  CourseFormValues,
  LAST_STEP_INDEX,
  STEPS,
  STEP_FIELDS,
  courseSchema,
} from './_components/schema';
import Step1BasicInfo from './_components/Step1BasicInfo/Step1BasicInfo';
import Step2Curriculum from './_components/Step2Curriculum/Step2Curriculum';
import Step3Pricing from './_components/Step3Pricing/Step3Pricing';
import Step4Publish from './_components/Step4Publish/Step4Publish';

// ─── Helpers
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

// ─── Component
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
      requirements: '',
      whatYouLearn: '',
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

  const handlePublishClick = () => {
    if (!isLastStep) return;
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
            <Step1BasicInfo
              control={control}
              errors={errors}
              watchedThumbnail={watchedThumbnail}
              isUploading={isUploading}
              handleThumbnailChange={handleThumbnailChange}
            />
          )}

          {/* ── Step 2: Curriculum ── */}
          {step === 1 && (
            <Step2Curriculum
              control={control}
              errors={errors}
              trigger={trigger}
              getValues={getValues}
            />
          )}

          {/* ── Step 3: Pricing ── */}
          {step === 2 && (
            <Step3Pricing
              control={control}
              errors={errors}
              watchedPrice={watchedPrice}
              watchedEstimatedPrice={watchedEstimatedPrice}
            />
          )}

          {/* ── Step 4: Publish ── */}
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

export default CreateCoursePage;
