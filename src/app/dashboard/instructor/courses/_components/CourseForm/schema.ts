import { z } from 'zod';

// ─── Zod Schema
export const lessonSchema = z.object({
  title: z.string().min(1, 'Lesson title is required'),
  durationHr: z
    .string()
    .min(1, 'Required')
    .regex(/^\d{1,2}$/, 'Invalid'),
  durationMin: z
    .string()
    .min(1, 'Required')
    .regex(/^\d{1,2}$/, 'Invalid'),
  durationSec: z
    .string()
    .min(1, 'Required')
    .regex(/^\d{1,2}$/, 'Invalid'),
  videoUrl: z.string().min(1, 'Video URL is required').url('Must be a valid URL'),
  free: z.boolean(),
});

export const sectionSchema = z.object({
  title: z.string().min(1, 'Section title is required'),
  lessons: z.array(lessonSchema).min(1, 'At least one lesson is required'),
});

export const courseSchema = z.object({
  // Step 1 — Basic Info
  thumbnail: z.string().min(1, 'Course thumbnail is required'),
  title: z.string().min(3, 'Course title must be at least 3 characters'),
  subtitle: z.string().min(5, 'Subtitle must be at least 5 characters'),
  category: z.string().min(1, 'Please select a category'),
  level: z.string().min(1, 'Please select a level'),
  language: z.string().min(1, 'Please select a language'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  tags: z.array(z.string()).min(1, 'Add at least one tag'),
  requirements: z.string().min(10, 'Requirements must be at least 10 characters'),
  whatYouLearn: z.string().min(10, 'Learning outcomes must be at least 10 characters'),
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

export type CourseFormValues = z.infer<typeof courseSchema>;

// ─── Constants
export const STEPS = ['Basic Info', 'Curriculum', 'Pricing', 'Publish'] as const;
export const LAST_STEP_INDEX = STEPS.length - 1;

export const CATEGORY_OPTIONS = [
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

export const LEVEL_OPTIONS = [
  { value: 'Beginner', label: 'Beginner' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Advanced', label: 'Advanced' },
];

export const LANGUAGE_OPTIONS = [
  { value: 'বাংলা', label: 'বাংলা' },
  { value: 'English', label: 'English' },
  { value: 'Hindi', label: 'Hindi' },
];

export const STEP_FIELDS: Record<number, (keyof CourseFormValues)[]> = {
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
