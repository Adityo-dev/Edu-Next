/* eslint-disable no-unused-vars */
import { CheckCircle, XCircle } from 'lucide-react';
import Image from 'next/image';

interface Instructor {
  id: number;
  name: string;
  email: string;
  expertise: string;
  experience: string;
  status: string;
  image: string;
  courses: number;
  submittedDate: string;
  bio: string;
  youtube: string;
}

const statusConfig: Record<string, string> = {
  pending: 'bg-yellow-50 text-yellow-600',
  approved: 'bg-emerald-50 text-primary',
  rejected: 'bg-red-50 text-red-500',
};

interface InstructorsListProps {
  instructors: Instructor[];
  selectedId: number | null;
  onSelect: (instructor: Instructor) => void;
}

const InstructorsList = ({ instructors, selectedId, onSelect }: InstructorsListProps) => {
  return (
    <div className="space-y-3 lg:col-span-2">
      {instructors.map((instructor) => (
        <div
          key={instructor.id}
          className={`cursor-pointer rounded-md border bg-white p-5 shadow-xs transition-all hover:border-emerald-100 ${selectedId === instructor.id ? 'border-primary' : 'border-slate-100'}`}
          onClick={() => onSelect(instructor)}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <Image
                src={instructor.image}
                alt={instructor.name}
                width={48}
                height={48}
                className="rounded-full border-2 border-emerald-50"
              />
              <div>
                <h3 className="font-bold">{instructor.name}</h3>
                <p className="text-text-secondary text-xs">{instructor.email}</p>
                <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                  <span className="text-primary rounded-sm bg-emerald-50 px-2 py-0.5 font-semibold">
                    {instructor.expertise}
                  </span>
                  <span>{instructor.experience} exp.</span>
                </div>
              </div>
            </div>
            <span
              className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold capitalize ${statusConfig[instructor.status]}`}
            >
              {instructor.status}
            </span>
          </div>

          {instructor.status === 'pending' && (
            <div className="mt-4 flex gap-2">
              <button className="bg-primary flex flex-1 items-center justify-center gap-2 rounded-sm py-2.5 text-xs font-bold text-white hover:bg-[#2a6159]">
                <CheckCircle size={13} /> Approve
              </button>
              <button className="flex flex-1 items-center justify-center gap-2 rounded-sm border border-red-100 py-2.5 text-xs font-bold text-red-400 hover:bg-red-50">
                <XCircle size={13} /> Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default InstructorsList;
