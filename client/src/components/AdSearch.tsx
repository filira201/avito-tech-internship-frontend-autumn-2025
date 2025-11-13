import { Input } from "@heroui/react";
import { SearchIcon } from "lucide-react";
import { useSearchParams } from "react-router";
import { useDebouncedCallback } from "use-debounce";

import { useAdsUpdateSearchParams } from "@/lib";

export const AdSearch = () => {
  const updateSearchParams = useAdsUpdateSearchParams();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  // Обновление URL с дебаунсом
  const handleSearch = useDebouncedCallback((value: string) => {
    updateSearchParams({ search: value, page: 1 });
  }, 300);

  const handleClear = () => {
    updateSearchParams({ search: "", page: 1 });
  };

  return (
    <div className="flex justify-end items-center gap-2 mb-6">
      <Input
        startContent={<SearchIcon />}
        labelPlacement="outside-top"
        isClearable
        size="lg"
        label="Поиск по объявлениям"
        placeholder="Введите название..."
        defaultValue={search}
        onValueChange={handleSearch}
        onClear={handleClear}
      />
    </div>
  );
};
