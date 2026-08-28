import Image from 'next/image';

const stripImages = [
  {
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80',
    alt: 'Students collaborating',
    height: 180,
    marginTop: 32,
    rotate: '-2.5deg',
  },
  {
    src: '/heroImage2.jpg',
    alt: 'Instructor teaching',
    height: 230,
    marginTop: 0,
    rotate: '1.5deg',
  },
  {
    src: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=400&q=80',
    alt: 'Online course',
    height: 205,
    marginTop: 16,
    rotate: '-1deg',
  },
  { src: '/heroImage4.jpg', alt: 'EduNext student', height: 220, marginTop: 10, rotate: '2deg' },
  {
    src: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&q=80',
    alt: 'Learning skills',
    height: 190,
    marginTop: 24,
    rotate: '-1.5deg',
  },
  { src: '/heroImage1.jpg', alt: 'Certificate course', height: 225, marginTop: 0, rotate: '1deg' },
  {
    src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80',
    alt: 'Tech skills',
    height: 180,
    marginTop: 40,
    rotate: '-2deg',
  },
];

const PhotoMarquee = () => {
  return (
    <div className="relative z-10 mt-8 w-full overflow-hidden">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 md:w-40"
        style={{ background: 'linear-gradient(to right, #fdf9f0, transparent)' }}
      />

      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 md:w-40"
        style={{ background: 'linear-gradient(to left, #eef5f0, transparent)' }}
      />

      <div className="group">
        <div className="flex w-max" style={{ animation: 'marqueeScroll 35s linear infinite' }}>
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex shrink-0 gap-3 pr-3 md:gap-4 md:pr-4">
              {stripImages.map((img, idx) => (
                <div
                  key={idx}
                  className="relative shrink-0 overflow-hidden rounded-xl"
                  style={{
                    width: '160px',
                    height: `${img.height}px`,
                    marginTop: `${img.marginTop}px`,
                    transform: `rotate(${img.rotate})`,
                  }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="160px"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-black/10 ring-inset" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Marquee keyframe + pause-on-hover ── */}
      <style>{`
        @keyframes marqueeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        .group:hover > div {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default PhotoMarquee;
