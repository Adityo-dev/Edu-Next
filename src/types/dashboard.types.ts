export type TOverviewStats = {
  totalUsers: number;
  newUsersThisMonth: number;
  totalCourses: number;
  newCoursesThisMonth: number;
  totalRevenue: number;
  newRevenueThisMonth: number;
  totalCommission: number;
};

export type TQuickActionStats = {
  pendingBadgeRequests: number;
  pendingWithdrawals: number;
  pendingReviews: number;
  pendingCourses: number;
};
