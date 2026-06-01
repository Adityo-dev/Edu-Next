/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */

interface CreateSessionFormProps {
  setShowCreate: (show: boolean) => void;
  newSession: any;
  setNewSession: (session: any) => void;
}

const CreateSessionForm = ({
  setShowCreate,
  newSession,
  setNewSession,
}: CreateSessionFormProps) => {
  return (
    <div className="rounded-md border border-emerald-100 bg-white p-6 shadow-xs">
      <h2 className="mb-5 text-lg font-bold">Schedule New Session</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
            Session Title
          </label>
          <input
            type="text"
            value={newSession.title}
            onChange={(e) => setNewSession({ ...newSession, title: e.target.value })}
            placeholder="e.g. React Hooks Deep Dive"
            className="focus:border-primary w-full rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
            Course
          </label>
          <select className="focus:border-primary w-full cursor-pointer rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-100">
            <option>Complete Web Development Bootcamp</option>
            <option>React.js Advanced Masterclass</option>
            <option>Node.js & Express API Development</option>
          </select>
        </div>
        {[
          { label: 'Date', type: 'date', key: 'date' },
          { label: 'Time', type: 'time', key: 'time' },
          { label: 'Duration (minutes)', type: 'number', key: 'duration' },
        ].map((field) => (
          <div key={field.key}>
            <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
              {field.label}
            </label>
            <input
              type={field.type}
              className="focus:border-primary w-full rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
            />
          </div>
        ))}
        <div>
          <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
            Platform
          </label>
          <select className="focus:border-primary w-full cursor-pointer rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-100">
            <option>Zoom</option>
            <option>Google Meet</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
            Meeting Link
          </label>
          <input
            type="url"
            placeholder="https://zoom.us/j/..."
            className="focus:border-primary w-full rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
          />
        </div>
      </div>
      <div className="mt-5 flex gap-3">
        <button className="bg-primary rounded-sm px-6 py-2.5 text-sm font-bold text-white hover:bg-[#2a6159]">
          Schedule Session
        </button>
        <button
          onClick={() => setShowCreate(false)}
          className="rounded-sm border border-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreateSessionForm;
