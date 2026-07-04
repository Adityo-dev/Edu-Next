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
}

// Main Review Schema Interface
export interface IReview {
  _id: string;
  student: ReviewUser;
  course: ReviewCourse;
  rating: number;
  comment: string;
  status: 'pending' | 'published' | 'rejected';
  rejectionReason?: string;
  createdAt: string;
}

// Instructor API Query Parameter Interface
export interface IInstructorReviewQuery {
  page?: number;
  limit?: number;
  courseId?: string;
}

// Instructor Dashboard Response Interface
export interface InstructorReviewsResponse {
  success: boolean;
  message: string;
  data: IReview[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Admin Pending Response Interface
export interface AdminPendingReviewsResponse {
  success: boolean;
  message: string;
  total: number;
  data: IReview[];
}

// Admin Action (Publish/Reject) Response Interface
export interface ReviewActionResponse {
  success: boolean;
  message: string;
  data: Partial<IReview>;
}

// Public/Student General Response Interface
export interface DefaultReviewResponse {
  success: boolean;
  message: string;
  data: IReview[];
}
