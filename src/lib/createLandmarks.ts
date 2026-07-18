export type Peak = {
  time: number;
  frequency: number;
  magnitude: number;
};

export function createLandmarks(peaks: Peak[]) {
  const landmarks = [];

  const TARGET_ZONE = 5; // seconds

  for (let i = 0; i < peaks.length; i++) {
    const peak1 = peaks[i];

    for (let j = i + 1; j < peaks.length; j++) {
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
    }
  }

  return landmarks;
}
