/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/incompatible-library */
'use client';

import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import ImageUploadField from '@/components/dashboard/Fields/ImageUploadField/ImageUploadField';
import InputField from '@/components/dashboard/Fields/InputField/InputField';
import TextAreaField from '@/components/dashboard/Fields/TextAreaField/TextAreaField';
import { useModal } from '@/context/ModalContext';
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from '@/redux/features/categories/categoriesApi';
import { useUploadImageMutation } from '@/redux/features/upload/uploadApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const getCategorySchema = (type: string) => {
  if (type === 'MAIN') {
    return z.object({
      name: z.string().min(1, 'Name is required'),
      description: z.string().min(1, 'Description is required'),
      image: z.string().min(1, 'Image is required'),
    });
  }
  return z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().optional(),
    image: z.string().optional(),
  });
};

type CategoryFormValues = z.infer<ReturnType<typeof getCategorySchema>>;

const CategoryFormModal = () => {
  const { data, closeModal } = useModal();
  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();
  const [uploadImage, { isLoading: isUploadingImage }] = useUploadImageMutation();

  const type = data?.type || 'MAIN';
  const action = data?.action || 'CREATE';
  const parentId = data?.parentId || null;
  const categoryId = data?.categoryId;

  const schema = useMemo(() => getCategorySchema(type), [type]);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: data?.initialData?.name || '',
      description: data?.initialData?.description || '',
      image: data?.initialData?.image || '',
    },
  });

  const watchedImage = watch('image');
  const isLoading = isCreating || isUpdating;

  const handleThumbnailChange = async (file: File | null) => {
    if (!file) {
      setValue('image', '', { shouldValidate: true });
      return;
    }
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await uploadImage(formData).unwrap();
      setValue('image', res.data.url, { shouldValidate: true });
      toast.success('Image uploaded successfully');
    } catch (err) {
      console.error('Image upload failed:', err);
      toast.error('Image upload failed. Try again.');
    }
  };

  const onSubmit = async (values: CategoryFormValues) => {
    try {
      const payload: any = { name: values.name, parentId };

      if (type === 'MAIN') {
        if (values.description?.trim()) payload.description = values.description;
        if (values.image?.trim()) payload.image = values.image;
      }

      if (action === 'CREATE') {
        const res = await createCategory(payload).unwrap();
        toast.success(
          res?.message ||
            `${type === 'MAIN' ? 'Main category' : 'Subcategory'} created successfully`,
        );
      } else if (action === 'UPDATE' && categoryId) {
        const res = await updateCategory({ id: categoryId, payload }).unwrap();
        toast.success(
          res?.message ||
            `${type === 'MAIN' ? 'Main category' : 'Subcategory'} updated successfully`,
        );
      }
      closeModal();
    } catch (error: any) {
      toast.error(error?.data?.message || `Failed to ${action.toLowerCase()} category`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
      <InputField
        label={type === 'MAIN' ? 'Main Category Name' : 'Subcategory Name'}
        name="name"
        control={control}
        placeholder={type === 'MAIN' ? 'e.g., Web Development' : 'e.g., React JS'}
        error={errors.name?.message}
        required
      />

      {type === 'MAIN' && (
        <>
          <TextAreaField
            label="Description"
            name="description"
            control={control}
            placeholder="e.g., Learn modern web development"
            error={errors.description?.message}
            required
            rows={3}
          />
          <ImageUploadField
            label="Category Image"
            subLabel="PNG, JPG max 5MB"
            value={watchedImage || ''}
            onChange={handleThumbnailChange}
            error={isUploadingImage ? undefined : errors.image?.message}
            required
            isUploading={isUploadingImage}
          />
        </>
      )}

      <div className="flex justify-end gap-2 pt-4">
        <DynamicActionButton
          label="Cancel"
          variant="outline"
          onClick={closeModal}
          disabled={isLoading || isUploadingImage}
        />
        <DynamicActionButton
          type="submit"
          label={
            isLoading
              ? action === 'CREATE'
                ? 'Creating...'
                : 'Updating...'
              : action === 'CREATE'
                ? 'Create'
                : 'Update'
          }
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading || isUploadingImage}
        />
      </div>
    </form>
  );
};

export default CategoryFormModal;
