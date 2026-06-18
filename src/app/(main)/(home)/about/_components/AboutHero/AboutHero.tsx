'use client';

import Image from 'next/image';

const AboutHero = () => {
  return (
    <section className="px-6 py-36">
      <div className="mx-auto max-w-400">
        {/* --- Top Content Section --- */}
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <div className="relative mb-6 inline-block">
            <h1 className="text-4xl font-black tracking-tight md:text-6xl">
              About Our <span className="text-secondary">Educ</span>
            </h1>
            {/* Spark/Star decorative element on the right side of Educ */}
            <div className="text-secondary absolute -top-2 -right-8">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>

          <p className="text-text-secondary mx-auto mb-8 max-w-2xl text-base leading-relaxed md:text-lg">
            Our platform makes education flexible and convenient, empowering industry professionals
            and students worldwide by providing high-quality courses built for global success.
          </p>

          <button className="bg-primary text-pure-white cursor-pointer rounded-sm px-10 py-4 font-bold shadow-2xl shadow-emerald-200 transition-all hover:bg-[#2a6159] active:scale-95">
            Explore Course
          </button>
        </div>

        {/* --- Bottom Image Grid Section (Pixel Perfect Layout) --- */}
        <div className="relative mx-auto grid max-w-400 grid-cols-1 items-stretch gap-6 md:grid-cols-3">
          {/* Column 1: Left Big Image with Small Overlay Avatar */}
          <div className="group bg-pure-white relative aspect-4/3 rounded-md shadow-sm md:aspect-auto">
            <Image
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800"
              alt="Student working on laptop"
              fill
              className="object-cover transition-transform duration-500"
            />

            {/* Small Overlapping Circle Avatar (Top Right of Column 1) */}
            <div className="bg-pure-white absolute -top-6 -right-4 z-20 hidden h-20 w-20 overflow-hidden rounded-full border-6 border-white lg:block">
              <Image
                src="https://i.pravatar.cc/150?u=about1"
                alt="Instructor thumbnail"
                width={80}
                height={80}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Column 2: Middle Big Image */}
          <div className="group bg-pure-white relative aspect-4/3 min-h-87.5 overflow-hidden rounded-md shadow-sm md:aspect-auto md:min-h-112.5">
            <Image
              src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1000"
              alt="Girl studying with headphones"
              fill
              className="object-cover transition-transform duration-500"
            />
          </div>

          {/* Column 3: Right Stacked Images (2 smaller rows) */}
          <div className="flex flex-col justify-between gap-6">
            {/* Top Row Image */}
            <div className="group bg-pure-white relative h-53.75 overflow-hidden rounded-md shadow-sm">
              <Image
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800"
                alt="Kid online learning"
                fill
                className="object-cover transition-transform duration-500"
              />
            </div>
            {/* Bottom Row Image */}
            <div className="group bg-pure-white relative h-53.75 overflow-hidden rounded-md shadow-sm">
              <Image
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000"
                alt="Student coding on desk"
                fill
                className="object-cover transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
