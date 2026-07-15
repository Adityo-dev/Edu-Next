export type TPaymentCourse = {
  _id: string;
  title: string;
  price: number;
  thumbnail: string;
};

export type TRefundStatus = {
  status: string;
  reason?: string;
  requestedAt?: string;
  processedAt?: string;
  adminNote?: string;
};

export type TPaymentItem = {
  _id: string;
  student: string;
  course: TPaymentCourse;
  instructor: string;
  tranId: string;
  amount: number;
  currency: string;
  commissionRate: number;
  commissionAmount: number;
  instructorEarning: number;
  status: string;
  payoutStatus: string;
  refund: TRefundStatus;
  createdAt: string;
  updatedAt: string;
  bankTranId?: string;
  enrollment?: string;
  paidAt?: string;
  valId?: string;
};

export type TInitiatePaymentResponse = {
  paymentUrl: string;
  tranId: string;
};

export type TRefundRequest = {
  reason: string;
};

export type TProcessRefundRequest = {
  action: 'approve' | 'reject';
  adminNote?: string;
};

export type TInstructorEarnings = {
  totalEarned: number;
  available: number;
  pendingWithdrawal: number;
  withdrawn: number;
  payments: TPaymentItem[];
};
