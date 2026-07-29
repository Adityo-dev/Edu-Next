import SupportTicketsView from '@/components/dashboard/support/SupportTicketsView';

export const metadata = {
  title: 'Support Tickets - Student Dashboard',
};

const StudentSupportPage = () => {
  return <SupportTicketsView role="student" />;
};

export default StudentSupportPage;
