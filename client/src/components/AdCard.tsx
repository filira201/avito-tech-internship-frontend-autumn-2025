import { Card, CardBody, CardHeader, Chip, Image, Link } from "@heroui/react";

import { formatDate, formatPrice, statusColor, statusLabel, type Advertisement } from "@/lib";

type Props = {
  ad: Advertisement;
  href: string;
};

export const AdCard = ({ ad, href }: Props) => {
  const isUrgent = ad.priority === "urgent";

  return (
    <Link href={href} className="h-full">
      <Card isHoverable className="w-full h-full">
        <CardHeader className="p-0">
          <div className="relative w-full aspect-video overflow-hidden">
            <Image
              src={ad.images[0]}
              alt={ad.title}
              radius="none"
              removeWrapper
              className="z-0 w-full h-full object-cover"
            />
            {isUrgent && (
              // Отображение приоритета объявления
              <Chip color="danger" variant="solid" size="md" className="absolute top-2 right-2">
                Срочно
              </Chip>
            )}
          </div>
        </CardHeader>
        <CardBody className="gap-2 flex flex-col">
          <h3 title={ad.title} className="text-lg font-semibold line-clamp-2">
            {ad.title}
          </h3>
          <Chip color={statusColor[ad.status]} size="md" variant="flat" className="self-start">
            {statusLabel[ad.status]}
          </Chip>
          <p className="text-2xl font-bold text-primary">{formatPrice(ad.price)}</p>
          <div className="flex flex-col gap-1 text-default-500 mt-auto">
            <p>
              Категория: <span className="text-default-700">{ad.category}</span>
            </p>
            <p>
              Дата: <span className="text-default-700">{formatDate(ad.createdAt)}</span>
            </p>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
};
