'use client';

import SectionHeader from '@/components/dashboard/SectionHeader/SectionHeader';
import CommissionRate from './_components/CommissionRate/CommissionRate';
import CommissionStat from './_components/CommissionStat/CommissionStat';

const CommissionSettingsPage = () => {
  return (
    <section className="mx-auto space-y-6">
      <SectionHeader
        title="Commission Settings"
        description="Set the platform commission rate for all course sales."
      />

      <CommissionStat commission={20} />
      <CommissionRate />
    </section>
  );
};

export default CommissionSettingsPage;
