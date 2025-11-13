import { Button, Card, CardBody, CardHeader, Checkbox, CheckboxGroup, Input, Select, SelectItem } from "@heroui/react";
import { ListFilter } from "lucide-react";
import { useCallback } from "react";
import { useSearchParams } from "react-router";
import { useDebouncedCallback } from "use-debounce";

import { AD_STATUSES, CATEGORIES, statusLabel, type AdStatus, useAdsUpdateSearchParams, validatePrice } from "@/lib";

export const AdFilters = () => {
  const updateSearchParams = useAdsUpdateSearchParams();
  const [searchParams] = useSearchParams();

  const categoryId = searchParams.get("categoryId") ? Number(searchParams.get("categoryId")) : undefined;
  const minPrice = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined;
  const maxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined;
  const status = searchParams.getAll("status");

  const minPriceValue = minPrice?.toString() || "";
  const maxPriceValue = maxPrice?.toString() || "";

  const handleCategoryChange = useCallback(
    (value: string) => {
      const categoryIdValue = value === "" ? undefined : Number(value);
      updateSearchParams({ categoryId: categoryIdValue, page: 1 });
    },
    [updateSearchParams]
  );

  const handleMinPriceChange = useDebouncedCallback((value: string) => {
    const numValue = validatePrice(value);

    if (numValue === undefined && value !== "") {
      return;
    }

    updateSearchParams({ minPrice: numValue, page: 1 });
  }, 300);

  const handleMaxPriceChange = useDebouncedCallback((value: string) => {
    const numValue = validatePrice(value);

    if (numValue === undefined && value !== "") {
      return;
    }

    updateSearchParams({ maxPrice: numValue, page: 1 });
  }, 300);

  const handleStatusChange = useCallback(
    (selectedStatuses: string[]) => {
      updateSearchParams({ status: selectedStatuses, page: 1 });
    },
    [updateSearchParams]
  );

  const handleResetFilters = useCallback(() => {
    updateSearchParams({ status: [], categoryId: undefined, minPrice: undefined, maxPrice: undefined, page: 1 });
  }, [updateSearchParams]);

  const hasActiveFilters =
    status.length > 0 || categoryId !== undefined || minPrice !== undefined || maxPrice !== undefined;

  return (
    <Card className="mb-10">
      <CardHeader className="justify-between">
        <div className="flex items-center gap-2">
          <ListFilter />
          <h2 className="text-xl font-medium">Фильтры</h2>
        </div>
        <div className="flex justify-end">
          <Button isDisabled={!hasActiveFilters} color="default" onPress={handleResetFilters}>
            Сбросить фильтры
          </Button>
        </div>
      </CardHeader>
      <CardBody className="overflow-hidden">
        <div className="flex flex-col gap-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Категория */}
            <Select
              labelPlacement="outside"
              size="lg"
              isClearable
              label="Категория"
              placeholder="Выберите категорию"
              selectedKeys={categoryId !== undefined ? [categoryId.toString()] : []}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as string;
                handleCategoryChange(selected || "");
              }}
              className="w-full"
            >
              {CATEGORIES.map((category) => (
                <SelectItem key={category.id}>{category.name}</SelectItem>
              ))}
            </Select>

            {/* Статусы */}
            <CheckboxGroup
              key={`status-${status.join(",")}`}
              label="Статус"
              defaultValue={status}
              onValueChange={handleStatusChange}
              orientation="horizontal"
              classNames={{
                label: "text-default-700 font-medium",
              }}
              className="w-full"
            >
              {AD_STATUSES.map((statusValue) => (
                <Checkbox key={statusValue} value={statusValue}>
                  {statusLabel[statusValue as AdStatus]}
                </Checkbox>
              ))}
            </CheckboxGroup>

            {/* Минимальная цена */}
            <Input
              key={`minPrice-${minPrice ?? ""}`}
              labelPlacement="outside-top"
              size="lg"
              isClearable
              label="Минимальная цена"
              placeholder="0"
              type="number"
              defaultValue={minPriceValue}
              onValueChange={handleMinPriceChange}
              startContent={<span className="text-default-400">₽</span>}
              className="w-full"
            />

            {/* Максимальная цена */}
            <Input
              key={`maxPrice-${maxPrice ?? ""}`}
              labelPlacement="outside-top"
              size="lg"
              isClearable
              label="Максимальная цена"
              placeholder="0"
              type="number"
              defaultValue={maxPriceValue}
              onValueChange={handleMaxPriceChange}
              startContent={<span className="text-default-400">₽</span>}
              className="w-full"
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
