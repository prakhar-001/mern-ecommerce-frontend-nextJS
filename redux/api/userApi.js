import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";


export const userAPI = createApi({
    reducerPath: "userApi", //name in redux store dev tools
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_VITE_SERVER}/api/v1/user/`}),//base url for all api
    tagTypes: ["users"],
    endpoints: (builder) => ({
        login: builder.mutation({//mutation - data will be sent to the api
            query: (user) => ({
                url: "new",
                method: "POST",
                body: user,
            }),
            invalidatesTags: ["users"],
        }),
        deleteUser: builder.mutation({
            query: ({ userId, adminUserId }) => ({
              url: `${userId}?id=${adminUserId}`,
              method: "DELETE",
            }),
            invalidatesTags: ["users"],
          }),
      
        allUsers: builder.query({
            query: (id) => `all?id=${id}`,
            providesTags: ["users"],
          }),
    }),
});

export const getUserData = async( id) => {
    try {
        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_VITE_SERVER}/api/v1/user/${id}`)
        return data;
    } catch (error) {
        throw error;
    }
}


export const {useLoginMutation, useAllUsersQuery, useDeleteUserMutation} = userAPI;