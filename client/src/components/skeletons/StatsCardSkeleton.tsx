import { Card, CardBody, CardFooter, CardHeader, Skeleton } from "@heroui/react";

export const StatsCardSkeleton = () => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-1">
        <Skeleton className="w-3/4 rounded-lg">
          <div className="h-7 rounded-lg bg-default-200" />
        </Skeleton>
      </CardHeader>
      <CardBody className="gap-2 py-1">
        <Skeleton className="w-2/4 rounded-lg">
          <div className="h-9 rounded-lg bg-default-300" />
        </Skeleton>
      </CardBody>
      <CardFooter className="pt-1">
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-6 rounded-lg bg-default-200" />
        </Skeleton>
      </CardFooter>
    </Card>
  );
};
