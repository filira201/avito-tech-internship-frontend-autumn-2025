import { Card, CardBody, CardHeader, Skeleton } from "@heroui/react";

export const AdItemSkeleton = () => {
  return (
    <div className="mb-6">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          <div className="flex-1 space-y-4">
            {/* AdHead Skeleton */}
            <Skeleton className="w-3/4 rounded-lg">
              <div className="h-10 rounded-lg bg-default-300" />
            </Skeleton>
            <div className="flex items-center gap-4">
              <Skeleton className="w-32 rounded-lg">
                <div className="h-8 rounded-lg bg-default-200" />
              </Skeleton>
              <Skeleton className="w-48 rounded-lg">
                <div className="h-6 rounded-lg bg-default-200" />
              </Skeleton>
            </div>
            <Skeleton className="w-1/2 rounded-lg">
              <div className="h-9 rounded-lg bg-default-300" />
            </Skeleton>
            <Skeleton className="w-1/3 rounded-lg">
              <div className="h-6 rounded-lg bg-default-200" />
            </Skeleton>
          </div>
        </div>
      </div>

      {/* AdImageGallery Skeleton */}
      <Card className="mb-6">
        <CardBody className="p-0">
          <Skeleton className="w-full aspect-video rounded-lg">
            <div className="w-full aspect-video bg-default-200" />
          </Skeleton>
        </CardBody>
      </Card>

      {/* AdDescription, AdCharacteristics, SellerInfo, ModerationHistory Skeleton */}
      {Array.from({ length: 4 }).map((_, index) => (
        <Card key={index} className="mb-6">
          <CardHeader>
            <Skeleton className="w-1/3 rounded-lg">
              <div className="h-7 rounded-lg bg-default-200" />
            </Skeleton>
          </CardHeader>
          <CardBody className="space-y-3">
            <Skeleton className="w-full rounded-lg">
              <div className="h-5 rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-5 rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-3/4 rounded-lg">
              <div className="h-5 rounded-lg bg-default-200" />
            </Skeleton>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};
