import type { AdPriority } from "./types";

// Форматирует цену с разделителями тысяч и символом валюты
export const formatPrice = (price: number): string => {
  return `${price.toLocaleString("ru-RU")} ₽`;
};

// Валидирует числовое значение цены
export const validatePrice = (value: string): number | undefined => {
  if (value === "") {
    return undefined;
  }

  const numValue = Number(value);

  if (isNaN(numValue) || numValue < 0) {
    return undefined;
  }

  return numValue;
};

// Форматирует дату и время в читаемый формат
export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);

  return date.toLocaleString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const checkIsUrgentPriority = (priority: AdPriority): boolean => {
  return priority === "urgent";
};
