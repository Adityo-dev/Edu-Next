/* eslint-disable no-unused-vars */

interface WithdrawalFormProps {
  method: string;
  setMethod: (m: string) => void;
  amount: string;
  setAmount: (a: string) => void;
  account: string;
  setAccount: (a: string) => void;
  balance: number;
  minWithdrawal: number;
}

const WithdrawalForm = ({
  method,
  setMethod,
  amount,
  setAmount,
  account,
  setAccount,
  balance,
  minWithdrawal,
}: WithdrawalFormProps) => {
  return (
    <div className="rounded-md border border-slate-100 bg-white p-6 shadow-xs">
      <h2 className="mb-5 text-lg font-bold">New Withdrawal Request</h2>

      <div className="space-y-4">
        {/* Method */}
        <div>
          <label className="mb-2 block text-xs font-bold tracking-wider text-slate-500 uppercase">
            Payment Method
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['bKash', 'Nagad', 'Bank'].map((m) => (
              <button
                key={m}
                onClick={() => setMethod(m)}
                className={`rounded-sm border py-3 text-sm font-bold transition-all ${
                  method === m
                    ? 'border-primary text-primary bg-emerald-50'
                    : 'border-slate-200 text-slate-500 hover:border-slate-300'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Account */}
        <div>
          <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
            {method === 'Bank' ? 'Bank Account Number' : `${method} Number`}
          </label>
          <input
            type="text"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            placeholder={method === 'Bank' ? 'Account number' : '01700-000000'}
            className="focus:border-primary w-full rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
            Amount (BDT)
          </label>
          <div className="relative">
            <span className="absolute top-1/2 left-4 -translate-y-1/2 font-bold text-slate-400">
              ৳
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={`Min. ৳${minWithdrawal}`}
              className="focus:border-primary w-full rounded-sm border border-slate-200 bg-slate-50 py-3 pr-4 pl-9 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
            />
          </div>
          {amount && parseInt(amount) > balance && (
            <p className="mt-1 text-xs text-red-500">Amount exceeds available balance.</p>
          )}
          {amount && parseInt(amount) < minWithdrawal && (
            <p className="mt-1 text-xs text-yellow-600">Minimum withdrawal is ৳{minWithdrawal}.</p>
          )}
        </div>

        {/* Quick Amounts */}
        <div>
          <label className="mb-2 block text-xs font-bold tracking-wider text-slate-500 uppercase">
            Quick Select
          </label>
          <div className="flex gap-2">
            {[1000, 3000, 5000, 10000].map((q) => (
              <button
                key={q}
                onClick={() => setAmount(String(q))}
                className={`flex-1 rounded-sm border py-2 text-xs font-bold transition-all ${
                  amount === String(q)
                    ? 'border-primary text-primary bg-emerald-50'
                    : 'border-slate-200 text-slate-500 hover:border-slate-300'
                }`}
              >
                ৳{q.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-sm border border-emerald-100 bg-emerald-50 p-3 text-xs leading-relaxed text-slate-600">
          ✅ Withdrawals are processed within <span className="font-bold">1-2 business days</span>{' '}
          after admin approval.
        </div>

        <button
          disabled={
            !amount || !account || parseInt(amount) > balance || parseInt(amount) < minWithdrawal
          }
          className="bg-secondary w-full rounded-sm py-3.5 text-sm font-bold text-white transition-all hover:bg-[#d98c0a] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Submit Withdrawal Request
        </button>
      </div>
    </div>
  );
};

export default WithdrawalForm;
