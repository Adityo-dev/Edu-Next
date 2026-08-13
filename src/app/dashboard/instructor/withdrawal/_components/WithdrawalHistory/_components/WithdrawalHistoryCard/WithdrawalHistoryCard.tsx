import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';
import { IWithdrawalRequest } from '@/types/withdrawal.types';
import { FormatDateTime } from '@/utils/formatDateTime';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface WithdrawalHistoryCardProps {
  wd: IWithdrawalRequest;
}

const WithdrawalHistoryCard = ({ wd }: WithdrawalHistoryCardProps) => {
  const date = FormatDateTime(wd?.createdAt);
  const processedDate =
    wd?.status !== 'pending' && wd?.updatedAt ? FormatDateTime(wd?.updatedAt) : null;

  const method = wd?.payoutDetails?.method || 'Unknown';
  const accountNo = wd?.payoutDetails?.mobileNumber || wd?.payoutDetails?.accountNumber || '****';
  const statusText = wd?.status === 'approved' ? 'completed' : wd?.status;

  return (
    <div className="dashboard-card-container p-3 shadow-none">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-text-secondary text-xs font-semibold uppercase">
          WD-{wd?._id.slice(-4)}
        </span>
        <DynamicBadge
          text={statusText}
          icon={
            statusText === 'completed'
              ? CheckCircle
              : statusText === 'pending'
                ? Clock
                : AlertCircle
          }
          color={
            statusText === 'completed'
              ? '#28a745'
              : statusText === 'pending'
                ? '#ffc107'
                : '#dc3545'
          }
        />
      </div>

      <p className="text-text-primary text-xl font-black">৳{wd?.amount?.toLocaleString()}</p>
      <p className="text-text-secondary mt-0.5 text-xs capitalize">
        {method} • {accountNo}
      </p>
      <div className="text-text-secondary mt-2 flex flex-col gap-1 text-xs sm:flex-row sm:items-center sm:justify-between">
        <span>Requested: {date}</span>
        {processedDate && <span>Processed: {processedDate}</span>}
      </div>
    </div>
  );
};

export default WithdrawalHistoryCard;
