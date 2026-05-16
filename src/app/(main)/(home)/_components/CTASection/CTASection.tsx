const CTASection = () => {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-400">
        {/* Main Banner Container */}
        <div className="relative overflow-hidden rounded-md bg-linear-to-r from-[#ECF7F7] via-[#F4F9F9] to-[#FEFBF6] px-8 py-20 text-center shadow-xs">
          {/* Left Side Glowing Orbs  */}
          <div className="absolute top-1/4 left-10 h-6 w-6 rounded-full bg-white opacity-60 blur-xs" />
          <div className="absolute top-1/2 left-24 h-12 w-12 rounded-full bg-white opacity-40 blur-md" />
          <div className="absolute bottom-1/4 left-16 h-4 w-4 rounded-full bg-white opacity-50 blur-xs" />

          {/* Right Side Curve Lines (SVG) */}
          <div className="absolute -right-12.5 -bottom-12.5 opacity-10">
            <svg
              width="400"
              height="400"
              viewBox="0 0 400 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="200" cy="200" r="198" stroke="#34796F" strokeWidth="2" />
              <circle cx="200" cy="200" r="160" stroke="#34796F" strokeWidth="2" />
              <circle cx="200" cy="200" r="120" stroke="#34796F" strokeWidth="2" />
              <circle cx="200" cy="200" r="80" stroke="#34796F" strokeWidth="2" />
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-4xl font-bold tracking-tight text-[#2D3134] md:text-5xl lg:text-6xl">
              Join the E-Learning <span className="text-[#34796F]">Revolution</span>
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-500">
              Transform the way you learn with flexible, accessible, and engaging online courses
              designed for your success.
            </p>

            <button className="mt-10 transform rounded-xl bg-[#F59E0B] px-10 py-4 text-lg font-bold text-white shadow-lg shadow-orange-100 transition-all hover:scale-105 hover:bg-[#d98c0a] active:scale-95">
              Join Our Course
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
