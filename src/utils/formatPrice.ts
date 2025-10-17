export const formatCurrency = (
  value: number,
  locale: string = "es-AR",
): string => {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
};
