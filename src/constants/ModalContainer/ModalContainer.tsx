'use client';

import DynamicModal from '@/components/dashboard/DynamicModal/DynamicModal';
import { useModal } from '@/context/ModalContext';
import { MODAL_COMPONENTS } from './modal-mapping';

export const ModalContainer = () => {
  const { isOpen, view, title, description, closeModal } = useModal();

  if (!isOpen || view === 'NONE') return null;

  return (
    <DynamicModal isOpen={isOpen} onClose={closeModal} title={title} description={description}>
      {MODAL_COMPONENTS[view]}
    </DynamicModal>
  );
};

export default ModalContainer;
