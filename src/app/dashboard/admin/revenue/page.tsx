'use client';

import RevenueChartAdmin from './_components/RevenueChartAdmin/RevenueChartAdmin';
import RevenueStats from './_components/RevenueStats/RevenueStats';
import TransactionsTable from './_components/TransactionsTable/TransactionsTable';

const RevenuePaymentsPage = () => {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto space-y-6">
        <div>
          <h1 className="text-text-primary text-2xl font-black">Revenue & Payments</h1>
          <p className="text-text-secondary mt-1 text-sm">
            Track all transactions and revenue breakdown.
          </p>
        </div>
        <RevenueStats />
        <RevenueChartAdmin />
        <TransactionsTable />
      </div>
    </div>
  );
};

export default RevenuePaymentsPage;
