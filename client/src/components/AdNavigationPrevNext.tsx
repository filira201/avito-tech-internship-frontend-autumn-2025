import { Button } from "@heroui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate, useParams } from "react-router";

import { useGetAdsQuery } from "@/api";
import { useAdsParsingSearchParams, usePreservedQuery } from "@/lib";

export const AdNavigationPrevNext = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const preservedQuery = usePreservedQuery();
  const queryParams = useAdsParsingSearchParams();

  // Получает объявления без статуса и с лимитом  151, если сервер будет всегда 150 возвращат, то будет работать
  // пробовал много способов, как сделать навигацию, но всегда были с этим проблемы,
  // этот способ хоть и подходит только для версии под тестовое задание, где
  // сервер возвращает 150 объявлений максимум, но зато это полностью рабочая версия
  const clearParams = { ...queryParams, status: undefined, limit: 151 };

  const { data } = useGetAdsQuery(clearParams);

  if (!id || !data?.ads) {
    return null;
  }

  const currentId = Number(id);
  const ads = data.ads;

  // Находим индекс текущего объявления
  const currentIndex = ads.findIndex((ad) => ad.id === currentId);

  if (currentIndex === -1) {
    return null;
  }

  // Определяем ID предыдущего и следующего объявления
  const prevAd = currentIndex > 0 ? ads[currentIndex - 1] : null;
  const nextAd = currentIndex < ads.length - 1 ? ads[currentIndex + 1] : null;

  const handlePrev = () => {
    if (prevAd) {
      navigate(`/item/${prevAd.id}${preservedQuery}`);
    }
  };

  const handleNext = () => {
    if (nextAd) {
      navigate(`/item/${nextAd.id}${preservedQuery}`);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-2 flex-wrap">
        <Button startContent={<ChevronLeft />} onPress={handlePrev} isDisabled={!prevAd} size="lg" variant="flat">
          Предыдущее
        </Button>

        <Button endContent={<ChevronRight />} onPress={handleNext} isDisabled={!nextAd} size="lg" variant="flat">
          Следующее
        </Button>
      </div>

      {/* Информация о текущей позиции */}
      <p className="text-lg text-default-600 whitespace-nowrap">
        Объявление {currentIndex + 1} из {ads.length}
      </p>
    </div>
  );
};
