import { prisma } from "@/lib/prisma";

async function findFingerprints(hash: string) {
  const fingerprints = await prisma.fingerprint.findMany({
    where: {
      hash,
    },
    select: {
      id: true,
      hash: true,
      offset: true,
      songId: true,
    },
  });

  fingerprints.forEach((fp) => {
    console.log(`${fp.id} - ${fp.hash} - song${fp.songId}`);
  });
  //   console.log(`Found ${fingerprints.length} fingerprints`);
  //   console.log(`609-609-4`);

  //   console.log(fingerprints);
}

async function main() {
  const hash = "609-609-4";

  await findFingerprints(hash);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
