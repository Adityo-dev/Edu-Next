import { z } from 'zod';

const baseFields = {
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(30, 'First name is too long'),
  lastName: z.string().max(30, 'Last name is too long').optional().or(z.literal('')),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Enter a valid email address (e.g. you@example.com)'),
  phone: z
    .string()
    .regex(/^01[3-9]\d{8}$/, 'Enter a valid 11-digit Bangladeshi number (e.g. 017XXXXXXXX)'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Must contain at least one number'),
  confirm: z.string().min(1, 'Please confirm your password'),
  agree: z.literal(true, {
    error: 'You must agree to the Terms and Privacy Policy',
  }),
};

const studentSchema = z.object({
  role: z.literal('student'),
  ...baseFields,
});

const instructorSchema = z.object({
  role: z.literal('instructor'),
  ...baseFields,
  expertise: z.string().min(1, 'Please select your area of expertise'),
});

export const registerSchema = z
  .discriminatedUnion('role', [studentSchema, instructorSchema])
  .refine((data) => data.password === data.confirm, {
    message: 'Passwords do not match',
    path: ['confirm'],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const expertiseOptions = [
  'Next.js',
  'TypeScript',
  'React',
  'Web Development',
  'UI/UX Design',
  'Digital Marketing',
  'Freelancing',
  'Graphic Design',
  'Data Analytics',
  'Mobile App Development',
  'Cybersecurity',
  'Machine Learning & AI',
  'Video Editing',
];
