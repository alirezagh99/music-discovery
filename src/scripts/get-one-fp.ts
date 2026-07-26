import { prisma } from "@/lib/prisma";

const result = await prisma.fingerprint.findMany({
  where: {
    songId: 2,
    // hash: "43-43-5",
  },
});

console.log(result);

// const randomFingerprint = await prisma.fingerprint.findFirst({
//   where: {
//     songId: 2,
//   },
// });

// console.log(randomFingerprint);
