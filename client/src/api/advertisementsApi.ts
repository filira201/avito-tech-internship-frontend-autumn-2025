import { api } from "./baseApi";

import { ITEMS_PER_PAGE, type AdsListResponse, type AdsQueryParams } from "@/lib";

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
  }),
});

export const { useGetAdsQuery } = advertisementsApi;
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
