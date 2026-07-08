'use client';

import DeleteConfirmAlert from '@/components/dashboard/DeleteConfirmAlert/DeleteConfirmAlert';
import WriteReviewModal from '@/app/dashboard/student/reviews/_components/WriteReviewModal/WriteReviewModal';
import { TModalView } from '@/types/customModal.types';

export const MODAL_COMPONENTS: Record<TModalView, React.ReactNode> = {
  DELETE_CONFIRM: <DeleteConfirmAlert />,
  WRITE_REVIEW: <WriteReviewModal />,
  NONE: null,
};
