/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from '@/redux/apiClient/apiClient';

export interface TCategory {
  _id: string;
  name: string;
  description?: string;
  icon?: string;
  isActive: boolean;
  parentId?: string | null;
  subCategories?: TCategory[];
  createdAt: string;
  updatedAt: string;
}

export interface TGetCategoriesResponse {
  success: boolean;
  message: string;
  data: TCategory[];
}

export interface TGetCategoryResponse {
  success: boolean;
  message: string;
  data: TCategory;
}

export interface TMutationResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface TGetCategoriesParams {
  all?: boolean;
  nested?: boolean;
}

export interface TCreateCategoryPayload {
  name: string;
  description?: string;
  icon?: string;
  parentId?: string | null;
}

export interface TUpdateCategoryPayload {
  name?: string;
  description?: string;
  icon?: string;
  isActive?: boolean;
  parentId?: string | null;
}

export const categoriesApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    // GET /categories
    getCategories: builder.query<TGetCategoriesResponse, TGetCategoriesParams | void>({
      query: (params) => {
        const queryParams: Record<string, string | boolean> = {};

        if (params) {
          if (params.all !== undefined) queryParams.all = params.all;
          if (params.nested !== undefined) queryParams.nested = params.nested;
        }

        return {
          url: '/categories',
          method: 'GET',
          params: queryParams,
        };
      },
      providesTags: ['Categories'],
    }),

    // GET /categories/{id}
    getCategoryById: builder.query<TGetCategoryResponse, string>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'Categories', id }],
    }),

    // POST /categories
    createCategory: builder.mutation<TMutationResponse, TCreateCategoryPayload>({
      query: (body) => ({
        url: '/categories',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Categories'],
    }),

    // PATCH /categories/{id}
    updateCategory: builder.mutation<
      TMutationResponse,
      { id: string; payload: TUpdateCategoryPayload }
    >({
      query: ({ id, payload }) => ({
        url: `/categories/${id}`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Categories', id }, 'Categories'],
    }),

    // DELETE /categories/{id}
    deleteCategory: builder.mutation<TMutationResponse, string>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Categories'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
