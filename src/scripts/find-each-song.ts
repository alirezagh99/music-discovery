import { prisma } from "@/lib/prisma";

const hashes = await prisma.fingerprint.groupBy({
  by: ["hash"],
  where: {
    songId: 1,
  },
  _count: {
    hash: true,
  },
});

console.log(hashes.length);

// const song2 = await prisma.song.findUnique({
//   where: {
//     id: 1,
//   },
//   include: {
//     hashes: true,
//   },
// });

// console.log(song2?.hashes.length);
