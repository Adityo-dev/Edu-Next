'use client';

import { Award } from 'lucide-react';

interface InProgressCourse {
  title: string;
  progress: number;
}

interface InProgressCertificatesProps {
  courses: InProgressCourse[];
}

const InProgressCertificates = ({ courses }: InProgressCertificatesProps) => {
  return (
    <div>
      <h2 className="mb-4 text-lg font-bold">Certificates in Progress</h2>
      <div className="space-y-3">
        {courses.map((course, i) => (
          <div key={i} className="dashboard-card-container flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-slate-200">
              <Award size={18} className="text-slate-300" />
            </div>
            <div className="flex-1">
              <p className="mb-2 text-sm font-bold">{course.title}</p>
              <div className="flex items-center gap-3">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="bg-primary h-full rounded-full"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <span className="text-primary text-xs font-bold">{course.progress}%</span>
              </div>
            </div>
            <span className="text-text-secondary text-xs">{100 - course.progress}% left</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InProgressCertificates;
