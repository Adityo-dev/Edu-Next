'use client';

import { Star } from 'lucide-react';
import Image from 'next/image';

const reviewsData = [
  { name: 'James N.', role: 'Student', rating: 5, date: '2 days ago', img: '1' },
  { name: 'Emily R.', role: 'Designer', rating: 5, date: '1 week ago', img: '2' },
  { name: 'Daniel K.', role: 'Developer', rating: 4, date: '2 weeks ago', img: '3' },
  { name: 'Alyssa P.', role: 'Student', rating: 5, date: '1 month ago', img: '4' },
];

const ReviewsAndAbout = () => {
  return (
    <div className="border-subtle mx-auto mb-12 max-w-400 border-t px-6 py-24">
      <div className="flex flex-col justify-between gap-20 lg:flex-row">
        {/* Left Side: Student Reviews */}
        <div className="w-full lg:w-5/12">
          <div className="border-primary-brand mb-8 border-l-4 pl-4">
            <h3 className="text-text-primary text-2xl font-semibold">Reviews</h3>
          </div>

          <div className="space-y-6">
            {reviewsData.map((rev, index) => (
              <div
                key={index}
                className="border-subtle flex items-center justify-between border-b pb-3 last:border-0"
              >
                <div className="flex items-center gap-4">
                  <div className="h-11 w-11 overflow-hidden rounded-full bg-slate-100">
                    <Image
                      src={`https://i.pravatar.cc/150?u=${rev.img}`}
                      width={44}
                      height={44}
                      alt={rev.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h5 className="text-text-primary text-sm font-semibold">{rev.name}</h5>
                    <p className="text-text-secondary text-xs">{rev.role}</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-secondary flex items-center justify-end gap-0.5">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} size={16} fill="#e96600" />
                    ))}
                  </div>
                  <span className="text-text-placeholder mt-1.5 block text-sm">{rev.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Detailed Description */}
        <div className="w-full lg:w-7/12">
          <h3 className="mb-6 text-3xl font-semibold">
            About the <span className="text-text-placeholder font-medium">Course</span>
          </h3>
          <div className="text-text-secondary space-y-5 text-base leading-relaxed">
            <p>
              UI/UX Design is a high-level course tailored for creative minds who want to engineer
              modern digital interfaces. Throughout this program, you will expand your logical
              structural design capabilities and transform raw concepts into interactive product
              blueprints.
            </p>
            <p>
              From basic wireframe architectures to advanced interactive prototyping, our curriculum
              aligns 100% with modern tech industry requirements. You will learn to use
              production-grade design methodologies and present robust research documentations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsAndAbout;
