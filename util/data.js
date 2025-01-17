export default function getFormattedDate(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function get7days(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
