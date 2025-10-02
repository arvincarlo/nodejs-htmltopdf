export function formatPesos(value) {
  if (typeof value !== 'number') value = Number(value) || 0;
  return value.toLocaleString('en-PH', { currency: 'PHP', minimumFractionDigits: 2 });
}

export function getPercentage(value, total) {
  if (!total || isNaN(value) || isNaN(total)) return 0;
  return Math.round((Number(value) / Number(total)) * 100);
}

export function getPercentageChange(total, previous) {
  const value = (total - previous) / previous;
  const percent = (value * 100).toFixed(2);
  return percent;
}