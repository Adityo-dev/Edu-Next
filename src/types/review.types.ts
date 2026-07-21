// Student & Instructor Minimal Info
export interface ReviewUser {
  _id?: string;
  firstName: string;
  lastName: string;
  email?: string;
  avatar: string;
}

// Course Minimal Info
export interface ReviewCourse {
  _id: string;
  title: string;
  thumbnail: string;
  instructor?: {
    _id: string;
    firstName: string;
    lastName: string;
  };
}

// Main Review Schema Interface
export interface IReview {
  _id: string;
  student: ReviewUser | string | null;
  course: ReviewCourse;
  rating: number;
  comment: string;
  status: 'pending' | 'published' | 'rejected';
  rejectionReason?: string;
  createdAt: string;
  updatedAt?: string;
}

// Common Pagination Type
export interface PaginationQuery {
  page?: number;
  limit?: number;
}

// Admin API Query Parameter Interface
export interface AdminReviewQuery extends PaginationQuery {
  status?: string;
  search?: string;
}

// Instructor API Query Parameter Interface
export interface IInstructorReviewQuery extends PaginationQuery {
  courseId?: string;
  search?: string;
  rating?: number;
}

// Metadata details for paginated responses
interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Admin Reviews Filtered List Response
export interface AdminReviewsResponse extends PaginationMeta {
  success: boolean;
  message: string;
  data: IReview[];
}

// Admin Stats Counter Data
export interface AdminReviewStatsResponse {
  success: boolean;
  message: string;
  data: {
    total: number;
    pending: number;
    published: number;
    rejected: number;
  };
}

// Instructor Dashboard Response Interface
export interface InstructorReviewsResponse extends PaginationMeta {
  success: boolean;
  message: string;
  data: IReview[];
}

// Instructor Review Stats Response
export interface InstructorReviewStatsResponse {
  success: boolean;
  message: string;
  data: {
    averageRating: number;
    totalReviews: number;
    starDistribution: {
      '1': number;
      '2': number;
      '3': number;
      '4': number;
      '5': number;
    };
    starPercentage: {
      '1': number;
      '2': number;
      '3': number;
      '4': number;
      '5': number;
    };
  };
}

// Student Review Stats Response
export interface StudentReviewStatsResponse {
  success: boolean;
  message: string;
  data: {
    total: number;
    published: number;
    pending: number;
  };
}

// Student Submitted Reviews List Response
export interface StudentSubmittedReviewsResponse extends PaginationMeta {
  success: boolean;
  message: string;
  data: IReview[];
}

// Student Unreviewed Courses Response
export interface StudentUnreviewedCoursesResponse extends PaginationMeta {
  success: boolean;
  message: string;
  data: ReviewCourse[];
}

// Admin Action & Dynamic Mutation Response Interface
export interface ReviewActionResponse {
  success: boolean;
  message: string;
  data: Partial<IReview>;
}

// Public Course Reviews Response Interface
export interface CourseReviewsResponse {
  success: boolean;
  message: string;
  data: {
    stats: {
      averageRating: number;
      totalReviews: number;
      starDistribution: {
        '1': number;
        '2': number;
        '3': number;
        '4': number;
        '5': number;
      };
      starPercentage: {
        '1': number;
        '2': number;
        '3': number;
        '4': number;
        '5': number;
      };
    };
    reviews: IReview[];
    total: number;
  };
}
