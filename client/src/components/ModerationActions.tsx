import { Button, Card, CardBody } from "@heroui/react";
import { useCallback, useState } from "react";
import { useParams } from "react-router";

import { useApproveAdMutation, useLazyGetAdByIdQuery, useRejectAdMutation, useRequestChangesAdMutation } from "@/api";
import { ModerationActionModal } from "@/components";
import type { RejectionReason } from "@/lib";

export const ModerationActions = () => {
  const { id } = useParams<{ id: string }>();
  const adId = id ? Number(id) : null;

  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isRequestChangesModalOpen, setIsRequestChangesModalOpen] = useState(false);

  const [approveAd, { isLoading: isApproveLoading }] = useApproveAdMutation();
  const [rejectAd, { isLoading: isRejectLoading }] = useRejectAdMutation();
  const [requestChangesAd, { isLoading: isRequestChangesLoading }] = useRequestChangesAdMutation();
  const [getAdByIdLazy] = useLazyGetAdByIdQuery();

  const handleApprove = async () => {
    try {
      await approveAd(adId as number).unwrap();
      await getAdByIdLazy(adId as number).unwrap();
    } catch (error) {
      console.error("Ошибка при одобрении объявления:", error);
    }
  };

  const handleRequestChangesModalOpen = () => setIsRequestChangesModalOpen(true);
  const handleRejectModalOpen = () => setIsRejectModalOpen(true);

  const handleRequestChangesModalClose = useCallback(() => setIsRequestChangesModalOpen(false), []);
  const handleRejectModalClose = useCallback(() => setIsRejectModalOpen(false), []);

  const handleReject = useCallback(
    async (reason: string, comment?: string) => {
      try {
        await rejectAd({
          id: adId as number,
          body: { reason: reason as RejectionReason, comment },
        }).unwrap();
        await getAdByIdLazy(adId as number).unwrap();
      } catch (error) {
        console.error("Ошибка при отклонении объявления:", error);
      }
    },
    [adId, getAdByIdLazy, rejectAd]
  );

  const handleRequestChanges = useCallback(
    async (reason: string, comment?: string) => {
      try {
        await requestChangesAd({
          id: adId as number,
          body: { reason: reason as RejectionReason, comment },
        }).unwrap();
        await getAdByIdLazy(adId as number).unwrap();
      } catch (error) {
        console.error("Ошибка при запросе изменений:", error);
      }
    },
    [adId, getAdByIdLazy, requestChangesAd]
  );

  const handleRejectConfirm = useCallback(
    (reason: string, comment?: string) => {
      handleReject(reason, comment);
      setIsRejectModalOpen(false);
    },
    [handleReject]
  );

  const handleRequestChangesConfirm = useCallback(
    (reason: string, comment?: string) => {
      handleRequestChanges(reason, comment);
      setIsRequestChangesModalOpen(false);
    },
    [handleRequestChanges]
  );

  const isLoading = isApproveLoading || isRejectLoading || isRequestChangesLoading;

  return (
    <>
      <Card>
        <CardBody>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              color="success"
              size="lg"
              onPress={handleApprove}
              isDisabled={isLoading}
              isLoading={isApproveLoading}
              className="flex-1"
            >
              Одобрить
            </Button>
            <Button color="danger" size="lg" onPress={handleRejectModalOpen} isDisabled={isLoading} className="flex-1">
              Отклонить
            </Button>
            <Button
              color="warning"
              size="lg"
              onPress={handleRequestChangesModalOpen}
              isDisabled={isLoading}
              className="flex-1"
            >
              Вернуть на доработку
            </Button>
          </div>
        </CardBody>
      </Card>

      <ModerationActionModal
        isOpen={isRejectModalOpen}
        onClose={handleRejectModalClose}
        onConfirm={handleRejectConfirm}
        isLoading={isRejectLoading}
        title="Отклонить объявление"
        radioGroupLabel="Причина отклонения"
        inputPlaceholder="Введите причину отклонения"
        confirmButtonLabel="Отклонить"
        confirmButtonColor="danger"
      />

      <ModerationActionModal
        isOpen={isRequestChangesModalOpen}
        onClose={handleRequestChangesModalClose}
        onConfirm={handleRequestChangesConfirm}
        isLoading={isRequestChangesLoading}
        title="Вернуть на доработку"
        radioGroupLabel="Причина возврата на доработку"
        inputPlaceholder="Введите причину возврата на доработку"
        confirmButtonLabel="Вернуть на доработку"
        confirmButtonColor="warning"
      />
    </>
  );
};
