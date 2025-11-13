import type { AD_PRIORITIES, AD_STATUSES, SORT_BY, SORT_ORDER } from "./constants";

export type AdStatus = (typeof AD_STATUSES)[number];
export type AdPriority = (typeof AD_PRIORITIES)[number];

export type SortBy = (typeof SORT_BY)[number];
export type SortOrder = (typeof SORT_ORDER)[number];

export type Seller = {
  id: number;
  name: string;
  rating: string;
  totalAds: number;
  registeredAt: string;
};

export type Advertisement = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  categoryId: number;
  status: AdStatus;
  priority: AdPriority;
  createdAt: string;
  updatedAt: string;
  images: string[];
  seller: Seller;
};

export type Pagination = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
};

export type AdsListResponse = {
  ads: Advertisement[];
  pagination: Pagination;
};

export type AdsQueryParams = {
  page?: number;
  limit?: number;
  status?: string[];
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
};
