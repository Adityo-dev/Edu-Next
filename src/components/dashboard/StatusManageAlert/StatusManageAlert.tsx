'use client';

import { useModal } from '@/context/ModalContext';
import { AlertTriangle, CheckCircle, ShieldAlert } from 'lucide-react';
import { useState } from 'react';
import DynamicActionButton from '../DynamicActionButton/DynamicActionButton';

const StatusManageAlert = () => {
  const { data, closeModal } = useModal();
  const [isProcessing, setIsProcessing] = useState(false);
  const [reason, setReason] = useState('');

  const displayName = data?.suspendItem || 'this item';
  const requireReason = data?.requireReason;

  const title = data?.title || 'Confirm Action';
  const actionLabel = data?.actionLabel || 'Confirm';
  const reasonLabel = data?.reasonLabel || 'Reason (Required)';
  const reasonPlaceholder = data?.reasonPlaceholder || 'Enter reason...';
  const variant = data?.variant || 'warning';

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

  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return {
          icon: <CheckCircle size={22} />,
          bgPulse: 'bg-emerald-500/10',
          borderBg: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600',
          innerBg: 'bg-emerald-500/5',
          btnBg: 'bg-emerald-500 hover:bg-emerald-600',
          focusRing: 'focus:border-emerald-500 focus:ring-emerald-500/10',
          textColor: 'text-emerald-600',
        };
      case 'danger':
        return {
          icon: <AlertTriangle size={22} />,
          bgPulse: 'bg-red-500/10',
          borderBg: 'border-red-500/20 bg-red-500/10 text-red-600',
          innerBg: 'bg-red-500/5',
          btnBg: 'bg-red-500 hover:bg-red-600',
          focusRing: 'focus:border-red-500 focus:ring-red-500/10',
          textColor: 'text-red-600',
        };
      case 'warning':
      default:
        return {
          icon: <ShieldAlert size={22} />,
          bgPulse: 'bg-yellow-500/10',
          borderBg: 'border-yellow-500/20 bg-yellow-500/10 text-yellow-600',
          innerBg: 'bg-yellow-500/5',
          btnBg: 'bg-yellow-500 hover:bg-yellow-600',
          focusRing: 'focus:border-yellow-500 focus:ring-yellow-500/10',
          textColor: 'text-yellow-600',
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className="flex flex-col items-center py-4 text-center">
      <div className="relative mb-5">
        <div className={`absolute inset-0 animate-pulse rounded-full ${styles.bgPulse}`} />
        <div
          className={`relative flex h-16 w-16 items-center justify-center rounded-full border ${styles.borderBg}`}
        >
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-full ${styles.innerBg}`}
          >
            {styles.icon}
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
              Are you sure you want to perform this action on
              <span
                className={`mx-1 font-semibold break-all ${styles.textColor}`}
              >{`"${displayName}"`}</span>
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
              className={`w-full rounded-md border border-slate-200 bg-slate-50 p-2.5 text-sm transition-all outline-none focus:ring-4 ${styles.focusRing}`}
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

        <DynamicActionButton
          label={isProcessing ? 'Processing...' : actionLabel}
          onClick={handleAction}
          disabled={isProcessing || (requireReason && !reason.trim())}
          className={`${styles.btnBg} flex-1`}
        />
      </div>
    </div>
  );
};

export default StatusManageAlert;
