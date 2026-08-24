import { Plus, Star } from 'lucide-react';
import Image from 'next/image';
import AnimatedStat from '../AnimatedStat/AnimatedStat';

const SocialProof = () => {
  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16">
      {/* Left Group: Avatars + Rating */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Avatars */}
        <div className="flex -space-x-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-9 w-9 overflow-hidden rounded-full border-2 border-white shadow-sm sm:h-10 sm:w-10 md:h-11 md:w-11"
            >
              <Image
                src={`https://i.pravatar.cc/80?img=${i + 10}`}
                width={44}
                height={44}
                alt="Student"
                unoptimized
                className="h-full w-full object-cover"
              />
            </div>
          ))}
          <div className="bg-primary flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-white shadow-sm sm:h-10 sm:w-10 md:h-11 md:w-11">
            <Plus size={18} />
          </div>
        </div>

        {/* Rating */}
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={16} fill="#f59e0b" color="#f59e0b" />
            ))}
            <span className="ml-2 text-sm font-extrabold text-slate-800 md:text-base">4.9</span>
          </div>
          <p className="text-text-secondary text-xs md:text-sm">Trusted by 5K+ students</p>
        </div>
      </div>

      <div className="hidden h-10 w-px bg-slate-200 md:block" />

      {/* Right Group: Quick stats */}
      <div className="flex items-center gap-6 sm:gap-10 md:gap-14">
        <AnimatedStat endValue={120} suffix="+" label="Courses" />
        <AnimatedStat endValue={50} suffix="+" label="Instructors" />
        <AnimatedStat endValue={12} suffix="K+" label="Students" />
      </div>
    </div>
  );
};

export default SocialProof;
