import SupportTicketsView from '@/components/dashboard/support/SupportTicketsView';

export const metadata = {
  title: 'Support Tickets - Instructor Dashboard',
};

const InstructorSupportPage = () => {
  return <SupportTicketsView role="instructor" />;
};

export default InstructorSupportPage;
