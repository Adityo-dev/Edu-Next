/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from '@/redux/apiClient/apiClient';
import { ICourse, TQueryResponse } from '@/types/courseManagement.types';

export const courseApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    // GET /courses - Fetch all published courses with advanced filtering (Public)
    getPublishedCourses: builder.query<
      TQueryResponse<{ courses: ICourse[]; pagination: any }>,
      Record<string, any>
    >({
      query: (params) => ({
        url: '/courses',
        method: 'GET',
        params,
      }),
      providesTags: ['Courses'],
    }),

    // GET /courses/{slug} - Get a single published course details by slug (Public)
    getCourseBySlug: builder.query<TQueryResponse<ICourse>, string>({
      query: (slug) => ({
        url: `/courses/${slug}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, slug) => [{ type: 'Courses', id: slug }],
    }),
  }),
});

export const { useGetPublishedCoursesQuery, useGetCourseBySlugQuery } = courseApi;
