import { Card, CardBody, CardHeader } from "@heroui/react";

import { formatDateTime, type Seller } from "@/lib";

type Props = {
  seller: Seller;
};

export const SellerInfo = ({ seller }: Props) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <h3 className="text-xl font-bold">Информация о продавце</h3>
      </CardHeader>
      <CardBody className="gap-3">
        <div className="flex flex-col gap-2">
          <div>
            <span className="text-default-600">Имя: </span>
            <span className="font-medium">{seller.name}</span>
          </div>
          <div>
            <span className="text-default-600">Рейтинг: </span>
            <span className="font-medium">{seller.rating}</span>
          </div>
          <div>
            <span className="text-default-600">Количество объявлений: </span>
            <span className="font-medium">{seller.totalAds}</span>
          </div>
          <div>
            <span className="text-default-600">Дата регистрации: </span>
            <span className="font-medium">{formatDateTime(seller.registeredAt)}</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
