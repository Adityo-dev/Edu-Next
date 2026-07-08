import { Eye, Users } from 'lucide-react';
import Image from 'next/image';
import { TInstructorBadgeRequest } from '@/types/adminInstructor.types';
import { useApproveBadgeRequestMutation } from '@/redux/features/admin/instructorManagement/adminInstructor.api';

const statusConfig: Record<string, string> = {
  pending: 'bg-yellow-50 text-yellow-600',
  approved: 'bg-emerald-50 text-primary',
  rejected: 'bg-red-50 text-red-500',
};

interface InstructorDetailProps {
  instructor: TInstructorBadgeRequest | null;
  onActionComplete?: () => void;
}

const InstructorDetail = ({ instructor, onActionComplete }: InstructorDetailProps) => {
  const [approveBadgeRequest] = useApproveBadgeRequestMutation();

  const handleAction = async (id: string, action: 'approve' | 'reject') => {
    try {
      await approveBadgeRequest({ id, action }).unwrap();
      if (onActionComplete) onActionComplete();
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };

  return (
    <div className="dashboard-card-container lg:sticky lg:top-6 lg:self-start">
      {instructor ? (
        <div>
          <div className="mb-5 flex flex-col items-center text-center">
            <Image
              src={instructor.avatar || 'https://i.pravatar.cc/150'}
              alt={instructor.fullName || `${instructor.firstName} ${instructor.lastName}`}
              width={64}
              height={64}
              className="mb-3 rounded-full border-4 border-emerald-50 shadow-sm"
            />
            <h3 className="text-lg font-black">
              {instructor.fullName || `${instructor.firstName} ${instructor.lastName}`}
            </h3>
            <p className="text-text-secondary text-xs">{instructor.email}</p>
            <span
              className={`mt-2 rounded-full px-3 py-1 text-xs font-bold capitalize ${statusConfig[instructor.badgeRequest?.status] || 'bg-slate-50 text-slate-500'}`}
            >
              {instructor.badgeRequest?.status || 'unknown'}
            </span>
          </div>
          <div className="space-y-3 text-sm">
            {[
              { label: 'Requested Badge', value: instructor.badgeRequest?.requestedBadge },
              { label: 'Current Badge', value: instructor.badge || 'None' },
              { label: 'Expertise', value: instructor.areaOfExpertise?.join(', ') || 'N/A' },
              { label: 'Experience', value: `${instructor.experienceYears} Years` },
              { label: 'Phone', value: instructor.phone || 'N/A' },
              {
                label: 'Joined',
                value: instructor.createdAt
                  ? new Date(instructor.createdAt).toLocaleDateString()
                  : 'N/A',
              },
              { label: 'Email Verified', value: instructor.isEmailVerified ? 'Yes' : 'No' },
              { label: 'Suspended', value: instructor.isSuspended ? 'Yes' : 'No' },
              {
                label: 'Applied At',
                value: instructor.badgeRequest?.requestedAt
                  ? new Date(instructor.badgeRequest.requestedAt).toLocaleDateString()
                  : 'N/A',
              },
            ].map((item, i) => (
              <div key={i} className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-text-secondary">{item.label}</span>
                <span className="text-right font-semibold">{item.value}</span>
              </div>
            ))}
            <div>
              <p className="text-text-secondary mb-1 text-xs">Bio</p>
              <p className="text-sm leading-relaxed text-slate-600">
                {instructor.bio || 'No bio provided.'}
              </p>
            </div>
            {instructor.githubUrl && (
              <a
                href={instructor.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="text-primary flex items-center gap-1.5 text-xs font-semibold hover:underline"
              >
                <Eye size={12} /> View GitHub Profile
              </a>
            )}
            {instructor.linkedinUrl && (
              <a
                href={instructor.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="text-primary flex items-center gap-1.5 text-xs font-semibold hover:underline"
              >
                <Eye size={12} /> View LinkedIn Profile
              </a>
            )}
          </div>
          {instructor.badgeRequest?.status === 'pending' && (
            <div className="mt-5 flex gap-2">
              <button
                onClick={() => handleAction(instructor._id, 'approve')}
                className="bg-primary flex-1 rounded-sm py-3 text-sm font-bold text-white hover:bg-[#2a6159]"
              >
                Approve
              </button>
              <button
                onClick={() => handleAction(instructor._id, 'reject')}
                className="flex-1 rounded-sm border border-red-100 py-3 text-sm font-bold text-red-400 hover:bg-red-50"
              >
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
