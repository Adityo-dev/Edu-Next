'use client';

import { useEffect, useRef, useState } from 'react';

// কাউন্টার ডেটা স্ট্রাকচার
const statsData = [
  { id: 1, target: 500, suffix: 'k+', label: 'Students' },
  { id: 2, target: 200, suffix: 'k+', label: 'Total Courses' },
  { id: 3, target: 150, suffix: '+', label: 'Teachers' },
  { id: 4, target: 80, suffix: '+', label: 'Worldwide Branches' },
];

interface CounterItemProps {
  target: number;
  suffix: string;
  label: string;
  shouldStart: boolean;
}

const CounterItem = ({ target, suffix, label, shouldStart }: CounterItemProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let start = 0;
    const duration = 2000; // ২ সেকেন্ডের মধ্যে অ্যানিমেশন শেষ হবে
    const increment = Math.ceil(target / (duration / 16)); // ~60fps ফ্রেম রেট হিসেবে

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [shouldStart, target]);

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h2 className="text-primary mb-2 text-4xl font-black tracking-tight md:text-5xl">
        {count}
        {suffix}
      </h2>
      <p className="text-text-secondary text-sm font-medium tracking-wider uppercase">{label}</p>
    </div>
  );
};

const StatsCounter = () => {
  const [hasIntersected, setHasIntersected] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasIntersected(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-teal-accent/80 border-subtle my-10 border-y px-6 py-16">
      <div className="mx-auto max-w-400">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {statsData.map((stat) => (
            <CounterItem
              key={stat.id}
              target={stat.target}
              suffix={stat.suffix}
              label={stat.label}
              shouldStart={hasIntersected}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
