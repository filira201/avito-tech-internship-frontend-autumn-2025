import { Card, CardBody, CardHeader } from "@heroui/react";

import type { Advertisement } from "@/lib";

type Props = {
  description: Advertisement["description"];
};

export const AdDescription = ({ description }: Props) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <h2 className="text-xl font-bold">Описание</h2>
      </CardHeader>
      <CardBody>
        <p>{description}</p>
      </CardBody>
    </Card>
  );
};
