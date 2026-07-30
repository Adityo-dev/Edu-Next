'use client';

const MissionVisionQuote = () => {
  return (
    <div className="mx-auto max-w-[1600px] px-6 pt-16 pb-8 text-center">
      <div className="relative mx-auto max-w-4xl">
        {/* Left Quote Icon Decorator */}
        <span className="text-text-placeholder/30 absolute -top-6 left-0 font-serif text-6xl select-none">
          “
        </span>

        <p className="text-text-secondary px-8 text-base leading-relaxed font-medium italic md:text-lg">
          Our journey began with a vision to make education accessible to everyone, everywhere. From
          humble beginnings, we have grown into a platform that empowers learners across the globe.
          By combining innovation with expert-driven content, we aim to transform the way people
          learn. Every course we offer is designed to inspire, educate, and uplift. Our story is one
          of passion, purpose, and a commitment to making a difference.
        </p>

        {/* Right Quote Icon Decorator */}
        <span className="text-text-placeholder/30 absolute right-0 -bottom-12 font-serif text-6xl select-none">
          ”
        </span>
      </div>
    </div>
  );
};

export default MissionVisionQuote;
