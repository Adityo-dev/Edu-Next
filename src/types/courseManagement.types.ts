export type TCourseLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type TCourseLanguage = 'বাংলা' | 'English';
export type TCourseStatus = 'draft' | 'pending' | 'published' | 'rejected';
export type TCourseSortOption =
  | 'Most Popular'
  | 'Highest Rated'
  | 'Newest'
  | 'Price: Low to High'
  | 'Price: High to Low';

export interface ILesson {
  title: string;
  duration: string;
  videoUrl: string;
  isFree: boolean;
  order: number;
}

export interface ICourseSection {
  title: string;
  order: number;
  lessons: ILesson[];
}

export interface ICourse {
  _id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  enrolledCount: number;
  rating: number;
  estimatedPrice: number;
  thumbnail: string;
  category: string;
  level: TCourseLevel;
  language: TCourseLanguage;
  tags: string[];
  hasCertificate: boolean;
  requirements: string[];
  whatYouLearn: string[];
  totalDuration: string;
  status: TCourseStatus;
  rejectedReason?: string;
  badge?: string;
  sections: ICourseSection[];
  createdAt: string;
  updatedAt: string;
}

// API Response Structure Helper
export interface TQueryResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// Course Stats Interface
export interface ICourseStats {
  totalCourses: number;
  published: number;
  pending: number;
  rejected: number;
}
