export default function formatCompactNumber(n: number): string {
  if (n < 1e3) return n.toString();
  // Could use 'if (n < 1e6)' if you like
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'K';
  // Could use 'if (n < 1e9)' if you like
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M';
  // Could use 'if (n < 1e12)' if you like
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'B';
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + 'T';

  return '';
}
