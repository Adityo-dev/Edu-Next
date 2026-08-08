/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useGetProfileQuery,
  useRequestBadgeMutation,
  useUpdateProfileMutation,
} from '@/redux/features/settings/profileManagement/profileManagement.api';
import { useUploadImageMutation } from '@/redux/features/upload/uploadApi';
import { Award, Clock, Image as ImageIcon, Loader2, Save } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import InputField from '@/components/dashboard/Fields/InputField/InputField';
import SearchableSelect from '@/components/dashboard/Fields/SearchableSelect/SearchableSelect';
import TextAreaField from '@/components/dashboard/Fields/TextAreaField/TextAreaField';
import InstructorProfileSkeleton from '@/components/dashboard/Skeletons/Instructor/InstructorProfileSkeleton';

interface IBadgeRequest {
  requestedBadge: string;
  status: string;
}

interface IProfileUser {
  _id: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  email: string;
  phone: string;
  role: string;
  avatar: string;
  coverPhoto: string;
  bio: string;
  linkedinUrl: string;
  githubUrl: string;
  badge: string;
  areaOfExpertise: string[];
  experienceYears?: number;
  isEmailVerified: boolean;
  isSuspended: boolean;
  badgeRequest: IBadgeRequest;
  createdAt: string;
  updatedAt: string;
}

interface IProfileResponse {
  success: boolean;
  profileProgress: string;
  user: IProfileUser;
}

interface ProfileSettingsProps {
  profile?: IProfileResponse | null;
  // eslint-disable-next-line no-unused-vars
  setProfile?: (p: IProfileResponse) => void;
}

const AVAILABLE_EXPERTISES = [
  { value: 'Web Development', label: 'Web Development' },
  { value: 'UI/UX Design', label: 'UI/UX Design' },
  { value: 'Digital Marketing', label: 'Digital Marketing' },
  { value: 'Freelancing', label: 'Freelancing' },
  { value: 'Graphic Design', label: 'Graphic Design' },
  { value: 'Data Analytics', label: 'Data Analytics' },
  { value: 'Mobile App Development', label: 'Mobile App Development' },
  { value: 'Cybersecurity', label: 'Cybersecurity' },
  { value: 'Machine Learning & AI', label: 'Machine Learning & AI' },
];

const InstructorProfileSettings = ({}: ProfileSettingsProps) => {
  const { data: profileData, isLoading: isProfileLoading } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();
  const [requestBadge, { isLoading: isRequestingBadge }] = useRequestBadgeMutation();

  const { control, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      bio: '',
      avatar: '',
      coverPhoto: '',
      linkedinUrl: '',
      githubUrl: '',
      expertise: [] as string[],
      experienceYears: 0,
      badge: 'none',
      role: 'student',
      badgeRequest: {
        requestedBadge: 'none',
        status: 'none',
      },
    },
  });

  const watchAvatar = watch('avatar');
  const watchCoverPhoto = watch('coverPhoto');
  const watchBadge = watch('badge');
  const watchBadgeRequestStatus = watch('badgeRequest.status');
  const watchBadgeRequestRequestedBadge = watch('badgeRequest.requestedBadge');

  useEffect(() => {
    if (profileData?.user) {
      const u = profileData.user;
      reset({
        firstName: u.firstName || '',
        lastName: u.lastName || '',
        phone: u.phone || '',
        email: u.email || '',
        bio: u.bio || '',
        avatar: u.avatar || '',
        coverPhoto: u.coverPhoto || '',
        linkedinUrl: u.linkedinUrl || '',
        githubUrl: u.githubUrl || '',
        expertise: Array.isArray(u.areaOfExpertise) ? u.areaOfExpertise : [],
        experienceYears: u.experienceYears || 0,
        badge: u.badge || 'none',
        role: u.role || 'student',
        badgeRequest: {
          requestedBadge: u.badgeRequest?.requestedBadge || 'none',
          status: u.badgeRequest?.status || 'none',
        },
      });
    }
  }, [profileData, reset]);

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'avatar' | 'coverPhoto',
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error('File size cannot exceed 2MB');
      return;
    }

    const uploadData = new FormData();
    uploadData.append('image', file);

    try {
      const res = await uploadImage(uploadData).unwrap();
      const imageUrl = res?.url || res?.data?.url || '';

      if (imageUrl) {
        setValue(field, imageUrl, { shouldValidate: true, shouldDirty: true });
        toast.success(
          `${field === 'avatar' ? 'Profile picture' : 'Cover photo'} uploaded! Save changes to apply.`,
        );
      }
    } catch {
      toast.error('Failed to upload image. Try again.');
    }
  };

  const handleSaveChanges = async (data: any) => {
    try {
      const payload: Record<string, any> = {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        avatar: data.avatar,
        bio: data.bio,
        linkedinUrl: data.linkedinUrl,
      };

      if (data.role === 'student') {
        payload.githubUrl = data.githubUrl;
        payload.skills = data.expertise;
      }

      if (data.role === 'instructor') {
        payload.coverPhoto = data.coverPhoto;
        payload.areaOfExpertise = data.expertise;
        payload.experienceYears = Number(data.experienceYears);
      }

      const response = await updateProfile(payload).unwrap();
      if (response.success) {
        toast.success(response.message || 'Profile updated successfully!');
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Something went wrong while updating profile');
    }
  };

  const handleApplyBadge = async (tier: 'bronze' | 'silver' | 'blue') => {
    try {
      const response = await requestBadge({ targetBadge: tier }).unwrap();
      if (response.success) {
        toast.success(response.message || `Successfully applied for ${tier.toUpperCase()} badge!`);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to request badge milestone.');
    }
  };

  if (isProfileLoading) {
    return <InstructorProfileSkeleton />;
  }

  const getBadgeStyles = (badge: string) => {
    switch (badge?.toLowerCase()) {
      case 'bronze':
        return 'border-amber-200 bg-amber-50 text-amber-700';
      case 'silver':
        return 'border-slate-300 bg-slate-100 text-slate-700';
      case 'blue':
        return 'border-blue-200 bg-blue-50 text-blue-600';
      default:
        return 'border-slate-200 bg-slate-50 text-slate-400';
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Instructor Profile</h2>
        {profileData?.profileProgress && (
          <span className="text-primary rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold">
            Progress: {profileData.profileProgress}
          </span>
        )}
      </div>

      <div className="group relative h-40 w-full overflow-hidden rounded-sm border border-slate-200 bg-slate-100">
        {watchCoverPhoto ? (
          <Image src={watchCoverPhoto} alt="Cover" fill className="object-cover" />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-xs text-slate-400">
            <ImageIcon size={24} />
            <span>No cover photo uploaded</span>
          </div>
        )}
        <label className="absolute right-3 bottom-3 cursor-pointer rounded-sm border border-slate-200 bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm transition-all hover:bg-white">
          {isUploading ? 'Uploading...' : 'Change Cover'}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageUpload(e, 'coverPhoto')}
          />
        </label>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-4">
          <div className="relative h-18 w-18">
            <Image
              src={watchAvatar || 'https://i.pravatar.cc/150?u=fallback'}
              alt="Profile"
              fill
              className="rounded-full border-4 border-emerald-50 object-cover shadow-sm"
            />
          </div>
          <div>
            <label className="bg-primary inline-block cursor-pointer rounded-sm px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[#2a6159]">
              {isUploading ? 'Uploading...' : 'Change Photo'}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload(e, 'avatar')}
              />
            </label>
            <p className="text-text-secondary mt-1 text-xs">JPG, PNG max 2MB</p>
          </div>
        </div>

        <div
          className={`flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-bold capitalize shadow-xs ${getBadgeStyles(watchBadge)}`}
        >
          <Award size={15} />
          <span>{watchBadge === 'none' ? 'No Active Badge' : `${watchBadge} Tier`}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InputField
          control={control}
          name="firstName"
          label="First Name"
          placeholder="First Name"
        />

        <InputField control={control} name="lastName" label="Last Name" placeholder="Last Name" />

        <div className="sm:col-span-2">
          <InputField
            control={control}
            name="phone"
            label="Phone"
            type="tel"
            placeholder="Phone Number"
          />
        </div>

        <div className="sm:col-span-2">
          <InputField control={control} name="email" label="Email" type="email" readOnly />
        </div>

        <div className="sm:col-span-2">
          <SearchableSelect
            control={control}
            name="expertise"
            label="Areas of Expertise (Select Multiple)"
            options={AVAILABLE_EXPERTISES}
            isSingle={false}
            placeholder="Select areas of expertise..."
          />
        </div>

        <div className="sm:col-span-2">
          <InputField
            control={control}
            name="experienceYears"
            label="Experience (Years)"
            type="number"
            placeholder="Experience in years"
          />
        </div>

        <div className="sm:col-span-2">
          <TextAreaField
            control={control}
            name="bio"
            label="Bio"
            placeholder="Tell us about yourself..."
          />
        </div>

        <InputField
          control={control}
          name="githubUrl"
          label="GitHub Profile"
          type="url"
          placeholder="https://github.com/..."
        />

        <InputField
          control={control}
          name="linkedinUrl"
          label="LinkedIn"
          type="url"
          placeholder="https://linkedin.com/in/..."
        />
      </div>

      <div className="space-y-3 rounded-sm border border-slate-200 bg-slate-50/50 p-4">
        <div>
          <h3 className="text-sm font-bold text-slate-800">Profile Tier Verification</h3>
          <p className="text-xs text-slate-500">
            Apply for your verification tier milestone badges based on your progress.
          </p>
        </div>

        {watchBadgeRequestStatus === 'pending' ? (
          <div className="flex items-center gap-2 rounded-sm border border-amber-100 bg-amber-50 p-3 text-xs font-medium text-amber-800">
            <Clock size={16} className="animate-pulse text-amber-600" />
            <span>
              Your application for the{' '}
              <strong className="uppercase">{watchBadgeRequestRequestedBadge}</strong> tier badge is
              currently under admin review.
            </span>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 pt-1">
            {(['bronze', 'silver', 'blue'] as const).map((tier) => (
              <button
                key={tier}
                type="button"
                disabled={isRequestingBadge || watchBadge === tier}
                onClick={() => handleApplyBadge(tier)}
                className="flex items-center gap-1.5 rounded-sm border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 capitalize shadow-xs transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Award
                  size={14}
                  className={
                    tier === 'bronze'
                      ? 'text-amber-700'
                      : tier === 'silver'
                        ? 'text-slate-400'
                        : 'text-blue-500'
                  }
                />
                Apply {tier}
              </button>
            ))}
            {isRequestingBadge && (
              <Loader2 size={16} className="text-primary ml-2 animate-spin self-center" />
            )}
          </div>
        )}
      </div>

      <DynamicActionButton
        label={isUpdating ? 'Saving...' : 'Save Changes'}
        onClick={handleSubmit(handleSaveChanges)}
        disabled={isUpdating}
        isLoading={isUpdating}
        showIcon
        icon={Save}
      />
    </div>
  );
};

export default InstructorProfileSettings;
