import { Button } from "@heroui/react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

import { usePreservedQuery } from "@/lib";

export const AdNavigationGoBack = () => {
  const navigate = useNavigate();
  const preservedQuery = usePreservedQuery();

  const handleBackToList = () => {
    navigate(`/list${preservedQuery}`);
  };

  return (
    <Button startContent={<ArrowLeft />} size="lg" onPress={handleBackToList}>
      Назад к списку
    </Button>
  );
};
