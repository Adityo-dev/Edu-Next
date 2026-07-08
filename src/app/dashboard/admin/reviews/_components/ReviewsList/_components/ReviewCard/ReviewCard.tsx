/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
'use client';

import DynamicTableActions from '@/components/dashboard/DynamicTableActions/DynamicTableActions';
import { IReview } from '@/types/review.types';
import { FormatDateTime } from '@/utils/formatDateTime';
import { ShieldAlert, Star } from 'lucide-react';
import Image from 'next/image';

interface ActionItem {
  type: 'save' | 'suspend' | 'delete' | 'view' | 'edit' | 'message';
  label: string;
  isLoading?: boolean;
  onClick: () => void;
}

interface ReviewCardProps {
  review: IReview;
  isPublishing: boolean;
  isRejecting: boolean;
  isDeleting: boolean;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (id: string) => void;
}

const isSpam = (text: string) =>
  text?.includes('WWW.') || text?.includes('http') || text?.toUpperCase() === text;

const ReviewCard = ({
  review,
  isPublishing,
  isRejecting,
  isDeleting,
  onApprove,
  onReject,
  onDelete,
}: ReviewCardProps) => {
  const actions: ActionItem[] = [];

  if (review.status === 'pending') {
    actions.push(
      {
        type: 'save',
        label: 'Approve',
        isLoading: isPublishing,
        onClick: () => onApprove(review._id),
      },
      {
        type: 'suspend',
        label: 'Reject',
        isLoading: isRejecting,
        onClick: () => onReject(review._id),
      },
    );
  }

  actions.push({
    type: 'delete',
    label: 'Delete',
    isLoading: isDeleting,
    onClick: () => onDelete(review._id),
  });

  const isStudentObject = (student: any): student is import('@/types/review.types').ReviewUser => {
    return student && typeof student !== 'string' && 'firstName' in student;
  };

  const studentName = isStudentObject(review.student)
    ? `${review.student.firstName} ${review.student.lastName}`
    : 'Unknown Student';
  const avatarSrc = isStudentObject(review.student)
    ? review.student.avatar
    : '/fallback-avatar.png';

  return (
    <div
      className={`rounded-md border bg-white! p-5 shadow-xs transition-all ${
        review.status === 'pending'
          ? 'border-yellow-100 bg-yellow-50/10'
          : isSpam(review.comment)
            ? 'border-red-100 bg-red-50/10'
            : 'border-slate-100'
      }`}
    >
      <div className="flex gap-4">
        <Image
          src={avatarSrc}
          alt={studentName}
          width={44}
          height={44}
          className="h-11 w-11 shrink-0 rounded-full border-2 border-slate-100 object-cover"
        />
        <div className="flex-1">
          <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
            <div>
              <p
                className={`font-semibold ${!review.student && 'text-sm font-medium text-slate-400'}`}
              >
                {studentName}
              </p>
              <p className="text-text-secondary text-xs">
                {review.course?.title || 'Unknown Course'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {isSpam(review.comment) && (
                <span className="text-danger flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold">
                  <ShieldAlert size={12} /> Spam Detected
                </span>
              )}
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-bold capitalize ${
                  review.status === 'pending'
                    ? 'bg-yellow-50 text-yellow-600'
                    : review.status === 'published'
                      ? 'text-primary bg-emerald-50'
                      : 'text-danger bg-red-50'
                }`}
              >
                {review.status}
              </span>
            </div>
          </div>

          <div className="mb-2 flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={13}
                fill={i < review.rating ? '#ffc107' : 'none'}
                color="#ffc107"
              />
            ))}
            <span className="text-text-secondary ml-2 text-xs">
              {review.createdAt ? FormatDateTime(review.createdAt) : ''}
            </span>
          </div>

          <p className="text-text-secondary mb-4 text-sm leading-relaxed wrap-break-word">
            {review.comment}
          </p>

          <div className="mt-2">
            <DynamicTableActions actions={actions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
