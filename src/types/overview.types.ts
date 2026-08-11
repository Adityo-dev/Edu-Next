export interface IStudentCourseOverviewStats {
  enrolledCourses: {
    total: number;
    thisMonth: number;
  };
  completed: {
    total: number;
    completionRate: number;
  };
  certificates: {
    total: number;
    text: string;
  };
  hoursLearned: {
    total: string;
    thisWeek: string;
  };
}

export interface IInstructorWelcomeStats {
  name: string;
  activeCourses: number;
  pendingCourses: number;
  newEnrollmentsToday: number;
  avgRating: number;
  totalCourses: number;
}

export interface IInstructorOverviewStatus {
  courses: {
    total: number;
    thisMonth: number;
  };
  students: {
    total: number;
    thisWeek: number;
  };
  revenue: {
    total: number;
    thisMonth: number;
  };
  walletBalance: number;
}
