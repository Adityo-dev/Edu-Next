/* eslint-disable no-unused-vars */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import InputField from '@/components/dashboard/Fields/InputField/InputField';
import SearchableSelect from '@/components/dashboard/Fields/SearchableSelect/SearchableSelect';
import SelectField from '@/components/dashboard/Fields/SelectField/SelectField';
import { useScheduleLiveSessionMutation } from '@/redux/features/instructor/liveSessionsManagement/liveSessionsManagement.api';

const sessionSchema = z.object({
  title: z.string().min(1, 'Session title is required'),
  courseId: z.any().refine((val) => {
    if (Array.isArray(val)) return val.length > 0;
    return !!val;
  }, 'Course selection is required'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  durationInMins: z.string().min(1, 'Duration is required'),
  meetingPlatform: z.string().min(1, 'Platform is required'),
  meetingLink: z.string().url('Invalid URL format').min(1, 'Meeting link is required'),
  description: z.string().optional(),
});

type TSessionFormValues = z.infer<typeof sessionSchema>;

interface CreateSessionFormProps {
  setShowCreate: (show: boolean) => void;
}

const CreateSessionForm = ({ setShowCreate }: CreateSessionFormProps) => {
  // RTK Query Mutation Hook
  const [scheduleLiveSession, { isLoading }] = useScheduleLiveSessionMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TSessionFormValues>({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      title: '',
      courseId: '', // সার্চেবল সিলেক্টের জন্য শুরুতে ক্লিয়ার বা খালি রাখা হলো
      date: '',
      time: '',
      durationInMins: '',
      meetingPlatform: 'Zoom',
      meetingLink: '',
      description: 'Deep dive session.',
    },
  });

  const courseOptions = [
    { value: '6a1f71b6409d7d7ea7633912', label: 'Complete Web Development Bootcamp' },
    { value: '6a1f71b6409d7d7ea7633913', label: 'React.js Advanced Masterclass' },
    { value: '6a1f71b6409d7d7ea7633914', label: 'Node.js & Express API Development' },
  ];

  const platformOptions = [
    { value: 'Zoom', label: 'Zoom' },
    { value: 'Google Meet', label: 'Google Meet' },
  ];

  const onSubmitForm = async (values: TSessionFormValues) => {
    try {
      const combinedDateTime = new Date(`${values.date}T${values.time}:00`).toISOString();

      // SearchableSelect যদি অ্যারে রিটার্ন করে, তবে প্রথম সিলেক্টেড আইডিটি ব্যাকএন্ডে পাঠানো হচ্ছে
      const finalCourseId = Array.isArray(values.courseId) ? values.courseId[0] : values.courseId;

      const requestBody = {
        courseId: finalCourseId,
        title: values.title,
        description: values.description || 'No description provided.',
        meetingLink: values.meetingLink,
        meetingPlatform: values.meetingPlatform,
        startTime: combinedDateTime,
        durationInMins: Number(values.durationInMins),
      };

      await scheduleLiveSession(requestBody).unwrap();

      reset();
      setShowCreate(false);
    } catch (error) {
      console.error('Failed to schedule session:', error);
    }
  };

  return (
    <div className="dashboard-card-container p-4!">
      <h2 className="mb-5 text-lg font-semibold text-gray-900">Schedule New Session</h2>

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

          <div className="sm:col-span-2">
            <SearchableSelect
              label="Course"
              name="courseId"
              control={control}
              options={courseOptions}
              placeholder="Select a course..."
              error={errors.courseId}
              isSingle={true}
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
            name="durationInMins"
            type="number"
            control={control}
            placeholder="Enter session duration"
            error={errors.durationInMins?.message}
            required
          />

          {/* Platform */}
          <SelectField
            label="Platform"
            name="meetingPlatform"
            control={control}
            options={platformOptions}
            error={errors.meetingPlatform?.message}
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
          <DynamicActionButton
            type="submit"
            label="Schedule Session"
            isLoading={isLoading}
            className="h-11!"
          />
          <DynamicActionButton
            variant="outline"
            label="Cancel Form"
            type="button"
            className="h-11!"
            disabled={isLoading}
            onClick={() => setShowCreate(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateSessionForm;
