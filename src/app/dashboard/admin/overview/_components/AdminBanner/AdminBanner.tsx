const AdminBanner = () => {
  return (
    <div className="bg-primary dashboard-card-container p-4 sm:p-6">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1.5px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
      <div className="relative z-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-subtle mb-1 text-sm">Super Admin</p>
          <h1 className="text-2xl font-black text-white md:text-3xl">EduNext Control Panel</h1>
          <p className="text-subtle mt-2 text-sm">
            <span className="font-semibold text-white">18 actions</span> require your attention
            today.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="w-full rounded-sm border border-white/10 bg-white/10 px-6 py-2.5 text-center backdrop-blur-sm sm:w-auto">
            <p className="text-2xl font-black text-white">5,240</p>
            <p className="text-subtle text-xs">Total Users</p>
          </div>
          <div className="w-full rounded-sm border border-white/10 bg-white/10 px-6 py-2.5 text-center backdrop-blur-sm sm:w-auto">
            <p className="text-warning text-2xl font-black">৳49.7k</p>
            <p className="text-subtle text-xs">Commission</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBanner;
