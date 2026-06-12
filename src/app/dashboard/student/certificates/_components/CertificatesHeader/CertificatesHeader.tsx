/* eslint-disable no-unused-vars */
'use client';

import { Search } from 'lucide-react';

interface CertificatesHeaderProps {
  search: string;
  setSearch: (value: string) => void;
}

const CertificatesHeader = ({ search, setSearch }: CertificatesHeaderProps) => {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-text-primary text-2xl font-black">My Certificates</h1>
        <p className="text-text-secondary mt-1 text-sm">
          Download and share your earned certificates.
        </p>
      </div>
      <div className="relative">
        <Search size={15} className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search certificates..."
          className="focus:border-primary w-64 rounded-sm border border-slate-200 bg-white py-2.5 pr-4 pl-10 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
        />
      </div>
    </div>
  );
};

export default CertificatesHeader;
