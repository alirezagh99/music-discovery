"use server";

import { prisma } from "@/lib/prisma";
import type { Fingerprint } from "@/lib/types";

type ResultProp = {
  title: string | null;
  error: string | null;
  id: number | null;
};

export async function identifySong(
  fingerprints: Fingerprint[],
): Promise<ResultProp> {
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

  // const userOffsets = new Map(fingerprints.map((fp) => [fp.hash, fp.offset]));
  const userOffsets = new Map<string, number[]>();

  for (const fp of fingerprints) {
    const offsets = userOffsets.get(fp.hash);

    if (offsets) {
      offsets.push(fp.offset);
    } else {
      userOffsets.set(fp.hash, [fp.offset]);
    }
  }

  const votes = new Map<string, number>();
  const BUCKET_SIZE = 0.02;

  for (const match of matches) {
    const offsets = userOffsets.get(match.hash);

    if (!offsets) continue;

    // Every occurrence of this hash in the user's recording votes
    for (const userOffset of offsets) {
      const offsetDifference = match.offset - userOffset;

      const bucket = Math.round(offsetDifference / BUCKET_SIZE) * BUCKET_SIZE;

      const key = `${match.songId}-${bucket}`;

      votes.set(key, (votes.get(key) ?? 0) + 1);
    }
  }

  const sortedVotes = [...votes.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  console.log("sortedVotesssssssssssssssss: ");
  console.table(sortedVotes.slice(0, 10));
  // for (let i = 0; i < matches.length; i++) {
  //   const userOffset = userOffsets.get(matches[i].hash);

  //   if (userOffset === undefined) continue;

  //   const offsetDifference = matches[i].offset - userOffset;

  //   const bucket = Math.round(offsetDifference / BUCKET_SIZE) * BUCKET_SIZE;

  //   const key = `${matches[i].songId}-${bucket}`;

  //   votes.set(key, (votes.get(key) ?? 0) + 1);
  // }

  let bestKey: string | null = null;
  let bestVotes = 0;

  for (const [key, voteCount] of votes) {
    if (voteCount > bestVotes) {
      bestVotes = voteCount;
      bestKey = key;
    }
  }

  if (!bestKey) {
    return { title: null, error: "not found", id: null }; // No matches found
  }

  const [songIdString, bucketString] = bestKey.split("-");

  const songId = Number(songIdString);
  const offsetDifference = Number(bucketString);

  const song = await prisma.song.findUnique({
    where: {
      id: songId,
    },
  });

  return { title: song?.title ?? null, id: song?.id ?? null, error: null };
}
