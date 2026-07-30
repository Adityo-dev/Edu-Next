'use client';

import dynamic from 'next/dynamic';

const SupportTicketsView = dynamic(() => import('./SupportTicketsView'), { ssr: false });

export default function SupportTicketsWrapper(props: { role: 'student' | 'instructor' | 'admin' }) {
  return <SupportTicketsView {...props} />;
}
