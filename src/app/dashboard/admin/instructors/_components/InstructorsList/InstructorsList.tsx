/* eslint-disable no-unused-vars */
import { useApproveBadgeRequestMutation } from '@/redux/features/admin/instructorManagement/adminInstructor.api';
import { TInstructorBadgeRequest } from '@/types/adminInstructor.types';
import { CheckCircle, XCircle } from 'lucide-react';
import Image from 'next/image';

const statusConfig: Record<string, string> = {
  pending: 'bg-yellow-50 text-yellow-600',
  approved: 'bg-emerald-50 text-primary',
  rejected: 'bg-red-50 text-red-500',
};

interface InstructorsListProps {
  instructors: TInstructorBadgeRequest[];
  selectedId: string | null;
  onSelect: (instructor: TInstructorBadgeRequest) => void;
}

const InstructorsList = ({ instructors, selectedId, onSelect }: InstructorsListProps) => {
  const [approveBadgeRequest] = useApproveBadgeRequestMutation();

  const handleAction = async (e: React.MouseEvent, id: string, action: 'approve' | 'reject') => {
    e.stopPropagation();
    try {
      await approveBadgeRequest({ id, action }).unwrap();
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };

  return (
    <div className="space-y-3 lg:col-span-2">
      {instructors.length === 0 ? (
        <div className="rounded-md border border-slate-100 bg-white p-10 text-center text-slate-500">
          No pending badge requests found.
        </div>
      ) : (
        instructors.map((instructor) => (
          <div
            key={instructor._id}
            className={`cursor-pointer rounded-md border bg-white p-5 shadow-xs transition-all hover:border-emerald-100 ${selectedId === instructor._id ? 'border-primary' : 'border-slate-100'}`}
            onClick={() => onSelect(instructor)}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <Image
                  src={instructor.avatar || 'https://i.pravatar.cc/150'}
                  alt={instructor.fullName || `${instructor.firstName} ${instructor.lastName}`}
                  width={48}
                  height={48}
                  className="rounded-full border-2 border-emerald-50"
                />
                <div>
                  <h3 className="font-bold">
                    {instructor.fullName || `${instructor.firstName} ${instructor.lastName}`}
                  </h3>
                  <p className="text-text-secondary text-xs">{instructor.email}</p>
                  <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                    <span className="text-primary rounded-sm bg-emerald-50 px-2 py-0.5 font-semibold">
                      Req: {instructor.badgeRequest?.requestedBadge || 'N/A'}
                    </span>
                    <span>{instructor.experienceYears} yrs exp.</span>
                  </div>
                </div>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold capitalize ${statusConfig[instructor.badgeRequest?.status] || 'bg-slate-50 text-slate-500'}`}
              >
                {instructor.badgeRequest?.status || 'unknown'}
              </span>
            </div>

            {instructor.badgeRequest?.status === 'pending' && (
              <div className="mt-4 flex gap-2">
                <button
                  onClick={(e) => handleAction(e, instructor._id, 'approve')}
                  className="bg-primary flex flex-1 items-center justify-center gap-2 rounded-sm py-2.5 text-xs font-bold text-white hover:bg-[#2a6159]"
                >
                  <CheckCircle size={13} /> Approve
                </button>
                <button
                  onClick={(e) => handleAction(e, instructor._id, 'reject')}
                  className="flex flex-1 items-center justify-center gap-2 rounded-sm border border-red-100 py-2.5 text-xs font-bold text-red-400 hover:bg-red-50"
                >
                  <XCircle size={13} /> Reject
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default InstructorsList;
