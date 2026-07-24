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
  }),
});

export const { useGetPublishedCoursesQuery, useGetCourseBySlugQuery } = publicCourseApi;
