/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import InputField from '@/components/dashboard/Fields/InputField/InputField';
import KeywordInputField from '@/components/dashboard/Fields/KeywordInputField/KeywordInputField';
import TextAreaField from '@/components/dashboard/Fields/TextAreaField/TextAreaField';
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '@/redux/features/settings/profileManagement/profileManagement.api';
import { useUploadImageMutation } from '@/redux/features/upload/uploadApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { Camera, Loader2, RefreshCw, Save, User } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

// ─── Zod Schemas ──────────────────────────────────────────────────────────────

const baseSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z.string().optional(),
  avatar: z.string().optional(),
});

const studentSchema = baseSchema.extend({
  bio: z.string().optional(),
  linkedinUrl: z.string().url('Enter a valid LinkedIn URL').optional().or(z.literal('')),
  githubUrl: z.string().url('Enter a valid GitHub URL').optional().or(z.literal('')),
  skills: z.array(z.string()).optional(),
});

const instructorSchema = baseSchema.extend({
  bio: z.string().optional(),
  linkedinUrl: z.string().url('Enter a valid LinkedIn URL').optional().or(z.literal('')),
  areaOfExpertise: z.array(z.string()).optional(),
  experienceYears: z.coerce.number().min(0).optional(),
});

type AnyForm = z.infer<typeof instructorSchema> & z.infer<typeof studentSchema>;

// ─── Component
const ProfileSettings = () => {
  const { data: profileData, isLoading: isProfileLoading } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();

  const user = profileData?.user;
  const role = user?.role ?? 'student';

  const schema =
    role === 'admin' ? baseSchema : role === 'instructor' ? instructorSchema : studentSchema;

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AnyForm>({
    resolver: zodResolver(schema as any),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      avatar: '',
      bio: '',
      linkedinUrl: '',
      githubUrl: '',
      skills: [],
      areaOfExpertise: [],
      experienceYears: 0,
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName ?? '',
        lastName: user.lastName ?? '',
        phone: user.phone ?? '',
        avatar: user.avatar ?? '',
        bio: user.bio ?? '',
        linkedinUrl: user.linkedinUrl ?? '',
        githubUrl: user.githubUrl ?? '',
        skills: user.areaOfExpertise ?? [],
        areaOfExpertise: user.areaOfExpertise ?? [],
        experienceYears: user.experienceYears ?? 0,
      } as any);
    }
  }, [user, reset]);

  const avatarValue = watch('avatar');
  const avatarDisplay = avatarValue || user?.avatar;
  const fileRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await uploadImage(formData).unwrap();
      const url = res?.imageUrl ?? res?.url ?? res?.data?.url ?? '';
      setValue('avatar', url);
      toast.success('Photo uploaded successfully!');
    } catch {
      toast.error('Failed to upload photo. Please try again.');
    }
  };

  const onSubmit = async (data: AnyForm) => {
    try {
      const payload: Record<string, any> = {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
      };

      if (data.avatar) payload.avatar = data.avatar;

      if (role !== 'admin') {
        payload.bio = data.bio;
        payload.linkedinUrl = data.linkedinUrl;
      }

      if (role === 'student') {
        payload.skills = data.skills;
        payload.githubUrl = data.githubUrl;
      }

      if (role === 'instructor') {
        payload.areaOfExpertise = data.areaOfExpertise;
        payload.experienceYears = Number(data.experienceYears ?? 0);
        if (user?.coverPhoto) payload.coverPhoto = user.coverPhoto;
      }

      const res = await updateProfile(payload).unwrap();
      if (res.success) {
        toast.success(res.message || 'Profile updated successfully!');
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to update profile. Please try again.');
    }
  };

  if (isProfileLoading) {
    return (
      <div className="flex min-h-40 items-center justify-center">
        <Loader2 className="text-primary h-6 w-6 animate-spin" />
      </div>
    );
  }

  const isLoading = isUpdating || isUploading;

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Profile Information</h2>

      {/* Avatar */}
      <div className="flex items-center gap-4">
        <div className="relative">
          {avatarDisplay ? (
            <Image
              src={avatarDisplay}
              alt="Profile"
              width={72}
              height={72}
              className="rounded-full border-4 border-emerald-50 object-cover shadow-sm"
            />
          ) : (
            <div className="bg-primary flex h-18 w-18 items-center justify-center rounded-full text-2xl font-black text-white shadow-sm">
              {user?.firstName?.[0]?.toUpperCase() ?? <User size={28} />}
            </div>
          )}
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={isUploading}
            className="bg-primary absolute -right-1 -bottom-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-white shadow transition-all hover:bg-[#2a6159] disabled:opacity-60"
          >
            {isUploading ? <Loader2 size={11} className="animate-spin" /> : <Camera size={11} />}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>
        <div>
          <p className="text-sm font-semibold">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-text-secondary text-xs capitalize">{user?.role}</p>
          <p className="text-text-secondary mt-0.5 text-xs">JPG, PNG max 2MB</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* First Name & Last Name */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <InputField
            label="First Name"
            name="firstName"
            control={control as any}
            placeholder="Enter first name"
            error={errors.firstName?.message}
            required
          />
          <InputField
            label="Last Name"
            name="lastName"
            control={control as any}
            placeholder="Enter last name"
            error={(errors as any).lastName?.message}
            required
          />
        </div>

        {/* Phone */}
        <InputField
          label="Phone"
          name="phone"
          control={control as any}
          placeholder="+880 1700-000000"
          error={(errors as any).phone?.message}
        />

        {/* Email — always readOnly */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={user?.email ?? ''}
            readOnly
            className="border-primary/10 w-full cursor-default rounded-sm border bg-[#F9FAFB] p-3 text-sm opacity-60 outline-none"
          />
          <p className="text-text-secondary text-xs">Email cannot be changed.</p>
        </div>

        {/* Student + Instructor: bio & linkedin */}
        {role !== 'admin' && (
          <>
            <TextAreaField
              label="Bio"
              name={'bio' as any}
              control={control as any}
              placeholder="Write a short bio about yourself..."
              error={(errors as any).bio?.message}
            />
            <InputField
              label="LinkedIn Profile URL"
              name={'linkedinUrl' as any}
              control={control as any}
              placeholder="https://linkedin.com/in/yourprofile"
              error={(errors as any).linkedinUrl?.message}
            />
          </>
        )}

        {/* Student-only: github + skills */}
        {role === 'student' && (
          <>
            <InputField
              label="GitHub Profile URL"
              name={'githubUrl' as any}
              control={control as any}
              placeholder="https://github.com/yourusername"
              error={(errors as any).githubUrl?.message}
            />
            <KeywordInputField
              label="Skills"
              name={'skills' as any}
              control={control as any}
              placeholder="Type a skill and press Enter..."
            />
          </>
        )}

        {/* Instructor-only: expertise + experience years */}
        {role === 'instructor' && (
          <>
            <KeywordInputField
              label="Area of Expertise"
              name={'areaOfExpertise' as any}
              control={control as any}
              placeholder="e.g. Web Development, UI/UX — press Enter to add..."
            />
            <InputField
              label="Years of Experience"
              name={'experienceYears' as any}
              type="number"
              control={control as any}
              placeholder="e.g. 5"
              error={(errors as any).experienceYears?.message}
            />
          </>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary mt-2 flex items-center gap-2 rounded-sm px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#2a6159] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? <RefreshCw size={15} className="animate-spin" /> : <Save size={15} />}
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default ProfileSettings;
