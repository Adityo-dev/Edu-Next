/* eslint-disable no-console */
'use client';

import { useModal } from '@/context/ModalContext';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import DynamicActionButton from '../DynamicActionButton/DynamicActionButton';

const DeleteConfirmAlert = () => {
  const { data, closeModal } = useModal();
  const [isDeleting, setIsDeleting] = useState(false);

  const displayName = data?.deleteItem || 'this item';

  const handleDelete = async () => {
    if (!data?.onConfirm) return;

    setIsDeleting(true);
    try {
      await data?.onConfirm();
      closeModal();
    } catch (error) {
      console.error('Action failed:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col items-center py-4 text-center">
      <div className="relative mb-5">
        <div className="bg-danger/10 absolute inset-0 animate-pulse rounded-full" />
        <div className="border-danger/20 bg-danger/10 text-danger relative flex h-16 w-16 items-center justify-center rounded-full border">
          <div className="bg-danger/5 flex h-11 w-11 items-center justify-center rounded-full">
            <Trash2 size={22} />
          </div>
        </div>
      </div>

      <h3 className="mb-2 text-lg font-semibold tracking-tight antialiased">Confirm Deletion</h3>

      <div className="mb-6 px-2">
        <p className="text-text-secondary text-sm leading-relaxed font-medium">
          Are you sure you want to permanently delete
          <span className="text-danger mx-1 font-semibold break-all">{`"${displayName}"`}</span>?
          This action cannot be undone.
        </p>
      </div>

      <div className="flex w-full gap-3 px-1">
        <DynamicActionButton
          variant="outline"
          label="Cancel"
          onClick={closeModal}
          className="flex-1"
        />

        <DynamicActionButton
          variant="danger"
          label={isDeleting ? 'Deleting...' : 'Delete Now'}
          onClick={handleDelete}
          disabled={isDeleting}
          className="bg-danger hover:bg-danger/90 flex-1"
        />
      </div>
    </div>
  );
};

export default DeleteConfirmAlert;
