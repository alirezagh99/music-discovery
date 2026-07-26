export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does it work offline?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not currently. Musicovery records audio in your browser, but matching a song requires searching a fingerprint database hosted on the server. An internet connection is needed to compare your recording against the indexed songs.",
      },
    },
    {
      "@type": "Question",
      name: "How long should I record?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A recording of 5–10 seconds is usually enough to identify a song. For the best results, record a clear and recognizable part of the music, such as the chorus or a distinctive melody.",
      },
    },
    {
      "@type": "Question",
      name: "Is my recording stored?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Your recording is processed only to generate an audio fingerprint for matching. The recording itself is not permanently stored on our servers. Only the generated fingerprint is used during the search process.",
      },
    },
    {
      "@type": "Question",
      name: "Does background noise affect results?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, but Musicovery is designed to focus on the strongest frequency patterns in the audio. Moderate background noise is often acceptable, but excessive noise, conversations, or very quiet music can reduce recognition accuracy. For the best experience, record as close to the music source as possible.",
      },
    },
  ],
};
