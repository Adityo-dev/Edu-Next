import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';
import { LogIn } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const LoginLeftPanel = () => {
  return (
    <div className="relative hidden w-[50%] overflow-hidden lg:flex">
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

        <div>
          <DynamicBadge
            text="Welcome Back"
            icon={LogIn}
            size="base"
            color="#34796f"
            className="mb-5 transition-all duration-300"
          />

          <h2 className="mb-5 text-5xl leading-[1.1] font-bold text-white transition-all duration-300">
            Continue Your Learning <br /> <span className="text-warning">Journey.</span>
          </h2>

          <p className="mb-10 max-w-lg text-base leading-relaxed text-white/80 transition-all duration-300">
            Sign in to your account and resume your courses, join live sessions, and track your
            progress all in one place.
          </p>

          {/* Perks */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { emoji: '📚', text: 'Resume learning' },
              { emoji: '🎯', text: 'Track progress' },
              { emoji: '💬', text: 'Community access' },
              { emoji: '🏆', text: 'Earn certificates' },
            ].map((perk, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-sm border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm transition-all duration-300"
              >
                <span className="text-xl">{perk.emoji}</span>
                <span className="text-sm text-white/80">{perk.text}</span>
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
          <p className="text-xs text-white/80">
            <span className="font-semibold text-white">5,000+</span> People already joined
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginLeftPanel;
