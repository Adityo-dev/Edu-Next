/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from '@/redux/apiClient/apiClient';
import { ICourse, TQueryResponse } from '@/types/courseManagement.types';

export const instructorCourseApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    // GET /courses/instructor/my-courses - Get instructor's own dashboard courses
    getInstructorCourses: builder.query<
      TQueryResponse<{ courses: ICourse[]; pagination: any }>,
      Record<string, any>
    >({
      query: (params) => ({
        url: '/courses/instructor/my-courses',
        method: 'GET',
        params,
      }),
      providesTags: ['InstructorCourses'],
    }),

    // POST /courses - Create a new course with full curriculum (Instructor Only)
    createCourse: builder.mutation<TQueryResponse<ICourse>, Partial<ICourse>>({
      query: (courseData) => ({
        url: '/courses',
        method: 'POST',
        body: courseData,
      }),
      invalidatesTags: ['InstructorCourses', 'Courses'],
    }),

    // PATCH /courses/{id} - Update course content or Submit a Publish Request
    updateCourse: builder.mutation<TQueryResponse<ICourse>, { id: string; data: Partial<ICourse> }>(
      {
        query: ({ id, data }) => ({
          url: `/courses/${id}`,
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: () => [
          { type: 'InstructorCourses' },
          { type: 'Courses' },
          { type: 'AdminCourses' },
        ],
      },
    ),

    // DELETE /courses/{id} - Delete a course entirely (Own Instructor or Admin Only)
    deleteCourse: builder.mutation<TQueryResponse<null>, string>({
      query: (id) => ({
        url: `/courses/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['InstructorCourses', 'Courses', 'AdminCourses', 'CourseStats'],
    }),
  }),
});

export const {
  useGetInstructorCoursesQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = instructorCourseApi;
