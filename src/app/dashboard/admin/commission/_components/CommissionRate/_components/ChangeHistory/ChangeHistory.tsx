import { TCommissionHistory } from '@/types/commission.types';

interface ChangeHistoryProps {
  isLoading: boolean;
  history: TCommissionHistory[];
}

const ChangeHistory = ({ isLoading, history }: ChangeHistoryProps) => {
  return (
    <div className="dashboard-card-container p-4">
      <h2 className="mb-4 text-lg font-semibold">Change History</h2>
      <div className="space-y-3">
        {isLoading ? (
          <p className="text-sm text-slate-500">Loading history...</p>
        ) : history.length === 0 ? (
          <p className="text-sm text-slate-500">No change history found.</p>
        ) : (
          history.map((h: TCommissionHistory, i: number) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <div>
                <span className="font-bold text-red-400">{h.oldRate}%</span>
                <span className="mx-2 text-slate-400">→</span>
                <span className="text-primary font-bold">{h.newRate}%</span>
              </div>
              <div className="text-right">
                <p className="text-text-secondary text-xs">
                  {new Date(h.updatedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
                <p className="mt-0.5 text-[10px] text-slate-400">
                  By{' '}
                  {typeof h.updatedBy === 'object'
                    ? h.updatedBy?.fullName || h.updatedBy?.firstName || 'Admin'
                    : 'Admin'}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChangeHistory;
