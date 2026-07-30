import SupportTicketsWrapper from '@/components/dashboard/support/SupportTicketsWrapper';

export const metadata = {
  title: 'Support Tickets - Instructor Dashboard',
};

const InstructorSupportPage = () => {
  return <SupportTicketsWrapper role="instructor" />;
};

export default InstructorSupportPage;
