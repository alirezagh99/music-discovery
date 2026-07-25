// responsibility:
// Blob
//  ↓
// ArrayBuffer
//  ↓
// AudioBuffer

// export async function decodeBlob(audioBlob: Blob) {
//   const audioContext = new AudioContext();

//   const arrayBuffer = await audioBlob.arrayBuffer();

//   const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

//   return audioBuffer;
// }

export async function decodeBlob(audioBlob: Blob) {
  const audioContext = new AudioContext();

  const arrayBuffer = await audioBlob.arrayBuffer();

  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

  const TARGET_SAMPLE_RATE = 44100;

  if (audioBuffer.sampleRate === TARGET_SAMPLE_RATE) {
    return audioBuffer;
  }

  const offlineContext = new OfflineAudioContext(
    audioBuffer.numberOfChannels,
    audioBuffer.duration * TARGET_SAMPLE_RATE,
    TARGET_SAMPLE_RATE,
  );

  const source = offlineContext.createBufferSource();

  source.buffer = audioBuffer;

  source.connect(offlineContext.destination);

  source.start();

  const renderedBuffer = await offlineContext.startRendering();

  return renderedBuffer;
}
