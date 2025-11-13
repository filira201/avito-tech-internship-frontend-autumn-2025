import { Pagination } from "@heroui/react";
import { memo } from "react";

type Props = {
  page: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
};

export const AdPagination = memo<Props>(({ page, totalPages, handlePageChange }) => {
  return (
    <Pagination
      className="cursor-pointer"
      size="lg"
      page={page}
      total={totalPages}
      onChange={handlePageChange}
      siblings={2}
      boundaries={2}
      showControls
    />
  );
});
