import AdminBanner from './_components/AdminBanner/AdminBanner';
import AdminStats from './_components/AdminStats/AdminStats';
import PendingTasks from './_components/PendingTasks/PendingTasks';
import QuickActions from './_components/QuickActions/QuickActions';
import RecentUsers from './_components/RecentUsers/RecentUsers';
import RevenueChart from './_components/RevenueChart/RevenueChart';

const AdminOverviewPage = () => {
  return (
    <div className="space-y-5">
      <AdminBanner />
      <AdminStats />
      <PendingTasks />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <RevenueChart />
        <div className="space-y-5">
          <RecentUsers />
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default AdminOverviewPage;
