import { api } from "./baseApi";

import { ITEMS_PER_PAGE, type AdsListResponse } from "@/lib";

export const advertisementsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAds: builder.query<AdsListResponse, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = ITEMS_PER_PAGE }) => ({
        url: "/ads",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["Advertisements"],
    }),
  }),
});

export const { useGetAdsQuery } = advertisementsApi;
