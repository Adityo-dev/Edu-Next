import { Mail, MapPin, Phone, Send } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Contact Support',
  description: 'Get in touch with the EduNext support team.',
};

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* ── Hero Section ───────────────────────────────────────────────────────── */}
      <div className="bg-primary relative overflow-hidden py-24">
        {/* Dot Grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(#ffffff 1.5px, transparent 1px)`,
            backgroundSize: '28px 28px',
          }}
        />
        {/* Glow */}
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-400 px-6 text-center">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center justify-center gap-2 text-sm text-white/50">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span className="text-white/80">Contact Support</span>
          </div>

          <h1 className="mb-5 text-4xl leading-tight font-black text-white md:text-6xl">
            Get in <span className="text-yellow-400">Touch</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/70">
            Have a question, feedback, or need help with a course? Our support team is always ready
            to assist you on your learning journey.
          </p>
        </div>
      </div>

      {/* ── Contact Info Cards ─────────────────────────────────────────────────── */}
      <section className="relative z-20 -mt-10 mb-10">
        <div className="mx-auto max-w-400 px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Card 1 */}
            <div className="group rounded-md border border-slate-100 bg-white p-8 text-center shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-100 hover:shadow-lg hover:shadow-emerald-100/40">
              <div className="bg-primary/10 text-primary group-hover:bg-primary mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full transition-colors group-hover:text-white">
                <Phone size={28} />
              </div>
              <h3 className="mb-2 text-xl font-bold">Call Us</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Available Sun - Thu (9am - 6pm)
              </p>
              <p className="mt-3 font-semibold text-slate-800">+880 1700-000000</p>
            </div>

            {/* Card 2 */}
            <div className="group rounded-md border border-slate-100 bg-white p-8 text-center shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-100 hover:shadow-lg hover:shadow-emerald-100/40">
              <div className="bg-primary/10 text-primary group-hover:bg-primary mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full transition-colors group-hover:text-white">
                <Mail size={28} />
              </div>
              <h3 className="mb-2 text-xl font-bold">Email Us</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                We will reply within 24 hours
              </p>
              <p className="mt-3 font-semibold text-slate-800">support@edunext.com</p>
            </div>

            {/* Card 3 */}
            <div className="group rounded-md border border-slate-100 bg-white p-8 text-center shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-100 hover:shadow-lg hover:shadow-emerald-100/40">
              <div className="bg-primary/10 text-primary group-hover:bg-primary mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full transition-colors group-hover:text-white">
                <MapPin size={28} />
              </div>
              <h3 className="mb-2 text-xl font-bold">Location</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Headquarters in Dhaka, Bangladesh
              </p>
              <p className="mt-3 font-semibold text-slate-800">Banani, Dhaka - 1213</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact Form ───────────────────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-400 px-6">
          <div className="flex flex-col gap-16 lg:flex-row">
            {/* Left Content */}
            <div className="w-full lg:w-1/2">
              <h2 className="mb-5 text-4xl leading-tight font-bold tracking-tight md:text-5xl">
                Send Us a <span className="text-primary">Message</span>
              </h2>
              <p className="text-text-secondary mb-10 text-lg leading-relaxed">
                Whether you are a student looking for technical support or an instructor wanting to
                join EduNext, fill out the form and we will get back to you shortly.
              </p>

              <div className="rounded-md border border-emerald-100 bg-emerald-50/50 p-6">
                <h3 className="mb-3 text-lg font-bold text-slate-800">
                  Looking for quick answers?
                </h3>
                <p className="text-text-secondary mb-5 text-sm">
                  Check out our FAQ section to find answers to commonly asked questions about
                  enrollment, payments, and certificates.
                </p>
                <Link
                  href="/faq"
                  className="text-primary inline-flex items-center gap-2 font-semibold hover:underline"
                >
                  Visit Help Center →
                </Link>
              </div>
            </div>

            {/* Right Form */}
            <div className="w-full lg:w-1/2">
              <div className="rounded-md border border-slate-100 bg-white p-8 shadow-sm">
                <form className="space-y-6">
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
                      rows={5}
                      placeholder="Write your message here..."
                      className="focus:border-primary w-full resize-none rounded-md border border-slate-200 bg-[#F9FAFB] px-4 py-3 text-sm transition-colors outline-none focus:bg-white"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="bg-primary flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm px-8 py-4 font-bold text-white shadow-md transition-all hover:bg-[#2a6159] active:scale-95"
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
    </div>
  );
};

export default ContactPage;
