import { Select, SelectItem } from "@heroui/react";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";

import { SORT_OPTIONS, useAdsUpdateSearchParams, type SortBy, type SortOrder } from "@/lib";

export const AdSort = () => {
  const updateSearchParams = useAdsUpdateSearchParams();
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy") as SortBy | undefined;
  const sortOrder = searchParams.get("sortOrder") as SortOrder | undefined;

  // Формируем текущее значение для Select (формат: "sortBy-sortOrder")
  const currentValue = useMemo(() => {
    if (sortBy && sortOrder) {
      return `${sortBy}-${sortOrder}`;
    }

    return "";
  }, [sortBy, sortOrder]);

  const handleSortChange = useCallback(
    (value: string) => {
      if (value === "") {
        updateSearchParams({ sortBy: undefined, sortOrder: undefined, page: 1 });
      } else {
        const [newSortBy, newSortOrder] = value.split("-") as [SortBy, SortOrder];
        updateSearchParams({ sortBy: newSortBy, sortOrder: newSortOrder, page: 1 });
      }
    },
    [updateSearchParams]
  );

  return (
    <div className="mb-4">
      <Select
        labelPlacement="outside"
        size="lg"
        isClearable
        label="Сортировка"
        placeholder="Выберите сортировку"
        selectedKeys={currentValue ? [currentValue] : []}
        onSelectionChange={(keys) => {
          const selected = Array.from(keys)[0] as string;
          handleSortChange(selected || "");
        }}
        className="w-full"
      >
        {SORT_OPTIONS.map((option) => {
          const value = `${option.sortBy}-${option.sortOrder}`;

          return <SelectItem key={value}>{option.label}</SelectItem>;
        })}
      </Select>
    </div>
  );
};
