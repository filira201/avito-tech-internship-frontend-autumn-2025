import { type AdStatus } from "./types";

export const ITEMS_PER_PAGE = 10;
export const AD_STATUSES = ["pending", "approved", "rejected", "draft"] as const;
export const AD_PRIORITIES = ["normal", "urgent"] as const;
const CHIP_COLORS = ["default", "primary", "secondary", "success", "warning", "danger"] as const;
const STATUS_LABELS = ["На модерации", "Одобрено", "Отклонено", "Черновик"] as const;

// Маппинг для цвета статуса
export const statusColor: Record<AdStatus, (typeof CHIP_COLORS)[number]> = {
  pending: CHIP_COLORS[3],
  approved: CHIP_COLORS[2],
  rejected: CHIP_COLORS[4],
  draft: CHIP_COLORS[0],
};

// Маппинг для лейбла статуса объявления
export const statusLabel: Record<AdStatus, (typeof STATUS_LABELS)[number]> = {
  pending: STATUS_LABELS[0],
  approved: STATUS_LABELS[1],
  rejected: STATUS_LABELS[2],
  draft: STATUS_LABELS[3],
};
