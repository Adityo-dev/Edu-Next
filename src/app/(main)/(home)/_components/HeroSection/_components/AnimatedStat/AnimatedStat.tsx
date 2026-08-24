'use client';

import { useEffect, useRef, useState } from 'react';

const AnimatedStat = ({
  endValue,
  suffix,
  label,
}: {
  endValue: number;
  suffix: string;
  label: string;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const duration = 2000;
          const increment = endValue / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= endValue) {
              setCount(endValue);
              clearInterval(timer);
            } else {
              setCount(Math.ceil(start));
            }
          }, 16);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [endValue]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-lg leading-none font-semibold text-slate-900">
        {count}
        {suffix}
      </p>
      <p className="text-text-secondary mt-0.5 text-xs">{label}</p>
    </div>
  );
};

export default AnimatedStat;
