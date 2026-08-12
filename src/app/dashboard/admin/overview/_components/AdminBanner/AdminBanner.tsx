'use client';

import AdminBannerSkeleton from '@/components/dashboard/Skeletons/admin/AdminBannerSkeleton';
import { useGetAdminWelcomeStatsQuery } from '@/redux/features/overview/adminOverview.api';

const AdminBanner = () => {
  const { data, isLoading } = useGetAdminWelcomeStatsQuery();
  const stats = data?.data;

  if (isLoading) return <AdminBannerSkeleton />;

  const adminName = stats?.adminName || 'Admin';
  const totalActions = stats?.totalActions || 0;
  const totalUsers = stats?.totalUsers || 0;
  const totalCommission = stats?.totalCommission || 0;
  return (
    <div className="bg-primary dashboard-card-container">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1.5px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
      <div className="relative z-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-subtle mb-1 text-sm">{adminName}</p>
          <h1 className="text-2xl font-bold text-white md:text-3xl">EduNext Control Panel</h1>
          <p className="text-subtle mt-2 text-sm">
            <span className="font-semibold text-white">{totalActions} actions</span> require your
            attention today.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="w-full rounded-sm border border-white/10 bg-white/10 px-6 py-2.5 text-center backdrop-blur-sm sm:w-auto">
            <p className="text-2xl font-bold text-white">{totalUsers.toLocaleString()}</p>
            <p className="text-subtle text-xs">Total Users</p>
          </div>
          <div className="w-full rounded-sm border border-white/10 bg-white/10 px-6 py-2.5 text-center backdrop-blur-sm sm:w-auto">
            <p className="text-warning text-2xl font-semibold">
              ৳
              {totalCommission.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })}
            </p>
            <p className="text-subtle text-xs">Commission</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBanner;
