import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import { XCircle } from 'lucide-react';

export default async function PaymentFailPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const tranId = resolvedSearchParams.tran_id as string;

  return (
    <div className="mt-16 flex min-h-[70vh] items-center justify-center bg-[#F9FAFB] px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md overflow-hidden rounded-lg border border-slate-200 bg-white p-8 text-center shadow-xs">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <XCircle className="h-10 w-10 text-red-600" />
        </div>

        <h2 className="mt-6 text-2xl font-semibold tracking-tight">Payment Failed</h2>

        <p className="mt-2 text-sm text-slate-500">
          We couldn&apos;t process your payment. This could be due to a network issue, insufficient
          funds, or the transaction was cancelled.
        </p>

        {tranId && (
          <div className="mt-6 rounded-md bg-slate-50 p-4">
            <p className="text-xs tracking-wider text-slate-500 uppercase">Transaction ID</p>
            <p className="mt-1 font-mono text-sm font-semibold text-slate-700">{tranId}</p>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3">
          <DynamicActionButton label="Try Again" href="/courses" className="w-full" />
          <DynamicActionButton
            label="Contact Support"
            href="/contact"
            variant="outline"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
