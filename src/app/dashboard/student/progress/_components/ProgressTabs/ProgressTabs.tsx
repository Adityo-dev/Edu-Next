'use client';

import DynamicTableFilterBar from '@/components/dashboard/DynamicTableFilterBar/DynamicTableFilterBar';
import { ITableFilter } from '@/types/table-filter.types';
import { useSearchParams } from 'next/navigation';
import CourseProgressTab from './components/CourseProgressTab/CourseProgressTab';
import QuizHistoryTab from './components/QuizHistoryTab/QuizHistoryTab';

const tabFilters: ITableFilter[] = [
  {
    name: 'tab-filter',
    type: 'tabs',
    value: 'courses',
    options: [
      { label: 'Course Progress', value: 'courses' },
      { label: 'Quiz History', value: 'quizzes' },
    ],
  },
];

const ProgressTabs = () => {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'courses';

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <DynamicTableFilterBar fields={tabFilters} />

      {/* Tabs Content */}
      <div className="mt-4">
        {activeTab === 'courses' && <CourseProgressTab />}
        {activeTab === 'quizzes' && <QuizHistoryTab />}
      </div>
    </div>
  );
};

export default ProgressTabs;
