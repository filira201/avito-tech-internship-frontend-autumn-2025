import { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router";

import { useGetAdsQuery } from "@/api";
import { AdCard, AdPagination, Loader } from "@/components";
import { ITEMS_PER_PAGE } from "@/lib";

export const AdList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || "1");
  const limit = ITEMS_PER_PAGE;

  // Получаем данные с сервера
  const { data, isLoading, isError, isFetching } = useGetAdsQuery({ page, limit });

  // Скролл к верху при изменении страницы
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page]);

  // Обработчик изменения страницы
  const handlePageChange = useCallback(
    (page: number) => {
      if (data?.pagination?.totalPages === undefined) {
        return;
      }

      if (page < 1 || page > data?.pagination?.totalPages) {
        return;
      }

      searchParams.set("page", page.toString());
      setSearchParams(searchParams);
    },
    [setSearchParams, searchParams, data?.pagination?.totalPages]
  );

  // Обработка загрузки
  if (isLoading || isFetching) {
    return <Loader />;
  }

  // Обработка ошибки
  // TODO: Добавить обработку ошибки
  if (isError) {
    return <h1>Ошибка загрузки объявлений</h1>;
  }

  const ads = data?.ads || [];
  const pagination = data?.pagination;

  return (
    <div>
      <div className="mb-6">
        <p className="text-lg text-default-500">
          Всего объявлений: <span className="font-medium">{pagination?.totalItems || 0}</span>
        </p>
      </div>

      {/* Список карточек */}
      {ads.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh]">
          <p className="text-xl text-default-500">Объявления не найдены</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {ads.map((ad) => (
              // Компонент карточки объявления
              <AdCard key={ad.id} ad={ad} href={`/item/${ad.id}`} />
            ))}
          </div>

          {/* Пагинация */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex justify-center">
              <AdPagination page={page} totalPages={pagination.totalPages} handlePageChange={handlePageChange} />
            </div>
          )}
        </>
      )}
    </div>
  );
};
