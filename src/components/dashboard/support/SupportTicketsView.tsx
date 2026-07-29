/* eslint-disable react-hooks/incompatible-library */
'use client';

import DynamicTableFilterBar from '@/components/dashboard/DynamicTableFilterBar/DynamicTableFilterBar';
import InputField from '@/components/dashboard/Fields/InputField/InputField';
import { useModal } from '@/context/ModalContext';
import { getSocket } from '@/lib/socket';
import {
  TicketMessage,
  useGetTicketDetailsQuery,
  useGetTicketsQuery,
  useReplyToTicketMutation,
  useUpdateTicketStatusMutation,
} from '@/redux/features/tickets/ticketsApi';
import { FormatDateTime } from '@/utils/formatDateTime';
import { ChevronLeft, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import DynamicActionButton from '../DynamicActionButton/DynamicActionButton';
import DynamicBadge from '../DynamicBadge/DynamicBadge';
import SectionHeader from '../SectionHeader/SectionHeader';

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
    switch (status?.toLowerCase()) {
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

  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return '#ef4444';
      case 'medium':
        return '#f97316';
      case 'low':
        return '#3b82f6';
      default:
        return '#64748b';
    }
  };

  const [filter, setFilter] = useState('all');
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  const { openModal } = useModal();

  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: { reply: '' },
  });

  const replyValue = watch('reply');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Queries
  const {
    data: ticketsData,
    isLoading: isTicketsLoading,
    refetch: refetchTickets,
  } = useGetTicketsQuery();
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

      const handleNewTicket = () => {
        refetchTickets();
      };

      activeSocket.on('newTicketCreated', handleNewTicket);

      if (selectedTicketId) {
        activeSocket.emit('joinTicket', selectedTicketId);

        const handleNewMessage = () => {
          refetchTicketDetails();
          refetchTickets();
        };

        const handleStatusUpdated = () => {
          refetchTicketDetails();
          refetchTickets();
        };

        activeSocket.on('newMessage', handleNewMessage);
        activeSocket.on('ticketStatusUpdated', handleStatusUpdated);

        cleanupFn = () => {
          activeSocket?.off('newMessage', handleNewMessage);
          activeSocket?.off('ticketStatusUpdated', handleStatusUpdated);
          activeSocket?.off('newTicketCreated', handleNewTicket);
        };
      } else {
        cleanupFn = () => {
          activeSocket?.off('newTicketCreated', handleNewTicket);
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

  // Refetch tickets list when a ticket is selected so the red dot clears
  useEffect(() => {
    if (selectedTicketId) {
      refetchTickets();
    }
  }, [selectedTicketId, refetchTickets]);

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
            label="New Ticket"
            onClick={() =>
              openModal({
                view: 'CREATE_TICKET',
                data: { role },
                title: 'Create Support Ticket',
              })
            }
            showIcon
            className="h-10!"
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
          <div
            className={`h-150 flex-col space-y-3 ${selectedTicketId ? 'hidden lg:flex' : 'flex'}`}
          >
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

            <div className="custom-scrollbar flex-1 space-y-3 overflow-y-auto pr-2">
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
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Image
                          src={ticket.senderId?.avatar || ''}
                          alt={ticket.senderId?.fullName || 'User'}
                          width={24}
                          height={24}
                          className="rounded-full bg-slate-200 object-cover"
                        />
                        <div className="flex flex-col">
                          <span className="text-sm leading-none font-semibold">
                            {ticket.senderId?.fullName || 'User'}
                          </span>
                          <span className="mt-1 text-xs font-semibold text-slate-400">
                            #{ticket._id.substring(ticket._id.length - 6).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {ticket.priority && (
                          <DynamicBadge
                            text={ticket.priority}
                            color={getPriorityColor(ticket.priority)}
                          />
                        )}
                        <DynamicBadge text={ticket.status} color={getBadgeColor(ticket.status)} />
                        {((isStudent && ticket.hasUnreadSender === true) ||
                          ((role === 'admin' || role === 'instructor') &&
                            ticket.hasUnreadTarget === true)) &&
                          ticket._id !== selectedTicketId && (
                            <span className="ml-0.5 inline-block h-2 w-2 rounded-full bg-red-500"></span>
                          )}
                      </div>
                    </div>

                    <p className="mb-1 line-clamp-2 text-xs">{ticket.title}</p>

                    <div className="flex items-center justify-between">
                      <p className="text-text-secondary text-xs">
                        {FormatDateTime(ticket.createdAt)}
                      </p>
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
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Ticket Detail */}
          <div
            className={`dashboard-card-container h-150 lg:col-span-2 ${!selectedTicketId ? 'hidden lg:flex' : 'flex'} flex-col`}
          >
            {isTicketLoading ? (
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-slate-500">Loading ticket details...</p>
              </div>
            ) : selectedTicket ? (
              <div className="flex h-full flex-col">
                {/* Header */}
                <div className="shrink-0 border-b border-slate-100 pb-3">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 items-start gap-2">
                      <button
                        onClick={() => setSelectedTicketId(null)}
                        className="mt-0.5 shrink-0 rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 lg:hidden"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <div className="min-w-0">
                        <p className="font-semibold wrap-break-word">{selectedTicket.title}</p>
                        <p className="text-text-secondary mt-0.5 text-xs wrap-break-word">
                          ID: {selectedTicket._id} • {selectedTicket.category} • Target:{' '}
                          {selectedTicket.targetRole}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 pl-8 sm:pl-0">
                      {selectedTicket.priority && (
                        <DynamicBadge
                          text={selectedTicket.priority}
                          color={getPriorityColor(selectedTicket.priority)}
                        />
                      )}
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
                <div className="custom-scrollbar flex-1 space-y-5 overflow-y-auto pt-4 pr-2 pb-2">
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
                        className={`flex w-full gap-3 pr-3 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}
                      >
                        {/* Avatar */}
                        <div className="shrink-0 pt-1">
                          {msg.senderId?.avatar ? (
                            <Image
                              src={msg.senderId.avatar}
                              alt="avatar"
                              width={32}
                              height={32}
                              className="h-8 w-8 rounded-full bg-slate-200 object-cover"
                            />
                          ) : (
                            <div
                              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${isMe ? `${theme.bg} text-white opacity-80` : 'bg-slate-200'}`}
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
                          className={`flex max-w-[85%] flex-col gap-1 ${isMe ? 'items-end' : 'items-start'}`}
                        >
                          {/* Top Row: Sender Name & Date/Time */}
                          <div className={`flex items-baseline gap-2 ${isMe ? 'mr-1' : 'ml-1'}`}>
                            {!isMe && (
                              <span className="text-xs font-semibold tracking-wide capitalize">
                                {msg.senderId?.fullName ||
                                  msg.senderId?.role ||
                                  (msg as unknown as { sender?: string }).sender}
                              </span>
                            )}
                            {msg.createdAt && (
                              <span className="text-text-secondary/80 text-[10px] sm:text-xs">
                                {FormatDateTime(msg.createdAt)}
                              </span>
                            )}
                          </div>

                          {/* Text Content */}
                          <div
                            className={`relative rounded-sm px-2.5 py-0.75 text-xs leading-relaxed sm:text-sm ${isMe ? `bg-primary rounded-tr-xs text-white` : 'bg-primary-dark/70 rounded-tl-xs text-white'}`}
                          >
                            <p className="wrap-break-word whitespace-pre-wrap">
                              {msg.message || (msg as unknown as { text?: string }).text}
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
                  <div className="shrink-0 border-t border-slate-100 pt-3">
                    <form onSubmit={handleSubmit(handleReply)} className="flex items-start gap-2">
                      <div className="min-w-0 flex-1">
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
                        className="h-11! shrink-0"
                      />
                    </form>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center py-20 text-center">
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
}
