export interface TBadgeRequest {
  requestedBadge: string;
  status: string;
  requestedAt: string;
}

export interface TInstructorBadgeRequest {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  bio: string;
  areaOfExpertise: string[];
  experienceYears: number;
  avatar: string;
  coverPhoto: string;
  linkedinUrl: string;
  githubUrl: string;
  badge: string;
  isEmailVerified: boolean;
  isSuspended: boolean;
  createdAt: string;
  badgeRequest: TBadgeRequest;
}

export interface TGetBadgeRequestsResponse {
  success: boolean;
  message: string;
  data: {
    instructors: TInstructorBadgeRequest[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export interface TInstructorProfile {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  bio: string;
  areaOfExpertise: string[];
  experienceYears: number;
  avatar: string;
  coverPhoto: string;
  linkedinUrl: string;
  githubUrl: string;
  badge: string;
  isEmailVerified: boolean;
  isSuspended: boolean;
  createdAt: string;
  badgeRequest?: TBadgeRequest;
}

export interface TGetInstructorProfileResponse {
  success: boolean;
  message: string;
  data: TInstructorProfile;
}

export interface TApproveBadgeResponse {
  success: boolean;
  message: string;
  data: TInstructorProfile; // Response contains updated instructor info
}

export interface TCancelBadgeResponse {
  success: boolean;
  message: string;
  data: TInstructorProfile; // Response contains updated instructor info
}
