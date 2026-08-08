'use client';

import DeleteConfirmAlert from '@/components/dashboard/DeleteConfirmAlert/DeleteConfirmAlert';
import WriteReviewModal from '@/app/dashboard/student/reviews/_components/WriteReviewModal/WriteReviewModal';
import StatusManageAlert from '@/components/dashboard/StatusManageAlert/StatusManageAlert';
import LoginRequiredModal from '@/components/shared/LoginRequiredModal/LoginRequiredModal';
import RefundDetailsModal from '@/app/dashboard/instructor/wallet/_components/TransactionHistory/_components/RefundDetailsModal/RefundDetailsModal';
import CreateTicketModal from '@/components/dashboard/support/CreateTicketModal';
import CategoryFormModal from '@/app/dashboard/admin/dynamic-content/_components/CategoryManager/_components/CategoryFormModal/CategoryFormModal';
import SubcategoryManager from '@/app/dashboard/admin/dynamic-content/_components/CategoryManager/_components/SubcategoryManager/SubcategoryManager';
import InstructorDetail from '@/app/dashboard/admin/instructors/_components/InstructorDetail/InstructorDetail';
import { TModalView } from '@/types/customModal.types';

export const MODAL_COMPONENTS: Record<TModalView, React.ReactNode> = {
  DELETE_CONFIRM: <DeleteConfirmAlert />,
  STATUS_MANAGE: <StatusManageAlert />,
  LOGIN_REQUIRED: <LoginRequiredModal />,
  WRITE_REVIEW: <WriteReviewModal />,
  REFUND_DETAILS: <RefundDetailsModal />,
  CREATE_TICKET: <CreateTicketModal />,
  CATEGORY_FORM: <CategoryFormModal />,
  SUBCATEGORY_MANAGEMENT: <SubcategoryManager />,
  INSTRUCTOR_BADGE_DETAILS: <InstructorDetail />,
  NONE: null,
};
