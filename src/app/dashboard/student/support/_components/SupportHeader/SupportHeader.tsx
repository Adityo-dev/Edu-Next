'use client';

import { Plus } from 'lucide-react';

interface SupportHeaderProps {
  view: 'list' | 'new' | 'detail';
  onNewTicket: () => void;
  onBack: () => void;
}

const SupportHeader = ({ view, onNewTicket, onBack }: SupportHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-text-primary text-2xl font-black">Support</h1>
        <p className="text-text-secondary mt-1 text-sm">Get help from our support team.</p>
      </div>

      {view === 'list' && (
        <button
          onClick={onNewTicket}
          className="bg-primary flex items-center gap-2 rounded-sm px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#2a6159]"
        >
          <Plus size={16} />
          New Ticket
        </button>
      )}

      {view !== 'list' && (
        <button onClick={onBack} className="text-primary text-sm font-semibold hover:underline">
          ← Back
        </button>
      )}
    </div>
  );
};

export default SupportHeader;
