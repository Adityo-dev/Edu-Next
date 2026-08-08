/* eslint-disable @typescript-eslint/no-explicit-any */
import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';
import { useModal } from '@/context/ModalContext';
import { useApproveBadgeRequestMutation } from '@/redux/features/admin/instructorManagement/adminInstructor.api';
import { TInstructorBadgeRequest } from '@/types/adminInstructor.types';
import { Eye, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';

const statusColorMap: Record<string, string> = {
  pending: '#eab308',
  approved: '#10b981',
  rejected: '#ef4444',
};

const InstructorDetail = () => {
  const { data, closeModal } = useModal();
  const instructor = data?.instructor as TInstructorBadgeRequest | null;
  const [approveBadgeRequest, { isLoading }] = useApproveBadgeRequestMutation();

  const handleAction = async (id: string, action: 'approve' | 'reject') => {
    try {
      await approveBadgeRequest({ id, action }).unwrap();
      toast.success(`Request ${action}d successfully`);
      closeModal();
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to update status');
      console.error('Failed to update status', error);
    }
  };

  return (
    <div className="flex h-full flex-col pr-4.5">
      {instructor ? (
        <>
          <div className="flex-1 overflow-y-auto pb-4">
            <div className="mb-4 flex flex-col items-center text-center">
              <Image
                src={instructor?.avatar}
                alt={instructor?.fullName}
                width={80}
                height={80}
                className="border-border mb-2 rounded-full border-2 shadow-sm"
              />
              <h3 className="text-lg font-semibold">{instructor?.fullName}</h3>
              <p className="text-text-secondary text-sm">{instructor?.email}</p>
              <div className="mt-1">
                <DynamicBadge
                  text={instructor?.badgeRequest?.status || 'unknown'}
                  color={statusColorMap[instructor?.badgeRequest?.status] || '#64748b'}
                />
              </div>
            </div>
            <div className="mt-6 space-y-3 text-sm">
              {[
                { label: 'Requested Badge', value: instructor?.badgeRequest?.requestedBadge },
                { label: 'Current Badge', value: instructor?.badge || 'None' },
                { label: 'Expertise', value: instructor?.areaOfExpertise?.join(', ') || 'N/A' },
                { label: 'Experience', value: `${instructor?.experienceYears} Years` },
                { label: 'Phone', value: instructor?.phone || 'N/A' },
                {
                  label: 'Joined',
                  value: instructor?.createdAt
                    ? new Date(instructor?.createdAt).toLocaleDateString()
                    : 'N/A',
                },
                { label: 'Email Verified', value: instructor?.isEmailVerified ? 'Yes' : 'No' },
                { label: 'Suspended', value: instructor?.isSuspended ? 'Yes' : 'No' },
                {
                  label: 'Applied At',
                  value: instructor?.badgeRequest?.requestedAt
                    ? new Date(instructor?.badgeRequest.requestedAt).toLocaleDateString()
                    : 'N/A',
                },
              ].map((item, i) => (
                <div key={i} className="flex justify-between border-b border-slate-50 pb-3">
                  <span className="text-text-secondary">{item.label}</span>
                  <span className="text-right">{item.value}</span>
                </div>
              ))}

              <div className="pt-2">
                <p className="text-text-secondary mb-2 text-xs font-semibold tracking-wider uppercase">
                  Biography
                </p>
                <div className="rounded-sm bg-slate-50 p-2.5">
                  <p className="text-text-primary text-sm">
                    {instructor?.bio || 'No bio provided.'}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                {instructor?.githubUrl && (
                  <Link
                    href={instructor?.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary flex items-center gap-1.5 text-sm font-medium hover:underline"
                  >
                    <Eye size={14} /> GitHub
                  </Link>
                )}
                {instructor?.linkedinUrl && (
                  <Link
                    href={instructor?.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary flex items-center gap-1.5 text-sm font-medium hover:underline"
                  >
                    <Eye size={14} /> LinkedIn
                  </Link>
                )}
              </div>
            </div>
          </div>

          {instructor?.badgeRequest?.status === 'pending' && (
            <div className="border-border/50 mt-4 flex gap-3 border-t bg-white pt-4 pb-2">
              <DynamicActionButton
                label={isLoading ? 'Processing...' : 'Approve Application'}
                disabled={isLoading}
                onClick={() => handleAction(instructor?._id, 'approve')}
                className="flex-1"
              />
              <DynamicActionButton
                label={isLoading ? 'Processing...' : 'Reject Application'}
                disabled={isLoading}
                onClick={() => handleAction(instructor?._id, 'reject')}
                variant="danger"
                className="flex-1"
              />
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Users size={48} className="text-text-secondary mb-4" />
          <p className="text-text-secondary text-base">Instructor details not available.</p>
        </div>
      )}
    </div>
  );
};

export default InstructorDetail;
