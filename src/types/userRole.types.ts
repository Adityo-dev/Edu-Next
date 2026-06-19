export type TUserRole = 'admin' | 'instructor' | 'student';
export type TUserStatus = 'active' | 'suspended';
export type TInstructorVerificationStatus = 'approved' | 'rejected';

export interface TUserListItem {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  role: TUserRole;
  isVerified: boolean;
  isSuspended: boolean;
  areaOfExpertise: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TUserStats {
  totalUsers: number;
  totalStudents: number;
  totalInstructors: number;
  totalSuspended: number;
}
