import { apiClient } from '@/redux/apiClient/apiClient';
import { ICommonResponse } from '@/types/courseManagement.types';
import { IWishlistResponse, IAddWishlistPayload } from '@/types/wishlist.types';

export const wishlistApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    getWishlists: builder.query<
      ICommonResponse<IWishlistResponse>,
      { page?: number; limit?: number }
    >({
      query: (params) => ({
        url: '/wishlists',
        method: 'GET',
        params,
      }),
      providesTags: ['Wishlist'],
    }),
    addWishlist: builder.mutation<ICommonResponse<null>, IAddWishlistPayload>({
      query: (body) => ({
        url: '/wishlists',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Wishlist'],
    }),
    removeWishlist: builder.mutation<ICommonResponse<null>, string>({
      query: (courseId) => ({
        url: `/wishlists/${courseId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Wishlist'],
    }),
  }),
});

export const { useGetWishlistsQuery, useAddWishlistMutation, useRemoveWishlistMutation } =
  wishlistApi;
