'use client';

import { Quote } from 'lucide-react';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import { testimonialsData } from './data/testimonials.data';

const TestimonialSection = () => {
  return (
    <section className="overflow-hidden bg-[#F9FAFB] py-12">
      {/* Header */}
      <div className="mx-auto mb-10 max-w-400 px-4 text-center">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Our <span className="text-secondary">5,000+</span> Satisfied <br /> Students Say
        </h2>
      </div>

      {/* Marquee Wrapper */}
      <div className="relative h-full w-full">
        <Marquee gradient={true} gradientColor="white" speed={45} pauseOnHover={true}>
          {testimonialsData.map((item) => (
            <div
              key={item?.id}
              className="group mx-2.5 w-80 cursor-pointer rounded-md border border-slate-100 bg-white p-4 text-left transition-all duration-300 hover:border-emerald-100 hover:shadow-sm md:w-100"
            >
              {/* Quote Icon */}
              <div className="text-primary group-hover:bg-primary mb-5 inline-flex h-8 w-8 items-center justify-center rounded-sm bg-emerald-50 transition-colors group-hover:text-white">
                <Quote size={18} />
              </div>

              {/* Feedback Text */}
              <p className="text-text-secondary mb-4 line-clamp-3 text-sm leading-relaxed italic sm:text-base">
                {item?.text}
              </p>

              {/* User Profile */}
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full border-2 border-emerald-100">
                  <Image
                    src={item?.image}
                    alt={item?.name}
                    width={50}
                    height={50}
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">{item?.name}</h4>
                  <p className="text-text-secondary text-xs font-medium">{item?.role}</p>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default TestimonialSection;
