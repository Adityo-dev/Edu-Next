'use client';

import { useCreateTicketMutation } from '@/redux/features/tickets/ticketsApi';
import { X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface CreateTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: 'student' | 'instructor' | 'admin';
}

export default function CreateTicketModal({ isOpen, onClose, role }: CreateTicketModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Payment Issue');
  const [targetRole, setTargetRole] = useState('admin');
  const [priority, setPriority] = useState('medium');
  const [message, setMessage] = useState('');

  const [createTicket, { isLoading }] = useCreateTicketMutation();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !message) {
      toast.error('Title and message are required');
      return;
    }

    try {
      await createTicket({
        title,
        category,
        targetRole,
        priority,
        message,
      }).unwrap();
      toast.success('Ticket created successfully');
      onClose();
      // Reset form
      setTitle('');
      setCategory('Payment Issue');
      setTargetRole('admin');
      setPriority('medium');
      setMessage('');
    } catch {
      toast.error('Failed to create ticket');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-md bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-100 p-4">
          <h2 className="text-lg font-bold text-[#0f172a]">Create Support Ticket</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-4">
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-sm border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-[#0f172a] focus:ring-1 focus:ring-[#0f172a]"
              placeholder="E.g., Cannot access course videos"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-sm border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-[#0f172a] focus:ring-1 focus:ring-[#0f172a]"
              >
                <option value="Payment Issue">Payment Issue</option>
                <option value="Technical Issue">Technical Issue</option>
                <option value="Certificate Issue">Certificate Issue</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full rounded-sm border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-[#0f172a] focus:ring-1 focus:ring-[#0f172a]"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">
              Target Support
            </label>
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full rounded-sm border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-[#0f172a] focus:ring-1 focus:ring-[#0f172a]"
            >
              <option value="admin">Platform Admin</option>
              {role === 'student' && <option value="instructor">Course Instructor</option>}
            </select>
            <p className="mt-1 text-xs text-slate-500">Who should resolve this issue?</p>
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full resize-none rounded-sm border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-[#0f172a] focus:ring-1 focus:ring-[#0f172a]"
              placeholder="Describe your issue in detail..."
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-sm px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-sm bg-[#0f172a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1e293b] disabled:opacity-50"
            >
              {isLoading ? 'Submitting...' : 'Submit Ticket'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
