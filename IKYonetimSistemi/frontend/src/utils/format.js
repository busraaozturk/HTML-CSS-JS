export function formatDate(dateStr) {
  if (!dateStr) return "-";

  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;

  return date.toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" });
}
