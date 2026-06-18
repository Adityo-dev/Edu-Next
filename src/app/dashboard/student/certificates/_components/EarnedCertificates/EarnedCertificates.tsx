'use client';

import { Award, Download, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface Certificate {
  id: number;
  course: string;
  instructor: string;
  completedDate: string;
  category: string;
  image: string;
  certificateId: string;
}

interface EarnedCertificatesProps {
  certificates: Certificate[];
}

const EarnedCertificates = ({ certificates }: EarnedCertificatesProps) => {
  return (
    <div>
      <h2 className="mb-4 text-lg font-bold">Earned Certificates</h2>
      {certificates.length === 0 ? (
        <div className="dashboard-card-container py-12 text-center text-slate-500">
          No certificates found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="group dashboard-card-container overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-emerald-100 hover:shadow-md"
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={cert.image}
                  alt={cert.course}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <div className="rounded-full border-4 border-yellow-400 bg-yellow-400/20 p-3">
                    <Award size={32} className="text-yellow-400" />
                  </div>
                </div>
                <span className="bg-primary absolute top-3 left-3 rounded-sm px-2.5 py-1 text-xs font-bold text-white">
                  {cert.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="mb-1 line-clamp-2 text-sm leading-snug font-bold">{cert.course}</h3>
                <p className="text-text-secondary mb-1 text-xs">{cert.instructor}</p>
                <p className="text-text-secondary mb-4 text-xs">Completed: {cert.completedDate}</p>

                <div className="mb-4 rounded-sm bg-slate-50 px-3 py-2">
                  <p className="text-text-secondary text-xs">Certificate ID</p>
                  <p className="text-primary text-xs font-bold">{cert.certificateId}</p>
                </div>

                <div className="flex gap-2">
                  <button className="bg-primary flex flex-1 items-center justify-center gap-1.5 rounded-sm py-2.5 text-xs font-bold text-white transition-all hover:bg-[#2a6159] active:scale-95">
                    <Download size={13} />
                    Download PDF
                  </button>
                  <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-slate-200 text-slate-500 transition-all hover:bg-slate-50">
                    <ExternalLink size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EarnedCertificates;
