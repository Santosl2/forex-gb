export function classNames(obj: object) {
  return Object.entries(obj)
    .filter(([, value]) => value === true)
    .map(([key]) => key)
    .join(" ")
    .trim();
}
