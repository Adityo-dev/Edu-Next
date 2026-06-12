import { Eye, Users } from 'lucide-react';
import Image from 'next/image';

interface Instructor {
  id: number;
  name: string;
  email: string;
  expertise: string;
  experience: string;
  status: string;
  submittedDate: string;
  courses: number;
  bio: string;
  youtube: string;
  image: string;
}

const statusConfig: Record<string, string> = {
  pending: 'bg-yellow-50 text-yellow-600',
  approved: 'bg-emerald-50 text-primary',
  rejected: 'bg-red-50 text-red-500',
};

interface InstructorDetailProps {
  instructor: Instructor | null;
}

const InstructorDetail = ({ instructor }: InstructorDetailProps) => {
  return (
    <div className="dashboard-card-container lg:sticky lg:top-6 lg:self-start">
      {instructor ? (
        <div>
          <div className="mb-5 flex flex-col items-center text-center">
            <Image
              src={instructor.image}
              alt={instructor.name}
              width={64}
              height={64}
              className="mb-3 rounded-full border-4 border-emerald-50 shadow-sm"
            />
            <h3 className="text-lg font-black">{instructor.name}</h3>
            <p className="text-text-secondary text-xs">{instructor.email}</p>
            <span
              className={`mt-2 rounded-full px-3 py-1 text-xs font-bold capitalize ${statusConfig[instructor.status]}`}
            >
              {instructor.status}
            </span>
          </div>
          <div className="space-y-3 text-sm">
            {[
              { label: 'Expertise', value: instructor.expertise },
              { label: 'Experience', value: instructor.experience },
              { label: 'Applied', value: instructor.submittedDate },
              { label: 'Courses Planned', value: instructor.courses },
            ].map((item, i) => (
              <div key={i} className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-text-secondary">{item.label}</span>
                <span className="font-semibold">{item.value}</span>
              </div>
            ))}
            <div>
              <p className="text-text-secondary mb-1 text-xs">Bio</p>
              <p className="text-sm leading-relaxed text-slate-600">{instructor.bio}</p>
            </div>
            {instructor.youtube && (
              <a
                href={instructor.youtube}
                target="_blank"
                rel="noreferrer"
                className="text-primary flex items-center gap-1.5 text-xs font-semibold hover:underline"
              >
                <Eye size={12} /> View YouTube Channel
              </a>
            )}
          </div>
          {instructor.status === 'pending' && (
            <div className="mt-5 flex gap-2">
              <button className="bg-primary flex-1 rounded-sm py-3 text-sm font-bold text-white hover:bg-[#2a6159]">
                Approve
              </button>
              <button className="flex-1 rounded-sm border border-red-100 py-3 text-sm font-bold text-red-400 hover:bg-red-50">
                Reject
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Users size={36} className="mb-3 text-slate-200" />
          <p className="text-sm text-slate-400">Select an instructor to view details</p>
        </div>
      )}
    </div>
  );
};

export default InstructorDetail;
