'use client';

import { Award, Download, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';
import SectionHeader from '@/components/dashboard/SectionHeader/SectionHeader';
import { Button } from '@/components/ui/button';

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
      <div className="mb-4">
        <SectionHeader title="Earned Certificates" />
      </div>
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
              <div className="relative aspect-video w-full overflow-hidden border-b border-slate-100">
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
                <div className="absolute top-3 left-3">
                  <DynamicBadge text={cert.category} color="#3b82f6" />
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="mb-1 line-clamp-2 text-sm leading-snug font-bold">{cert.course}</h3>
                <p className="text-text-secondary mb-1 text-xs">{cert.instructor}</p>
                <p className="text-text-secondary mb-4 text-xs">Completed: {cert.completedDate}</p>

                <div className="mb-4 rounded-sm bg-slate-50 px-3 py-2">
                  <p className="text-text-secondary text-xs">Certificate ID</p>
                  <p className="text-primary text-xs font-bold">{cert.certificateId}</p>
                </div>

                <div className="flex gap-2">
                  <Button className="flex flex-1 items-center justify-center gap-1.5 rounded-sm">
                    <Download size={14} />
                    Download PDF
                  </Button>
                  <Button variant="outline" className="h-10 w-10 shrink-0 rounded-sm p-0">
                    <ExternalLink size={16} />
                  </Button>
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
