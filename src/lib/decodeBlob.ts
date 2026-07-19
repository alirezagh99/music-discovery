// responsibility:
// Blob
//  ↓
// ArrayBuffer
//  ↓
// AudioBuffer

export async function decodeBlob(audioBlob: Blob) {
  const audioContext = new AudioContext();

  const arrayBuffer = await audioBlob.arrayBuffer();

  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

  return audioBuffer;
}
