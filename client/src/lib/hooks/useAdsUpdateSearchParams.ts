import { useCallback } from "react";
import { useSearchParams } from "react-router";

// Хук для обновления нужных параметров в URL
export const useAdsUpdateSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Метод для обновления URL параметров
  const updateSearchParams = useCallback(
    (updates: Record<string, string | number | undefined | string[]>) => {
      const newParams = new URLSearchParams(searchParams);

      for (const [key, value] of Object.entries(updates)) {
        if (value === undefined || value === null || value === "") {
          newParams.delete(key);
        } else if (Array.isArray(value)) {
          if (value.length > 0) {
            // Удаляем все существующие значения для этого ключа
            newParams.delete(key);
            // Добавляем каждое значение как отдельный параметр
            value.forEach((item) => {
              newParams.append(key, item);
            });
          } else {
            newParams.delete(key);
          }
        } else {
          newParams.set(key, value.toString());
        }
      }

      setSearchParams(newParams);
    },
    [searchParams, setSearchParams]
  );

  return updateSearchParams;
};
