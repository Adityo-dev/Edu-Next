/* eslint-disable no-unused-vars */
import { Control, FieldErrors } from 'react-hook-form';
import { CATEGORY_OPTIONS, CourseFormValues, LANGUAGE_OPTIONS, LEVEL_OPTIONS } from '../schema';

import ImageUploadField from '@/components/dashboard/Fields/ImageUploadField/ImageUploadField';
import InputField from '@/components/dashboard/Fields/InputField/InputField';
import KeywordInputField from '@/components/dashboard/Fields/KeywordInputField/KeywordInputField';
import SelectField from '@/components/dashboard/Fields/SelectField/SelectField';
import TextAreaField from '@/components/dashboard/Fields/TextAreaField/TextAreaField';
import TiptapEditor from '@/components/dashboard/Fields/TiptapEditor/TiptapEditor';

interface Step1BasicInfoProps {
  control: Control<CourseFormValues>;
  errors: FieldErrors<CourseFormValues>;
  watchedThumbnail?: string;
  isUploading: boolean;
  handleThumbnailChange: (file: File | null) => Promise<void>;
}

const Step1BasicInfo = ({
  control,
  errors,
  watchedThumbnail,
  isUploading,
  handleThumbnailChange,
}: Step1BasicInfoProps) => {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold">Basic Information</h2>

      <ImageUploadField
        label="Course Thumbnail"
        subLabel="PNG, JPG max 5MB"
        value={watchedThumbnail || ''}
        onChange={handleThumbnailChange}
        error={isUploading ? undefined : errors.thumbnail?.message}
        required
      />
      {isUploading && <p className="text-primary text-xs font-medium">Uploading thumbnail...</p>}

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
          <KeywordInputField
            label="Tags"
            placeholder="e.g. nextjs, react"
            required
            control={control}
            name="tags"
          />
        </div>

        <div className="sm:col-span-2">
          <TiptapEditor
            label="Requirements"
            placeholder="What should students know before taking this course?"
            required
            control={control}
            name="requirements"
          />
        </div>

        <div className="sm:col-span-2">
          <TiptapEditor
            label="What You'll Learn"
            placeholder="List the key skills students will gain..."
            required
            control={control}
            name="whatYouLearn"
          />
        </div>
      </div>
    </div>
  );
};

export default Step1BasicInfo;
