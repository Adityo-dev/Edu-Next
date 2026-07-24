/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TCommissionHistory {
  oldRate: number;
  newRate: number;
  updatedBy: any;
  updatedAt: string;
}

export interface TCommissionData {
  commissionRate: number;
  changeHistory: TCommissionHistory[];
}

export interface TGetCommissionResponse {
  success: boolean;
  message: string;
  data: TCommissionData;
}

export interface TGetCurrentCommissionResponse {
  success: boolean;
  message: string;
  data: {
    commissionRate: number;
  };
}

export interface TUpdateCommissionResponse {
  success: boolean;
  message: string;
  data: {
    currentRate: number;
    changeHistory: TCommissionHistory[];
  };
}

export interface TGetCommissionStatsResponse {
  success: boolean;
  message: string;
  data: {
    currentRate: number;
    commissionEarned: number;
    totalRevenue: number;
  };
}
