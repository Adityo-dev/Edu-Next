export type TUserRole = 'ADMIN';

export type TAccountStatus = 'ACTIVE' | 'PENDING' | 'INACTIVE';

export type TLoginUser = {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  avatar: string;
  role: string;
};

export interface IUser {
  id: string;
  username: string;
  email: string;
  role: TUserRole;
  accountStatus: TAccountStatus;
  isActive: boolean;
  isDeleted: boolean;
  isVerified: boolean;
  avatarUrl: string | null;
  fullName: string | null;
  phone: string | null;
  lastActive: string | null;
  lastLogin: string | null;
  createdAt: string;
  updatedAt: string;
}
