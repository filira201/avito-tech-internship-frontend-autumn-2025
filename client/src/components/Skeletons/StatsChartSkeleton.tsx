import { Card, CardBody, CardHeader, Skeleton } from "@heroui/react";

export const StatsChartSkeleton = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <Skeleton className="w-1/2 rounded-lg">
          <div className="h-7 rounded-lg bg-default-200" />
        </Skeleton>
      </CardHeader>
      <CardBody>
        <Skeleton className="w-full rounded-lg">
          <div className="h-[350px] rounded-lg bg-default-200" />
        </Skeleton>
      </CardBody>
    </Card>
  );
};
