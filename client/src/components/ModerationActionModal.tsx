import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  Textarea,
} from "@heroui/react";
import { useState } from "react";

import { REJECTION_REASONS, type RejectionReason } from "@/lib";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: RejectionReason, comment?: string) => void;
  isLoading?: boolean;
  title: string;
  radioGroupLabel: string;
  inputPlaceholder: string;
  confirmButtonLabel: string;
  confirmButtonColor: "danger" | "warning";
};

export const ModerationActionModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  title,
  radioGroupLabel,
  inputPlaceholder,
  confirmButtonLabel,
  confirmButtonColor,
}: Props) => {
  const [selectedReason, setSelectedReason] = useState<RejectionReason | "">("");
  const [customReason, setCustomReason] = useState("");
  const [comment, setComment] = useState("");

  const handleConfirm = () => {
    if (!selectedReason) {
      return;
    }

    let reason: string;

    if (selectedReason === "Другое") {
      reason = customReason;
    } else {
      reason = selectedReason;
    }

    onConfirm(reason as RejectionReason, comment || undefined);
  };

  const handleClose = () => {
    setSelectedReason("");
    setCustomReason("");
    setComment("");
    onClose();
  };

  const isValid = Boolean(selectedReason) && (selectedReason !== "Другое" || customReason.trim() !== "");

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="2xl" scrollBehavior="inside" placement="center">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h3 className="text-xl font-medium">{title}</h3>
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-4">
            <RadioGroup
              label={radioGroupLabel}
              value={selectedReason}
              onValueChange={(value) => setSelectedReason(value as RejectionReason | "")}
              isRequired
            >
              {REJECTION_REASONS.map((reason) => (
                <Radio key={reason} value={reason}>
                  {reason}
                </Radio>
              ))}
            </RadioGroup>

            {selectedReason === "Другое" && (
              <Input
                label="Укажите причину"
                placeholder={inputPlaceholder}
                value={customReason}
                onValueChange={setCustomReason}
                isRequired
                isInvalid={customReason.trim() === ""}
                errorMessage="Причина обязательна"
              />
            )}

            <Textarea
              label="Дополнительный комментарий (необязательно)"
              placeholder="Введите комментарий"
              value={comment}
              onValueChange={setComment}
              minRows={3}
              maxRows={5}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="default" variant="light" onPress={handleClose} isDisabled={isLoading}>
            Отмена
          </Button>
          <Button
            color={confirmButtonColor}
            onPress={handleConfirm}
            isDisabled={!isValid || isLoading}
            isLoading={isLoading}
          >
            {confirmButtonLabel}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
