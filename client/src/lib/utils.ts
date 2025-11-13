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
