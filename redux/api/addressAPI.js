import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const addressAPI = createApi({
  reducerPath: "addressApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_VITE_SERVER}/api/v1/address/`,//base url
  }),
  tagTypes: ["addresses"],
  endpoints: (builder) => ({

    newAddress: builder.mutation({
      query: (address) => ({
        url: "new",
        method: "POST",
        body: address,
      }),
      invalidatesTags: ["addresses"],
    }),

    updateAddress: builder.mutation({
      query: ({ formData, addressId }) => ({
        url: `${addressId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["addresses"],
    }),

    deleteAddress: builder.mutation({
      query: ({ addressId }) => ({
        url: `${addressId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["addresses"],
    }),

    myAddresses: builder.query({
      query: (id) => `my?id=${id}`,
      providesTags: ["addresses"],
    }),
    
    allAddresses: builder.query({
      query: (id) => `all?id=${id}`,
      providesTags: ["addresses"],
    }),
    
    // orderDetails: builder.query({
    //   query: (id) => id,
    //   providesTags: ["orders"],
    // }),
  }),
});

export const {
    useNewAddressMutation,
    useUpdateAddressMutation,
    useDeleteAddressMutation,
    useMyAddressesQuery,
    useAllAddressesQuery,
} = addressAPI;
