import React from 'react';
import Image from 'next/image';
import { Star, ThumbsUp } from 'lucide-react';

const reviewsData = [
  {
    id: 1,
    student: 'Sumaiya Akter',
    image: 'https://i.pravatar.cc/150?u=sumaiya',
    course: 'Complete Web Development Bootcamp',
    rating: 5,
    text: 'This course completely changed my life! Best instructor on EduNext.',
    date: 'Apr 12, 2025',
    helpful: 12,
  },
  {
    id: 2,
    student: 'Nusrat Jahan',
    image: 'https://i.pravatar.cc/150?u=nusrat',
    course: 'Complete Web Development Bootcamp',
    rating: 4,
    text: 'Great course. Very detailed and practical. Would love more advanced content.',
    date: 'Mar 8, 2025',
    helpful: 8,
  },
  {
    id: 3,
    student: 'Arif Hossain',
    image: 'https://i.pravatar.cc/150?u=arif',
    course: 'React.js Advanced Masterclass',
    rating: 5,
    text: 'The best React course I have ever taken. Every concept is explained clearly.',
    date: 'Feb 22, 2025',
    helpful: 15,
  },
  {
    id: 4,
    student: 'Fatima Begum',
    image: 'https://i.pravatar.cc/150?u=fatima',
    course: 'JavaScript ES6+ Fundamentals',
    rating: 5,
    text: 'Excellent content. I now feel confident writing modern JavaScript.',
    date: 'Jan 10, 2025',
    helpful: 9,
  },
];

const ReviewsList = () => {
  return (
    <div className="space-y-4">
      {reviewsData.map((review) => (
        <div key={review.id} className="rounded-md border border-slate-100 bg-white p-5 shadow-xs">
          <div className="flex gap-4">
            <Image
              src={review.image}
              alt={review.student}
              width={44}
              height={44}
              className="h-11 w-11 shrink-0 rounded-full border-2 border-emerald-50"
            />
            <div className="flex-1">
              <div className="mb-1 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{review.student}</h4>
                  <p className="text-text-secondary text-xs">{review.course}</p>
                </div>
                <span className="text-text-secondary text-xs">{review.date}</span>
              </div>
              <div className="mb-2 flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    fill={i < review.rating ? '#ffc107' : 'none'}
                    color="#ffc107"
                  />
                ))}
              </div>
              <p className="text-text-secondary mb-3 text-sm leading-relaxed">{review.text}</p>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <ThumbsUp size={12} />
                <span>{review.helpful} found this helpful</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewsList;
