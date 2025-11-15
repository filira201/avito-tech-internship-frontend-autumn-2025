import { StatsCardSkeleton } from "./Skeletons/StatsCardsSkeleton";

import { useGetStatsSummaryQuery } from "@/api";
import { StatsCard } from "@/components";
import type { StatsSummary } from "@/lib";

const STATS_CARDS = [
  {
    id: "today",
    title: "Всего проверено",
    subtitle: "За сегодня",
    getValue: (stats: StatsSummary) => stats.totalReviewedToday,
  },
  {
    id: "week",
    title: "Всего проверено",
    subtitle: "За неделю",
    getValue: (stats: StatsSummary) => stats.totalReviewedThisWeek,
  },
  {
    id: "month",
    title: "Всего проверено",
    subtitle: "За месяц",
    getValue: (stats: StatsSummary) => stats.totalReviewedThisMonth,
  },
  {
    id: "approved",
    title: "Процент одобренных",
    subtitle: "От общего числа",
    getValue: (stats: StatsSummary) => `${stats.approvedPercentage.toFixed(1)}%`,
  },
  {
    id: "rejected",
    title: "Процент отклоненных",
    subtitle: "От общего числа",
    getValue: (stats: StatsSummary) => `${stats.rejectedPercentage.toFixed(1)}%`,
  },
  {
    id: "avgTime",
    title: "Среднее время проверки",
    subtitle: "На одно объявление",
    getValue: (stats: StatsSummary) => formatReviewTime(stats.averageReviewTime),
  },
];

export const StatsCards = () => {
  const { data: stats, isLoading, isFetching, isError } = useGetStatsSummaryQuery({ period: "week" });

  if (isLoading || isFetching) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {Array.from({ length: STATS_CARDS.length }).map((_, index) => (
          <StatsCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  // TODO: сюда вставить текст + ретрай для повтора
  if (isError || !stats) {
    return <h1>Error</h1>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {STATS_CARDS.map((card) => (
        <StatsCard key={card.id} title={card.title} value={card.getValue(stats)} subtitle={card.subtitle} />
      ))}
    </div>
  );
};

// Форматирование среднего времени проверки
function formatReviewTime(seconds: number): string {
  if (seconds < 60) {
    return `${seconds} сек`;
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes} мин ${remainingSeconds} сек`;
}
