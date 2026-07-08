'use client';

import { useModal } from '@/context/ModalContext';
import { ShieldAlert } from 'lucide-react';
import { useState } from 'react';
import DynamicActionButton from '../DynamicActionButton/DynamicActionButton';

const SuspendConfirmAlert = () => {
  const { data, closeModal } = useModal();
  const [isProcessing, setIsProcessing] = useState(false);
  const [reason, setReason] = useState('');

  const displayName = data?.suspendItem || 'this item';
  const requireReason = data?.requireReason;

  const title = data?.title || 'Confirm Action';
  const actionLabel = data?.actionLabel || 'Suspend Now';
  const reasonLabel = data?.reasonLabel || 'Reason (Required)';
  const reasonPlaceholder = data?.reasonPlaceholder || 'E.g. Violation of terms, spam, etc.';

  const handleAction = async () => {
    if (!data?.onConfirm) return;
    if (requireReason && !reason.trim()) return;

    setIsProcessing(true);
    try {
      await data?.onConfirm(reason);
      closeModal();
    } catch (error) {
      console.error('Action failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center py-4 text-center">
      <div className="relative mb-5">
        <div className="absolute inset-0 animate-pulse rounded-full bg-yellow-500/10" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-yellow-500/20 bg-yellow-500/10 text-yellow-600">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow-500/5">
            <ShieldAlert size={22} />
          </div>
        </div>
      </div>

      <h3 className="mb-2 text-lg font-semibold tracking-tight antialiased">{title}</h3>

      <div className="mb-6 w-full px-2">
        <p className="text-text-secondary mb-4 text-sm leading-relaxed font-medium">
          {data?.description ? (
            data.description
          ) : (
            <>
              Are you sure you want to suspend
              <span className="mx-1 font-semibold break-all text-yellow-600">{`"${displayName}"`}</span>
              ?
            </>
          )}
        </p>

        {requireReason && (
          <div className="w-full text-left">
            <label className="text-text-secondary mb-1.5 block text-xs font-semibold">
              {reasonLabel}
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder={reasonPlaceholder}
              rows={3}
              className="w-full rounded-md border border-slate-200 bg-slate-50 p-2.5 text-sm transition-all outline-none focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10"
            />
          </div>
        )}
      </div>

      <div className="flex w-full gap-3 px-1">
        <DynamicActionButton
          variant="outline"
          label="Cancel"
          onClick={closeModal}
          className="flex-1"
        />

        <button
          onClick={handleAction}
          disabled={isProcessing || (requireReason && !reason.trim())}
          className="flex-1 rounded-sm bg-yellow-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-yellow-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isProcessing ? 'Processing...' : actionLabel}
        </button>
      </div>
    </div>
  );
};

export default SuspendConfirmAlert;
