import { Button, Card, CardBody } from "@heroui/react";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { TriangleAlert, SearchX, ServerCrash, WifiOff, RefreshCcw } from "lucide-react";

import { getErrorMessage, type ErrorInfo } from "@/lib";

type Props = {
  error: FetchBaseQueryError | SerializedError | undefined;
  onRetry?: () => void;
  className?: string;
};

export const ErrorDisplay = ({ error, onRetry, className = "" }: Props) => {
  const errorInfo = getErrorMessage(error);

  if (!errorInfo) {
    return null;
  }

  const getIcon = (type: ErrorInfo["type"]) => {
    switch (type) {
      case "bad_request":
        return <TriangleAlert className="w-16 h-16" strokeWidth={1.5} />;
      case "not_found":
        return <SearchX className="w-16 h-16" strokeWidth={1.5} />;
      case "server_error":
        return <ServerCrash className="w-16 h-16" strokeWidth={1.5} />;
      case "network_error":
        return <WifiOff className="w-16 h-16" strokeWidth={1.5} />;

      default:
        return <TriangleAlert className="w-16 h-16" strokeWidth={1.5} />;
    }
  };

  const getColorClass = (type: ErrorInfo["type"]) => {
    switch (type) {
      case "bad_request":
        return "text-warning";
      case "not_found":
        return "text-primary";
      case "server_error":
        return "text-danger";
      case "network_error":
        return "text-default-500";

      default:
        return "text-danger";
    }
  };

  const getBackgroundClass = (type: ErrorInfo["type"]) => {
    switch (type) {
      case "bad_request":
        return "from-warning/20 to-warning/5";
      case "not_found":
        return "from-primary/20 to-primary/5";
      case "server_error":
        return "from-danger/20 to-danger/5";
      case "network_error":
        return "from-default/20 to-default/5";

      default:
        return "from-danger/20 to-danger/5";
    }
  };

  const getBlurClass = (type: ErrorInfo["type"]) => {
    switch (type) {
      case "bad_request":
        return "bg-warning/10";
      case "not_found":
        return "bg-primary/10";
      case "server_error":
        return "bg-danger/10";
      case "network_error":
        return "bg-default/10";

      default:
        return "bg-danger/10";
    }
  };

  return (
    <div className={`flex items-center justify-center w-full ${className}`}>
      <Card className="max-w-md w-full">
        <CardBody className="flex flex-col items-center text-center gap-6 p-8 sm:p-12">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className={`absolute inset-0 ${getBlurClass(errorInfo.type)} blur-3xl rounded-full`} />
              <div className={`relative bg-linear-to-br ${getBackgroundClass(errorInfo.type)} p-6 rounded-full`}>
                <div className={getColorClass(errorInfo.type)}>{getIcon(errorInfo.type)}</div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {errorInfo.status && (
                <h1 className={`text-7xl sm:text-8xl font-bold ${getColorClass(errorInfo.type)} leading-none`}>
                  {errorInfo.status}
                </h1>
              )}
              <h2 className="text-2xl sm:text-3xl font-bold">{errorInfo.title}</h2>
            </div>
          </div>

          <p className="text-default-600 text-lg sm:text-xl max-w-sm">{errorInfo.message}</p>

          {onRetry && (
            <div className="w-full mt-2">
              <Button
                color="primary"
                size="lg"
                onPress={onRetry}
                startContent={<RefreshCcw className="w-5 h-5" />}
                className="w-full sm:w-auto"
              >
                Повторить попытку
              </Button>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};
