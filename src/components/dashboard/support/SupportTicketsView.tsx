'use client';

import { getSocket } from '@/lib/socket';
import {
  useGetTicketDetailsQuery,
  useGetTicketsQuery,
  useReplyToTicketMutation,
  useUpdateTicketStatusMutation,
} from '@/redux/features/tickets/ticketsApi';
import { MessageSquare, Plus, Send } from 'lucide-react';
import { TicketMessage } from '@/redux/features/tickets/ticketsApi';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import CreateTicketModal from '@/components/dashboard/support/CreateTicketModal';

interface SupportTicketsViewProps {
  role: 'student' | 'instructor' | 'admin';
}

const statusConfig: Record<string, string> = {
  open: 'bg-yellow-50 text-yellow-600',
  resolved: 'bg-emerald-50 text-[#0f172a]', // Used primary equivalent
  closed: 'bg-slate-100 text-slate-500',
};

export default function SupportTicketsView({ role }: SupportTicketsViewProps) {
  const [filter, setFilter] = useState('open');
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [reply, setReply] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Queries
  const { data: ticketsData, isLoading: isTicketsLoading } = useGetTicketsQuery();
  const {
    data: selectedTicketData,
    isLoading: isTicketLoading,
    refetch: refetchTicketDetails,
  } = useGetTicketDetailsQuery(selectedTicketId as string, {
    skip: !selectedTicketId,
  });

  // Mutations
  const [replyToTicket, { isLoading: isReplying }] = useReplyToTicketMutation();
  const [updateStatus, { isLoading: isUpdatingStatus }] = useUpdateTicketStatusMutation();

  const tickets = ticketsData?.tickets || [];
  const filteredTickets = tickets.filter((t) => filter === 'all' || t.status === filter);
  const selectedTicket = selectedTicketData?.ticket;
  const ticketMessages = selectedTicketData?.messages || [];

  // Socket connection
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let activeSocket: any = null;
    let cleanupFn: (() => void) | null = null;

    const setupSocket = async () => {
      activeSocket = await getSocket();

      if (selectedTicketId) {
        activeSocket.emit('joinTicket', selectedTicketId);

        const handleNewMessage = () => {
          refetchTicketDetails();
        };

        const handleStatusUpdated = () => {
          refetchTicketDetails();
        };

        activeSocket.on('newMessage', handleNewMessage);
        activeSocket.on('ticketStatusUpdated', handleStatusUpdated);

        cleanupFn = () => {
          activeSocket?.off('newMessage', handleNewMessage);
          activeSocket?.off('ticketStatusUpdated', handleStatusUpdated);
        };
      }
    };

    setupSocket();

    return () => {
      if (cleanupFn) {
        cleanupFn();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTicketId]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedTicketData?.messages]);

  const handleReply = async () => {
    if (!reply.trim() || !selectedTicketId) return;

    try {
      await replyToTicket({ id: selectedTicketId, message: reply }).unwrap();
      setReply('');

      // Emit via socket just in case it is required by backend real-time engine
      const socket = await getSocket();
      socket.emit('sendMessage', { ticketId: selectedTicketId, message: reply, text: reply });
    } catch (err: unknown) {
      console.error('Reply error:', err);
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || 'Failed to send reply');
    }
  };

  const handleUpdateStatus = async (status: 'resolved' | 'closed') => {
    if (!selectedTicketId) return;
    try {
      await updateStatus({ id: selectedTicketId, status }).unwrap();
      toast.success(`Ticket marked as ${status}`);
    } catch {
      toast.error('Failed to update ticket status');
    }
  };

  return (
    <div className="min-h-[calc(100vh-100px)] bg-[#F9FAFB]">
      <div className="mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-text-primary text-2xl font-black">Support Tickets</h1>
            <p className="text-text-secondary mt-1 text-sm">
              {role === 'admin'
                ? 'Respond to user support requests.'
                : 'Manage your support tickets.'}
            </p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 rounded-md bg-[#0f172a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1e293b]"
          >
            <Plus size={16} />
            Create Ticket
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              label: 'Open',
              value: tickets.filter((t) => t.status === 'open').length,
              color: 'text-yellow-600',
            },
            {
              label: 'Resolved',
              value: tickets.filter((t) => t.status === 'resolved').length,
              color: 'text-emerald-600',
            },
            { label: 'Total', value: tickets.length, color: 'text-[#0f172a]' },
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
          <div className="flex h-[600px] flex-col space-y-3">
            <div className="flex shrink-0 overflow-hidden rounded-sm border border-slate-200 bg-white shadow-xs">
              {['all', 'open', 'resolved'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`flex-1 py-2.5 text-xs font-semibold capitalize transition-all ${filter === tab ? 'bg-[#0f172a] text-white' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto pr-1">
              {isTicketsLoading ? (
                <p className="py-10 text-center text-sm text-slate-500">Loading tickets...</p>
              ) : filteredTickets.length === 0 ? (
                <p className="py-10 text-center text-sm text-slate-500">No tickets found.</p>
              ) : (
                filteredTickets.map((ticket) => (
                  <button
                    key={ticket._id}
                    onClick={() => setSelectedTicketId(ticket._id)}
                    className={`w-full rounded-md border p-4 text-left shadow-xs transition-all hover:border-emerald-100 ${selectedTicketId === ticket._id ? 'border-[#0f172a] bg-slate-50/50' : 'border-slate-100 bg-white'}`}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400">
                        {ticket._id.substring(ticket._id.length - 6).toUpperCase()}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-bold capitalize ${statusConfig[ticket.status] || statusConfig['open']}`}
                      >
                        {ticket.status}
                      </span>
                    </div>
                    <div className="mb-2 flex items-center gap-2">
                      <Image
                        src={
                          ticket.user?.profilePicture ||
                          `https://i.pravatar.cc/150?u=${ticket.user?._id}`
                        }
                        alt={ticket.user?.name || 'User'}
                        width={24}
                        height={24}
                        className="rounded-full bg-slate-200 object-cover"
                      />
                      <span className="text-sm font-semibold">{ticket.user?.name || 'User'}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${ticket.user?.role === 'instructor' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}
                      >
                        {ticket.user?.role}
                      </span>
                    </div>
                    <p className="line-clamp-1 text-sm text-slate-600">{ticket.title}</p>
                    <p className="text-text-secondary mt-1 text-xs">
                      {ticket.createdAt.split('T')[0]}
                    </p>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Ticket Detail */}
          <div className="dashboard-card-container h-[600px] rounded-md border border-slate-200 bg-white shadow-xs lg:col-span-2">
            {isTicketLoading ? (
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-slate-500">Loading ticket details...</p>
              </div>
            ) : selectedTicket ? (
              <div className="flex h-full flex-col">
                {/* Header */}
                <div className="shrink-0 border-b border-slate-100 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold">{selectedTicket.title}</p>
                      <p className="text-text-secondary mt-0.5 text-xs">
                        ID: {selectedTicket._id} • {selectedTicket.category} • Target:{' '}
                        {selectedTicket.targetRole}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-bold capitalize ${statusConfig[selectedTicket.status] || statusConfig['open']}`}
                      >
                        {selectedTicket.status}
                      </span>
                      {selectedTicket.status === 'open' &&
                        (role === 'admin' || role === 'instructor') && (
                          <button
                            onClick={() => handleUpdateStatus('resolved')}
                            disabled={isUpdatingStatus}
                            className="rounded-sm bg-slate-100 px-3 py-1.5 text-xs font-bold text-[#0f172a] hover:bg-slate-200 disabled:opacity-50"
                          >
                            Mark Resolved
                          </button>
                        )}
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 space-y-4 overflow-y-auto p-5">
                  {ticketMessages.map((msg: TicketMessage) => {
                    // Decide orientation based on role and sender
                    // If I am admin, and sender is admin -> right
                    // If I am user, and sender is user -> right
                    let isMe = false;
                    const senderRole = msg.senderId?.role || msg.sender;

                    if (role === 'admin' && senderRole === 'admin') isMe = true;
                    if (role === 'student' && senderRole === 'student') isMe = true;
                    if (role === 'instructor' && senderRole === 'instructor') isMe = true;

                    // Fallback for creator vs responder
                    if (senderRole === selectedTicket.user?.role) {
                      isMe = role === selectedTicket.user?.role;
                    }

                    return (
                      <div
                        key={msg._id}
                        className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-md rounded-md px-4 py-3 text-sm leading-relaxed ${isMe ? 'bg-[#0f172a] text-white' : 'bg-slate-100 text-slate-700'}`}
                        >
                          <p className="mb-1 text-xs font-semibold capitalize opacity-70">
                            {msg.senderId?.fullName ||
                              (msg.senderId?.role ??
                                (msg as unknown as { sender?: string }).sender)}
                          </p>
                          <p>{msg.message || (msg as unknown as { text?: string }).text}</p>
                          <p
                            className={`mt-1 text-xs ${isMe ? 'text-white/60' : 'text-slate-400'}`}
                          >
                            {msg.createdAt.replace('T', ' ').substring(0, 16)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Reply Box */}
                {selectedTicket.status === 'open' && (
                  <div className="shrink-0 border-t border-slate-100 p-5">
                    <div className="flex gap-3">
                      <textarea
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleReply();
                          }
                        }}
                        rows={2}
                        placeholder="Type your reply..."
                        className="flex-1 resize-none rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0f172a] focus:ring-2 focus:ring-slate-200"
                      />
                      <button
                        onClick={handleReply}
                        disabled={isReplying || !reply.trim()}
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-[#0f172a] text-white hover:bg-[#1e293b] disabled:opacity-50"
                      >
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

      <CreateTicketModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        role={role}
      />
    </div>
  );
}
