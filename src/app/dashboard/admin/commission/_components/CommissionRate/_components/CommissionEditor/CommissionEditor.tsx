/* eslint-disable no-unused-vars */
import { Save } from 'lucide-react';

interface CommissionEditorProps {
  commission: number;
  setCommission: (val: number) => void;
  isUpdating: boolean;
  handleSave: () => void;
}

const CommissionEditor = ({
  commission,
  setCommission,
  isUpdating,
  handleSave,
}: CommissionEditorProps) => {
  return (
    <div className="dashboard-card-container h-fit p-4">
      <h2 className="mb-4 text-lg font-semibold">Set Commission Rate</h2>

      {/* Big Display */}
      <div className="mb-8 text-center">
        <div className="bg-primary mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-full shadow-lg shadow-emerald-200">
          <span className="text-4xl font-black text-white">{commission}%</span>
        </div>
        <p className="text-text-secondary text-sm">Platform Commission Rate</p>
      </div>

      {/* Slider */}
      <div className="mb-6">
        <div className="mb-2 flex justify-between text-xs text-slate-500">
          <span>5%</span>
          <span>50%</span>
        </div>
        <input
          type="range"
          min={5}
          max={50}
          step={1}
          value={commission}
          onChange={(e) => setCommission(Number(e.target.value))}
          className="accent-primary w-full cursor-pointer"
        />
      </div>

      {/* Quick Select */}
      <div className="mb-6 grid grid-cols-4 gap-2">
        {[10, 15, 20, 25].map((v) => (
          <button
            key={v}
            onClick={() => setCommission(v)}
            className={`rounded-sm border py-2.5 text-sm font-bold transition-all ${commission === v ? 'border-primary text-primary bg-emerald-50' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}
          >
            {v}%
          </button>
        ))}
      </div>

      <button
        onClick={handleSave}
        disabled={isUpdating}
        className={`flex w-full items-center justify-center gap-2 rounded-sm py-3.5 text-sm font-bold text-white transition-all ${isUpdating ? 'cursor-not-allowed bg-emerald-400 opacity-70' : 'bg-primary hover:bg-[#2a6159]'}`}
      >
        <Save size={15} />
        {isUpdating ? 'Saving...' : 'Save Commission Rate'}
      </button>
    </div>
  );
};

export default CommissionEditor;
