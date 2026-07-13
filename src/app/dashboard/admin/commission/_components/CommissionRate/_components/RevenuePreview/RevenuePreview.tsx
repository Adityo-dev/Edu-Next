/* eslint-disable no-unused-vars */

interface RevenuePreviewProps {
  preview: number;
  setPreview: (val: number) => void;
  commission: number;
  platformEarning: number;
  instructorEarning: number;
}

const RevenuePreview = ({
  preview,
  setPreview,
  commission,
  platformEarning,
  instructorEarning,
}: RevenuePreviewProps) => {
  return (
    <div className="dashboard-card-container p-4">
      <h2 className="mb-5 text-lg font-semibold">Revenue Preview</h2>
      <div className="mb-4">
        <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
          Sample Course Price (৳)
        </label>
        <input
          type="number"
          value={preview}
          onChange={(e) => setPreview(Number(e.target.value))}
          className="focus:border-primary w-full rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-sm bg-slate-50 px-4 py-3">
          <span className="text-sm text-slate-600">Course Price</span>
          <span className="font-bold">৳{preview.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between rounded-sm bg-orange-50 px-4 py-3">
          <span className="text-secondary text-sm font-semibold">Platform ({commission}%)</span>
          <span className="text-secondary font-black">+৳{platformEarning.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between rounded-sm bg-emerald-50 px-4 py-3">
          <span className="text-primary text-sm font-semibold">
            Instructor ({100 - commission}%)
          </span>
          <span className="text-primary font-black">৳{instructorEarning.toLocaleString()}</span>
        </div>
      </div>

      {/* Bar */}
      <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
        <div className="flex h-full">
          <div className="bg-secondary transition-all" style={{ width: `${commission}%` }} />
          <div className="bg-primary flex-1 transition-all" />
        </div>
      </div>
      <div className="mt-2 flex justify-between text-xs text-slate-400">
        <span>Platform {commission}%</span>
        <span>Instructor {100 - commission}%</span>
      </div>
    </div>
  );
};

export default RevenuePreview;
