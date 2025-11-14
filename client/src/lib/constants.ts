import { type AdStatus, type ModerationAction, type SortBy, type SortOrder } from "./types";

export const ITEMS_PER_PAGE = 10;

const CHIP_COLORS = ["default", "primary", "secondary", "success", "warning", "danger"] as const;
const STATUS_LABELS = ["На модерации", "Одобрено", "Отклонено", "Доработка"] as const;
// Маппинг для цвета статуса
export const statusColor: Record<AdStatus, (typeof CHIP_COLORS)[number]> = {
  pending: CHIP_COLORS[1],
  approved: CHIP_COLORS[3],
  rejected: CHIP_COLORS[5],
  draft: CHIP_COLORS[4],
};
// Маппинг для лейбла статуса объявления
export const statusLabel: Record<AdStatus, (typeof STATUS_LABELS)[number]> = {
  pending: STATUS_LABELS[0],
  approved: STATUS_LABELS[1],
  rejected: STATUS_LABELS[2],
  draft: STATUS_LABELS[3],
};

export const CATEGORIES = [
  { id: 0, name: "Электроника" },
  { id: 1, name: "Недвижимость" },
  { id: 2, name: "Транспорт" },
  { id: 3, name: "Работа" },
  { id: 4, name: "Услуги" },
  { id: 5, name: "Животные" },
  { id: 6, name: "Мода" },
  { id: 7, name: "Детское" },
] as const;
export const categoryNameById: Record<number, string> = CATEGORIES.reduce(
  (acc, category) => {
    acc[category.id] = category.name;

    return acc;
  },
  {} as Record<number, string>
);

export const MODERATION_ACTIONS = ["approved", "rejected", "requestChanges"] as const;
export const moderationActionLabel: Record<ModerationAction, (typeof STATUS_LABELS)[number]> = {
  approved: STATUS_LABELS[1],
  rejected: STATUS_LABELS[2],
  requestChanges: STATUS_LABELS[3],
};
export const moderationActionColor: Record<ModerationAction, (typeof CHIP_COLORS)[number]> = {
  approved: CHIP_COLORS[3],
  rejected: CHIP_COLORS[5],
  requestChanges: CHIP_COLORS[4],
};

export const AD_STATUSES = ["pending", "approved", "rejected", "draft"] as const;
export const AD_PRIORITIES = ["normal", "urgent"] as const;
export const SORT_BY = ["createdAt", "price", "priority"] as const;
export const SORT_ORDER = ["asc", "desc"] as const;

export const SORT_OPTIONS: { sortBy: SortBy; sortOrder: SortOrder; label: string }[] = [
  { sortBy: "createdAt", sortOrder: "desc", label: "По дате создания (новые сначала)" },
  { sortBy: "createdAt", sortOrder: "asc", label: "По дате создания (старые сначала)" },
  { sortBy: "price", sortOrder: "desc", label: "По цене (от дорогих к дешевым)" },
  { sortBy: "price", sortOrder: "asc", label: "По цене (от дешевых к дорогим)" },
  { sortBy: "priority", sortOrder: "desc", label: "По приоритету (срочные сначала)" },
  { sortBy: "priority", sortOrder: "asc", label: "По приоритету (обычные сначала)" },
];

export const REJECTION_REASONS = [
  "Запрещенный товар",
  "Неверная категория",
  "Некорректное описание",
  "Проблемы с фото",
  "Подозрение на мошенничество",
  "Другое",
] as const;
