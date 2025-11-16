import { AdNavigationGoBack, AdNavigationPrevNext } from "@/components";

export const AdNavigation = () => {
  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        {/* Кнопка "Назад к списку" */}
        <AdNavigationGoBack />

        {/* Навигация между объявлениями */}
        <AdNavigationPrevNext />
      </div>
    </div>
  );
};
