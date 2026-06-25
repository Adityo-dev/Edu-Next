import { apiClient } from '@/redux/apiClient/apiClient';

export const fileUploadApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    // Upload Files
    uploadImage: builder.mutation({
      query: (formData: FormData) => ({
        url: '/upload/image',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const { useUploadImageMutation } = fileUploadApi;
