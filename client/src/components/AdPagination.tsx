import { Pagination } from "@heroui/react";
import { useEffect } from "react";

import { useAdsUpdateSearchParams } from "@/lib";

type Props = {
  page: number;
  totalPages: number;
};

export const AdPagination = ({ page, totalPages }: Props) => {
  const updateSearchParams = useAdsUpdateSearchParams();
  // Скролл к верху при изменении страницы
  // TODO: посмотреть, не багаеться ли оно
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page]);

  const handlePageChange = (newPage: number) => {
    // Валидация: проверяем границы
    if (newPage < 1 || newPage > totalPages) {
      return;
    }

    // Обновляем URL параметр страницы
    updateSearchParams({ page: newPage });
  };

  // Не показываем пагинацию, если всего одна страница
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center">
      <Pagination
        className="cursor-pointer"
        size="lg"
        page={page}
        total={totalPages}
        onChange={handlePageChange}
        siblings={2}
        boundaries={2}
        showControls
      />
    </div>
  );
};
