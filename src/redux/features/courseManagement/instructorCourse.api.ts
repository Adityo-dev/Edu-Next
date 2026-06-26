import { apiClient } from '@/redux/apiClient/apiClient';
import {
  ICommonResponse,
  ICourse,
  IInstructorCoursesQueryParams,
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
      IInstructorCoursesQueryParams
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
  }),
});

export const {
  useCreateCourseMutation,
  useGetInstructorCoursesQuery,
  useUpdateCourseContentMutation,
  useSubmitPublishRequestMutation,
  useDeleteCourseMutation,
} = instructorCourseApi;
