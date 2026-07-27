'use client';

import SectionHeader from '@/components/dashboard/SectionHeader/SectionHeader';
import { useGetInstructorCoursesQuery } from '@/redux/features/courseManagement/instructorCourse.api';
import { useGetInstructorEarningsQuery } from '@/redux/features/payment/paymentApi';
import { Info } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import TransactionHistory from './_components/TransactionHistory/TransactionHistory';
import WalletCard from './_components/WalletCard/WalletCard';
import WalletStats from './_components/WalletStats/WalletStats';

const InstructorWalletPage = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const courseId = searchParams.get('course') || undefined;
  const status = searchParams.get('status') || undefined;

  const { data: response, isLoading } = useGetInstructorEarningsQuery({
    page,
    limit: 10,
    courseId,
    status,
  });
  const { data: coursesData } = useGetInstructorCoursesQuery({ limit: 100 });

  const earnings = response?.data;
  // IPaginatedData<ICourse> has 'courses' not 'data'
  const courses = coursesData?.data?.courses || [];

  return (
    <div className="space-y-6">
      <SectionHeader title="My Wallet" description="Track your earnings and transaction history." />

      <div className="flex items-start gap-3 rounded-r-md border-l-4 border-blue-500 bg-blue-50/50 p-3 text-sm text-blue-800 shadow-sm dark:bg-blue-950/50 dark:text-blue-200">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />
        <div className="flex-1 space-y-1">
          <p className="font-semibold text-blue-900 dark:text-blue-100">Withdrawal Policy</p>
          <p className="leading-relaxed opacity-90">
            When a student purchases a course, the funds are kept in{' '}
            <strong>&quot;Holding&quot;</strong> in case they request a refund. After 7 days, if no
            refund is requested, the funds become <strong>&quot;Available&quot;</strong> and you can
            withdraw them.
          </p>
        </div>
      </div>

      <WalletCard balance={earnings?.available || 0} isLoading={isLoading} />

      <WalletStats earnings={earnings} isLoading={isLoading} />

      <TransactionHistory
        payments={earnings?.payments || []}
        pagination={earnings?.pagination}
        isLoading={isLoading}
        courses={courses}
      />
    </div>
  );
};

export default InstructorWalletPage;
