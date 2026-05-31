const WelcomeSection = () => {
  return (
    <div className="bg-primary relative overflow-hidden rounded-md px-4 py-6 sm:px-8 sm:py-10">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1.5px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
      <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-white/5 blur-3xl" />
      <div className="relative z-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-1 text-sm text-white/60">Welcome back 👋</p>
          <h1 className="text-2xl font-black text-white md:text-3xl">Md. Rafiqul Islam</h1>
          <p className="mt-2 text-sm text-white/60">
            You have <span className="font-bold text-white">3 active courses</span> and{' '}
            <span className="font-bold text-white">1 pending approval.</span>
          </p>
        </div>
        <div className="flex gap-4">
          <div className="w-full rounded-md border border-white/10 bg-white/10 px-5 py-3 text-center backdrop-blur-sm sm:w-auto">
            <p className="text-warning text-2xl font-black">4.9</p>
            <p className="text-xs text-white/60">Avg Rating</p>
          </div>
          <div className="w-full rounded-md border border-white/10 bg-white/10 px-5 py-3 text-center backdrop-blur-sm sm:w-auto">
            <p className="text-2xl font-black text-white">8</p>
            <p className="text-xs text-white/60">Courses</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
