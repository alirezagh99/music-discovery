export function applyHannWindow(buffer: Float32Array) {
  const size = buffer.length;

  const output = new Float32Array(size);

  for (let i = 0; i < size; i++) {
    output[i] =
      buffer[i] * (0.5 - 0.5 * Math.cos((2 * Math.PI * i) / (size - 1)));
  }

  return output;
}
