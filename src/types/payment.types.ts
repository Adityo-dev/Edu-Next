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
  processedBy?: string;
  refundRefId?: string;
  refundedAmount?: number;
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
  holding: number;
  pendingWithdrawal: number;
  withdrawn: number;
  totalRefunded: number;
  payments: TPaymentItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export type TRevenueSummary = {
  totalRevenue: number;
  totalCommission: number;
  totalInstructorEarnings: number;
};

export type TRevenueChartData = {
  month: string;
  totalRevenue: number;
  commission: number;
  instructorEarning: number;
};

export type TAdminRevenueOverview = {
  summary: TRevenueSummary;
  chartData: TRevenueChartData[];
};

export type TWeeklyRevenueChartData = {
  day: string;
  revenue: number;
};

export type TInstructorWeeklyRevenue = {
  totalThisWeek: number;
  chartData: TWeeklyRevenueChartData[];
};
