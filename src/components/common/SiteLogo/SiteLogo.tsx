import { cn } from '@/lib/utils';
import Image from 'next/image';

interface ISiteLogoProps {
  siteLogo?: string | null;
  siteName?: string | null;
  tagline?: string | null;
  showTagline?: boolean;
  className?: string;
}

export const SiteLogo = ({
  siteLogo,
  siteName,
  tagline,
  showTagline = true,
  className,
}: ISiteLogoProps) => {
  if (siteLogo) {
    return (
      <div
        className={cn(
          'relative flex h-15 w-62 shrink-0 items-center justify-start overflow-hidden',
          className,
        )}
      >
        <Image
          src={siteLogo}
          alt={siteName || 'Logo'}
          fill
          priority
          className="object-contain object-left"
          sizes="(max-width: 768px) 150px, 240px"
        />
      </div>
    );
  }

  return (
    <>
      <div className="bg-primary relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-sm text-white shadow-sm transition-transform duration-300">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-7 w-7"
        >
          <path d="M9.5 2A5 5 0 0 1 12 4a5 5 0 0 1 2.5-2 5 5 0 0 1 5 5 5 5 0 0 1-2.5 4.3" />
          <path d="M5 7.3A5 5 0 0 1 7.5 2" />
          <path d="M12 12v10" />
          <path d="M8 17l4 4 4-4" />
          <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.3" />
        </svg>
        <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-white/20 blur-md" />
      </div>

      <div className="flex flex-col leading-tight">
        <h1 className="line-clamp-1 text-2xl font-black tracking-tighter">
          {siteName ? (
            <span className="text-secondary">{siteName}</span>
          ) : (
            <>
              <span className="text-primary">Edu</span>
              <span className="text-secondary"> Next</span>
            </>
          )}
        </h1>
        {showTagline && (
          <span className="line-clamp-1 text-xs font-semibold tracking-[0.2em] text-slate-400 uppercase">
            {tagline || 'Learn the Future'}
          </span>
        )}
      </div>
    </>
  );
};
