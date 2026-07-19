import fs from "fs/promises";

export async function decodeFile(filePath: string) {
  const audioContext = new AudioContext();

  const fileBuffer = await fs.readFile(filePath);

  const arrayBuffer = fileBuffer.buffer.slice(
    fileBuffer.byteOffset,
    fileBuffer.byteOffset + fileBuffer.byteLength,
  );

  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

  return audioBuffer;
}
