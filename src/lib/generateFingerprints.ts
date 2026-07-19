import type { Peak, Fingerprint } from "./types";

// A landmark is a relationship between two peaks.
function createLandmarks(peaks: Peak[]) {
  // creates hashes

  const landmarks = [];

  const TARGET_ZONE = 1;

  const MAX_TARGETS = 5;

  for (let i = 0; i < peaks.length; i++) {
    const peak1 = peaks[i];
    let targets = 0;
    for (let j = i + 1; j < peaks.length; j++) {
      if (targets >= MAX_TARGETS) {
        break;
      }

      const peak2 = peaks[j];

      const deltaTime = peak2.time - peak1.time;

      if (deltaTime > TARGET_ZONE) {
        break;
      }

      landmarks.push({
        frequency1: peak1.frequency,

        frequency2: peak2.frequency,

        deltaTime,

        offset: peak1.time,
      });

      targets++;
    }
  }

  return landmarks;
}

function generateHash(
  frequency1: number,
  frequency2: number,
  deltaTime: number,
) {
  return `${Math.round(frequency1)}-${Math.round(frequency2)}-${Math.round(deltaTime * 100)}`;
}

export function generateFingerprints(peaks: Peak[]): Fingerprint[] {
  const landmarks = createLandmarks(peaks);

  return landmarks.map((lm) => ({
    hash: generateHash(lm.frequency1, lm.frequency2, lm.deltaTime),

    offset: lm.offset,
  }));
}
