import {
  Card,
  CardBody,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@heroui/react";

import type { Advertisement } from "@/lib";

type Props = {
  characteristics: Advertisement["characteristics"];
};

export const AdCharacteristics = ({ characteristics }: Props) => {
  const entries = Object.entries(characteristics);

  // Для лучшей оптимизации таблицы в библиотеке Heroui
  // нужно использовать ключи для столбцов и строк
  const columns = [
    {
      key: "parameter",
      label: "Параметр",
    },
    {
      key: "value",
      label: "Значение",
    },
  ];

  const rows = entries.map(([key, value]) => ({
    key,
    parameter: key,
    value,
  }));

  return (
    <Card>
      <CardHeader className="pb-2">
        <h3 className="text-xl font-bold">Характеристики</h3>
      </CardHeader>
      <CardBody>
        {entries.length === 0 ? (
          <p className="text-default-600">Характеристики не указаны</p>
        ) : (
          <Table aria-label="Характеристики товара" removeWrapper>
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key} className="text-base">
                  {column.label}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={rows}>
              {(item) => (
                <TableRow key={item.key}>
                  {(columnKey) => (
                    <TableCell className={columnKey === "parameter" ? "font-medium text-base" : "text-base"}>
                      {getKeyValue(item, columnKey)}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </CardBody>
    </Card>
  );
};
