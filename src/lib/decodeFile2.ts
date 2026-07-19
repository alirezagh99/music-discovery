import fs from "fs/promises";
import decode from "audio-decode";

export async function decodeFile2(filePath: string) {
  const fileBuffer = await fs.readFile(filePath);

  const arrayBuffer = fileBuffer.buffer.slice(
    fileBuffer.byteOffset,
    fileBuffer.byteOffset + fileBuffer.byteLength,
  );

  const audioBuffer = await decode(arrayBuffer);

  return audioBuffer;
}
