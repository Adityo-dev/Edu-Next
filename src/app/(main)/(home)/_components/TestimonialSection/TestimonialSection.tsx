'use client';

import { Quote } from 'lucide-react';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import { testimonialsData } from './data/testimonials.data';

const TestimonialSection = () => {
  return (
    <section className="w-full bg-[#F9FAFB] py-20">
      {/* Header */}
      <div className="mx-auto mb-14 max-w-400 px-6 text-center">
        <h2 className="text-4xl leading-tight font-bold md:text-5xl">
          Our <span className="text-secondary">5,000+</span> Satisfied <br /> Students Say
        </h2>
      </div>

      {/* Marquee Wrapper */}
      <div className="relative h-full w-full">
        <Marquee gradient={true} gradientColor="white" speed={45} pauseOnHover={true}>
          {testimonialsData.map((item) => (
            <div
              key={item?.id}
              className="group mx-2.5 w-100 cursor-pointer rounded-md border border-slate-100 bg-white p-6 text-left transition-all duration-300 hover:border-emerald-100 hover:shadow-sm"
            >
              {/* Quote Icon */}
              <div className="text-primary group-hover:bg-primary mb-6 inline-flex h-10 w-10 items-center justify-center rounded-sm bg-emerald-50 transition-colors group-hover:text-white">
                <Quote size={24} />
              </div>

              {/* Feedback Text */}
              <p className="text-text-secondary mb-6 line-clamp-3 text-lg leading-relaxed italic">
                {item?.text}
              </p>

              {/* User Profile */}
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full border-2 border-emerald-100">
                  <Image
                    src={item?.image}
                    alt={item?.name}
                    width={60}
                    height={60}
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{item?.name}</h4>

                  <p className="text-text-secondary text-sm font-medium">{item?.role}</p>
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
