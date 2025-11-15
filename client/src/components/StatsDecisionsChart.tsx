import { Card, CardBody, CardHeader } from "@heroui/react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { useGetDecisionsChartQuery } from "@/api";
import { StatsChartSkeleton } from "@/components";
import { CHART_COLORS, MODERATION_ACTIONS, moderationActionLabel } from "@/lib";

export const StatsDecisionsChart = () => {
  const { data, isLoading, isFetching, isError } = useGetDecisionsChartQuery({ period: "week" });

  if (isLoading || isFetching) {
    return <StatsChartSkeleton />;
  }

  if (isError || !data) {
    return <h1>Error Stats Decisions Chart</h1>;
  }

  // Форматируем данные для круговой диаграммы
  const chartData = [
    { name: moderationActionLabel.approved, value: data.approved },
    { name: moderationActionLabel.rejected, value: data.rejected },
    { name: moderationActionLabel.requestChanges, value: data.requestChanges },
  ];

  // Фильтруем данные с нулевыми значениями для лучшего отображения
  const filteredData = chartData.filter((item) => item.value > 0);

  if (filteredData.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <h3 className="text-xl font-bold">Распределение решений</h3>
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
        <h3 className="text-xl font-bold">Распределение решений</h3>
      </CardHeader>
      <CardBody className="overflow-x-auto">
        <div className="min-w-[600px]">
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={filteredData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {filteredData.map((entry) => {
                  const colorKey =
                    chartData.indexOf(entry) === 0
                      ? MODERATION_ACTIONS[0]
                      : chartData.indexOf(entry) === 1
                        ? MODERATION_ACTIONS[1]
                        : MODERATION_ACTIONS[2];

                  return <Cell key={`cell-${entry.name}`} fill={CHART_COLORS[colorKey]} />;
                })}
              </Pie>
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
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  );
};
