import { baseApi } from '@/services/root/baseApi';
import { Mail, MapPin, Phone } from 'lucide-react';

const ContactInfo = async () => {
  let config = null;
  try {
    const res = await baseApi('/platform-config', {
      revalidate: 3600,
      tags: ['platform-config'],
    });
    if (res?.success) config = res.data;
  } catch (error) {
    console.error('Failed to fetch platform config in ContactInfo:', error);
  }

  const contactPhone = config?.contactPhone || '+880 1936-702382';
  const supportEmail = config?.supportEmail || 'adittodev01770@gmail.com';

  const contactMethods = [
    {
      icon: <Phone size={22} />,
      title: 'Call Us',
      desc: 'Available Sun - Thu (9am - 6pm)',
      value: contactPhone,
    },
    {
      icon: <Mail size={22} />,
      title: 'Email Us',
      desc: 'We will reply within 24 hours',
      value: supportEmail,
    },
    {
      icon: <MapPin size={22} />,
      title: 'Location',
      desc: 'Headquarters in Dhaka, Bangladesh',
      value: 'Banani, Dhaka - 1213',
    },
  ];

  return (
    <section className="relative z-20 -mt-10 mb-10">
      <div className="mx-auto max-w-400 px-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-6">
          {contactMethods.map((method, i) => (
            <div
              key={i}
              className="group relative rounded-md border border-slate-100 bg-white p-5 text-center shadow-xs transition-all duration-300 hover:border-emerald-100 hover:shadow-sm"
            >
              <div className="bg-primary mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
                {method?.icon}
              </div>
              <h3 className="mb-2 text-lg font-semibold">{method?.title}</h3>
              <p className="text-text-secondary leading-relaxed">{method?.desc}</p>
              <p className="mt-2 font-semibold">{method?.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
