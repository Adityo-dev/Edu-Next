const CTASection = () => {
  return (
    <section className="px-6 pt-10 pb-24">
      <div className="mx-auto max-w-400">
        <div className="bg-primary relative overflow-hidden rounded-md px-8 py-24 text-center shadow-sm">
          {/* Background Dot Grid */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(#ffffff 1.5px, transparent 1px)`,
              backgroundSize: '28px 28px',
            }}
          />

          {/* Top Left Glow */}
          <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-white opacity-5 blur-3xl" />

          {/* Bottom Right Glow */}
          <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-white opacity-5 blur-3xl" />

          {/* Right Side Curve Lines (SVG) */}
          <div className="absolute -right-12.5 -bottom-12.5 opacity-10">
            <svg
              width="400"
              height="400"
              viewBox="0 0 400 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="200" cy="200" r="198" stroke="#ffffff" strokeWidth="2" />
              <circle cx="200" cy="200" r="160" stroke="#ffffff" strokeWidth="2" />
              <circle cx="200" cy="200" r="120" stroke="#ffffff" strokeWidth="2" />
              <circle cx="200" cy="200" r="80" stroke="#ffffff" strokeWidth="2" />
            </svg>
          </div>

          {/* Badge */}
          <div className="relative z-10 mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-yellow-400" />
            <span className="text-sm font-medium text-white">5,000+ Students Already Enrolled</span>
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              Your Future Starts <span className="text-yellow-400">Here</span>
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
              Join thousands of students on EduNext — learn from verified instructors, earn
              certificates, and unlock new career opportunities from anywhere in Bangladesh.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <button className="bg-secondary cursor-pointer rounded-sm px-10 py-4 text-lg font-semibold text-white shadow-sm shadow-orange-300/30 transition-all active:scale-95">
                Register Now
              </button>
              <button className="cursor-pointer rounded-sm border border-white/30 bg-white/10 px-10 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 active:scale-95">
                Browse Courses
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
