'use client';

import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import InputField from '@/components/dashboard/Fields/InputField/InputField';
import SelectField from '@/components/dashboard/Fields/SelectField/SelectField';
import TextAreaField from '@/components/dashboard/Fields/TextAreaField/TextAreaField';
import { useModal } from '@/context/ModalContext';
import { useCreateTicketMutation } from '@/redux/features/tickets/ticketsApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const createTicketSchema = z
  .object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    category: z.string().min(1, 'Category is required'),
    targetRole: z.string().min(1, 'Target Support is required'),
    courseId: z.string().optional(),
    priority: z.string().min(1, 'Priority is required'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
  })
  .refine(
    (data) => {
      if (data.targetRole === 'instructor' && !data.courseId) {
        return false;
      }
      return true;
    },
    {
      message: 'Please select a course for Instructor Support',
      path: ['courseId'],
    },
  );

type CreateTicketFormValues = z.infer<typeof createTicketSchema>;

export default function CreateTicketModal() {
  const { data, closeModal } = useModal();
  const role = (data?.role as 'student' | 'instructor' | 'admin') || 'student';
  const enrolledCourses = data?.enrolledCourses || [];

  const [createTicket, { isLoading }] = useCreateTicketMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTicketFormValues>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: {
      title: '',
      category: role === 'instructor' ? 'EARNINGS_ISSUE' : 'COURSE_DOUBT',
      targetRole: 'admin',
      priority: 'medium',
      courseId: '',
      message: '',
    },
  });

  const selectedTargetRole = useWatch({ control, name: 'targetRole' });

  const getCategoryOptions = () => {
    if (role === 'instructor') {
      return [
        { label: 'Earnings & Payout Issue', value: 'EARNINGS_ISSUE' },
        { label: 'Course Upload Technical Issue', value: 'COURSE_UPLOAD_ISSUE' },
        { label: 'Platform & Account Issue', value: 'ACCOUNT_ISSUE' },
        { label: 'Other Support', value: 'OTHER' },
      ];
    }

    return [
      { label: 'Course & Lesson Doubt', value: 'COURSE_DOUBT' },
      { label: 'Payment & Refund Issue', value: 'PAYMENT_ISSUE' },
      { label: 'Technical & Platform Issue', value: 'TECH_ISSUE' },
      { label: 'Certificate Issue', value: 'CERTIFICATE_ISSUE' },
      { label: 'Other', value: 'OTHER' },
    ];
  };

  const onSubmit = async (values: CreateTicketFormValues) => {
    try {
      await createTicket(values).unwrap();
      toast.success('Support ticket created successfully');
      closeModal();
    } catch {
      toast.error('Failed to create ticket. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Title Field */}
      <InputField
        name="title"
        label="Title"
        placeholder="Brief summary of your issue"
        control={control}
        error={errors.title?.message}
        required
      />

      {/* Target Support Role & Priority */}
      <div className="grid grid-cols-2 gap-4">
        <SelectField
          name="targetRole"
          label="Target Support"
          control={control}
          error={errors.targetRole?.message}
          required
          options={[
            { label: 'Platform Admin', value: 'admin' },
            ...(role === 'student' ? [{ label: 'Course Instructor', value: 'instructor' }] : []),
          ]}
        />

        <SelectField
          name="priority"
          label="Priority"
          control={control}
          error={errors.priority?.message}
          required
          options={[
            { label: 'Low', value: 'low' },
            { label: 'Medium', value: 'medium' },
            { label: 'High', value: 'high' },
          ]}
        />
      </div>

      {selectedTargetRole === 'instructor' && (
        <SelectField
          name="courseId"
          label="Select Enrolled Course"
          control={control}
          error={errors.courseId?.message}
          required
          options={
            enrolledCourses.length > 0
              ? enrolledCourses.map((c: { _id: string; title: string }) => ({
                  label: c.title,
                  value: c._id,
                }))
              : [{ label: 'No enrolled courses found', value: '' }]
          }
        />
      )}

      {/* Category Field */}
      <SelectField
        name="category"
        label="Category"
        control={control}
        error={errors.category?.message}
        required
        options={getCategoryOptions()}
      />

      {/* Message Field */}
      <TextAreaField
        name="message"
        label="Message"
        placeholder="Describe your issue in detail..."
        control={control}
        error={errors.message?.message}
        required
        rows={4}
      />

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-2">
        <DynamicActionButton
          label="Cancel"
          variant="outline"
          className="h-11!"
          onClick={closeModal}
          disabled={isLoading}
        />
        <DynamicActionButton
          type="submit"
          label="Create Ticket"
          isLoading={isLoading}
          className="h-11!"
        />
      </div>
    </form>
  );
}
