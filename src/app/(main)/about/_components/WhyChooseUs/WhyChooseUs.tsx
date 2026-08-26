import Image from 'next/image';
import {
  ShieldCheck,
  Video,
  Award,
  CreditCard,
  PlayCircle,
  Bell,
  Smartphone,
  Wallet,
} from 'lucide-react';

const whyChooseUs = [
  { text: 'Verified Instructors', icon: <ShieldCheck size={16} className="text-primary" /> },
  { text: 'Live Sessions', icon: <Video size={16} className="text-primary" /> },
  { text: 'Instant Certificates', icon: <Award size={16} className="text-primary" /> },
  { text: 'Secure Payments', icon: <CreditCard size={16} className="text-primary" /> },
  { text: 'Free Previews', icon: <PlayCircle size={16} className="text-primary" /> },
  { text: 'Real-time Support', icon: <Bell size={16} className="text-primary" /> },
  { text: 'Mobile-Friendly', icon: <Smartphone size={16} className="text-primary" /> },
  { text: 'Transparent Wallet', icon: <Wallet size={16} className="text-primary" /> },
];

const WhyChooseUs = () => {
  return (
    <section className="mx-auto max-w-400 px-4 py-12 lg:py-16">
      <div className="flex flex-col justify-between gap-12 lg:flex-row lg:items-center lg:gap-16">
        {/* Left: Content */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Why Choose <span className="text-primary italic">EduNext?</span>
          </h2>

          <p className="text-text-secondary mt-3 max-w-2xl text-base leading-relaxed">
            There are many e-learning platforms out there — but EduNext is built specifically for
            Bangladeshi students and instructors, with features that truly matter.
          </p>

          {/* Feature Grid */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            {whyChooseUs.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="border-primary/20 bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full border">
                  {item.icon}
                </div>
                <span className="text-sm font-medium text-slate-800">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Image Collage */}
        <div className="w-full lg:w-1/2">
          <div className="grid h-[350px] w-full grid-cols-12 grid-rows-6 gap-3 sm:h-[450px] lg:h-[400px]">
            {/* Left Tall Image */}
            <div className="relative col-span-5 row-span-6 overflow-hidden rounded-md bg-emerald-50">
              <Image
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80"
                alt="Student learning"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Right Top Image */}
            <div className="relative col-span-7 row-span-4 overflow-hidden rounded-md bg-slate-100">
              <Image
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80"
                alt="Technology"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Right Bottom Image */}
            <div className="relative col-span-7 row-span-2 overflow-hidden rounded-md bg-yellow-50">
              <Image
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&q=80"
                alt="Graduation"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
