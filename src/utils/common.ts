export function fahToCel(value?: number) {
  if (!value) return value;
  return Math.round(((value - 32) / 1.8) * 10) / 10;
}

export function shortLatLng(value?: number) {
  if (!value) return value;
  return Math.round(value * 1000000) / 1000000;
}
