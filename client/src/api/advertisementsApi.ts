import { api } from "./baseApi";

import {
  ITEMS_PER_PAGE,
  type AdsListResponse,
  type AdsQueryParams,
  type Advertisement,
  type RejectAdRequest,
  type RequestChangesAdRequest,
} from "@/lib";

export const advertisementsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAds: builder.query<AdsListResponse, AdsQueryParams>({
      query: (params) => {
        const queryString = buildAdsQueryString(params);

        return {
          url: `/ads?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["Advertisements"],
    }),

    getAdById: builder.query<Advertisement, number>({
      query: (id) => ({
        url: `/ads/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Advertisements", id }],
    }),

    approveAd: builder.mutation<{ message: string; ad: Advertisement }, number>({
      query: (id) => ({
        url: `/ads/${id}/approve`,
        method: "POST",
      }),
      invalidatesTags: ["Advertisements"],
    }),

    rejectAd: builder.mutation<{ message: string; ad: Advertisement }, { id: number; body: RejectAdRequest }>({
      query: ({ id, body }) => ({
        url: `/ads/${id}/reject`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Advertisements"],
    }),

    requestChangesAd: builder.mutation<
      { message: string; ad: Advertisement },
      { id: number; body: RequestChangesAdRequest }
    >({
      query: ({ id, body }) => ({
        url: `/ads/${id}/request-changes`,
        method: "POST",
        body,
      }),

      invalidatesTags: ["Advertisements"],
    }),
  }),
});

export const {
  useGetAdsQuery,
  useGetAdByIdQuery,
  useApproveAdMutation,
  useRejectAdMutation,
  useRequestChangesAdMutation,
  useLazyGetAdByIdQuery,
} = advertisementsApi;
// TODO: Мб все таки можно по нормальному потом сделать, надо попробовать
// Формирует query строку для запроса списка объявлений

function buildAdsQueryString(params: AdsQueryParams): string {
  const {
    page = 1,
    limit = ITEMS_PER_PAGE,
    status,
    categoryId,
    minPrice,
    maxPrice,
    search,
    sortBy,
    sortOrder,
  } = params;

  const searchParams = new URLSearchParams();

  searchParams.set("page", String(page));
  searchParams.set("limit", String(limit));

  if (status && status.length > 0) {
    status.forEach((s) => {
      searchParams.append("status", s);
    });
  }

  if (categoryId !== undefined) {
    searchParams.set("categoryId", String(categoryId));
  }

  if (minPrice !== undefined) {
    searchParams.set("minPrice", String(minPrice));
  }

  if (maxPrice !== undefined) {
    searchParams.set("maxPrice", String(maxPrice));
  }

  if (search) {
    searchParams.set("search", search);
  }

  if (sortBy) {
    searchParams.set("sortBy", sortBy);
  }

  if (sortOrder) {
    searchParams.set("sortOrder", sortOrder);
  }

  return searchParams.toString();
}
