import AdminBanner from './_components/AdminBanner/AdminBanner';
import AdminStats from './_components/AdminStats/AdminStats';
import PendingTasks from './_components/PendingTasks/PendingTasks';
import QuickActions from './_components/QuickActions/QuickActions';
import RecentUsers from './_components/RecentUsers/RecentUsers';
import RevenueChart from './_components/RevenueChart/RevenueChart';

const AdminOverviewPage = () => {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto space-y-6">
        <AdminBanner />
        <AdminStats />
        <PendingTasks />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <RevenueChart />
          <div className="space-y-6">
            <RecentUsers />
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverviewPage;
