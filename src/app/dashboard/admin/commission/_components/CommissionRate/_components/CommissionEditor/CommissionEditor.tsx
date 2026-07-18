/* eslint-disable no-unused-vars */
import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
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
    <div className="dashboard-card-container h-fit">
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
            className={`cursor-pointer rounded-sm border py-2.5 text-sm font-bold transition-all ${commission === v ? 'border-primary text-primary bg-emerald-50' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}
          >
            {v}%
          </button>
        ))}
      </div>

      <DynamicActionButton
        onClick={handleSave}
        disabled={isUpdating}
        label={isUpdating ? 'Saving...' : 'Save Commission Rate'}
        showIcon
        icon={Save}
        className="w-full"
      />
    </div>
  );
};

export default CommissionEditor;
