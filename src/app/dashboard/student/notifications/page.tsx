import Notifications from '@/components/dashboard/Notifications/Notifications';
import { Suspense } from 'react';

const StudentNotificationsPage = () => {
  return (
    <Suspense fallback={<div className="h-64 animate-pulse rounded-md bg-slate-50" />}>
      <Notifications />
    </Suspense>
  );
};

export default StudentNotificationsPage;
