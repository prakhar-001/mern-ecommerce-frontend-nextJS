import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const wishlistAPI = createApi({
  reducerPath: "wishlistApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_VITE_SERVER}/api/v1/wishlist/`,//base url
  }),
  tagTypes: ["wishlist"],
  endpoints: (builder) => ({

    newItemWishlist: builder.mutation({
      query: (wishlistItem) => ({
        url: "new",
        method: "POST",
        body: wishlistItem,
      }),
      invalidatesTags: ["wishlist"],
    }),

    deleteItemWishlist: builder.mutation({
      query: ({ itemId }) => ({
        url: `${itemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["wishlist"],
    }),

    myWishlist: builder.query({
      query: (id) => `my?id=${id}`,
    //   query: ({id, page = 1, size = 10 }) => `my?id=${id}&page=${page}&size=${size}`,
    //   query: ({ page = 1, size = 10 }) => `my?page=${page}&size=${size}`,
      providesTags: ["wishlist"],
    }),
  }),
});

export const {
  useNewItemWishlistMutation,
  useDeleteItemWishlistMutation,
  useMyWishlistQuery,
} = wishlistAPI;
