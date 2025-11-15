import { Button, Card, CardBody } from "@heroui/react";
import { Home, SearchX } from "lucide-react";
import { useNavigate } from "react-router";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[60vh] w-full">
      <Card className="max-w-md w-full">
        <CardBody className="flex flex-col items-center text-center gap-6 p-8 sm:p-12">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full" />
              <div className="relative bg-linear-to-br from-primary/20 to-primary/5 p-6 rounded-full">
                <SearchX className="w-16 h-16 text-primary" strokeWidth={1.5} />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="text-7xl sm:text-8xl font-bold text-primary leading-none">404</h1>
              <h2 className="text-2xl sm:text-3xl font-bold">Страница не найдена</h2>
            </div>
          </div>

          <p className="text-default-600 text-lg sm:text-xl max-w-sm">
            Возможно, она была удалена или вы указали неправильный адрес.
          </p>

          <div className="w-full mt-2">
            <Button
              color="primary"
              size="lg"
              onPress={() => navigate("/")}
              startContent={<Home className="w-5 h-5" />}
              className="w-full sm:w-auto"
            >
              Вернуться на главную
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
