import fs from "fs";
import path from "path";

import { prisma } from "@/lib/prisma";
import { generatePeaks } from "@/lib/generatePeaks";
import { generateFingerprints } from "@/lib/generateFingerprints";
import { decodeFile2 } from "@/lib/decodeFile2";

async function indexSongs() {
  const songsFolder = path.join(process.cwd(), "public/songs");

  const files = fs.readdirSync(songsFolder);

  for (const file of files) {
    console.log(`Processing ${file}`);

    const song = await prisma.song.create({
      data: {
        title: file,
      },
    });

    const audioBuffer = await decodeFile2(path.join(songsFolder, file));
    const peaks = generatePeaks(audioBuffer);

    const fingerprints = generateFingerprints(peaks);

    await prisma.fingerprint.createMany({
      data: fingerprints.map((fp) => ({
        hash: fp.hash,
        offset: fp.offset,
        songId: song.id,
      })),
    });

    console.log("fingerprints.length: ", fingerprints.length);
    console.log(`${file} indexed`);
  }

  await prisma.$disconnect();
}

indexSongs();
