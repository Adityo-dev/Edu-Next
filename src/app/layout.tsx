import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'EduNext | The Next-Gen Learning Platform',
    template: '%s | EduNext',
  },
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
  authors: [{ name: 'EduNext Team', url: 'https://edunext.com' }],
  creator: 'EduNext Corporation',
  publisher: 'EduNext Corporation',

  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },

  openGraph: {
    type: 'website',
    locale: 'bn_BD',
    url: 'https://edunext.com',
    title: 'EduNext - Learn & Teach on the Next-Gen LMS Platform',
    description: 'Enroll in top-tier courses or start your instructor journey today on EduNext.',
    siteName: 'EduNext',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'EduNext Platform Preview',
      },
    ],
  },
  // twitter summary card
  twitter: {
    card: 'summary_large_image',
    title: 'EduNext - Revolutionizing Online Education',
    description: 'Join the most scalable and modular e-learning platform build with Next.js.',
    images: ['/og-image.jpg'],
  },

  //
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} max-w-screen overflow-x-hidden antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
