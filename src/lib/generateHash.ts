export function generateHash(
  frequency1: number,
  frequency2: number,
  deltaTime: number,
) {
  return `${Math.round(frequency1)}-${Math.round(frequency2)}-${Math.round(deltaTime * 100)}`;
}
