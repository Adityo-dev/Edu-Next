import { apiClient } from '@/redux/apiClient/apiClient';

interface ISocialLinks {
  facebook: string;
  youtube: string;
  linkedin: string;
  github: string;
}

interface IPlatformConfigData {
  _id: string;
  siteName: string;
  tagline: string;
  supportEmail: string;
  maintenanceMode: boolean;
  currency: string;
  contactPhone: string;
  copyrightText: string;
  siteLogo: string;
  favicon: string;
  metaDescription: string;
  metaKeywords: string[];
  ogImage: string;
  googleAnalyticsId: string;
  socialLinks: ISocialLinks;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

interface IPlatformConfigResponse {
  success: boolean;
  message: string;
  data: IPlatformConfigData;
}

interface IUpdatePlatformConfigPayload {
  siteName?: string;
  tagline?: string;
  supportEmail?: string;
  maintenanceMode?: boolean;
  currency?: string;
  contactPhone?: string;
  copyrightText?: string;
  siteLogo?: string;
  favicon?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  ogImage?: string;
  googleAnalyticsId?: string;
  socialLinks?: Partial<ISocialLinks>;
}

export const platformConfigApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    // Get Platform Configuration (Public Endpoint)
    getPlatformConfig: builder.query<IPlatformConfigResponse, void>({
      query: () => ({
        url: '/platform-config',
        method: 'GET',
      }),
      providesTags: ['PlatformConfig'],
    }),

    // Update Platform Configuration (Admin Only)
    updatePlatformConfig: builder.mutation<IPlatformConfigResponse, IUpdatePlatformConfigPayload>({
      query: (payload) => ({
        url: '/platform-config',
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['PlatformConfig'],
    }),
  }),
});

export const { useGetPlatformConfigQuery, useUpdatePlatformConfigMutation } = platformConfigApi;
