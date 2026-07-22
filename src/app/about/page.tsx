const AboutPage = () => {
  return (
    <div className="flex flex-col gap-8 px-4 container 2xl:max-w-360 mx-auto mt-20">
      <h1 className="text-2xl lg:text-3xl font-display">About Musicovery</h1>
      <div className="flex flex-col gap-5">
        <p className="max-w-5xl">
          Musicovery is a web application that identifies songs by analyzing
          their audio instead of relying on file names or metadata. When you
          record or upload a short audio clip, the sound is transformed into a
          unique audio fingerprint using digital signal processing techniques
          such as the Fast Fourier Transform (FFT), peak detection, and landmark
          hashing. That fingerprint is then compared against a database of
          indexed songs to find the closest match.
        </p>
        <p className="max-w-5xl">
          Built with Next.js, TypeScript, PostgreSQL, and Prisma, Musicovery is
          both a practical music recognition tool and an exploration of how
          modern audio fingerprinting works under the hood. The project focuses
          on speed, accuracy, and a clean user experience while making complex
          concepts like spectrograms, frequency analysis, and fingerprint
          matching accessible through an intuitive interface. Whether you're
          curious about the technology or simply want to identify a song you
          heard, Musicovery demonstrates how signal processing can turn a few
          seconds of audio into a reliable song match.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
