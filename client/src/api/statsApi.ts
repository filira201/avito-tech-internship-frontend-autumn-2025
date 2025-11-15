import { api } from "./baseApi";

import type { ActivityData, CategoriesData, DecisionsData, StatsQueryParams, StatsSummary } from "@/lib";

export const statsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getStatsSummary: builder.query<StatsSummary, StatsQueryParams>({
      query: (params) => ({
        url: "/stats/summary",
        method: "GET",
        params,
      }),
      providesTags: ["Stats"],
    }),

    getActivityChart: builder.query<ActivityData[], StatsQueryParams>({
      query: (params) => ({
        url: "/stats/chart/activity",
        method: "GET",
        params,
      }),
      providesTags: ["Stats"],
    }),

    getDecisionsChart: builder.query<DecisionsData, StatsQueryParams>({
      query: (params) => ({
        url: "/stats/chart/decisions",
        method: "GET",
        params,
      }),
      providesTags: ["Stats"],
    }),

    getCategoriesChart: builder.query<CategoriesData, StatsQueryParams>({
      query: (params) => ({
        url: "/stats/chart/categories",
        method: "GET",
        params,
      }),
      providesTags: ["Stats"],
    }),
  }),
});

export const {
  useGetStatsSummaryQuery,
  useGetActivityChartQuery,
  useGetDecisionsChartQuery,
  useGetCategoriesChartQuery,
} = statsApi;
