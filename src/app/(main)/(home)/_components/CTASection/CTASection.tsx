import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';

const CTASection = () => {
  return (
    <section className="mx-auto max-w-400 px-4 py-12">
      <div className="w-full">
        <div className="bg-primary relative overflow-hidden rounded-md px-6 py-16 text-center shadow-md md:px-12 md:py-20">
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
            <span className="bg-warning h-1.5 w-1.5 animate-pulse rounded-full" />
            <span className="text-xs font-semibold text-white">
              5,000+ Students Already Enrolled
            </span>
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Your Future Starts <span className="text-warning italic">Here</span>
            </h2>

            <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/80">
              Join thousands of students on EduNext — learn from verified instructors, earn
              certificates, and unlock new career opportunities from anywhere in Bangladesh.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <DynamicActionButton
                label="Register Now"
                href="/register"
                className="bg-secondary border-none text-white hover:bg-[#d98c0a]"
              />
              <DynamicActionButton
                label="Browse Courses"
                href="/courses"
                variant="outline"
                className="border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
