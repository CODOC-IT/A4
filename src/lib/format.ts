export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" }).format(
    value,
  );
export const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-IE", { dateStyle: "medium" }).format(
    new Date(value),
  );
