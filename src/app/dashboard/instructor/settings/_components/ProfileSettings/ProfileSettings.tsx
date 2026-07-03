/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useGetProfileQuery,
  useRequestBadgeMutation,
  useUpdateProfileMutation,
} from '@/redux/features/settings/profileManagement/profileManagement.api';
import { useUploadImageMutation } from '@/redux/features/upload/uploadApi';
import { Award, Clock, Image as ImageIcon, Loader2, Save, X } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

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
  'Web Development',
  'UI/UX Design',
  'Digital Marketing',
  'Freelancing',
  'Graphic Design',
  'Data Analytics',
  'Mobile App Development',
  'Cybersecurity',
  'Machine Learning & AI',
];

const ProfileSettings = ({}: ProfileSettingsProps) => {
  const { data: profileData, isLoading: isProfileLoading } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();
  const [requestBadge, { isLoading: isRequestingBadge }] = useRequestBadgeMutation();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    bio: '',
    avatar: '',
    coverPhoto: '',
    linkedinUrl: '',
    githubUrl: '',
    expertise: [] as string[], // মাল্টিপল সিলেক্টের জন্য অ্যারে করা হলো
    experienceYears: 0,
    badge: 'none',
    role: 'student',
    badgeRequest: {
      requestedBadge: 'none',
      status: 'none',
    },
  });

  useEffect(() => {
    if (profileData?.user) {
      const u = profileData.user;
      setFormData({
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
  }, [profileData]);

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
        setFormData((prev) => ({ ...prev, [field]: imageUrl }));
        toast.success(
          `${field === 'avatar' ? 'Profile picture' : 'Cover photo'} uploaded! Save changes to apply.`,
        );
      }
    } catch {
      toast.error('Failed to upload image. Try again.');
    }
  };

  const handleExpertiseToggle = (item: string) => {
    setFormData((prev) => {
      const isExist = prev.expertise.includes(item);
      const updated = isExist
        ? prev.expertise.filter((i) => i !== item)
        : [...prev.expertise, item];
      return { ...prev, expertise: updated };
    });
  };

  const handleSaveChanges = async () => {
    try {
      const payload: Record<string, any> = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        avatar: formData.avatar,
        bio: formData.bio,
        linkedinUrl: formData.linkedinUrl,
      };

      if (formData.role === 'student') {
        payload.githubUrl = formData.githubUrl;
        payload.skills = formData.expertise;
      }

      if (formData.role === 'instructor') {
        payload.coverPhoto = formData.coverPhoto;
        payload.areaOfExpertise = formData.expertise;
        payload.experienceYears = Number(formData.experienceYears);
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
    return (
      <div className="flex h-64 items-center justify-center gap-2 text-sm text-slate-500">
        <Loader2 className="text-primary animate-spin" size={20} /> Loading profile content...
      </div>
    );
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
        {formData.coverPhoto ? (
          <Image src={formData.coverPhoto} alt="Cover" fill className="object-cover" />
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
              src={formData.avatar || 'https://i.pravatar.cc/150?u=fallback'}
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
          className={`flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-bold capitalize shadow-xs ${getBadgeStyles(formData.badge)}`}
        >
          <Award size={15} />
          <span>{formData.badge === 'none' ? 'No Active Badge' : `${formData.badge} Tier`}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* First Name */}
        <div>
          <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
            First Name
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="focus:border-primary w-full rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
            Last Name
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="focus:border-primary w-full rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        {/* Phone */}
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
            Phone
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="focus:border-primary w-full rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        {/* Email */}
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            disabled
            className="w-full cursor-not-allowed rounded-sm border border-slate-100 bg-slate-100 px-4 py-3 text-sm text-slate-400"
          />
        </div>

        {/* 🛠️ Expertise (Multifold / Multiple Select Badge System) */}
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
            Areas of Expertise (Select Multiple)
          </label>
          <div className="flex min-h-12.5 flex-wrap gap-2 rounded-sm border border-slate-200 bg-slate-50 p-3">
            {AVAILABLE_EXPERTISES.map((item) => {
              const isSelected = formData.expertise.includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleExpertiseToggle(item)}
                  className={`flex items-center gap-1 rounded-sm px-3 py-1.5 text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-primary text-white'
                      : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {item}
                  {isSelected && <X size={12} className="ml-1" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Experience Years */}
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
            Experience (Years)
          </label>
          <input
            type="number"
            min="0"
            value={formData.experienceYears}
            onChange={(e) => setFormData({ ...formData, experienceYears: Number(e.target.value) })}
            className="focus:border-primary w-full rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        {/* Bio Textarea */}
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
            Bio
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            rows={4}
            className="focus:border-primary w-full rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        {/* GitHub Url */}
        <div>
          <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
            GitHub Profile
          </label>
          <input
            type="url"
            value={formData.githubUrl}
            onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
            placeholder="https://github.com/..."
            className="focus:border-primary w-full rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        {/* LinkedIn Url */}
        <div>
          <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
            LinkedIn
          </label>
          <input
            type="url"
            value={formData.linkedinUrl}
            onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
            placeholder="https://linkedin.com/in/..."
            className="focus:border-primary w-full rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
          />
        </div>
      </div>

      {/* 🏅 ─── MILESTONE BADGE REQUEST SECTION ─── */}
      <div className="space-y-3 rounded-sm border border-slate-200 bg-slate-50/50 p-4">
        <div>
          <h3 className="text-sm font-bold text-slate-800">Profile Tier Verification</h3>
          <p className="text-xs text-slate-500">
            Apply for your verification tier milestone badges based on your progress.
          </p>
        </div>

        {formData.badgeRequest.status === 'pending' ? (
          <div className="flex items-center gap-2 rounded-sm border border-amber-100 bg-amber-50 p-3 text-xs font-medium text-amber-800">
            <Clock size={16} className="animate-pulse text-amber-600" />
            <span>
              Your application for the{' '}
              <strong className="uppercase">{formData.badgeRequest.requestedBadge}</strong> tier
              badge is currently under admin review.
            </span>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 pt-1">
            {(['bronze', 'silver', 'blue'] as const).map((tier) => (
              <button
                key={tier}
                type="button"
                disabled={isRequestingBadge || formData.badge === tier}
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

      {/* Submit Button */}
      <button
        onClick={handleSaveChanges}
        disabled={isUpdating}
        className="bg-primary flex items-center gap-2 rounded-sm px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#2a6159] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isUpdating ? (
          <>
            <Loader2 className="animate-spin" size={15} /> Saving...
          </>
        ) : (
          <>
            <Save size={15} /> Save Changes
          </>
        )}
      </button>
    </div>
  );
};

export default ProfileSettings;
