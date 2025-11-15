import { Card, CardBody, CardHeader } from "@heroui/react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { useGetActivityChartQuery } from "@/api";
import { StatsChartSkeleton } from "@/components";
import { CHART_COLORS, moderationActionLabel } from "@/lib";

export const StatsActivityChart = () => {
  const { data, isLoading, isFetching, isError } = useGetActivityChartQuery({ period: "week" });

  if (isLoading || isFetching) {
    return <StatsChartSkeleton />;
  }

  if (isError || !data) {
    return <h1>Error Stats Activity Chart</h1>;
  }

  // Данные для графика
  const chartData = data.map((item) => ({
    date: new Date(item.date).toLocaleDateString("ru-RU", { day: "2-digit", month: "short" }),
    [moderationActionLabel.approved]: item.approved,
    [moderationActionLabel.rejected]: item.rejected,
    [moderationActionLabel.requestChanges]: item.requestChanges,
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <h3 className="text-xl font-bold">График активности по дням</h3>
      </CardHeader>
      <CardBody className="overflow-x-auto">
        <div className="min-w-[600px]">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
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
              <Legend />
              <Bar dataKey={moderationActionLabel.approved} fill={CHART_COLORS.approved} />
              <Bar dataKey={moderationActionLabel.rejected} fill={CHART_COLORS.rejected} />
              <Bar dataKey={moderationActionLabel.requestChanges} fill={CHART_COLORS.requestChanges} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  );
};
