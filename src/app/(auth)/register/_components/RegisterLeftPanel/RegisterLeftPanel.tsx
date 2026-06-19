'use client';

import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';
import { GraduationCap, Video } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type Role = 'student' | 'instructor';

const perksMap = {
  student: [
    { emoji: '🎓', text: 'Earn verified certificates' },
    { emoji: '📱', text: 'Learn on any device' },
    { emoji: '🎥', text: 'Join live sessions' },
    { emoji: '🔓', text: 'Free course previews' },
  ],
  instructor: [
    { emoji: '💰', text: 'Earn from every sale' },
    { emoji: '👥', text: 'Reach 5,000+ students' },
    { emoji: '📡', text: 'Host live classes' },
    { emoji: '🏦', text: 'Withdraw via bKash' },
  ],
};

const RegisterLeftPanel = ({ role }: { role: Role }) => {
  const perks = perksMap[role];

  return (
    <div className="relative hidden w-[45%] overflow-hidden lg:flex">
      <div className="absolute inset-0 bg-[#0f1a19]" />
      <div className="from-primary/40 to-secondary/20 absolute inset-0 bg-linear-to-br via-transparent" />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1.5px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
      <div className="bg-primary/30 absolute -top-40 -left-40 h-80 w-80 rounded-full blur-3xl" />
      <div className="bg-secondary/20 absolute -right-40 -bottom-40 h-80 w-80 rounded-full blur-3xl" />

      <div className="relative z-10 flex w-full flex-col justify-between p-14">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-white/10 backdrop-blur-sm">
            <span className="text-lg font-black text-white">E</span>
          </div>
          <span className="text-xl font-black text-white">
            Edu<span className="text-warning">Next</span>
          </span>
        </Link>

        {/* Center — role change হলে instant update হয় */}
        <div>
          <DynamicBadge
            text={role === 'student' ? 'Joining as Student' : 'Joining as Instructor'}
            icon={role === 'student' ? GraduationCap : Video}
            size="base"
            color={role === 'student' ? '#34796f' : '#e96600'}
            className="mb-5 transition-all duration-300"
          />

          <h2 className="mb-5 text-5xl leading-[1.1] font-black text-white transition-all duration-300">
            {role === 'student' ? (
              <>
                Start Your Learning <br /> <span className="text-warning">Journey.</span>
              </>
            ) : (
              <>
                Share Your Expertise <br /> <span className="text-warning"> & Earn.</span>
              </>
            )}
          </h2>

          <p className="mb-10 max-w-md text-sm leading-relaxed text-white/50 transition-all duration-300">
            {role === 'student'
              ? 'Create your free account and get instant access to 120+ courses taught by verified instructors in Bangladesh.'
              : 'Apply as an instructor, get verified by our admin, and start earning from thousands of eager learners.'}
          </p>

          {/* Perks */}
          <div className="grid grid-cols-2 gap-3">
            {perks.map((perk, i) => (
              <div
                key={`${role}-${i}`}
                className="flex items-center gap-3 rounded-sm border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm transition-all duration-300"
              >
                <span className="text-xl">{perk.emoji}</span>
                <span className="text-xs font-medium text-white/70">{perk.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Image
                key={i}
                src={`https://i.pravatar.cc/150?u=reg${i}`}
                alt="User"
                width={32}
                height={32}
                className="rounded-full border-2 border-[#0f1a19]"
              />
            ))}
          </div>
          <p className="text-xs text-white/40">
            <span className="font-bold text-white">5,000+</span> people already joined
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterLeftPanel;
