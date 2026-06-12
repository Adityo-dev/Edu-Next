import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

const withdrawalHistory = [
  {
    id: 'WD-001',
    amount: 8000,
    method: 'bKash',
    account: '01700-000000',
    status: 'completed',
    date: 'Apr 20, 2025',
    processedDate: 'Apr 21, 2025',
  },
  {
    id: 'WD-002',
    amount: 5000,
    method: 'bKash',
    account: '01700-000000',
    status: 'completed',
    date: 'Apr 1, 2025',
    processedDate: 'Apr 2, 2025',
  },
  {
    id: 'WD-003',
    amount: 10000,
    method: 'Bank Transfer',
    account: 'Dutch Bangla Bank ****1234',
    status: 'pending',
    date: 'Apr 22, 2025',
    processedDate: null,
  },
];

const WithdrawalHistory = () => {
  return (
    <div className="dashboard-card-container">
      <h2 className="mb-5 text-lg font-semibold">Withdrawal History</h2>
      <div className="space-y-3">
        {withdrawalHistory.map((wd) => {
          return (
            <div key={wd.id} className="dashboard-card-container p-3 shadow-none">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-text-secondary text-xs font-semibold">{wd.id}</span>
                <DynamicBadge
                  text={wd.status}
                  icon={
                    wd?.status === 'completed'
                      ? CheckCircle
                      : wd?.status === 'pending'
                        ? Clock
                        : AlertCircle
                  }
                  color={
                    wd?.status === 'completed'
                      ? '#28a745'
                      : wd?.status === 'pending'
                        ? '#ffc107'
                        : '#dc3545'
                  }
                />
              </div>

              <p className="text-text-primary text-xl font-black">৳{wd.amount.toLocaleString()}</p>
              <p className="text-text-secondary mt-0.5 text-xs">
                {wd.method} • {wd.account}
              </p>
              <div className="text-text-secondary mt-2 flex items-center justify-between text-xs">
                <span>Requested: {wd.date}</span>
                {wd.processedDate && <span>Processed: {wd.processedDate}</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WithdrawalHistory;
