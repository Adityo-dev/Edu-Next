// --- Core Enums & Primitive Types ---
export type TCourseStatus = 'draft' | 'pending' | 'published' | 'rejected' | 'suspended';
export type TCourseLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type TCourseLanguage = 'বাংলা' | 'English';
export type TCourseBadge = 'New' | 'Bestseller' | 'Trending' | null;

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
  firstName: string;
  lastName: string;
  email: string;
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
  rejectedReason: string | null;
  suspendedReason: string | null;
  badge: TCourseBadge;
  requirements: string[];
  whatYouLearn: string[];
  createdAt: string;
  updatedAt: string;
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
