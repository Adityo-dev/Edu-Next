/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';
import { toast } from 'sonner';
import {
  useGetCommissionQuery,
  useUpdateCommissionMutation,
} from '@/redux/features/admin/commission/commission.api';
import CommissionEditor from './_components/CommissionEditor/CommissionEditor';
import RevenuePreview from './_components/RevenuePreview/RevenuePreview';
import ChangeHistory from './_components/ChangeHistory/ChangeHistory';
import CommissionRateSkeleton from './CommissionRateSkeleton';

const CommissionRate = () => {
  const { data, isLoading, refetch } = useGetCommissionQuery();
  const [updateCommission, { isLoading: isUpdating }] = useUpdateCommissionMutation();

  const [localCommission, setLocalCommission] = useState<number | null>(null);
  const [preview, setPreview] = useState(1500);

  const commission =
    localCommission !== null ? localCommission : (data?.data?.commissionRate ?? 20);

  const instructorEarning = preview * ((100 - commission) / 100);
  const platformEarning = preview * (commission / 100);

  if (isLoading) {
    return <CommissionRateSkeleton />;
  }

  const handleSave = async () => {
    try {
      const res = await updateCommission({ newRate: commission }).unwrap();
      if (res.success) {
        toast.success(res.message || 'Commission rate updated successfully!');
        setLocalCommission(null);
        refetch();
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to update commission rate');
    }
  };

  const history = data?.data?.changeHistory || [];
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <CommissionEditor
        commission={commission}
        setCommission={setLocalCommission}
        isUpdating={isUpdating}
        handleSave={handleSave}
      />
      <div className="space-y-4">
        <RevenuePreview
          preview={preview}
          setPreview={setPreview}
          commission={commission}
          platformEarning={platformEarning}
          instructorEarning={instructorEarning}
        />
        <ChangeHistory isLoading={isLoading} history={history} />
      </div>
    </div>
  );
};

export default CommissionRate;
