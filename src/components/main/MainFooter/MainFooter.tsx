import { Facebook, Github, Linkedin, Mail, MapPin, Phone, Youtube } from 'lucide-react';
import Link from 'next/link';
import { baseApi } from '@/services/root/baseApi';
import { SiteLogo } from '@/components/shared/SiteLogo/SiteLogo';

const exploreLinks = [
  { name: 'All Courses', href: '/courses' },
  { name: 'Our Blog', href: '/blog' },
  { name: 'About Us', href: '/about' },
  { name: 'Why Choose EduNext', href: '/about#why-choose-us' },
  { name: 'Our Journey', href: '/about#journey' },
  { name: 'Contact Us', href: '/contact' },
];

const quickLinks = [
  { name: 'Student Login', href: '/login' },
  { name: 'Become an Instructor', href: '/register' },
  { name: 'Help Center & FAQ', href: '/#faq' },
  { name: 'My Wishlist', href: '/wishlist' },
  { name: 'Terms & Conditions', href: '/terms' },
  { name: 'Privacy Policy', href: '/privacy-policy' },
];

const MainFooter = async () => {
  let config = null;
  try {
    const res = await baseApi('/platform-config', {
      revalidate: 3600,
      tags: ['platform-config'],
    });
    if (res?.success) config = res.data;
  } catch (error) {
    console.error('Failed to fetch platform config in MainFooter:', error);
  }

  const siteLogo = config?.siteLogo;
  const siteName = config?.siteName || 'Edu Next';
  const tagline =
    config?.tagline ||
    'Our e-learning platform offers expertly crafted courses to help you gain skills and achieve.';
  const contactPhone = config?.contactPhone || '+021-6516-1124';
  const supportEmail = config?.supportEmail || 'educ@gmail.com';
  const socialLinks = config?.socialLinks || {};
  const copyrightText =
    config?.copyrightText || `© ${new Date().getFullYear()} ${siteName}. All rights reserved.`;

  const hasSocialLinks = !!(
    socialLinks?.facebook ||
    socialLinks?.youtube ||
    socialLinks?.linkedin ||
    socialLinks?.github
  );

  return (
    <footer
      className="pt-16 pb-8"
      style={{ background: 'linear-gradient(160deg, #fdf9f0 0%, #f5f8f5 50%, #eef5f0 100%)' }}
    >
      <div className="mx-auto max-w-400 px-4">
        {/* Top Section: Logo and Links */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo & Info */}
          <div className="max-w-xs">
            <div className="mb-4 flex items-center">
              <SiteLogo
                siteLogo={siteLogo}
                siteName={siteName}
                showTagline={false}
                className="h-16 w-60"
              />
            </div>
            <p className="text-text-secondary line-clamp-3 text-sm leading-relaxed">{tagline}</p>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="mb-5 text-lg font-semibold tracking-tight">Explore</h4>
            <ul className="text-text-secondary space-y-3 text-sm">
              {exploreLinks.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-5 text-lg font-semibold tracking-tight">Quick Links</h4>
            <ul className="text-text-secondary space-y-3 text-sm">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-5 text-lg font-semibold tracking-tight">Contact</h4>
            <ul className="text-text-secondary space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary" />
                <a href={`tel:${contactPhone}`} className="hover:text-primary transition-colors">
                  {contactPhone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary" />
                <a href={`mailto:${supportEmail}`} className="hover:text-primary transition-colors">
                  {supportEmail}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-primary shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Social Media Bar */}
        {hasSocialLinks && (
          <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-slate-200/60 pt-8 md:flex-row">
            <h3 className="text-lg font-semibold tracking-tight">Support for Social Medias :</h3>

            <div className="flex items-center gap-4">
              {/* Facebook */}
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-secondary flex h-10 w-10 items-center justify-center rounded-full text-white transition-transform hover:-translate-y-1"
                >
                  <Facebook size={18} fill="currentColor" strokeWidth={0} />
                </a>
              )}
              {/* YouTube */}
              {socialLinks.youtube && (
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-primary flex h-10 w-10 items-center justify-center rounded-full text-white transition-transform hover:-translate-y-1"
                >
                  <Youtube size={18} fill="currentColor" strokeWidth={0} />
                </a>
              )}
              {/* Linkedin */}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-primary flex h-10 w-10 items-center justify-center rounded-full text-white transition-transform hover:-translate-y-1"
                >
                  <Linkedin size={18} fill="currentColor" strokeWidth={0} />
                </a>
              )}
              {/* Github */}
              {socialLinks.github && (
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-primary flex h-10 w-10 items-center justify-center rounded-full text-white transition-transform hover:-translate-y-1"
                >
                  <Github size={18} fill="currentColor" strokeWidth={0} />
                </a>
              )}
            </div>
          </div>
        )}

        {/* Copyright Section */}
        <div className="text-text-secondary mt-8 flex flex-col items-center justify-center gap-4 border-t border-slate-200/60 pt-8 text-center text-sm md:flex-row md:justify-between">
          <p>{copyrightText}</p>
          <p>
            Created by{' '}
            <a
              href="https://www.facebook.com/koushik.barmon.79"
              target="_blank"
              rel="noreferrer"
              className="text-primary font-semibold hover:underline"
            >
              Koushik Barmon
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
