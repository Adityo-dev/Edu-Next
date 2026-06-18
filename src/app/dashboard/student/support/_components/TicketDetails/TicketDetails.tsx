/* eslint-disable no-unused-vars */
'use client';

import { Send } from 'lucide-react';

interface Message {
  sender: string;
  text: string;
  time: string;
}

interface Ticket {
  id: string;
  subject: string;
  category: string;
  status: string;
  date: string;
  lastReply: string;
  messages: Message[];
}

const statusConfig: Record<string, string> = {
  open: 'bg-yellow-50 text-yellow-600',
  resolved: 'bg-emerald-50 text-primary',
  closed: 'bg-slate-100 text-slate-500',
};

interface TicketDetailsProps {
  ticket: Ticket;
  replyMessage: string;
  onReplyChange: (_value: string) => void;
  onSendReply: () => void;
}

const TicketDetails = ({
  ticket,
  replyMessage,
  onReplyChange,
  onSendReply,
}: TicketDetailsProps) => {
  return (
    <div className="dashboard-card-container !p-0">
      {/* Ticket Header */}
      <div className="border-b border-slate-100 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-base font-bold">{ticket.subject}</p>
            <p className="text-text-secondary text-xs">
              {ticket.id} • {ticket.category}
            </p>
          </div>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-bold capitalize ${statusConfig[ticket.status]}`}
          >
            {ticket.status}
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="space-y-4 p-5">
        {ticket.messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.sender === 'student' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-sm rounded-md px-4 py-3 text-sm leading-relaxed ${
                msg.sender === 'student' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              <p>{msg.text}</p>
              <p
                className={`mt-1 text-xs ${msg.sender === 'student' ? 'text-white/60' : 'text-slate-400'}`}
              >
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Reply Box */}
      {ticket.status === 'open' && (
        <div className="border-t border-slate-100 p-5">
          <div className="flex gap-3">
            <input
              type="text"
              value={replyMessage}
              onChange={(e) => onReplyChange(e.target.value)}
              placeholder="Type your reply..."
              className="focus:border-primary flex-1 rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
            />
            <button
              onClick={onSendReply}
              className="bg-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-sm text-white transition-all hover:bg-[#2a6159]"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketDetails;
