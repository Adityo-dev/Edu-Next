import dynamic from 'next/dynamic';

const SupportTicketsView = dynamic(
  () => import('@/components/dashboard/support/SupportTicketsView'),
  { ssr: false },
);

export const metadata = {
  title: 'Support Tickets - Instructor Dashboard',
};

const InstructorSupportPage = () => {
  return <SupportTicketsView role="instructor" />;
};

export default InstructorSupportPage;
