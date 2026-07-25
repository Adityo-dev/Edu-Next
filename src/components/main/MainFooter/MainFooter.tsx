import { Facebook, Github, Linkedin, Mail, MapPin, Phone, Youtube } from 'lucide-react';
import Link from 'next/link';
import { baseApi } from '@/services/root/baseApi';
import { SiteLogo } from '@/components/common/SiteLogo/SiteLogo';

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
    <footer className="bg-[#F8F9FA] pt-20 pb-10">
      <div className="mx-auto max-w-400 px-6">
        {/* Top Section: Logo and Links */}
        <div className="mb-4 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo & Info */}
          <div className="max-w-xs">
            <div className="mb-6 flex items-center gap-2">
              <SiteLogo
                siteLogo={siteLogo}
                siteName={siteName}
                showTagline={false}
                className="h-20 w-72"
              />
            </div>
            <p className="line-clamp-3 leading-relaxed text-slate-500">{tagline}</p>
          </div>

          {/* Page Links */}
          <div>
            <h4 className="mb-6 text-xl font-semibold text-[#2D3134]">Page</h4>
            <ul className="space-y-4 text-slate-500">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/category" className="hover:text-primary transition-colors">
                  Category
                </Link>
              </li>
              <li>
                <Link href="/course" className="hover:text-primary transition-colors">
                  Course
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="mb-6 text-xl font-semibold text-[#2D3134]">Company</h4>
            <ul className="space-y-4 text-slate-500">
              <li>
                <Link href="/style-guide" className="hover:text-primary transition-colors">
                  Style Guide
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/why-choose-us" className="hover:text-primary transition-colors">
                  Why Choose Us
                </Link>
              </li>
              <li>
                <Link href="/404" className="hover:text-primary transition-colors">
                  404
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-6 text-xl font-semibold text-[#2D3134]">Contact</h4>
            <ul className="space-y-5 text-slate-500">
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-[#2D3134]" />
                <a href={`tel:${contactPhone}`} className="hover:text-primary transition-colors">
                  {contactPhone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-[#2D3134]" />
                <a href={`mailto:${supportEmail}`} className="hover:text-primary transition-colors">
                  {supportEmail}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={24} className="shrink-0 text-[#2D3134]" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Social Media Bar */}
        {hasSocialLinks && (
          <div className="flex flex-col items-center justify-between gap-6 rounded-md bg-[#EEF5F5] px-8 py-6 md:flex-row">
            <h3 className="text-2xl font-semibold text-[#2D3134]">Support for Social Medias :</h3>

            <div className="flex items-center gap-4">
              {/* Facebook */}
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-secondary flex h-12 w-12 items-center justify-center rounded-full text-white shadow-orange-200 transition-transform hover:scale-110"
                >
                  <Facebook size={22} fill="currentColor" />
                </a>
              )}
              {/* YouTube */}
              {socialLinks.youtube && (
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-primary flex h-12 w-12 items-center justify-center rounded-full text-white transition-transform hover:scale-110"
                >
                  <Youtube size={22} fill="currentColor" />
                </a>
              )}
              {/* Linkedin */}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-primary flex h-12 w-12 items-center justify-center rounded-full text-white transition-transform hover:scale-110"
                >
                  <Linkedin size={22} fill="currentColor" />
                </a>
              )}
              {/* Github */}
              {socialLinks.github && (
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-primary flex h-12 w-12 items-center justify-center rounded-full text-white transition-transform hover:scale-110"
                >
                  <Github size={22} fill="currentColor" />
                </a>
              )}
            </div>
          </div>
        )}

        {/* Copyright Section */}
        <div className="mt-8 border-t border-slate-200 pt-8 text-center text-slate-500">
          <p>{copyrightText}</p>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
