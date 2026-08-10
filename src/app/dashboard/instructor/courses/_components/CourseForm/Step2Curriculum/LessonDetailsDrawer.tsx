import TiptapEditor from '@/components/dashboard/Fields/TiptapEditor/TiptapEditor';
import { useModal } from '@/context/ModalContext';
import { QuizBuilder } from './Step2Curriculum';

export default function LessonDetailsDrawer() {
  const { data } = useModal();
  if (!data) return null;

  const { control, errors, sectionIndex, lessonIndex } = data;

  return (
    <div className="space-y-6 overflow-y-auto">
      <div className="dashboard-card-container space-y-5 p-3">
        <h3 className="border-b border-slate-100 pb-2 text-sm font-semibold">
          Description & Resources
        </h3>
        <TiptapEditor
          control={control}
          name={`sections.${sectionIndex}.lessons.${lessonIndex}.description`}
          label="Lesson Description"
          placeholder="Briefly describe what this lesson covers..."
        />
        <TiptapEditor
          control={control}
          name={`sections.${sectionIndex}.lessons.${lessonIndex}.references`}
          label="References & Links"
          placeholder="Add useful links or reference materials here..."
        />
      </div>

      <div className="dashboard-card-container space-y-5 p-3">
        <QuizBuilder
          control={control}
          errors={errors}
          sectionIndex={sectionIndex}
          lessonIndex={lessonIndex}
        />
      </div>
    </div>
  );
}
