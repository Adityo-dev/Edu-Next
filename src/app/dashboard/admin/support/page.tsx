'use client';

import { MessageSquare, Send } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const ticketsData = [
  {
    id: 'TKT-001',
    user: 'Sumaiya Akter',
    userImage: 'https://i.pravatar.cc/150?u=sumaiya',
    role: 'Student',
    subject: 'Cannot access course videos after payment',
    category: 'Technical Issue',
    status: 'open',
    date: 'Apr 22, 2025',
    messages: [
      {
        sender: 'user',
        text: 'I completed payment for Web Development course but cannot access the videos.',
        time: 'Apr 22, 10:00 AM',
      },
    ],
  },
  {
    id: 'TKT-002',
    user: 'Md. Rafiqul Islam',
    userImage: 'https://i.pravatar.cc/150?u=rafiq',
    role: 'Instructor',
    subject: 'Withdrawal not processed after 3 days',
    category: 'Payment Issue',
    status: 'open',
    date: 'Apr 21, 2025',
    messages: [
      {
        sender: 'user',
        text: 'I submitted a withdrawal request 3 days ago but it still shows pending.',
        time: 'Apr 21, 2:00 PM',
      },
    ],
  },
  {
    id: 'TKT-003',
    user: 'Nusrat Jahan',
    userImage: 'https://i.pravatar.cc/150?u=nusrat',
    role: 'Student',
    subject: 'Certificate not downloading properly',
    category: 'Certificate Issue',
    status: 'resolved',
    date: 'Apr 18, 2025',
    messages: [
      {
        sender: 'user',
        text: 'My certificate is not downloading. It shows an error.',
        time: 'Apr 18, 11:00 AM',
      },
      {
        sender: 'admin',
        text: 'We have fixed the issue. Please try again now.',
        time: 'Apr 19, 9:00 AM',
      },
      { sender: 'user', text: 'It works now! Thank you.', time: 'Apr 19, 9:30 AM' },
    ],
  },
];

const statusConfig: Record<string, string> = {
  open: 'bg-yellow-50 text-yellow-600',
  resolved: 'bg-emerald-50 text-primary',
  closed: 'bg-slate-100 text-slate-500',
};

const SupportTicketsPage = () => {
  const [filter, setFilter] = useState('open');
  const [selected, setSelected] = useState<(typeof ticketsData)[0] | null>(ticketsData[0]);
  const [reply, setReply] = useState('');

  const filtered = ticketsData.filter((t) => filter === 'all' || t.status === filter);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto space-y-6">
        <div>
          <h1 className="text-text-primary text-2xl font-black">Support Tickets</h1>
          <p className="text-text-secondary mt-1 text-sm">Respond to user support requests.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              label: 'Open',
              value: ticketsData.filter((t) => t.status === 'open').length,
              color: 'text-yellow-600',
            },
            {
              label: 'Resolved',
              value: ticketsData.filter((t) => t.status === 'resolved').length,
              color: 'text-primary',
            },
            { label: 'Total', value: ticketsData.length, color: 'text-[#0f172a]' },
          ].map((stat, i) => (
            <div
              key={i}
              className="rounded-md border border-slate-100 bg-white p-5 text-center shadow-xs"
            >
              <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
              <p className="text-text-secondary text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Ticket List */}
          <div className="space-y-3">
            <div className="flex overflow-hidden rounded-sm border border-slate-200 bg-white shadow-xs">
              {['all', 'open', 'resolved'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`flex-1 py-2.5 text-xs font-semibold capitalize transition-all ${filter === tab ? 'bg-primary text-white' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            {filtered.map((ticket) => (
              <button
                key={ticket.id}
                onClick={() => setSelected(ticket)}
                className={`w-full rounded-md border p-4 text-left shadow-xs transition-all hover:border-emerald-100 ${selected?.id === ticket.id ? 'border-primary bg-emerald-50/30' : 'border-slate-100 bg-white'}`}
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400">{ticket.id}</span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-bold capitalize ${statusConfig[ticket.status]}`}
                  >
                    {ticket.status}
                  </span>
                </div>
                <div className="mb-2 flex items-center gap-2">
                  <Image
                    src={ticket.userImage}
                    alt={ticket.user}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <span className="text-sm font-semibold">{ticket.user}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${ticket.role === 'Instructor' ? 'bg-blue-50 text-blue-600' : 'text-primary bg-emerald-50'}`}
                  >
                    {ticket.role}
                  </span>
                </div>
                <p className="line-clamp-1 text-sm text-slate-600">{ticket.subject}</p>
                <p className="text-text-secondary mt-1 text-xs">{ticket.date}</p>
              </button>
            ))}
          </div>

          {/* Ticket Detail */}
          <div className="rounded-md border border-slate-100 bg-white shadow-xs lg:col-span-2">
            {selected ? (
              <div className="flex h-full flex-col">
                {/* Header */}
                <div className="border-b border-slate-100 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold">{selected.subject}</p>
                      <p className="text-text-secondary mt-0.5 text-xs">
                        {selected.id} • {selected.category}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-bold capitalize ${statusConfig[selected.status]}`}
                      >
                        {selected.status}
                      </span>
                      {selected.status === 'open' && (
                        <button className="text-primary rounded-sm bg-emerald-50 px-3 py-1.5 text-xs font-bold hover:bg-emerald-100">
                          Mark Resolved
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 space-y-4 overflow-y-auto p-5">
                  {selected.messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-md rounded-md px-4 py-3 text-sm leading-relaxed ${msg.sender === 'admin' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700'}`}
                      >
                        <p>{msg.text}</p>
                        <p
                          className={`mt-1 text-xs ${msg.sender === 'admin' ? 'text-white/60' : 'text-slate-400'}`}
                        >
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Reply Box */}
                {selected.status === 'open' && (
                  <div className="border-t border-slate-100 p-5">
                    <div className="flex gap-3">
                      <textarea
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        rows={2}
                        placeholder="Type your reply..."
                        className="focus:border-primary flex-1 resize-none rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
                      />
                      <button className="bg-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-sm text-white hover:bg-[#2a6159]">
                        <Send size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center py-20 text-center">
                <div>
                  <MessageSquare size={40} className="mx-auto mb-3 text-slate-200" />
                  <p className="text-slate-400">Select a ticket to view</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportTicketsPage;
