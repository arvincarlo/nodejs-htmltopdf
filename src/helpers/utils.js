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

// Format a JS Date object to 'DD-MMM-YY' (e.g., 11-Mar-23)
export function formatDateToShort(dateInput) {
  const date = new Date(dateInput);
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = String(date.getFullYear()).slice(-2);
  return `${day}-${month}-${year}`;
}