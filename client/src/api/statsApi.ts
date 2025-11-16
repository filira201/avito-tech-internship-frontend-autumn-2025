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
      providesTags: [{ type: "Stats", id: "SUMMARY" }],
    }),

    getActivityChart: builder.query<ActivityData[], StatsQueryParams>({
      query: (params) => ({
        url: "/stats/chart/activity",
        method: "GET",
        params,
      }),
      providesTags: [{ type: "Stats", id: "ACTIVITY" }],
    }),

    getDecisionsChart: builder.query<DecisionsData, StatsQueryParams>({
      query: (params) => ({
        url: "/stats/chart/decisions",
        method: "GET",
        params,
      }),
      providesTags: [{ type: "Stats", id: "DECISIONS" }],
    }),

    getCategoriesChart: builder.query<CategoriesData, StatsQueryParams>({
      query: (params) => ({
        url: "/stats/chart/categories",
        method: "GET",
        params,
      }),
      providesTags: [{ type: "Stats", id: "CATEGORIES" }],
    }),
  }),
});

export const {
  useGetStatsSummaryQuery,
  useGetActivityChartQuery,
  useGetDecisionsChartQuery,
  useGetCategoriesChartQuery,
} = statsApi;
