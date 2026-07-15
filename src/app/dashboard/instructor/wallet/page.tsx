'use client';

import SectionHeader from '@/components/dashboard/SectionHeader/SectionHeader';
import { useGetInstructorEarningsQuery } from '@/redux/features/payment/paymentApi';
import { useGetInstructorCoursesQuery } from '@/redux/features/courseManagement/instructorCourse.api';
import TransactionHistory from './_components/TransactionHistory/TransactionHistory';
import WalletCard from './_components/WalletCard/WalletCard';
import WalletStats from './_components/WalletStats/WalletStats';
import { useSearchParams } from 'next/navigation';

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

      <WalletCard balance={earnings?.available || 0} />

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
