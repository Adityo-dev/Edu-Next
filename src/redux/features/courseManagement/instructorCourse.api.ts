import { apiClient } from '@/redux/apiClient/apiClient';
import {
  ICommonResponse,
  ICourse,
  IInstructorCoursesQueryParams,
  IInstructorStudentsData,
  IInstructorStudentsQueryParams,
  IInstructorStudentStats,
  IPaginatedData,
} from '@/types/courseManagement.types';

export const instructorCourseApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Create a new course (Strictly as draft)
    createCourse: builder.mutation<ICommonResponse<ICourse>, Partial<ICourse>>({
      query: (courseData) => ({
        url: '/courses',
        method: 'POST',
        body: courseData,
      }),
    }),

    // 2. Get instructor's own dashboard courses
    getInstructorCourses: builder.query<
      ICommonResponse<IPaginatedData<ICourse>>,
      IInstructorCoursesQueryParams | undefined
    >({
      query: (params) => ({
        url: '/courses/instructor/my-courses',
        method: 'GET',
        params,
      }),
    }),

    // 3. Update course content or lessons
    updateCourseContent: builder.mutation<
      ICommonResponse<ICourse>,
      { id: string; payload: Partial<ICourse> }
    >({
      query: ({ id, payload }) => ({
        url: `/courses/${id}`,
        method: 'PATCH',
        body: payload,
      }),
    }),

    // 4. Request admin review to publish a draft or rejected course
    submitPublishRequest: builder.mutation<ICommonResponse<ICourse>, string>({
      query: (id) => ({
        url: `/courses/${id}/publish-request`,
        method: 'POST',
      }),
    }),

    // 5. Delete a course entirely (Only allowed if no enrollments & draft/rejected)
    deleteCourse: builder.mutation<ICommonResponse<null>, string>({
      query: (id) => ({
        url: `/courses/${id}`,
        method: 'DELETE',
      }),
    }),

    // 6. Get instructor students stats
    getInstructorStudentsStats: builder.query<ICommonResponse<IInstructorStudentStats>, void>({
      query: () => ({
        url: '/enrollments/instructor/students/stats',
        method: 'GET',
      }),
    }),

    // 7. Get instructor students
    getInstructorStudents: builder.query<
      ICommonResponse<IInstructorStudentsData>,
      IInstructorStudentsQueryParams | undefined
    >({
      query: (params) => ({
        url: '/enrollments/instructor/students',
        method: 'GET',
        params,
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetInstructorCoursesQuery,
  useUpdateCourseContentMutation,
  useSubmitPublishRequestMutation,
  useDeleteCourseMutation,
  useGetInstructorStudentsStatsQuery,
  useGetInstructorStudentsQuery,
} = instructorCourseApi;
