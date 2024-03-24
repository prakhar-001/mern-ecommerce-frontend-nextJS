import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dashboardAPI = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_VITE_SERVER}/api/v1/dashboard/`,
  }),
  endpoints: (builder) => ({
    stats: builder.query({
      query: (id) => `stats?id=${id}`,
      keepUnusedDataFor: 0,
    }),
    pie: builder.query({
      query: (id) => `pie?id=${id}`,
      keepUnusedDataFor: 0,
    }),
    bar: builder.query({
      query: (id) => `bar?id=${id}`,
      keepUnusedDataFor: 0,
    }),
    line: builder.query({
      query: (id) => `line?id=${id}`,
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useBarQuery, useStatsQuery, useLineQuery, usePieQuery } =
  dashboardAPI;
