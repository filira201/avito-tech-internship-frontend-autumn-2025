import { Chip } from "@heroui/react";

import {
  checkIsUrgentPriority,
  formatDateTime,
  formatPrice,
  statusColor,
  statusLabel,
  type Advertisement,
} from "@/lib";

type Props = {
  title: Advertisement["title"];
  status: Advertisement["status"];
  priority: Advertisement["priority"];
  category: Advertisement["category"];
  price: Advertisement["price"];
  createdAt: Advertisement["createdAt"];
};

export const AdHead = ({ title, status, priority, category, price, createdAt }: Props) => {
  const isUrgent = checkIsUrgentPriority(priority);

  return (
    <>
      <h1 className="font-bold mb-2 text-2xl md:text-3xl lg:text-4xl">{title}</h1>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <Chip color={statusColor[status]} size="lg" variant="flat">
          {statusLabel[status]}
        </Chip>
        {isUrgent && (
          <Chip color="danger" size="lg" variant="solid">
            Срочно
          </Chip>
        )}
        <span className="text-default-600">Категория: {category}</span>
      </div>
      <p className="text-3xl font-bold text-primary mb-2">{formatPrice(price)}</p>
      <p className="text-default-600">Дата создания: {formatDateTime(createdAt)}</p>
    </>
  );
};
