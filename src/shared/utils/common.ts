export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}

export function formatDate(value: number) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(value);
}

export function formatCurrencyRegex(value: number) {
  return (value / 100).toFixed(2);
}

export const convertFileToBase64 = (
  file: File
): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export function canWithDraw() {
  const isFirstDayOfMonth = new Date().getDate() >= 20; // change to 01
  return isFirstDayOfMonth;
}
