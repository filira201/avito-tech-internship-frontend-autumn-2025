import { Card, CardBody, CardHeader, Skeleton } from "@heroui/react";

import { ITEMS_PER_PAGE } from "@/lib";

export const AdListSkeleton = () => {
  return (
    <div>
      {/* Skeleton для информации о количестве */}
      <div className="mb-6">
        <Skeleton className="w-64 rounded-lg">
          <div className="h-7 rounded-lg bg-default-200" />
        </Skeleton>
      </div>

      {/* Skeleton для карточек */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
          <AdCardSkeleton key={index} />
        ))}
      </div>

      {/* Skeleton для пагинации */}
      <div className="flex justify-center">
        <Skeleton className="w-80 rounded-lg">
          <div className="h-10 rounded-lg bg-default-200" />
        </Skeleton>
      </div>
    </div>
  );
};

const AdCardSkeleton = () => {
  return (
    <Card className="w-full h-full">
      <CardHeader className="p-0">
        <Skeleton className="w-full aspect-video rounded-none">
          <div className="w-full aspect-video bg-default-200" />
        </Skeleton>
      </CardHeader>
      <CardBody className="gap-2 flex flex-col">
        {/* Заголовок (2 строки), иногда конечно и в 1 помещается */}
        <div className="space-y-2">
          <Skeleton className="w-full rounded-lg">
            <div className="h-6 rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-3/4 rounded-lg">
            <div className="h-6 rounded-lg bg-default-200" />
          </Skeleton>
        </div>

        {/* Chip статуса */}
        <Skeleton className="w-1/3 rounded-full">
          <div className="h-7 rounded-full bg-default-200" />
        </Skeleton>

        {/* Цена */}
        <Skeleton className="w-1/2 rounded-lg">
          <div className="h-8 rounded-lg bg-default-300" />
        </Skeleton>

        {/* Категория и дата */}
        <div className="flex flex-col gap-1 mt-auto">
          <Skeleton className="w-2/3 rounded-lg">
            <div className="h-5 rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-3/4 rounded-lg">
            <div className="h-5 rounded-lg bg-default-200" />
          </Skeleton>
        </div>
      </CardBody>
    </Card>
  );
};
