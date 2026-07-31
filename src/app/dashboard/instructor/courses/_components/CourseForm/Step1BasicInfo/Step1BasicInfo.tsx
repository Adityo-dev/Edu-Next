/* eslint-disable no-unused-vars */
import { useMemo } from 'react';
import { Control, FieldErrors, useController } from 'react-hook-form';

import { CATEGORY_OPTIONS, CourseFormValues, LANGUAGE_OPTIONS, LEVEL_OPTIONS } from '../schema';
import { useGetCategoriesQuery } from '@/redux/features/categories/categoriesApi';

import ImageUploadField from '@/components/dashboard/Fields/ImageUploadField/ImageUploadField';
import InputField from '@/components/dashboard/Fields/InputField/InputField';
import KeywordInputField from '@/components/dashboard/Fields/KeywordInputField/KeywordInputField';
import SearchableSelect from '@/components/dashboard/Fields/SearchableSelect/SearchableSelect';
import SelectField from '@/components/dashboard/Fields/SelectField/SelectField';
import TiptapEditor from '@/components/dashboard/Fields/TiptapEditor/TiptapEditor';
import { Label } from '@/components/ui/label';

interface Step1BasicInfoProps {
  control: Control<CourseFormValues>;
  errors: FieldErrors<CourseFormValues>;
  watchedThumbnail?: string;
  watchedCategory?: string;
  isUploading: boolean;
  handleThumbnailChange: (file: File | null) => Promise<void>;
}

const Step1BasicInfo = ({
  control,
  errors,
  watchedThumbnail,
  watchedCategory,
  isUploading,
  handleThumbnailChange,
}: Step1BasicInfoProps) => {
  const { data: categoriesData, isLoading: isLoadingCategories } = useGetCategoriesQuery({
    nested: true,
  });
  const {
    field: { value: hasCertificate, onChange: onHasCertificateChange },
  } = useController({
    control,
    name: 'hasCertificate',
  });

  const activeCategories = useMemo(() => {
    return categoriesData?.data?.filter((cat) => cat.isActive) || [];
  }, [categoriesData]);

  const categoryOptions = useMemo(() => {
    if (activeCategories.length === 0) return CATEGORY_OPTIONS;
    // We use name as the value to be compatible with existing code which expects the category name
    return activeCategories.map((cat) => ({ value: cat.name, label: cat.name }));
  }, [activeCategories]);

  const subCategoryOptions = useMemo(() => {
    if (!watchedCategory) return [];
    const selectedCategory = activeCategories.find(
      (cat) => cat._id === watchedCategory || cat.name === watchedCategory,
    );
    if (!selectedCategory || !selectedCategory.subCategories) return [];

    return selectedCategory.subCategories
      .filter((sub) => sub.isActive)
      .map((sub) => ({ value: sub.name, label: sub.name }));
  }, [watchedCategory, activeCategories]);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Basic Information</h2>

      <ImageUploadField
        label="Course Thumbnail"
        subLabel="PNG, JPG max 5MB"
        value={watchedThumbnail || ''}
        onChange={handleThumbnailChange}
        error={isUploading ? undefined : errors.thumbnail?.message}
        required
        isUploading={isUploading}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <InputField
            label="Course Title"
            name="title"
            control={control}
            placeholder="Enter course title"
            required
            error={errors.title?.message}
          />
        </div>

        <div className="sm:col-span-2">
          <InputField
            label="Subtitle"
            name="subtitle"
            control={control}
            placeholder="Enter course subtitle"
            required
            error={errors.subtitle?.message}
          />
        </div>

        <SearchableSelect
          label="Category"
          name="category"
          control={control}
          options={categoryOptions}
          placeholder={isLoadingCategories ? 'Loading categories...' : 'Search & select category'}
          required
          isSingle={true}
          error={errors.category?.message}
        />

        <SearchableSelect
          label="Subcategory"
          name="subCategory"
          control={control}
          options={subCategoryOptions}
          placeholder={
            subCategoryOptions.length === 0 && watchedCategory
              ? 'No subcategories available'
              : 'Search & select subcategory'
          }
          isSingle={true}
          disabled={subCategoryOptions.length === 0}
          error={errors.subCategory?.message}
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

        <div className="space-y-2 sm:col-span-1">
          <Label className="block font-medium">Certificate</Label>
          <div className="border-primary/10 focus-within:border-primary hover:border-primary/20 flex h-auto w-full items-center gap-3 rounded-sm border bg-[#F9FAFB] p-3 shadow-none transition-all focus-within:ring-2 focus-within:ring-emerald-100">
            <input
              type="checkbox"
              checked={hasCertificate}
              onChange={(e) => onHasCertificateChange(e.target.checked)}
              className="accent-primary h-4 w-4 cursor-pointer"
              id="hasCertificate"
            />
            <label htmlFor="hasCertificate" className="text-primary cursor-pointer text-sm">
              Provide Certificate on Completion
            </label>
          </div>
        </div>

        <div className="sm:col-span-2">
          <TiptapEditor
            label="Description"
            name="description"
            control={control}
            placeholder="Describe what students will learn in this course..."
            required
          />
        </div>

        <div className="sm:col-span-2">
          <KeywordInputField
            label="Search Tags"
            placeholder="Type a relevant keyword and press Enter"
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
