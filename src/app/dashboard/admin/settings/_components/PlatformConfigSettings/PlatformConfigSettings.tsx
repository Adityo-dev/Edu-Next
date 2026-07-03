/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod';
import { Image as ImageIcon, Loader2, Save, UploadCloud } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import InputField from '@/components/dashboard/Fields/InputField/InputField';
import SelectField from '@/components/dashboard/Fields/SelectField/SelectField';
import TextAreaField from '@/components/dashboard/Fields/TextAreaField/TextAreaField';

import KeywordInputField from '@/components/dashboard/Fields/KeywordInputField/KeywordInputField';
import {
  useGetPlatformConfigQuery,
  useUpdatePlatformConfigMutation,
} from '@/redux/features/settings/admin/platformConfigManagement/platformConfig.api';
import { useUploadImageMutation } from '@/redux/features/upload/uploadApi';

const SOCIAL_BASE_URLS = {
  facebook: 'https://facebook.com/',
  youtube: 'https://youtube.com/@',
  linkedin: 'https://linkedin.com/in/',
  github: 'https://github.com/',
};

const CURRENCY_OPTIONS = [
  { value: 'BDT', label: 'BDT (৳)' },
  { value: 'USD', label: 'USD ($)' },
];

//  ZOD VALIDATION SCHEMA
const platformConfigSchema = z.object({
  siteName: z.string().min(1, 'Enter your site name'),
  tagline: z.string().optional(),
  supportEmail: z
    .string()
    .min(1, 'Enter your support email address')
    .email('Enter a valid email address'),
  maintenanceMode: z.boolean(),
  currency: z.string().min(1, 'Select your platform currency'),
  contactPhone: z
    .string()
    .min(1, 'Enter your contact phone number')
    .regex(/^[0-9+\s-]+$/, 'Enter a valid phone number (digits only)'),
  copyrightText: z.string().optional(),
  siteLogo: z.string().min(1, 'Site Logo is required!'),
  favicon: z.string().min(1, 'Favicon Icon is required!'),
  metaDescription: z.string().optional(),
  metaKeywords: z.array(z.string()),
  googleAnalyticsId: z.string().optional(),
  facebookUsername: z.string().optional(),
  youtubeUsername: z.string().optional(),
  linkedinUsername: z.string().optional(),
  githubUsername: z.string().optional(),
});

type IPlatformFormValues = z.infer<typeof platformConfigSchema>;

const PlatformConfigSettings = () => {
  const { data: configData, isLoading: isConfigLoading } = useGetPlatformConfigQuery();
  const [updatePlatformConfig, { isLoading: isUpdating }] = useUpdatePlatformConfigMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IPlatformFormValues>({
    resolver: zodResolver(platformConfigSchema),
    defaultValues: {
      siteName: '',
      tagline: '',
      supportEmail: '',
      maintenanceMode: false,
      currency: 'BDT',
      contactPhone: '',
      copyrightText: '',
      siteLogo: '',
      favicon: '',
      metaDescription: '',
      metaKeywords: [],
      googleAnalyticsId: '',
      facebookUsername: '',
      youtubeUsername: '',
      linkedinUsername: '',
      githubUsername: '',
    },
  });

  const siteLogo = watch('siteLogo');
  const favicon = watch('favicon');
  const maintenanceMode = watch('maintenanceMode');
  const contactPhone = watch('contactPhone');

  const extractUsername = (url: string, baseUrl: string) => {
    if (!url) return '';
    return url.replace(baseUrl, '').replace(/\/$/, '');
  };

  useEffect(() => {
    if (configData?.data) {
      const d = configData.data;
      reset({
        siteName: d.siteName || '',
        tagline: d.tagline || '',
        supportEmail: d.supportEmail || '',
        maintenanceMode: d.maintenanceMode || false,
        currency: d.currency || 'BDT',
        contactPhone: d.contactPhone || '',
        copyrightText: d.copyrightText || '',
        siteLogo: d.siteLogo || '',
        favicon: d.favicon || '',
        metaDescription: d.metaDescription || '',
        metaKeywords: Array.isArray(d.metaKeywords) ? d.metaKeywords : [],
        googleAnalyticsId: d.googleAnalyticsId || '',
        facebookUsername: extractUsername(d.socialLinks?.facebook || '', SOCIAL_BASE_URLS.facebook),
        youtubeUsername: extractUsername(d.socialLinks?.youtube || '', SOCIAL_BASE_URLS.youtube),
        linkedinUsername: extractUsername(d.socialLinks?.linkedin || '', SOCIAL_BASE_URLS.linkedin),
        githubUsername: extractUsername(d.socialLinks?.github || '', SOCIAL_BASE_URLS.github),
      });
    }
  }, [configData, reset]);

  useEffect(() => {
    if (contactPhone && /[^0-9+\s-]/.test(contactPhone)) {
      setValue('contactPhone', contactPhone.replace(/[^0-9+\s-]/g, ''), {
        shouldValidate: true,
      });
    }
  }, [contactPhone, setValue]);

  const handleMediaUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'siteLogo' | 'favicon',
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error('File size cannot exceed 2MB');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await uploadImage(formData).unwrap();
      const imageUrl = res?.url || res?.data?.url || '';

      if (imageUrl) {
        setValue(field, imageUrl);
        toast.success(`${field === 'siteLogo' ? 'Site Logo' : 'Favicon'} updated successfully!`);
      }
    } catch {
      toast.error('Media upload failed. Please try again.');
    }
  };

  const onSubmit = async (data: IPlatformFormValues) => {
    try {
      const payload = {
        siteName: data.siteName,
        tagline: data.tagline,
        supportEmail: data.supportEmail,
        maintenanceMode: data.maintenanceMode,
        currency: data.currency,
        contactPhone: data.contactPhone,
        copyrightText: data.copyrightText,
        siteLogo: data.siteLogo,
        favicon: data.favicon,
        metaDescription: data.metaDescription,
        googleAnalyticsId: data.googleAnalyticsId,
        metaKeywords: data.metaKeywords,
        socialLinks: {
          facebook: data.facebookUsername
            ? `${SOCIAL_BASE_URLS.facebook}${data.facebookUsername.trim()}`
            : '',
          youtube: data.youtubeUsername
            ? `${SOCIAL_BASE_URLS.youtube}${data.youtubeUsername.trim()}`
            : '',
          linkedin: data.linkedinUsername
            ? `${SOCIAL_BASE_URLS.linkedin}${data.linkedinUsername.trim()}`
            : '',
          github: data.githubUsername
            ? `${SOCIAL_BASE_URLS.github}${data.githubUsername.trim()}`
            : '',
        },
      };

      const response = await updatePlatformConfig(payload).unwrap();
      if (response.success) {
        toast.success(response.message || 'Configuration saved successfully!');
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to update platform settings.');
    }
  };

  if (isConfigLoading) {
    return (
      <div className="flex h-64 items-center justify-center gap-2 text-sm text-slate-500">
        <Loader2 className="text-primary animate-spin" size={20} /> Loading platform data...
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <h2 className="text-lg font-semibold">Platform Configuration</h2>

      {/*  MEDIA UPLOAD SECTION (LOGO & FAVICON) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Site Logo */}
        <div className="rounded-sm border border-slate-200 bg-slate-50/50 p-4">
          <label className="mb-2 block text-xs font-semibold tracking-wider text-slate-500 uppercase">
            Site Logo <span className="text-danger">*</span>
          </label>
          <div className="flex items-center gap-4">
            <div className="relative flex h-16 w-32 items-center justify-center overflow-hidden rounded-sm border border-slate-200 bg-white">
              {siteLogo ? (
                <Image src={siteLogo} alt="Logo" fill className="object-contain p-1" />
              ) : (
                <ImageIcon size={20} className="text-slate-300" />
              )}
            </div>
            <label className="border-primary/20 flex cursor-pointer items-center gap-1.5 rounded-sm border bg-white px-3 py-2 text-xs font-semibold transition-all duration-300 hover:bg-slate-50">
              <UploadCloud size={14} />
              {isUploading ? 'Uploading...' : 'Upload Logo'}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleMediaUpload(e, 'siteLogo')}
              />
            </label>
          </div>
          {errors.siteLogo && (
            <p className="text-danger mt-1 text-xs font-medium">{errors.siteLogo.message}</p>
          )}
        </div>

        {/* Favicon */}
        <div className="rounded-sm border border-slate-200 bg-slate-50/50 p-4">
          <label className="mb-2 block text-xs font-semibold tracking-wider text-slate-500 uppercase">
            Favicon Icon <span className="text-danger">*</span>
          </label>
          <div className="flex items-center gap-4">
            <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-sm border border-slate-200 bg-white">
              {favicon ? (
                <Image src={favicon} alt="Favicon" fill className="object-contain p-2" />
              ) : (
                <ImageIcon size={20} className="text-slate-300" />
              )}
            </div>
            <label className="border-primary/20 flex cursor-pointer items-center gap-1.5 rounded-sm border bg-white px-3 py-2 text-xs font-semibold transition-all duration-300 hover:bg-slate-50">
              <UploadCloud size={14} />
              {isUploading ? 'Uploading...' : 'Upload Favicon'}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleMediaUpload(e, 'favicon')}
              />
            </label>
          </div>
          {errors.favicon && (
            <p className="text-danger mt-1 text-xs font-medium">{errors.favicon.message}</p>
          )}
        </div>
      </div>

      {/* CORE GENERAL SETTINGS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InputField
          label="Site Name"
          name="siteName"
          control={control}
          required={true}
          error={errors.siteName?.message}
          placeholder="Enter your site name"
        />
        <InputField
          label="Tagline"
          name="tagline"
          control={control}
          placeholder="Enter your site tagline"
        />

        <div className="sm:col-span-2">
          <InputField
            label="Support Email"
            name="supportEmail"
            control={control}
            type="email"
            required={true}
            error={errors.supportEmail?.message}
            placeholder="Enter your support email address"
          />
        </div>

        <InputField
          label="Contact Phone"
          name="contactPhone"
          control={control}
          required={true}
          error={errors.contactPhone?.message}
          placeholder="Enter your contact phone number"
        />

        <SelectField
          label="Currency"
          name="currency"
          control={control}
          options={CURRENCY_OPTIONS}
          required={true}
          error={errors.currency?.message}
          placeholder="Select your platform currency"
        />

        <div className="sm:col-span-2">
          <InputField
            label="Google Analytics ID"
            name="googleAnalyticsId"
            control={control}
            placeholder="Enter your Google Analytics ID (e.g., G-XXXXXX)"
          />
        </div>

        <div className="sm:col-span-2">
          <InputField
            label="Copyright Text"
            name="copyrightText"
            control={control}
            placeholder="Enter your footer copyright text"
          />
        </div>
      </div>

      {/*  SEO CONFIGURATION SETTINGS (DYNAMIC BADGE COMPONENT)  */}
      <div className="space-y-4 rounded-sm border border-slate-200 bg-slate-50/30 p-4">
        <h3 className="text-sm font-semibold">Search Engine Optimization (SEO)</h3>
        <div className="grid grid-cols-1 gap-4">
          <KeywordInputField
            label="Meta Keywords"
            name="metaKeywords"
            control={control}
            placeholder="Enter your meta keywords and press Enter..."
          />
          <TextAreaField
            label="Meta Description"
            name="metaDescription"
            control={control}
            rows={3}
            placeholder="Enter your meta description details here..."
          />
        </div>
      </div>

      {/*  SOCIAL LINKS CONFIGURATION  */}
      <div className="space-y-4 rounded-sm border border-slate-200 bg-slate-50/30 p-4">
        <h3 className="text-sm font-semibold">Social Media Connections (Usernames Only)</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            {
              label: 'Facebook Username',
              prefix: 'facebook.com/',
              name: 'facebookUsername',
              placeholder: 'Enter your facebook username',
            },
            {
              label: 'YouTube Handle',
              prefix: 'youtube.com/@',
              name: 'youtubeUsername',
              placeholder: 'Enter your youtube channel handle',
            },
            {
              label: 'LinkedIn Username',
              prefix: 'linkedin.com/in/',
              name: 'linkedinUsername',
              placeholder: 'Enter your linkedin profile id',
            },
            {
              label: 'GitHub Username/Org',
              prefix: 'github.com/',
              name: 'githubUsername',
              placeholder: 'Enter your github username',
            },
          ].map((item) => (
            <div key={item.name} className="space-y-2">
              <label className="block text-xs font-semibold tracking-wider text-slate-500 uppercase">
                {item.label}
              </label>
              <div className="border-primary/10 focus-within:border-primary flex overflow-hidden rounded-sm border bg-[#F9FAFB] shadow-none transition-all focus-within:ring-2 focus-within:ring-emerald-100">
                <span className="inline-flex min-w-30 items-center justify-center border-r border-slate-200 bg-slate-100/70 px-3 text-sm font-medium text-slate-500 select-none">
                  {item.prefix}
                </span>
                <input
                  type="text"
                  placeholder={item.placeholder}
                  {...register(item.name as any)}
                  className="text-primary placeholder:text-text-placeholder w-full border-none bg-transparent px-3 py-2.5 text-sm outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/*  MAINTENANCE TOGGLE COMPONENT */}
      <div className="flex items-center justify-between rounded-sm border border-red-100 bg-red-50 px-5 py-4">
        <div>
          <p className="text-danger text-sm font-semibold">Maintenance Mode</p>
          <p className="text-text-secondary text-xs">Temporarily disable access to the platform</p>
        </div>
        <button
          type="button"
          onClick={() => setValue('maintenanceMode', !maintenanceMode)}
          className={`relative h-6 w-11 rounded-full transition-all duration-300 ${maintenanceMode ? 'bg-danger' : 'bg-slate-200'}`}
        >
          <div
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all duration-300 ${maintenanceMode ? 'left-5' : 'left-0.5'}`}
          />
        </button>
      </div>

      {/* Submit Save Button */}
      <button
        type="submit"
        disabled={isUpdating}
        className="bg-primary flex items-center gap-2 rounded-sm px-6 py-3 text-sm font-semibold text-white hover:bg-[#2a6159] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isUpdating ? (
          <>
            <Loader2 className="animate-spin" size={15} /> Saving Config...
          </>
        ) : (
          <>
            <Save size={15} /> Save Configuration
          </>
        )}
      </button>
    </form>
  );
};

export default PlatformConfigSettings;
