'use client';

import { useModal } from '@/context/ModalContext';
import { TPaymentItem } from '@/types/payment.types';
import { FormatDateTime } from '@/utils/formatDateTime';

const RefundDetailsModal = () => {
  const { data } = useModal();
  const selectedTx = data as TPaymentItem | null;

  if (!selectedTx) return null;

  return (
    <div className="space-y-3">
      {/* Course info */}
      <div className="border-primary/20 rounded-sm border bg-white px-3 py-3">
        <p className="text-primary text-xs font-semibold tracking-wide uppercase">Course</p>
        <p className="mt-1 text-sm font-semibold">{selectedTx?.course?.title || 'Course Sale'}</p>
        <p className="text-text-secondary mt-0.5 font-mono text-xs">TXN: {selectedTx?.tranId}</p>
      </div>

      {/* Amounts grid */}
      <div className="grid grid-cols-2 gap-2">
        <div className="border-primary/20 rounded-sm border bg-white px-3 py-2.5">
          <p className="text-text-secondary text-xs">Original Amount</p>
          <p className="text-primary mt-0.5 text-lg font-black">
            ৳{selectedTx?.amount?.toLocaleString()}
          </p>
        </div>
        <div className="rounded-sm border border-red-200 bg-white px-3 py-2.5">
          <p className="text-danger text-xs">Refunded to Student</p>
          <p className="text-danger mt-0.5 text-lg font-black">
            ৳{selectedTx?.refund?.refundedAmount?.toLocaleString() ?? 0}
          </p>
        </div>
        <div className="border-primary/20 rounded-sm border bg-white px-3 py-2.5">
          <p className="text-text-secondary text-xs">Your Earning (Lost)</p>
          <p className="text-text-secondary mt-0.5 text-lg font-black line-through">
            ৳{selectedTx?.instructorEarning?.toLocaleString()}
          </p>
        </div>
        <div className="border-primary/20 rounded-sm border bg-white px-3 py-2.5">
          <p className="text-text-secondary text-xs">Refund Ref ID</p>
          <p className="mt-0.5 font-mono text-xs font-semibold break-all text-slate-600">
            {selectedTx?.refund?.refundRefId ?? '—'}
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="border-primary/20 rounded-sm border bg-white">
        <p className="border-primary/10 border-b px-4 py-2 text-xs font-semibold tracking-wide text-slate-400 uppercase">
          Timeline
        </p>
        {/* Student reason */}
        <div className="border-primary/10 border-b px-3 py-3">
          <div className="flex items-start gap-2">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-yellow-400"></span>
            <div>
              <p className="text-text-placeholder text-xs font-semibold">Student&apos;s Reason</p>
              <p className="mt-0.5 text-sm">&ldquo;{selectedTx?.refund?.reason || '—'}&rdquo;</p>
              {selectedTx?.refund?.requestedAt && (
                <p className="text-text-secondary mt-1 text-xs">
                  Requested: {FormatDateTime(selectedTx?.refund?.requestedAt)}
                </p>
              )}
            </div>
          </div>
        </div>
        {/* Admin note */}
        <div className="px-3 py-3">
          <div className="flex items-start gap-2">
            <span className="bg-primary mt-1 h-2 w-2 shrink-0 rounded-full"></span>
            <div>
              <p className="text-text-placeholder text-xs font-semibold">Admin Note</p>
              <p className="mt-0.5 text-sm">&ldquo;{selectedTx?.refund?.adminNote || '—'}&rdquo;</p>
              {selectedTx?.refund?.processedAt && (
                <p className="text-text-secondary mt-1 text-xs">
                  Processed: {FormatDateTime(selectedTx?.refund?.processedAt)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundDetailsModal;
