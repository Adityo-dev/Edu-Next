'use client';

import { MessageSquare, Plus, Send } from 'lucide-react';
import { useState } from 'react';

const ticketsData = [
  {
    id: 'TKT-001',
    subject: 'Cannot access course videos after payment',
    category: 'Technical Issue',
    status: 'resolved',
    date: 'April 15, 2025',
    lastReply: 'April 16, 2025',
    messages: [
      {
        sender: 'student',
        text: 'I completed payment for Web Development course but cannot access the videos.',
        time: 'Apr 15, 10:00 AM',
      },
      {
        sender: 'admin',
        text: 'We have checked your account. The issue has been resolved. Please try refreshing the page.',
        time: 'Apr 16, 9:00 AM',
      },
      { sender: 'student', text: 'It works now! Thank you so much.', time: 'Apr 16, 9:30 AM' },
    ],
  },
  {
    id: 'TKT-002',
    subject: 'Certificate not downloading properly',
    category: 'Certificate Issue',
    status: 'open',
    date: 'April 20, 2025',
    lastReply: 'April 20, 2025',
    messages: [
      {
        sender: 'student',
        text: 'My certificate for Graphic Design course is not downloading. It shows an error.',
        time: 'Apr 20, 2:00 PM',
      },
    ],
  },
];

const statusConfig: Record<string, string> = {
  open: 'bg-yellow-50 text-yellow-600',
  resolved: 'bg-emerald-50 text-primary',
  closed: 'bg-slate-100 text-slate-500',
};

const SupportPage = () => {
  const [view, setView] = useState<'list' | 'new' | 'detail'>('list');
  const [selectedTicket, setSelectedTicket] = useState<(typeof ticketsData)[0] | null>(null);
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({ subject: '', category: '', message: '' });

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-text-primary text-2xl font-black">Support</h1>
            <p className="text-text-secondary mt-1 text-sm">Get help from our support team.</p>
          </div>
          {view === 'list' && (
            <button
              onClick={() => setView('new')}
              className="bg-primary flex items-center gap-2 rounded-sm px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#2a6159]"
            >
              <Plus size={16} />
              New Ticket
            </button>
          )}
          {view !== 'list' && (
            <button
              onClick={() => setView('list')}
              className="text-primary text-sm font-semibold hover:underline"
            >
              ← Back
            </button>
          )}
        </div>

        {/* List View */}
        {view === 'list' && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Total Tickets', value: ticketsData.length },
                { label: 'Open', value: ticketsData.filter((t) => t.status === 'open').length },
                {
                  label: 'Resolved',
                  value: ticketsData.filter((t) => t.status === 'resolved').length,
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="rounded-md border border-slate-100 bg-white p-5 text-center shadow-xs"
                >
                  <p className="text-primary text-3xl font-black">{stat.value}</p>
                  <p className="text-text-secondary text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {ticketsData.map((ticket) => (
                <button
                  key={ticket.id}
                  onClick={() => {
                    setSelectedTicket(ticket);
                    setView('detail');
                  }}
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
                        <p className="text-text-secondary mt-1 text-xs">
                          Last reply: {ticket.lastReply}
                        </p>
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
          </>
        )}

        {/* New Ticket */}
        {view === 'new' && (
          <div className="rounded-md border border-slate-100 bg-white p-6 shadow-xs">
            <h2 className="mb-6 text-lg font-bold">Create New Ticket</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
                  Subject
                </label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
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
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
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
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  placeholder="Describe your issue in detail..."
                  className="focus:border-primary w-full rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
                />
              </div>
              <button className="bg-primary w-full rounded-sm py-3.5 text-sm font-bold text-white transition-all hover:bg-[#2a6159]">
                Submit Ticket
              </button>
            </div>
          </div>
        )}

        {/* Ticket Detail */}
        {view === 'detail' && selectedTicket && (
          <div className="rounded-md border border-slate-100 bg-white shadow-xs">
            <div className="border-b border-slate-100 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base font-bold">{selectedTicket.subject}</p>
                  <p className="text-text-secondary text-xs">
                    {selectedTicket.id} • {selectedTicket.category}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-bold capitalize ${statusConfig[selectedTicket.status]}`}
                >
                  {selectedTicket.status}
                </span>
              </div>
            </div>

            <div className="space-y-4 p-5">
              {selectedTicket.messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === 'student' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-sm rounded-md px-4 py-3 text-sm leading-relaxed ${
                      msg.sender === 'student'
                        ? 'bg-primary text-white'
                        : 'bg-slate-100 text-slate-700'
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

            {selectedTicket.status === 'open' && (
              <div className="border-t border-slate-100 p-5">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your reply..."
                    className="focus:border-primary flex-1 rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
                  />
                  <button className="bg-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-sm text-white transition-all hover:bg-[#2a6159]">
                    <Send size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportPage;
