import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';
import DynamicTableActions from '@/components/dashboard/DynamicTableActions/DynamicTableActions';
import { Clock, Wallet } from 'lucide-react';
import Image from 'next/image';

interface Withdrawal {
  id: string;
  instructor: string;
  image: string;
  amount: number;
  method: string;
  account: string;
  walletBalance: number;
  requestedDate: string;
  status: string;
}

interface WithdrawalsListProps {
  withdrawals: Withdrawal[];
}

const WithdrawalsList = ({ withdrawals }: WithdrawalsListProps) => {
  return (
    <div className="space-y-3">
      {withdrawals.map((wd) => (
        <div
          key={wd.id}
          className={`dashboard-card-container p-3 shadow-none ${wd.status === 'pending' ? 'border-warning/30' : wd.status === 'rejected' ? 'border-danger/30' : 'border-primary/30'}`}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex flex-1 items-center gap-4">
              <Image
                src={wd.image}
                alt={wd.instructor}
                width={44}
                height={44}
                className="border-primary/20 rounded-full border-2"
              />
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <h3 className="font-bold">{wd.instructor}</h3>
                  <DynamicBadge
                    text={wd?.status}
                    color={`${wd.status === 'pending' ? '#ffc107' : wd.status === 'rejected' ? '#dc3545' : '#34796f'}`}
                  />
                </div>
                <div className="text-text-secondary flex flex-wrap items-center gap-3 text-xs">
                  <span className="flex items-center gap-1">
                    <Wallet size={11} /> Wallet: ৳{wd.walletBalance.toLocaleString()}
                  </span>
                  <span>•</span>
                  <span>
                    {wd.method}: {wd.account}
                  </span>
                  <span>•</span>
                  <span>
                    <Clock size={11} className="mr-1 inline" />
                    {wd.requestedDate}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-4">
              <div className="text-right">
                <p className="text-text-primary text-xl font-semibold">
                  ৳{wd.amount.toLocaleString()}
                </p>
                <p className="text-text-secondary text-xs">{wd.id}</p>
              </div>
              {wd.status === 'pending' && (
                <div className="flex gap-2">
                  <DynamicTableActions
                    actions={[
                      {
                        type: 'message',
                        label: 'Approve',
                      },
                      {
                        type: 'suspend',
                        label: 'Reject',
                      },
                    ]}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WithdrawalsList;
