import dynamic from 'next/dynamic';

const SupportTicketsView = dynamic(
  () => import('@/components/dashboard/support/SupportTicketsView'),
  { ssr: false },
);

const SupportTicketsPage = () => {
  return <SupportTicketsView role="admin" />;
};

export default SupportTicketsPage;
