'use client';

import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import InputField from '@/components/dashboard/Fields/InputField/InputField';
import SelectField from '@/components/dashboard/Fields/SelectField/SelectField';
import TextAreaField from '@/components/dashboard/Fields/TextAreaField/TextAreaField';
import { useModal } from '@/context/ModalContext';
import { useCreateTicketMutation } from '@/redux/features/tickets/ticketsApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const createTicketSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  category: z.string().min(1, 'Category is required'),
  targetRole: z.string().min(1, 'Target Support is required'),
  priority: z.string().min(1, 'Priority is required'),
  message: z.string().min(1, 'Message is required'),
});

type CreateTicketFormValues = z.infer<typeof createTicketSchema>;

export default function CreateTicketModal() {
  const { data, closeModal } = useModal();
  const role = data?.role as 'student' | 'instructor' | 'admin';

  const [createTicket, { isLoading }] = useCreateTicketMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTicketFormValues>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: {
      title: '',
      category: 'Payment Issue',
      targetRole: 'admin',
      priority: 'medium',
      message: '',
    },
  });

  const onSubmit = async (values: CreateTicketFormValues) => {
    try {
      await createTicket(values).unwrap();
      toast.success('Ticket created successfully');
      closeModal();
    } catch {
      toast.error('Failed to create ticket');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <InputField
        name="title"
        label="Title"
        placeholder="Enter ticket title"
        control={control}
        error={errors.title?.message}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <SelectField
          name="category"
          label="Category"
          control={control}
          error={errors.category?.message}
          required
          options={[
            { label: 'Payment Issue', value: 'Payment Issue' },
            { label: 'Technical Issue', value: 'Technical Issue' },
            { label: 'Certificate Issue', value: 'Certificate Issue' },
            { label: 'Other', value: 'Other' },
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

      <div className="space-y-1">
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
        <p className="text-text-placeholder text-xs">Who should resolve this issue?</p>
      </div>

      <TextAreaField
        name="message"
        label="Message"
        placeholder="Describe your issue in detail..."
        control={control}
        error={errors.message?.message}
        required
        rows={4}
      />

      <div className="flex justify-end gap-3">
        <DynamicActionButton
          label="Cancel"
          variant="outline"
          className="h-11!"
          onClick={closeModal}
          disabled={isLoading}
        />
        <DynamicActionButton
          type="submit"
          label="Submit Ticket"
          isLoading={isLoading}
          className="h-11!"
        />
      </div>
    </form>
  );
}
