export type Peak = {
  time: number;
  frequency: number;
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
