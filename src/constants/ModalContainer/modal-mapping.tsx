'use client';

import DeleteConfirmAlert from '@/components/dashboard/DeleteConfirmAlert/DeleteConfirmAlert';
import { TModalView } from '@/types/customModal.types';
// import dynamic from 'next/dynamic';

// Dynamic imports for modal components
// const DeleteConfirmAlert = dynamic(
//   () => import('@/components/shared/dashboard/super-admin/DeleteConfirmAlert/DeleteConfirmAlert'),
// );

// Mapping of modal components
export const MODAL_COMPONENTS: Record<TModalView, React.ReactNode> = {
  DELETE_CONFIRM: <DeleteConfirmAlert />,
  NONE: null,
};
