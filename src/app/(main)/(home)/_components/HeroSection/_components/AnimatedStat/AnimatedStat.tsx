'use client';

import { useEffect, useRef } from 'react';

const AnimatedStat = ({
  endValue,
  suffix,
  label,
}: {
  endValue: number;
  suffix: string;
  label: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const duration = 2000;
          const increment = endValue / (duration / 16);
          timer = setInterval(() => {
            start += increment;
            if (start >= endValue) {
              if (countRef.current) countRef.current.textContent = endValue.toString();
              clearInterval(timer);
            } else {
              if (countRef.current) countRef.current.textContent = Math.ceil(start).toString();
            }
          }, 16);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      observer.disconnect();
      if (timer) clearInterval(timer);
    };
  }, [endValue]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-lg leading-none font-semibold text-slate-900">
        <span ref={countRef}>0</span>
        {suffix}
      </p>
      <p className="text-text-secondary mt-0.5 text-xs">{label}</p>
    </div>
  );
};

export default AnimatedStat;
