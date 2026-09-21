/** Format a number as pounds sterling, e.g. 1490 -> "£1,490". */
export function formatGBP(amount: number): string {
  return '£' + amount.toLocaleString('en-GB', { maximumFractionDigits: 2 });
}

/** Format a number as pounds sterling with pence, e.g. 1490 -> "£1,490.00". */
export function formatGBPExact(amount: number): string {
  return '£' + amount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}