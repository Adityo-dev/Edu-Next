/* eslint-disable react-hooks/incompatible-library */
'use client';

import DynamicTableFilterBar from '@/components/dashboard/DynamicTableFilterBar/DynamicTableFilterBar';
import InputField from '@/components/dashboard/Fields/InputField/InputField';
import CreateTicketModal from '@/components/dashboard/support/CreateTicketModal';
import { getSocket } from '@/lib/socket';
import {
  TicketMessage,
  useGetTicketDetailsQuery,
  useGetTicketsQuery,
  useReplyToTicketMutation,
  useUpdateTicketStatusMutation,
} from '@/redux/features/tickets/ticketsApi';
import { MessageSquare } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import DynamicActionButton from '../DynamicActionButton/DynamicActionButton';
import DynamicBadge from '../DynamicBadge/DynamicBadge';
import SectionHeader from '../SectionHeader/SectionHeader';
import { FormatDateTime } from '@/utils/formatDateTime';

interface SupportTicketsViewProps {
  role: 'student' | 'instructor' | 'admin';
}

export default function SupportTicketsView({ role }: SupportTicketsViewProps) {
  const isStudent = role === 'student';

  const theme = {
    bg: isStudent ? 'bg-[#0f172a]' : 'bg-primary',
    text: isStudent ? 'text-[#0f172a]' : 'text-primary',
    hoverBg: isStudent ? 'hover:bg-[#1e293b]' : 'hover:bg-[#2a6159]',
    border: isStudent ? 'border-[#0f172a]' : 'border-primary',
    focusBorder: isStudent ? 'focus:border-[#0f172a]' : 'focus:border-primary',
    focusRing: isStudent ? 'focus:ring-slate-200' : 'focus:ring-emerald-100',
    selectedBg: isStudent ? 'bg-slate-50/50' : 'bg-emerald-50/30',
    resolvedStatus: isStudent ? 'bg-emerald-50 text-[#0f172a]' : 'bg-emerald-50 text-primary',
    markResolvedBg: isStudent ? 'bg-slate-100' : 'bg-emerald-50',
    markResolvedHover: isStudent ? 'hover:bg-slate-200' : 'hover:bg-emerald-100',
  };

  const getBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return '#ca8a04';
      case 'resolved':
        return isStudent ? '#0f172a' : '#34796f';
      case 'closed':
        return '#64748b';
      default:
        return '#64748b';
    }
  };

  const [filter, setFilter] = useState('all');
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: { reply: '' },
  });

  const replyValue = watch('reply');

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

  const handleReply = async (data: { reply: string }) => {
    if (!data.reply.trim() || !selectedTicketId) return;

    try {
      await replyToTicket({ id: selectedTicketId, message: data.reply }).unwrap();
      reset();

      // Emit via socket just in case it is required by backend real-time engine
      const socket = await getSocket();
      socket.emit('sendMessage', {
        ticketId: selectedTicketId,
        message: data.reply,
        text: data.reply,
      });
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
          <SectionHeader
            title="Support Tickets"
            description={
              role === 'admin'
                ? 'Respond to user support requests.'
                : 'Manage your support tickets.'
            }
          />
          <DynamicActionButton
            label="Create Ticket"
            showIcon
            onClick={() => setIsCreateModalOpen(true)}
            className="h-11!"
          />
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
            { label: 'Total', value: tickets.length, color: theme.text },
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
          <div className="flex h-150 flex-col space-y-3">
            <DynamicTableFilterBar
              fields={[
                {
                  name: 'filter',
                  type: 'tabs',
                  options: [
                    { label: 'All', value: 'all' },
                    { label: 'Open', value: 'open' },
                    { label: 'Resolved', value: 'resolved' },
                  ],
                  onChange: (val) => setFilter(val),
                },
              ]}
            />

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
                    className={`w-full cursor-pointer rounded-md border p-3 text-left transition-all hover:border-emerald-100 ${selectedTicketId === ticket._id ? `${theme.border} ${theme.selectedBg}` : 'border-slate-100 bg-white'}`}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-400">
                        {ticket._id.substring(ticket._id.length - 6).toUpperCase()}
                      </span>
                      <DynamicBadge text={ticket.status} color={getBadgeColor(ticket.status)} />
                    </div>
                    <div className="mb-2 flex items-center gap-2">
                      <Image
                        src={ticket.senderId?.avatar || ''}
                        alt={ticket.senderId?.fullName || 'User'}
                        width={24}
                        height={24}
                        className="rounded-full bg-slate-200 object-cover"
                      />
                      <span className="text-sm font-semibold">
                        {ticket.senderId?.fullName || 'User'}
                      </span>
                      <DynamicBadge
                        text={ticket.senderId?.role || 'User'}
                        color={
                          ticket.senderId?.role === 'instructor'
                            ? '#2563eb'
                            : ticket.senderId?.role === 'admin'
                              ? '#059669'
                              : '#475569'
                        }
                        className="text-[10px]!"
                      />
                    </div>
                    <p className="line-clamp-1 text-sm">{ticket.title}</p>
                    <p className="text-text-secondary mt-1 text-xs">
                      {FormatDateTime(ticket.createdAt)}
                    </p>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Ticket Detail */}
          <div className="dashboard-card-container h-150 lg:col-span-2">
            {isTicketLoading ? (
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-slate-500">Loading ticket details...</p>
              </div>
            ) : selectedTicket ? (
              <div className="flex h-full flex-col">
                {/* Header */}
                <div className="shrink-0 border-b border-slate-100">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold">{selectedTicket.title}</p>
                      <p className="text-text-secondary mt-0.5 text-xs">
                        ID: {selectedTicket._id} • {selectedTicket.category} • Target:{' '}
                        {selectedTicket.targetRole}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <DynamicBadge
                        text={selectedTicket.status}
                        color={getBadgeColor(selectedTicket.status)}
                      />
                      {selectedTicket.status === 'open' &&
                        (role === 'admin' || role === 'instructor') && (
                          <button
                            onClick={() => handleUpdateStatus('resolved')}
                            disabled={isUpdatingStatus}
                            className={`cursor-pointer rounded-sm px-3 py-1.5 text-xs font-semibold transition-colors disabled:opacity-50 ${theme.markResolvedBg} ${theme.text} ${theme.markResolvedHover}`}
                          >
                            Mark Resolved
                          </button>
                        )}
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 space-y-5 overflow-y-auto pt-5 pb-2">
                  {ticketMessages.map((msg: TicketMessage) => {
                    let isMe = false;
                    const senderRole = msg.senderId?.role || msg.sender;

                    if (role === 'admin' && senderRole === 'admin') isMe = true;
                    if (role === 'student' && senderRole === 'student') isMe = true;
                    if (role === 'instructor' && senderRole === 'instructor') isMe = true;

                    if (senderRole === selectedTicket.senderId?.role) {
                      isMe = role === selectedTicket.senderId?.role;
                    }

                    return (
                      <div
                        key={msg._id}
                        className={`flex w-full gap-3 pr-5 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}
                      >
                        {/* Avatar */}
                        <div className="shrink-0 pt-1">
                          {msg.senderId?.avatar ? (
                            <Image
                              src={msg.senderId.avatar}
                              alt="avatar"
                              width={32}
                              height={32}
                              className="h-8 w-8 rounded-full bg-slate-200 object-cover shadow-xs"
                            />
                          ) : (
                            <div
                              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold shadow-xs ${isMe ? `${theme.bg} text-white opacity-80` : 'bg-slate-200 text-slate-600'}`}
                            >
                              {(
                                msg.senderId?.fullName ||
                                msg.senderId?.role ||
                                (msg as unknown as { sender?: string }).sender ||
                                'U'
                              )
                                .charAt(0)
                                .toUpperCase()}
                            </div>
                          )}
                        </div>

                        {/* Bubble */}
                        <div
                          className={`flex max-w-[75%] flex-col gap-1 ${isMe ? 'items-end' : 'items-start'}`}
                        >
                          {/* Sender Name */}
                          {!isMe && (
                            <span className="ml-1 text-xs font-semibold text-slate-500 capitalize">
                              {msg.senderId?.fullName ||
                                msg.senderId?.role ||
                                (msg as unknown as { sender?: string }).sender}
                            </span>
                          )}

                          <div
                            className={`relative rounded-md px-3.5 py-2 text-[14px] leading-relaxed ${isMe ? `${theme.bg} rounded-tr-sm text-white` : 'rounded-tl-sm bg-slate-100 text-slate-700'}`}
                          >
                            <p className="wrap-break-word whitespace-pre-wrap">
                              {msg.message || (msg as unknown as { text?: string }).text}
                            </p>

                            {/* Timestamp */}
                            <p
                              className={`mt-0.5 flex items-center justify-end text-[10px] ${isMe ? 'text-white/70' : 'text-slate-400'}`}
                            >
                              {new Date(msg.createdAt).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} className="h-4" />
                </div>

                {/* Reply Box */}
                {selectedTicket.status === 'open' && (
                  <div className="shrink-0 border-t border-slate-100">
                    <form onSubmit={handleSubmit(handleReply)} className="flex items-start gap-3">
                      <div className="flex-1">
                        <InputField
                          name="reply"
                          control={control}
                          placeholder="Type your reply..."
                        />
                      </div>
                      <DynamicActionButton
                        label="Send"
                        type="submit"
                        disabled={isReplying || !replyValue?.trim()}
                        className="h-11!"
                      />
                    </form>
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
