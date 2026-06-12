'use client';

import { useState } from 'react';
import NewTicketForm from './_components/NewTicketForm/NewTicketForm';
import SupportHeader from './_components/SupportHeader/SupportHeader';
import SupportStats from './_components/SupportStats/SupportStats';
import TicketDetails from './_components/TicketDetails/TicketDetails';
import TicketsList from './_components/TicketsList/TicketsList';

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

type Ticket = (typeof ticketsData)[0];

const SupportPage = () => {
  const [view, setView] = useState<'list' | 'new' | 'detail'>('list');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [form, setForm] = useState({ subject: '', category: '', message: '' });

  const handleSelectTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setView('detail');
  };

  const handleBack = () => setView('list');

  const handleSubmitTicket = () => {
    setForm({ subject: '', category: '', message: '' });
    setView('list');
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <SupportHeader view={view} onNewTicket={() => setView('new')} onBack={handleBack} />

        {/* List View */}
        {view === 'list' && (
          <>
            <SupportStats tickets={ticketsData} />
            <TicketsList tickets={ticketsData} onSelectTicket={handleSelectTicket} />
          </>
        )}

        {/* New Ticket Form */}
        {view === 'new' && (
          <NewTicketForm form={form} onChange={setForm} onSubmit={handleSubmitTicket} />
        )}

        {/* Ticket Detail */}
        {view === 'detail' && selectedTicket && (
          <TicketDetails
            ticket={selectedTicket}
            replyMessage={replyMessage}
            onReplyChange={setReplyMessage}
            onSendReply={() => setReplyMessage('')}
          />
        )}
      </div>
    </div>
  );
};

export default SupportPage;
