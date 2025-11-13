// Форматирует цену с разделителями тысяч и символом валюты
export const formatPrice = (price: number): string => {
  return `${price.toLocaleString("ru-RU")} ₽`;
};

// Форматирует дату в читаемый формат
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  return date.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Валидирует числовое значение цены
export const validatePrice = (value: string): number | undefined => {
  if (value === "") {
    return undefined;
  }

  const numValue = Number(value);

  if (isNaN(numValue) || numValue < 0) {
    return undefined;
  }

  return numValue;
};
