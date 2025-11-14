import { Button, Card, CardBody, CardHeader, Chip } from "@heroui/react";
import { useCallback, useState } from "react";

import {
  formatDateTime,
  moderationActionColor,
  moderationActionLabel,
  type ModerationHistory as ModerationHistoryType,
} from "@/lib";

type Props = {
  history: ModerationHistoryType[];
};

const MAX_VISIBLE_ITEMS = 1;

export const ModerationHistory = ({ history }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpandToggle = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  const shouldShowToggle = history.length > MAX_VISIBLE_ITEMS;
  const visibleHistory = isExpanded || !shouldShowToggle ? history : history.slice(0, MAX_VISIBLE_ITEMS);

  return (
    <Card>
      <CardHeader className="pb-2">
        <h3 className="text-xl font-bold">История модерации</h3>
      </CardHeader>
      <CardBody className="gap-4">
        {history.length === 0 ? (
          <p className="text-default-600">История модерации пуста</p>
        ) : (
          visibleHistory.map((item) => (
            <div key={item.id} className="border-b border-default-300 pb-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <Chip color={moderationActionColor[item.action]} size="md" variant="flat">
                    {moderationActionLabel[item.action]}
                  </Chip>
                  <span className="text-default-600">{formatDateTime(item.timestamp)}</span>
                </div>
                <div>
                  <span className="text-default-600">Модератор: </span>
                  <span className="font-medium">{item.moderatorName}</span>
                </div>
                {item.reason && (
                  <div>
                    <span className="text-default-600">Причина: </span>
                    <span className="font-medium">{item.reason}</span>
                  </div>
                )}
                {item.comment && (
                  <div>
                    <span className="text-default-600">Комментарий: </span>
                    <span className="font-medium">{item.comment}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}

        {shouldShowToggle && (
          <div>
            <Button className="text-base" onPress={handleExpandToggle}>
              {isExpanded ? "Скрыть остальные" : `Показать остальные (${history.length - MAX_VISIBLE_ITEMS})`}
            </Button>
          </div>
        )}
      </CardBody>
    </Card>
  );
};
