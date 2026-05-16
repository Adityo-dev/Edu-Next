'use client';

import { Quote } from 'lucide-react';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';

const testimonials = [
  {
    id: 1,
    name: 'David W',
    role: 'Frontend Developer',
    text: 'Learn has enabled me to stay current with professional courses, enhancing my capabilities current with professional courses for your learn.',
    image: 'https://i.pravatar.cc/150?u=david',
  },
  {
    id: 2,
    name: 'Jidan D',
    role: 'UI/UX Designer',
    text: 'The best part about this platform is the pixel-perfect UI and the community support. It feels like a premium learning journey.',
    image: 'https://i.pravatar.cc/150?u=jidan',
  },
  {
    id: 3,
    name: 'Emily T',
    role: 'Software Engineer',
    text: 'Highly recommended! The instructors are industry experts who know exactly what tools are in demand in 2026.',
    image: 'https://i.pravatar.cc/150?u=emily',
  },
  {
    id: 4,
    name: 'Michael R',
    role: 'Creative Director',
    text: 'The flexibility of these courses is unmatched. I can learn while working my full-time job without any stress.',
    image: 'https://i.pravatar.cc/150?u=mike',
  },
];

const TestimonialSection = () => {
  return (
    <section className="w-full bg-white py-24">
      <div className="mx-auto max-w-400 px-6 text-center">
        {/* Header */}
        <div className="mb-20">
          <h2 className="text-4xl leading-tight font-bold text-[#2D3134] md:text-5xl">
            Our <span className="text-[#F59E0B]">250k+</span> Satisfied <br /> Student Say
          </h2>
        </div>

        {/* Marquee Wrapper */}
        <div className="relative h-full w-full">
          <Marquee gradient={true} gradientColor="white" speed={45} pauseOnHover={true}>
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="group mx-4 w-100 rounded-md border border-slate-100 bg-white p-8 text-left transition-all duration-300 hover:border-emerald-100 hover:shadow-sm"
              >
                {/* Quote Icon */}
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-500 transition-colors group-hover:bg-emerald-500 group-hover:text-white">
                  <Quote size={24} />
                </div>

                {/* Feedback Text */}
                <p className="mb-8 line-clamp-3 text-lg leading-relaxed text-slate-600 italic">
                  {item.text}
                </p>

                {/* User Profile */}
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full border-2 border-emerald-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{item.name}</h4>

                    <p className="text-sm font-medium text-slate-400">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
