import FFT from "fft.js";
import type { AudioBufferLike, Peak } from "./types";

function applyHannWindow(buffer: Float32Array) {
  // AudioBuffer → Peaks

  const size = buffer.length;

  const output = new Float32Array(size);

  for (let i = 0; i < size; i++) {
    output[i] =
      buffer[i] * (0.5 - 0.5 * Math.cos((2 * Math.PI * i) / (size - 1)));
  }

  return output;
}

export function generatePeaks(audioBuffer: AudioBufferLike) {
  const samples = audioBuffer.channelData[0];

  const SAMPLE_RATE = audioBuffer.sampleRate;

  const WINDOW_SIZE = 2048;

  const TOP_PEAKS_PER_FRAME = 5;

  const fft = new FFT(WINDOW_SIZE);

  const peakMap: Peak[] = [];

  for (let offset = 0; offset < samples.length; offset += WINDOW_SIZE) {
    let window = samples.slice(offset, offset + WINDOW_SIZE);

    window = applyHannWindow(window);

    const spectrum = fft.createComplexArray();

    fft.realTransform(spectrum, window);

    fft.completeSpectrum(spectrum);

    const magnitudes: number[] = [];

    for (let i = 0; i < WINDOW_SIZE / 2; i++) {
      const real = spectrum[2 * i];

      const imag = spectrum[2 * i + 1];

      const magnitude = Math.sqrt(real * real + imag * imag);

      magnitudes.push(magnitude);
    }

    // console.log("magnitudes:", magnitudes);
    const framePeaks: Peak[] = [];

    const MIN_MAGNITUDE = 90;

    for (let i = 1; i < magnitudes.length - 1; i++) {
      if (
        magnitudes[i] > MIN_MAGNITUDE &&
        magnitudes[i] > magnitudes[i - 1] &&
        magnitudes[i] > magnitudes[i + 1]
      ) {
        // console.log("magnitudes[i]:", magnitudes[i]);
        framePeaks.push({
          time: offset / SAMPLE_RATE,

          frequency: (i * SAMPLE_RATE) / WINDOW_SIZE,

          magnitude: magnitudes[i],
        });
      }
    }

    // console.log("framePeaks: ", framePeaks);
    framePeaks.sort((a, b) => b.magnitude - a.magnitude);

    peakMap.push(...framePeaks.slice(0, TOP_PEAKS_PER_FRAME));
  }

  return peakMap;
}
