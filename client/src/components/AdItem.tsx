import { useParams } from "react-router";

import { useGetAdByIdQuery } from "@/api";
import {
  AdCharacteristics,
  AdImageGallery,
  AdHead,
  Loader,
  ModerationHistory,
  SellerInfo,
  AdDescription,
} from "@/components";

export const AdItem = () => {
  const { id } = useParams<{ id: string }>();
  const adId = id ? Number(id) : null;

  // Загружаем детальную информацию об объявлении
  const { data: ad, isLoading, isError } = useGetAdByIdQuery(adId as number, { skip: adId === null });

  // Обработка загрузки
  if (isLoading) {
    return <Loader />;
  }

  // Обработка ошибки
  if (isError || !ad || adId === null) {
    return <h1>Объявление не найдено</h1>;
  }

  return (
    <div className="mb-6">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          <div className="flex-1">
            <AdHead
              title={ad.title}
              status={ad.status}
              priority={ad.priority}
              category={ad.category}
              price={ad.price}
              createdAt={ad.createdAt}
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <AdImageGallery images={ad.images} title={ad.title} />
      </div>

      <div className="mb-6">
        <AdDescription description={ad.description} />
      </div>

      <div className="mb-6">
        <AdCharacteristics characteristics={ad.characteristics} />
      </div>

      <div className="mb-6">
        <SellerInfo seller={ad.seller} />
      </div>

      <div className="mb-6">
        <ModerationHistory history={ad.moderationHistory} />
      </div>
    </div>
  );
};
