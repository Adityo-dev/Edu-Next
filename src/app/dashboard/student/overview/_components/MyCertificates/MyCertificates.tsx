'use client';

import { Award } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const certificates = [
  {
    id: 1,
    title: 'Freelancing Masterclass',
    instructor: 'Sabbir Hossain',
    date: 'April 2025',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=300',
  },
  {
    id: 2,
    title: 'Graphic Design Fundamentals',
    instructor: 'Mithila Rahman',
    date: 'March 2025',
    image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=300',
  },
  {
    id: 3,
    title: 'Data Analytics Basics',
    instructor: 'Imran Hossain',
    date: 'February 2025',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=300',
  },
];

const MyCertificates = () => {
  return (
    <div className="dashboard-card-container">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold">My Certificates</h2>
        <Link
          href="/dashboard/student/certificates"
          className="text-primary text-sm font-semibold hover:underline"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="group cursor-pointer overflow-hidden rounded-sm border border-slate-100 transition-all duration-300 hover:border-emerald-100 hover:shadow-sm"
          >
            <div className="relative h-28 overflow-hidden">
              <Image
                src={cert.image}
                alt={cert.title}
                fill
                sizes="(max-width: 768px) 100vw, 240px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <Award size={28} className="text-yellow-400" />
              </div>
            </div>
            <div className="p-3">
              <p className="line-clamp-1 text-sm font-bold">{cert.title}</p>
              <p className="text-text-secondary text-xs">{cert.date}</p>
              <button className="text-primary mt-2 text-xs font-semibold hover:underline">
                Download PDF →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCertificates;
