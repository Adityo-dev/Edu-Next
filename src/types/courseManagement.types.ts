// --- Core Enums & Primitive Types ---
export type TCourseStatus = 'draft' | 'pending' | 'published' | 'rejected' | 'suspended';
export type TCourseLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type TCourseLanguage = 'Bangla' | 'English' | 'Hindi';
export type TCourseBadge = 'New' | 'Bestseller' | 'Trending' | 'none' | null;

// --- Sub-Structures (Curriculum) ---
export interface ILesson {
  _id?: string;
  title: string;
  duration: string;
  videoUrl: string;
  isFree: boolean;
  order: number;
}

export interface ISection {
  _id?: string;
  title: string;
  order: number;
  lessons: ILesson[];
}

export interface IInstructor {
  _id: string;
  fullName: string;
  email?: string;
  avatar?: string;
  bio?: string;
  totalCourses?: number;
  totalStudents?: number;
  rating?: number;
  badge?: string;
  experienceYears?: number;
}

// --- Main Course Interface ---
export interface ICourse {
  _id: string;
  id?: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  estimatedPrice: number;
  thumbnail: string;
  category: string;
  level: TCourseLevel;
  language: TCourseLanguage;
  tags: string[];
  instructor: IInstructor;
  sections: ISection[];
  lessonsCount: number;
  totalDuration: string;
  enrolledCount: number;
  rating: number;
  totalReviews: number;
  hasCertificate: boolean;
  status: TCourseStatus;
  rejectedReason?: string | null;
  suspendedReason?: string | null;
  badge: TCourseBadge;
  requirements: string | string[];
  whatYouLearn: string | string[];
  createdAt: string;
  updatedAt: string;
}

// --- CourseListItem Interface ---
export interface ICourseListItem {
  _id: string;
  title: string;
  slug: string;
  thumbnail: string;
  category: string;
  level: TCourseLevel;
  language: TCourseLanguage;
  rating: number;
  enrolledCount: number;
  totalDuration: string;
  price: number;
  estimatedPrice: number;
  hasCertificate: boolean;
  instructor: {
    _id: string;
    fullName: string;
    avatar?: string;
  };
}

// --- Generic & Common API Responses ---
export interface ICommonResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface IPaginatedData<T> {
  courses: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ICourseStats {
  totalCourses: number;
  published: number;
  pending: number;
  rejected: number;
}

// --- Query Parameters ---
export interface IGetCoursesQueryParams {
  search?: string;
  category?: string;
  level?: TCourseLevel;
  language?: TCourseLanguage;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  certificate?: boolean;
  sort?: 'Most Popular' | 'Highest Rated' | 'Newest' | 'Price: Low to High' | 'Price: High to Low';
  page?: number;
  limit?: number;
}

export interface IAdminCoursesQueryParams {
  status?: 'all' | TCourseStatus;
  search?: string;
  page?: number;
  limit?: number;
}

export interface IInstructorCoursesQueryParams {
  status?: 'all' | TCourseStatus;
  page?: number;
  limit?: number;
}

// --- Mutation Payloads ---
export interface IUpdateStatusPayload {
  status: 'published' | 'rejected' | 'suspended';
  rejectedReason?: string | null;
  suspendedReason?: string | null;
  badge?: TCourseBadge;
}

// --- Student Enrollment Types ---
export interface IStudentStats {
  totalEnrolled: number;
  inProgress: number;
  completed: number;
  certificates: number;
}

export interface IEnrolledCourse {
  enrollmentId: string;
  enrolledAt: string;
  course: {
    _id: string;
    title: string;
    thumbnail: string;
    category: string;
    lessonsCount: number;
    totalDuration: string;
    rating: number;
    instructor: {
      _id: string;
      firstName: string;
      lastName: string;
      avatar: string;
    };
  };
  progress: {
    completedLessonsCount: number;
    percentage: number;
    isCourseCompleted: boolean;
    status: string;
    lastActivityAt: string;
  };
}

export interface ICoursePlaybackData {
  course: {
    _id: string;
    title: string;
    slug: string;
    totalDuration: string;
    lessonsCount: number;
    hasCertificate: boolean;
    sections: ISection[];
  };
  progress: {
    completedLessons: string[];
    completedLessonsCount: number;
    percentage: number;
    isCourseCompleted: boolean;
  };
}

export interface IInstructorStudentStats {
  totalStudents: number;
  activeThisWeek: number;
  completed: number;
  withReviews: number;
}

export interface IInstructorStudent {
  _id: string;
  student: {
    _id: string;
    name: string;
    email: string;
    avatar: string;
  };
  course: {
    _id: string;
    title: string;
  };
  progress: number;
  rating: number;
  lastActive: string;
}

export interface IInstructorStudentsData {
  students: IInstructorStudent[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface IInstructorStudentsQueryParams {
  courseId?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface IInstructorAnalyticsStats {
  revenue: { total: number; thisMonth: number };
  students: { total: number; thisMonth: number };
  views: { total: number; thisMonth: number };
  rating: { average: number; totalReviews: number };
}

export interface IInstructorAnalyticsGrowth {
  revenueGrowth: number;
  studentGrowth: number;
  viewGrowth: number;
  ratingChange: number;
}

export interface IRevenueChartData {
  month: string;
  revenue: number;
  students: number;
}

export interface IInstructorRevenueOverview {
  totalRevenue: number;
  totalStudents: number;
  chartData: IRevenueChartData[];
}

export interface ICoursePerformance {
  _id: string;
  title: string;
  price: number;
  thumbnail: string;
  rating: number;
  studentsCount: number;
  totalViews?: number;
  revenue: number;
  completionRate: number;
}

export interface IInstructorCoursePerformanceData {
  courses: ICoursePerformance[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface IInstructorCoursePerformanceQueryParams {
  courseId?: string;
  search?: string;
  page?: number;
  limit?: number;
}
