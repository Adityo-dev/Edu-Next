import { apiClient } from '@/redux/apiClient/apiClient';
import {
  ICommonResponse,
  ICourse,
  ICourseListItem,
  IGetCoursesQueryParams,
  IPaginatedData,
} from '@/types/courseManagement.types';

export const publicCourseApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Get all published courses with advanced filtering
    getPublishedCourses: builder.query<
      ICommonResponse<IPaginatedData<ICourseListItem>>,
      IGetCoursesQueryParams
    >({
      query: (params) => ({
        url: '/courses',
        method: 'GET',
        params,
      }),
      providesTags: ['Courses'],
    }),

    // 2. Get a single published course details by slug
    getCourseBySlug: builder.query<ICommonResponse<ICourse>, string>({
      query: (slug) => ({
        url: `/courses/${slug}`,
        method: 'GET',
      }),
      providesTags: ['Courses'],
    }),

    // 3. Get top rated courses
    getTopRatedCourses: builder.query<
      ICommonResponse<{
        courses: ICourseListItem[];
        pagination: {
          totalPages: number;
          currentPage: number;
          limit: number;
          totalCourses: number;
        };
      }>,
      { page?: number; limit?: number; category?: string } | void
    >({
      query: (params) => ({
        url: '/courses/top-rated',
        method: 'GET',
        params: params || undefined,
      }),
      providesTags: ['Courses'],
    }),
  }),
});

export const { useGetPublishedCoursesQuery, useGetCourseBySlugQuery, useGetTopRatedCoursesQuery } =
  publicCourseApi;
