import { Button, Card, CardBody, Image } from "@heroui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

type Props = {
  images: string[];
  title: string;
};

export const AdImageGallery = ({ images, title }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleCurrentIndexChange = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <Card>
      <CardBody className="p-0">
        <div className="relative w-full aspect-video overflow-hidden">
          <Image
            src={images[currentIndex]}
            alt={`${title} - изображение ${currentIndex + 1}`}
            radius="none"
            removeWrapper
            className="z-0 w-full h-full object-cover"
          />
          {images.length > 1 && (
            <>
              <Button
                disableRipple
                disableAnimation
                isIconOnly
                variant="light"
                className="absolute left-0 inset-y-0 h-full w-12 z-10 rounded-none"
                onPress={handlePrevious}
                aria-label="Предыдущее изображение"
              >
                <ChevronLeft />
              </Button>
              <Button
                disableRipple
                disableAnimation
                isIconOnly
                variant="light"
                className="absolute right-0 inset-y-0 h-full w-12 z-10 rounded-none"
                onPress={handleNext}
                aria-label="Следующее изображение"
              >
                <ChevronRight />
              </Button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleCurrentIndexChange(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                      index === currentIndex ? "bg-white w-8" : "bg-white/50"
                    }`}
                    aria-label={`Перейти к изображению ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </CardBody>
    </Card>
  );
};
