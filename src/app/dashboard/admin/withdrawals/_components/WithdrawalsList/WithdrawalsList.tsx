import { CheckCircle, Clock, Wallet, XCircle } from 'lucide-react';
import Image from 'next/image';

const statusConfig: Record<string, string> = {
  pending: 'bg-yellow-50 text-yellow-600',
  approved: 'bg-emerald-50 text-primary',
  rejected: 'bg-red-50 text-red-500',
};

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
    <div className="space-y-4">
      {withdrawals.map((wd) => (
        <div
          key={wd.id}
          className={`rounded-md border bg-white p-5 shadow-xs ${wd.status === 'pending' ? 'border-yellow-100' : 'border-slate-100'}`}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex flex-1 items-center gap-4">
              <Image
                src={wd.image}
                alt={wd.instructor}
                width={44}
                height={44}
                className="rounded-full border-2 border-emerald-50"
              />
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <h3 className="font-bold">{wd.instructor}</h3>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-bold capitalize ${statusConfig[wd.status]}`}
                  >
                    {wd.status}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
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
                <p className="text-text-primary text-2xl font-black">
                  ৳{wd.amount.toLocaleString()}
                </p>
                <p className="text-text-secondary text-xs">{wd.id}</p>
              </div>
              {wd.status === 'pending' && (
                <div className="flex gap-2">
                  <button className="bg-primary flex items-center gap-2 rounded-sm px-5 py-2.5 text-sm font-bold text-white hover:bg-[#2a6159]">
                    <CheckCircle size={14} /> Approve
                  </button>
                  <button className="flex items-center gap-2 rounded-sm border border-red-100 px-5 py-2.5 text-sm font-bold text-red-400 hover:bg-red-50">
                    <XCircle size={14} /> Reject
                  </button>
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
