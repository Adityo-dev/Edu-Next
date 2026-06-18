/* eslint-disable no-unused-vars */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import InputField from '@/components/dashboard/Fields/InputField/InputField';
import SelectField from '@/components/dashboard/Fields/SelectField/SelectField';

// 🛠️ ১. Zod স্কিমা ডিফাইন করা হলো
const sessionSchema = z.object({
  title: z.string().min(1, 'Session title is required'),
  course: z.string().min(1, 'Course selection is required'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  duration: z.string().min(1, 'Duration is required'),
  platform: z.string().min(1, 'Platform is required'),
  meetingLink: z.string().url('Invalid URL format').min(1, 'Meeting link is required'),
});

type TSessionFormValues = z.infer<typeof sessionSchema>;

interface CreateSessionFormProps {
  setShowCreate: (show: boolean) => void;

  handleCreateSession?: (data: TSessionFormValues) => void;
}

const CreateSessionForm = ({ setShowCreate, handleCreateSession }: CreateSessionFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TSessionFormValues>({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      title: '',
      course: 'Complete Web Development Bootcamp',
      date: '',
      time: '',
      duration: '',
      platform: 'Zoom',
      meetingLink: '',
    },
  });

  const courseOptions = [
    { value: 'Complete Web Development Bootcamp', label: 'Complete Web Development Bootcamp' },
    { value: 'React.js Advanced Masterclass', label: 'React.js Advanced Masterclass' },
    { value: 'Node.js & Express API Development', label: 'Node.js & Express API Development' },
  ];

  const platformOptions = [
    { value: 'Zoom', label: 'Zoom' },
    { value: 'Google Meet', label: 'Google Meet' },
  ];

  const onSubmitForm = (data: TSessionFormValues) => {
    if (handleCreateSession) {
      handleCreateSession(data);
    } else {
      // eslint-disable-next-line no-console
      console.log('Scheduled Session Data:', data);
    }
    setShowCreate(false);
  };

  return (
    <div className="rounded-md border border-emerald-200 bg-white p-5 shadow-xs">
      <h2 className="mb-5 text-lg font-semibold">Schedule New Session</h2>

      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Session Title */}
          <div className="sm:col-span-2">
            <InputField
              label="Session Title"
              name="title"
              control={control}
              placeholder="Enter session title"
              error={errors.title?.message}
              required
            />
          </div>

          {/* Course Selection */}
          <div className="sm:col-span-2">
            <SelectField
              label="Course"
              name="course"
              control={control}
              options={courseOptions}
              error={errors.course?.message}
              required
            />
          </div>

          {/* Date */}
          <InputField
            label="Date"
            name="date"
            type="date"
            control={control}
            error={errors.date?.message}
            required
          />

          {/* Time */}
          <InputField
            label="Time"
            name="time"
            type="time"
            control={control}
            error={errors.time?.message}
            required
          />

          {/* Duration */}
          <InputField
            label="Duration (minutes)"
            name="duration"
            type="number"
            control={control}
            placeholder="Enter session duration"
            error={errors.duration?.message}
            required
          />

          {/* Platform */}
          <SelectField
            label="Platform"
            name="platform"
            control={control}
            options={platformOptions}
            error={errors.platform?.message}
            required
          />

          {/* Meeting Link */}
          <div className="sm:col-span-2">
            <InputField
              label="Meeting Link"
              name="meetingLink"
              type="url"
              control={control}
              placeholder="Enter Meeting Platform Link"
              error={errors.meetingLink?.message}
              required
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex gap-3">
          <DynamicActionButton type="submit" label="Schedule Session" />
          <DynamicActionButton
            variant="outline"
            label="Cancel Form"
            onClick={() => setShowCreate(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateSessionForm;
