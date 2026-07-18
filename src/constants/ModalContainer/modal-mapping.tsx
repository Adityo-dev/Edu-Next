'use client';

import DeleteConfirmAlert from '@/components/dashboard/DeleteConfirmAlert/DeleteConfirmAlert';
import WriteReviewModal from '@/app/dashboard/student/reviews/_components/WriteReviewModal/WriteReviewModal';
import StatusManageAlert from '@/components/dashboard/StatusManageAlert/StatusManageAlert';
import LoginRequiredModal from '@/components/common/LoginRequiredModal/LoginRequiredModal';
import RefundDetailsModal from '@/app/dashboard/instructor/wallet/_components/TransactionHistory/_components/RefundDetailsModal/RefundDetailsModal';
import { TModalView } from '@/types/customModal.types';

export const MODAL_COMPONENTS: Record<TModalView, React.ReactNode> = {
  DELETE_CONFIRM: <DeleteConfirmAlert />,
  STATUS_MANAGE: <StatusManageAlert />,
  LOGIN_REQUIRED: <LoginRequiredModal />,
  WRITE_REVIEW: <WriteReviewModal />,
  REFUND_DETAILS: <RefundDetailsModal />,
  NONE: null,
};
