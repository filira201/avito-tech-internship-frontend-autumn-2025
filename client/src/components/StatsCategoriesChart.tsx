import { Card, CardBody, CardHeader } from "@heroui/react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { useGetCategoriesChartQuery } from "@/api";
import { StatsChartSkeleton } from "@/components";
import { categoryNameById, CHART_COLORS } from "@/lib";

export const StatsCategoriesChart = () => {
  const { data, isLoading, isFetching, isError } = useGetCategoriesChartQuery({ period: "week" });

  if (isLoading || isFetching) {
    return <StatsChartSkeleton />;
  }

  if (isError || !data) {
    return <h1>Error Stats Categories Chart</h1>;
  }

  const chartData = Object.entries(data).map(([categoryId, count]) => ({
    category: categoryNameById[Number(categoryId)] || `Категория ${categoryId}`,
    count,
  }));

  if (chartData.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <h3 className="text-xl font-bold">Распределение по категориям</h3>
        </CardHeader>
        <CardBody className="flex items-center justify-center min-h-[400px]">
          <p className="text-default-600">Нет данных для отображения</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <h3 className="text-xl font-bold">Распределение по категориям</h3>
      </CardHeader>
      <CardBody className="overflow-auto">
        <div className="min-w-[600px]">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" angle={-45} textAnchor="end" height={150} />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--heroui-content1))",
                  border: "1px solid hsl(var(--heroui-default-200))",
                  borderRadius: "8px",
                  color: "hsl(var(--heroui-foreground))",
                }}
                labelStyle={{
                  color: "hsl(var(--heroui-foreground))",
                  fontWeight: "600",
                }}
                itemStyle={{
                  color: "hsl(var(--heroui-foreground))",
                }}
              />
              <Bar dataKey="count" fill={CHART_COLORS.pending} name="Количество" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  );
};
