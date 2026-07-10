import Providers from '@/providers/Providers';
import { baseApi } from '@/services/root/baseApi';
import type { Metadata } from 'next';
import { Inter, Geist_Mono } from 'next/font/google';
import { cache } from 'react';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const SITE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://edunext-six.vercel.app'
    : 'http://localhost:3000';

// Fallback metadata
const FALLBACK = {
  siteName: 'EduNext',
  title: 'EduNext | The Next-Gen Learning Platform',
  description:
    'EduNext is a multi-vendor e-learning marketplace where students can learn skills and industry experts can build, manage, and sell their courses with ease.',
  keywords: [
    'EduNext',
    'E-learning',
    'Online Courses',
    'LMS',
    'Nextjs LMS',
    'Learn Coding',
    'Skill Development',
  ],
  ogImage: '/og-image.jpg',
  favicon: '/favicon.svg',
};

const getPlatformConfig = cache(async () => {
  try {
    const res = await baseApi('/platform-config', {
      revalidate: 3600,
      tags: ['platform-config'],
    });

    if (res?.success && res?.data) {
      return res.data;
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch platform config in RootLayout:', error);
    return null;
  }
});

export async function generateMetadata(): Promise<Metadata> {
  const config = await getPlatformConfig();

  const siteName = config?.siteName || FALLBACK.siteName;
  const description = config?.metaDescription || FALLBACK.description;
  const keywords =
    Array.isArray(config?.metaKeywords) && config.metaKeywords.length > 0
      ? config.metaKeywords
      : FALLBACK.keywords;
  const ogImage = config?.ogImage || FALLBACK.ogImage;
  const favicon = config?.favicon || FALLBACK.favicon;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${siteName} | The Next-Gen Learning Platform`,
      template: `%s | ${siteName}`,
    },
    description,
    keywords,
    authors: [{ name: `${siteName} Team`, url: SITE_URL }],
    creator: `${siteName} Corporation`,
    publisher: `${siteName} Corporation`,

    icons: {
      icon: favicon,
      shortcut: favicon,
      apple: '/apple-touch-icon.png',
    },

    openGraph: {
      type: 'website',
      locale: 'bn_BD',
      url: SITE_URL,
      title: `${siteName} - Learn & Teach on the Next-Gen LMS Platform`,
      description,
      siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${siteName} Platform Preview`,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: `${siteName} - Revolutionizing Online Education`,
      description,
      images: [ogImage],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* 💡 WHY suppressHydrationWarning?
        Prevents Next.js/React hydration mismatch errors caused by browser extensions 
        (like Grammarly, ColorPick, or ad-blockers) injecting dynamic attributes 
        (e.g., 'cz-shortcut-listen') into the HTML before React finishes loading.
      */}
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${geistMono.variable} max-w-screen overflow-x-hidden font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
