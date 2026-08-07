'use client';

import DynamicModal from './_components/DynamicModal/DynamicModal';
import DynamicDrawer from './_components/DynamicDrawer/DynamicDrawer';
import { useModal } from '@/context/ModalContext';
import { MODAL_COMPONENTS } from './modal-mapping';

export const ModalContainer = () => {
  const { isOpen, view, title, description, layout, closeModal } = useModal();

  if (!isOpen || view === 'NONE') return null;

  const content = MODAL_COMPONENTS[view];

  if (layout === 'DRAWER') {
    return (
      <DynamicDrawer isOpen={isOpen} onClose={closeModal} title={title} description={description}>
        {content}
      </DynamicDrawer>
    );
  }

  return (
    <DynamicModal isOpen={isOpen} onClose={closeModal} title={title} description={description}>
      {content}
    </DynamicModal>
  );
};

export default ModalContainer;
