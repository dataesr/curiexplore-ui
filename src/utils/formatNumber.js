export default function formatNumber(num, precision) {
  const map = [
    { suffix: 'T', threshold: 1e12 },
    { suffix: ' milliards', threshold: 1e9 },
    { suffix: ' millions', threshold: 1e6 },
    { suffix: 'K', threshold: 1e3 },
    { suffix: '', threshold: 1 },
  ];

  const found = map.find((x) => Math.abs(num) >= x.threshold);
  if (found) {
    const formatted = (num / found.threshold).toFixed(precision) + found.suffix;
    return formatted;
  }

  return num;
}
