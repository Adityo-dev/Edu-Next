const AdminBanner = () => {
  return (
    <div className="bg-primary relative overflow-hidden rounded-md px-8 py-8">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1.5px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
      <div className="relative z-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-1 text-sm text-white/60">Super Admin</p>
          <h1 className="text-2xl font-black text-white md:text-3xl">EduNext Control Panel</h1>
          <p className="mt-2 text-sm text-white/60">
            <span className="font-bold text-white">18 actions</span> require your attention today.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="rounded-md border border-white/10 bg-white/10 px-5 py-3 text-center backdrop-blur-sm">
            <p className="text-2xl font-black text-white">5,240</p>
            <p className="text-xs text-white/60">Total Users</p>
          </div>
          <div className="rounded-md border border-white/10 bg-white/10 px-5 py-3 text-center backdrop-blur-sm">
            <p className="text-2xl font-black text-yellow-400">৳49.7k</p>
            <p className="text-xs text-white/60">Commission</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBanner;
