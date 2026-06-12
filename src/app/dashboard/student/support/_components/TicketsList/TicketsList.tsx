/* eslint-disable no-unused-vars */
'use client';

import { MessageSquare } from 'lucide-react';

interface Ticket {
  id: string;
  subject: string;
  category: string;
  status: string;
  date: string;
  lastReply: string;
  messages: { sender: string; text: string; time: string }[];
}

const statusConfig: Record<string, string> = {
  open: 'bg-yellow-50 text-yellow-600',
  resolved: 'bg-emerald-50 text-primary',
  closed: 'bg-slate-100 text-slate-500',
};

interface TicketsListProps {
  tickets: Ticket[];
  onSelectTicket: (ticket: Ticket) => void;
}

const TicketsList = ({ tickets, onSelectTicket }: TicketsListProps) => {
  return (
    <div className="space-y-3">
      {tickets.map((ticket) => (
        <button
          key={ticket.id}
          onClick={() => onSelectTicket(ticket)}
          className="w-full rounded-md border border-slate-100 bg-white p-5 text-left shadow-xs transition-all hover:border-emerald-100 hover:shadow-sm"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-emerald-50">
                <MessageSquare size={16} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold">{ticket.subject}</p>
                <p className="text-text-secondary mt-0.5 text-xs">
                  {ticket.category} • {ticket.id}
                </p>
                <p className="text-text-secondary mt-1 text-xs">Last reply: {ticket.lastReply}</p>
              </div>
            </div>
            <span
              className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold capitalize ${statusConfig[ticket.status]}`}
            >
              {ticket.status}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default TicketsList;
