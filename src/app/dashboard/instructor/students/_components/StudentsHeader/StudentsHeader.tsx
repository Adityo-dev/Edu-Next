import React from 'react';
import { Download } from 'lucide-react';

const StudentsHeader = () => {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-text-primary text-2xl font-black">Students</h1>
        <p className="text-text-secondary mt-1 text-sm">
          View and manage students enrolled in your courses.
        </p>
      </div>
      <button className="flex items-center gap-2 rounded-sm border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 shadow-xs hover:bg-slate-50">
        <Download size={15} />
        Export CSV
      </button>
    </div>
  );
};

export default StudentsHeader;
