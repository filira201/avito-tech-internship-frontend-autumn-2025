import { useGetAdsQuery } from "@/api";
import { AdCard, AdListSkeleton, AdPagination } from "@/components";
import { useAdsParsingSearchParams, usePreservedQuery } from "@/lib";

export const AdList = () => {
  const queryParams = useAdsParsingSearchParams();
  const preservedQuery = usePreservedQuery();

  // Получаем данные с сервера
  const { data, isLoading, isError, isFetching } = useGetAdsQuery(queryParams);

  // Обработка загрузки
  if (isLoading || isFetching) {
    return <AdListSkeleton />;
  }

  // Обработка ошибки
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

      {/* Список карточек  */}
      {ads.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh]">
          <p className="text-xl text-default-500">Объявления не найдены</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {ads.map((ad) => (
              // Компонент карточки объявления
              <AdCard key={ad.id} ad={ad} href={`/item/${ad.id}${preservedQuery}`} />
            ))}
          </div>

          {/* Пагинация */}
          {pagination && <AdPagination page={queryParams.page || 1} totalPages={pagination.totalPages} />}
        </>
      )}
    </div>
  );
};
