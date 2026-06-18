/* eslint-disable no-unused-vars */
'use client';

interface FormState {
  subject: string;
  category: string;
  message: string;
}

interface NewTicketFormProps {
  form: FormState;
  onChange: (updatedForm: FormState) => void;
  onSubmit: () => void;
}

const NewTicketForm = ({ form, onChange, onSubmit }: NewTicketFormProps) => {
  return (
    <div className="dashboard-card-container">
      <h2 className="mb-6 text-lg font-bold">Create New Ticket</h2>
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
            Subject
          </label>
          <input
            type="text"
            value={form.subject}
            onChange={(e) => onChange({ ...form, subject: e.target.value })}
            placeholder="Briefly describe your issue"
            className="focus:border-primary w-full rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
            Category
          </label>
          <select
            value={form.category}
            onChange={(e) => onChange({ ...form, category: e.target.value })}
            className="focus:border-primary w-full cursor-pointer rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
          >
            <option value="">Select category</option>
            <option>Technical Issue</option>
            <option>Payment Issue</option>
            <option>Certificate Issue</option>
            <option>Course Content</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
            Message
          </label>
          <textarea
            value={form.message}
            onChange={(e) => onChange({ ...form, message: e.target.value })}
            rows={5}
            placeholder="Describe your issue in detail..."
            className="focus:border-primary w-full rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
          />
        </div>
        <button
          onClick={onSubmit}
          className="bg-primary w-full rounded-sm py-3.5 text-sm font-bold text-white transition-all hover:bg-[#2a6159]"
        >
          Submit Ticket
        </button>
      </div>
    </div>
  );
};

export default NewTicketForm;
