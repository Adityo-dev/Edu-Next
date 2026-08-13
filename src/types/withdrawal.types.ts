export interface IPayoutSettings {
  bank?: {
    bankName: string;
    accountName: string;
    accountNumber: string;
    branch: string;
    routingNumber: string;
  };
  bkash?: {
    mobileNumber: string;
  };
  nagad?: {
    mobileNumber: string;
  };
}

export interface IInstructorEarnings {
  totalEarned: number;
  holding: number;
  available: number;
  pendingWithdrawal: number;
  withdrawn: number;
}

export interface IWithdrawalRequest {
  _id: string;
  instructor:
    | string
    | {
        _id: string;
        email: string;
        phone: string;
        fullName: string;
      };
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  payoutDetails?: {
    method: 'bank' | 'bkash' | 'nagad';
    mobileNumber?: string;
    bankName?: string;
    accountName?: string;
    accountNumber?: string;
    branch?: string;
    routingNumber?: string;
  };
  adminTransactionId?: string;
  adminNote?: string;
  requestedAt?: string;
  createdAt: string;
  updatedAt: string;
  processedAt?: string;
  processedBy?: string;
}
