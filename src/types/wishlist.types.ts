import { ICourse } from './courseManagement.types';

export interface IWishlist {
  _id: string;
  user: string;
  course: ICourse;
  createdAt: string;
  updatedAt: string;
}

export interface IWishlistResponse {
  wishlists: IWishlist[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface IAddWishlistPayload {
  courseId: string;
}
