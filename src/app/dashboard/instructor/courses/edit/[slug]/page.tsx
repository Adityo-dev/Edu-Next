'use client';

import { useGetInstructorCourseBySlugQuery } from '@/redux/features/courseManagement/instructorCourse.api';
import { useParams } from 'next/navigation';
import CourseForm from '../../_components/CourseForm/CourseForm';
import { CourseFormValues } from '../../_components/CourseForm/schema';

const parseDuration = (durationStr: string) => {
  if (!durationStr) return { durationHr: '', durationMin: '', durationSec: '' };

  const parts = durationStr.split(':');
  if (parts.length === 3) {
    return { durationHr: parts[0] || '', durationMin: parts[1] || '', durationSec: parts[2] || '' };
  } else if (parts.length === 2) {
    return { durationHr: '00', durationMin: parts[0] || '', durationSec: parts[1] || '' };
  }
  return { durationHr: '', durationMin: '', durationSec: '' };
};

const EditCoursePage = () => {
  const { slug } = useParams();
  const courseSlug = slug as string;

  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useGetInstructorCourseBySlugQuery(courseSlug, {
    skip: !courseSlug,
  });

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="border-t-primary h-8 w-8 animate-spin rounded-full border-4 border-slate-200"></div>
      </div>
    );
  }

  if (isError || !response?.data) {
    return (
      <div className="flex h-[400px] flex-col items-center justify-center text-slate-500">
        <p className="text-lg font-semibold text-slate-700">Course not found</p>
        <p>The course you are trying to edit does not exist or you do not have permission.</p>
        {error && (
          <pre className="mt-4 max-w-lg overflow-auto rounded bg-slate-100 p-4 text-xs text-red-500">
            {JSON.stringify(error, null, 2)}
          </pre>
        )}
      </div>
    );
  }

  const course = response.data;

  // Map the backend data back into the form schema
  const initialData: CourseFormValues = {
    title: course.title || '',
    subtitle: course.subtitle || '',
    category: course.category || '',
    level: course.level || '',
    language: course.language || '',
    description: course.description || '',
    tags: course.tags || [],
    requirements: Array.isArray(course.requirements)
      ? course.requirements.join('\n')
      : course.requirements || '',
    whatYouLearn: Array.isArray(course.whatYouLearn)
      ? course.whatYouLearn.join('\n')
      : course.whatYouLearn || '',
    price: course.price?.toString() || '',
    estimatedPrice: course.estimatedPrice?.toString() || '',
    thumbnail: course.thumbnail || '',
    sections:
      course.sections && course.sections.length > 0
        ? course.sections.map((section) => ({
            title: section.title,
            lessons: section.lessons.map((lesson) => {
              const { durationHr, durationMin, durationSec } = parseDuration(lesson.duration);
              return {
                title: lesson.title,
                durationHr,
                durationMin,
                durationSec,
                videoUrl: lesson.videoUrl,
                free: lesson.isFree || false,
              };
            }),
          }))
        : [
            {
              title: '',
              lessons: [
                {
                  title: '',
                  durationHr: '',
                  durationMin: '',
                  durationSec: '',
                  videoUrl: '',
                  free: false,
                },
              ],
            },
          ],
  };

  return <CourseForm mode="edit" initialData={initialData} courseId={course._id} />;
};

export default EditCoursePage;
