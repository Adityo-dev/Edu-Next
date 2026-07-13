'use client';

import DeleteConfirmAlert from '@/components/dashboard/DeleteConfirmAlert/DeleteConfirmAlert';
import WriteReviewModal from '@/app/dashboard/student/reviews/_components/WriteReviewModal/WriteReviewModal';
import SuspendConfirmAlert from '@/components/dashboard/SuspendConfirmAlert/SuspendConfirmAlert';
import LoginRequiredModal from '@/components/common/LoginRequiredModal/LoginRequiredModal';
import { TModalView } from '@/types/customModal.types';

export const MODAL_COMPONENTS: Record<TModalView, React.ReactNode> = {
  DELETE_CONFIRM: <DeleteConfirmAlert />,
  SUSPEND_CONFIRM: <SuspendConfirmAlert />,
  LOGIN_REQUIRED: <LoginRequiredModal />,
  WRITE_REVIEW: <WriteReviewModal />,
  NONE: null,
};
