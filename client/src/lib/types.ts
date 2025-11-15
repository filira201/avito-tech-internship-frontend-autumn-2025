import type {
  AD_PRIORITIES,
  AD_STATUSES,
  MODERATION_ACTIONS,
  REJECTION_REASONS,
  SORT_BY,
  SORT_ORDER,
  STATS_PERIOD,
} from "./constants";

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

export type ModerationAction = (typeof MODERATION_ACTIONS)[number];

export type ModerationHistory = {
  id: number;
  moderatorId: number;
  moderatorName: string;
  action: ModerationAction;
  reason: string | null;
  comment: string | null;
  timestamp: string;
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
  characteristics: Record<string, string>;
  moderationHistory: ModerationHistory[];
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

export type RejectionReason = (typeof REJECTION_REASONS)[number];

export type RejectAdRequest = {
  reason: RejectionReason;
  comment?: string;
};

export type RequestChangesAdRequest = {
  reason: RejectionReason;
  comment?: string;
};

// Типы для статистики
export type StatsPeriod = (typeof STATS_PERIOD)[number];

export type StatsQueryParams = {
  period?: StatsPeriod;
  startDate?: string;
  endDate?: string;
};

export type StatsSummary = {
  totalReviewed: number;
  totalReviewedToday: number;
  totalReviewedThisWeek: number;
  totalReviewedThisMonth: number;
  approvedPercentage: number;
  rejectedPercentage: number;
  requestChangesPercentage: number;
  averageReviewTime: number;
};

export type ActivityData = {
  date: string;
  approved: number;
  rejected: number;
  requestChanges: number;
};

export type DecisionsData = {
  approved: number;
  rejected: number;
  requestChanges: number;
};

export type CategoriesData = Record<string, number>;
