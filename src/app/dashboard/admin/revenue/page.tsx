'use client';

import SectionHeader from '@/components/dashboard/SectionHeader/SectionHeader';
import RevenueChartAdmin from './_components/RevenueChartAdmin/RevenueChartAdmin';
import RevenueStats from './_components/RevenueStats/RevenueStats';
import TransactionsTable from './_components/TransactionsTable/TransactionsTable';

const RevenuePaymentsPage = () => {
  return (
    <div className="space-y-5">
      <SectionHeader
        title="Revenue & Payments"
        description="Track all transactions and revenue breakdown."
      />
      <RevenueStats />
      <RevenueChartAdmin />
      <TransactionsTable />
    </div>
  );
};

export default RevenuePaymentsPage;
