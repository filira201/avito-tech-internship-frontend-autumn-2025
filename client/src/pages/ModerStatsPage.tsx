import { StatsActivityChart, StatsCards, StatsCategoriesChart, StatsDecisionsChart } from "@/components";

export const ModerStatsPage = () => {
  return (
    <div>
      <h1 className="mb-4 font-bold text-2xl md:text-3xl lg:text-4xl">Статистика модератора за неделю</h1>

      {/* Карточки с метриками */}
      <StatsCards />

      {/* Графики */}
      <div className="grid grid-cols-1 gap-6">
        <StatsActivityChart />
        <StatsDecisionsChart />
        <StatsCategoriesChart />
      </div>
    </div>
  );
};
