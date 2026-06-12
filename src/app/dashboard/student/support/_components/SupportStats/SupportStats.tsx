'use client';

interface Ticket {
  id: string;
  subject: string;
  category: string;
  status: string;
  date: string;
  lastReply: string;
  messages: { sender: string; text: string; time: string }[];
}

interface SupportStatsProps {
  tickets: Ticket[];
}

const SupportStats = ({ tickets }: SupportStatsProps) => {
  const stats = [
    { label: 'Total Tickets', value: tickets.length },
    { label: 'Open', value: tickets.filter((t) => t.status === 'open').length },
    { label: 'Resolved', value: tickets.filter((t) => t.status === 'resolved').length },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat, i) => (
        <div key={i} className="dashboard-card-container text-center">
          <p className="text-primary text-3xl font-black">{stat.value}</p>
          <p className="text-text-secondary text-sm">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default SupportStats;
