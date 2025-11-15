import { Card, CardBody, CardFooter, CardHeader } from "@heroui/react";

type Props = {
  title: string;
  value: string | number;
  subtitle: string;
};

export const StatsCard = ({ title, value, subtitle }: Props) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-1">
        <h4 className="text-lg text-default-600">{title}</h4>
      </CardHeader>
      <CardBody className="gap-2 py-1">
        <p className="text-3xl font-bold text-primary">{value}</p>
      </CardBody>
      <CardFooter className="pt-1">
        <p className="text text-default-600">{subtitle}</p>
      </CardFooter>
    </Card>
  );
};
