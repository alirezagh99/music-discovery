import type { Peak, Fingerprint } from "./types";

// A landmark is a relationship between two peaks.
function createLandmarks(peaks: Peak[]) {
  // creates hashes

  //   const peaksByFrame = new Map<number, Peak[]>();
  //   for (const peak of peaks) {
  //     const frame = Math.round(peak.time / FRAME_DURATION);

  //     const list = peaksByFrame.get(frame) ?? [];

  //     list.push(peak);

  //     peaksByFrame.set(frame, list);
  // }

  const landmarks = [];

  // const TARGET_ZONE = 2;
  const TARGET_ZONE = 40;

  const MAX_TARGETS = 3;

  // const MAX_FREQ_DISTANCE = 200;
  const MAX_BIN_DISTANCE = 100;
  // const MIN_TARGET_TIME = 0.05;

  // const sortedPeaks = peaks.sort((a, b) => b.magnitude - a.magnitude);

  for (let i = 0; i < peaks.length; i++) {
    const peak1 = peaks[i];
    let targets = 0;
    for (let j = i + 1; j < peaks.length; j++) {
      // if (targets >= MAX_TARGETS) {
      //   break;
      // }

      const peak2 = peaks[j];

      // const deltaTime = peak2.time - peak1.time;
      // const deltaFreq = Math.abs(peak2.frequency - peak1.frequency);
      const deltaFrame = peak2.frame - peak1.frame;
      if (deltaFrame === 0) {
        continue;
      }
      // if (Math.abs(peak2.bin - peak1.bin) > MAX_BIN_DISTANCE) {
      //   continue;
      // }
      // const deltaFreq = Math.abs(peak2.bin - peak1.bin);

      // if (deltaTime > TARGET_ZONE) {
      //   break;
      // }
      if (deltaFrame > TARGET_ZONE) {
        break;
      }
      // if (deltaFreq > MAX_FREQ_DISTANCE) {
      //   continue;
      // }

      // if (deltaTime < MIN_TARGET_TIME) {
      //   continue;
      // }

      landmarks.push({
        frequency1: peak1.frequency,
        // bin1: peak1.bin,

        frequency2: peak2.frequency,
        // bin2: peak2.bin,

        deltaFrame,

        offset: peak1.frame,
      });

      targets++;

      if (targets >= MAX_TARGETS) {
        break;
      }
    }
  }

  return landmarks;
}

function generateHash(
  frequency1: number,
  frequency2: number,
  deltaFrame: number,
) {
  // return `${Math.round(bin1)}-${Math.round(bin2)}-${Math.round(deltaTime * 100)}`;
  const f1 = Math.round(frequency1 / 50);
  const f2 = Math.round(frequency2 / 50);
  return `${f1}-${f2}-${deltaFrame}`;
}

export function generateFingerprints(peaks: Peak[]): Fingerprint[] {
  // peaks.sort((a, b) => a.frame - b.frame);
  peaks.sort((a, b) => {
    if (a.frame !== b.frame) {
      return a.frame - b.frame;
    }

    return b.magnitude - a.magnitude;
  });

  const landmarks = createLandmarks(peaks);

  return landmarks.map((lm) => ({
    hash: generateHash(lm.frequency1, lm.frequency2, lm.deltaFrame),

    offset: lm.offset,
  }));
}
