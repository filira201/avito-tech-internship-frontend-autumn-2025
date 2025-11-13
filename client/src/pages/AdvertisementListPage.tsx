import { AdList } from "@/components";

export const AdvertisementListPage = () => {
  return (
    <div>
      <h1
        data-testid="advertisements-page-title"
        className="mb-4 font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl"
      >
        Список объявлений
      </h1>
      <AdList />
    </div>
  );
};
