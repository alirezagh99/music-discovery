"use server";

import { prisma } from "@/lib/prisma";
import type { Fingerprint } from "@/lib/types";

export async function identifySong(fingerprints: Fingerprint[]) {
  const hashes = fingerprints.map((fp) => fp.hash);

  const matches = await prisma.fingerprint.findMany({
    where: {
      hash: {
        in: hashes,
      },
    },
    select: {
      hash: true,
      offset: true,
      songId: true,
    },
  });

  const userOffsets = new Map(fingerprints.map((fp) => [fp.hash, fp.offset]));
  const votes = new Map<string, number>();
  const BUCKET_SIZE = 0.02;
  for (let i = 0; i < matches.length; i++) {
    const userOffset = userOffsets.get(matches[i].hash);

    if (userOffset === undefined) continue;

    const offsetDifference = matches[i].offset - userOffset;

    const bucket = Math.round(offsetDifference / BUCKET_SIZE) * BUCKET_SIZE;

    const key = `${matches[i].songId}-${bucket}`;

    votes.set(key, (votes.get(key) ?? 0) + 1);
  }

  let bestKey: string | null = null;
  let bestVotes = 0;

  for (const [key, voteCount] of votes) {
    if (voteCount > bestVotes) {
      bestVotes = voteCount;
      bestKey = key;
    }
  }

  if (!bestKey) {
    return { title: null, error: "not found" }; // No matches found
  }

  const [songIdString, bucketString] = bestKey.split("-");

  const songId = Number(songIdString);
  const offsetDifference = Number(bucketString);

  const song = await prisma.song.findUnique({
    where: {
      id: songId,
    },
  });

  return song;
}
