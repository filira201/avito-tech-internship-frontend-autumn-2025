import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { RefreshCcw, ServerCrash, WifiOff, TriangleAlert } from "lucide-react";

import { getErrorMessage, type ErrorInfo } from "@/lib";

type Props = {
  error: FetchBaseQueryError | SerializedError | undefined;
  onRetry?: () => void;
  title?: string;
};

export const StatsErrorDisplay = ({ error, onRetry, title }: Props) => {
  const errorInfo = getErrorMessage(error);

  if (!errorInfo) {
    return null;
  }

  const getIcon = (type: ErrorInfo["type"]) => {
    switch (type) {
      case "server_error":
        return <ServerCrash className="w-12 h-12" strokeWidth={1.5} />;
      case "network_error":
        return <WifiOff className="w-12 h-12" strokeWidth={1.5} />;

      default:
        return <TriangleAlert className="w-12 h-12" strokeWidth={1.5} />;
    }
  };

  const getColorClass = (type: ErrorInfo["type"]) => {
    switch (type) {
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
      case "server_error":
        return "bg-danger/10";
      case "network_error":
        return "bg-default/10";

      default:
        return "bg-danger/10";
    }
  };

  return (
    <Card className="w-full">
      {title && (
        <CardHeader>
          <h3 className="text-xl font-bold">{title}</h3>
        </CardHeader>
      )}
      <CardBody className="flex flex-col items-center justify-center text-center gap-4 min-h-[400px]">
        <div className="relative">
          <div className={`absolute inset-0 ${getBlurClass(errorInfo.type)} blur-2xl rounded-full`} />
          <div className={`relative bg-linear-to-br ${getBackgroundClass(errorInfo.type)} p-4 rounded-full`}>
            <div className={getColorClass(errorInfo.type)}>{getIcon(errorInfo.type)}</div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <h4 className="text-lg font-semibold text-foreground">{errorInfo.title}</h4>
          <p className="text-default-600 text-sm max-w-sm">{errorInfo.message}</p>
        </div>

        {onRetry && (
          <Button color="primary" size="md" onPress={onRetry} startContent={<RefreshCcw className="w-4 h-4" />}>
            Повторить
          </Button>
        )}
      </CardBody>
    </Card>
  );
};
