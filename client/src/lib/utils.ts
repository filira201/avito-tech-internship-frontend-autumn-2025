import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import type { AdPriority, BadRequestError, NotFoundAdError, InternalServerError, ErrorInfo } from "./types";

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

// API Error Utils
// Type Guards
export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === "object" && error !== null && "status" in error;
}

export function isSerializedError(error: unknown): error is SerializedError {
  return typeof error === "object" && error !== null && "message" in error && !("status" in error);
}

export function getErrorMessage(error: FetchBaseQueryError | SerializedError | undefined): ErrorInfo | null {
  if (!error) {
    return null;
  }

  if (isSerializedError(error)) {
    return {
      title: "Ошибка сети",
      message: error.message || "Не удалось подключиться к серверу",
      type: "network_error",
    };
  }

  if (isFetchBaseQueryError(error)) {
    const { status, data } = error;

    if (status === 400 && typeof data === "object" && data !== null && "error" in data) {
      const errorData = data as BadRequestError;

      return {
        title: "Некорректный запрос",
        message: errorData.error,
        status: 400,
        type: "bad_request",
      };
    }

    if (status === 404 && typeof data === "object" && data !== null && "id" in data) {
      const errorData = data as NotFoundAdError;

      return {
        title: "Объявление не найдено",
        message: `${errorData.error} (ID: ${errorData.id})`,
        status: 404,
        type: "not_found",
      };
    }

    if (status === 404 && typeof data === "object" && data !== null && "path" in data) {
      return {
        title: "Страница не найдена",
        message: "Запрашиваемый ресурс не найден",
        status: 404,
        type: "not_found",
      };
    }

    if (status === 500 && typeof data === "object" && data !== null && "message" in data) {
      const errorData = data as InternalServerError;

      return {
        title: "Ошибка сервера",
        message: errorData.message || errorData.error,
        status: 500,
        type: "server_error",
      };
    }

    return {
      title: `Ошибка ${status}`,
      message:
        typeof data === "object" && data !== null && "error" in data
          ? String((data as { error: string }).error)
          : "Неизвестная ошибка, попробуйте позже",
      status: typeof status === "number" ? status : undefined,
      type: "unknown",
    };
  }

  return {
    title: "Неизвестная ошибка",
    message: "Что-то пошло не так",
    type: "unknown",
  };
}
