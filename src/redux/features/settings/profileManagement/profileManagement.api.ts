import { apiClient } from '@/redux/apiClient/apiClient';

export interface IBadgeRequest {
  requestedBadge: string;
  status: string;
}

export interface IProfileUser {
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
  skills?: string[];
  experienceYears: number;
  isEmailVerified: boolean;
  isSuspended: boolean;
  badgeRequest: IBadgeRequest;
  createdAt: string;
  updatedAt: string;
}

export interface IProfileResponse {
  success: boolean;
  profileProgress: string;
  user: IProfileUser;
}

export interface IProfileUpdatePayload {
  firstName?: string;
  lastName?: string;
  phone?: string;
  bio?: string;
  avatar?: string;
  coverPhoto?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  skills?: string[];
  areaOfExpertise?: string[];
}

export interface IProfileUpdateResponse {
  success: boolean;
  message: string;
  profileProgress: string;
  user: IProfileUser;
}

export interface IBadgeRequestPayload {
  targetBadge: 'bronze' | 'silver' | 'blue' | string;
}

export interface IBadgeRequestResponse {
  success: boolean;
  message: string;
}

export interface IChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export interface IChangePasswordResponse {
  success: boolean;
  message: string;
}

export const profileApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Fetch User Profile Dashboard
    getProfile: builder.query<IProfileResponse, void>({
      query: () => ({
        url: '/auth/profile',
        method: 'GET',
      }),
      providesTags: ['UserProfile'],
    }),

    // 2. Update Profile Details & Recalculate Live Progress
    updateProfile: builder.mutation<IProfileUpdateResponse, IProfileUpdatePayload>({
      query: (payload) => ({
        url: '/auth/profile-update',
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['UserProfile'],
    }),

    // 3. Apply for a milestone profile tier badge (bronze, silver, blue)
    requestBadge: builder.mutation<IBadgeRequestResponse, IBadgeRequestPayload>({
      query: (payload) => ({
        url: '/auth/request-badge',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['UserProfile'],
    }),

    // 4. Change Password
    changePassword: builder.mutation<IChangePasswordResponse, IChangePasswordPayload>({
      query: (payload) => ({
        url: '/auth/change-password',
        method: 'PATCH',
        body: payload,
      }),
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation, useRequestBadgeMutation, useChangePasswordMutation } = profileApi;
