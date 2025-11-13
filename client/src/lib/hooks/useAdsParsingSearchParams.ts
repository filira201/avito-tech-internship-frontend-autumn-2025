import { useMemo } from "react";
import { useSearchParams } from "react-router";

import { ITEMS_PER_PAGE, type SortBy, type SortOrder } from "@/lib";
import { type AdsQueryParams } from "@/lib";

// Хук для парсинга параметров из URL и подготовки их для запроса
export const useAdsParsingSearchParams = () => {
  const [searchParams] = useSearchParams();

  const queryParams = useMemo((): AdsQueryParams => {
    const page = Number(searchParams.get("page") || "1");
    const limit = ITEMS_PER_PAGE;

    const status = searchParams.getAll("status");

    const categoryId = searchParams.get("categoryId") ? Number(searchParams.get("categoryId")) : undefined;
    const minPrice = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined;
    const maxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined;
    const search = searchParams.get("search") || "";
    const sortBy = (searchParams.get("sortBy") as SortBy) || undefined;
    const sortOrder = (searchParams.get("sortOrder") as SortOrder) || undefined;

    return {
      page,
      limit,
      status: status.length > 0 ? status : undefined,
      categoryId,
      minPrice,
      maxPrice,
      search: search || undefined,
      sortBy,
      sortOrder,
    };
  }, [searchParams]);

  return queryParams;
};
