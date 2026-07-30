import dynamic from 'next/dynamic';

const SupportTicketsView = dynamic(
  () => import('@/components/dashboard/support/SupportTicketsView'),
  { ssr: false },
);

export const metadata = {
  title: 'Support Tickets - Student Dashboard',
};

const StudentSupportPage = () => {
  return <SupportTicketsView role="student" />;
};

export default StudentSupportPage;
