export type Peak = {
  // time: number;
  frequency: number;
  frame: number;
  // bin: number;
  magnitude: number;
};

export type Fingerprint = {
  hash: string;
  offset: number;
};

export type AudioBufferLike = {
  sampleRate: number;
  channelData: Float32Array[];
};
