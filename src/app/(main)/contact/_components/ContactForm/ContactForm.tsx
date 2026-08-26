import Link from 'next/link';
import { Send } from 'lucide-react';

const ContactForm = () => {
  return (
    <section className="mx-auto max-w-400 px-4 py-12 lg:py-16">
      <div
        className="overflow-hidden rounded-md border border-slate-100 p-6 lg:p-12"
        style={{ background: 'linear-gradient(160deg, #fdf9f0 0%, #f5f8f5 50%, #eef5f0 100%)' }}
      >
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          {/* Left Content */}
          <div className="w-full lg:w-1/2">
            <h2 className="mb-4 text-3xl font-semibold tracking-tight md:text-4xl">
              Send Us a <span className="text-primary italic">Message</span>
            </h2>
            <p className="text-text-secondary mb-8 text-base leading-relaxed">
              Whether you are a student looking for technical support or an instructor wanting to
              join EduNext, fill out the form and we will get back to you shortly.
            </p>

            <div className="rounded-md border border-emerald-100 bg-emerald-50/50 p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-bold text-slate-800">Looking for quick answers?</h3>
              <p className="text-text-secondary mb-4 text-sm leading-relaxed">
                Check out our FAQ section to find answers to commonly asked questions about
                enrollment, payments, and certificates.
              </p>
              <Link
                href="/#faq"
                className="text-primary inline-flex items-center gap-2 font-semibold transition-colors hover:text-emerald-700 hover:underline"
              >
                Visit Help Center →
              </Link>
            </div>
          </div>

          {/* Right Form */}
          <div className="w-full lg:w-1/2">
            <div className="rounded-md border border-slate-100 bg-white p-6 shadow-sm lg:p-8">
              <form className="space-y-5">
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-semibold text-slate-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="e.g. Aditto Dev Barmon"
                    className="focus:border-primary w-full rounded-md border border-slate-200 bg-[#F9FAFB] px-4 py-3 text-sm transition-colors outline-none focus:bg-white"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-slate-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="e.g. user@edunext.com"
                    className="focus:border-primary w-full rounded-md border border-slate-200 bg-[#F9FAFB] px-4 py-3 text-sm transition-colors outline-none focus:bg-white"
                    required
                  />
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-semibold text-slate-700">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    placeholder="How can we help you?"
                    className="focus:border-primary w-full rounded-md border border-slate-200 bg-[#F9FAFB] px-4 py-3 text-sm transition-colors outline-none focus:bg-white"
                    required
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-semibold text-slate-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Write your message here..."
                    className="focus:border-primary w-full resize-none rounded-md border border-slate-200 bg-[#F9FAFB] px-4 py-3 text-sm transition-colors outline-none focus:bg-white"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="bg-primary flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm px-8 py-3.5 font-bold text-white shadow-md transition-all hover:bg-[#2a6159] active:scale-95"
                >
                  <span>Send Message</span>
                  <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
