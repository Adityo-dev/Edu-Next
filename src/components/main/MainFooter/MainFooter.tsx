import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import Link from 'next/link';

const MainFooter = () => {
  return (
    <footer className="bg-[#F8F9FA] pt-20 pb-10">
      <div className="mx-auto max-w-400 px-6">
        {/* Top Section: Logo and Links */}
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo & Info */}
          <div className="max-w-xs">
            <div className="mb-6 flex items-center gap-2">
              {/* Replace with your actual Logo SVG or Image */}
              <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-lg font-bold text-white">
                E
              </div>
              <span className="text-secondary text-3xl font-bold">Educ</span>
            </div>
            <p className="leading-relaxed text-slate-500">
              Our e-learning platform offers expertly crafted courses to help you gain skills and
              achieve.
            </p>
          </div>

          {/* Page Links */}
          <div>
            <h4 className="mb-6 text-xl font-bold text-[#2D3134]">Page</h4>
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
            <h4 className="mb-6 text-xl font-bold text-[#2D3134]">Company</h4>
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
            <h4 className="mb-6 text-xl font-bold text-[#2D3134]">Contact</h4>
            <ul className="space-y-5 text-slate-500">
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-[#2D3134]" />
                <span>+021-6516-1124</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-[#2D3134]" />
                <span>educ@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={24} className="shrink-0 text-[#2D3134]" />
                <span>
                  2912 Meadowbrook Road, <br /> Los Angeles, CA 90017
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Social Media Bar */}
        <div className="flex flex-col items-center justify-between gap-6 rounded-md bg-[#EEF5F5] px-8 py-6 md:flex-row">
          <h3 className="text-2xl font-bold text-[#2D3134]">Support for Social Medias :</h3>

          <div className="flex items-center gap-4">
            {/* Facebook */}
            <a
              href="#"
              className="bg-secondary flex h-12 w-12 items-center justify-center rounded-full text-white shadow-orange-200 transition-transform hover:scale-110"
            >
              <Facebook size={22} fill="currentColor" />
            </a>
            {/* Instagram */}
            <a
              href="#"
              className="bg-primary flex h-12 w-12 items-center justify-center rounded-full text-white transition-transform hover:scale-110"
            >
              <Instagram size={22} />
            </a>
            {/* Linkedin */}
            <a
              href="#"
              className="bg-primary flex h-12 w-12 items-center justify-center rounded-full text-white transition-transform hover:scale-110"
            >
              <Linkedin size={22} fill="currentColor" />
            </a>
            {/* X (Twitter) */}
            <a
              href="#"
              className="bg-primary flex h-12 w-12 items-center justify-center rounded-full text-white transition-transform hover:scale-110"
            >
              <Twitter size={22} fill="currentColor" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
