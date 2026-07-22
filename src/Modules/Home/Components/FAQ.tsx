import { SectionLayout } from "@/components/Layout/Components/SectionLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQ = () => {
  const data = [
    {
      question: "Does it work offline?",
      answer:
        "Not currently. Musicovery records audio in your browser, but matching a song requires searching a fingerprint database hosted on the server. An internet connection is needed to compare your recording against the indexed songs.",
    },
    {
      question: "How long should I record?",
      answer:
        "A recording of 5–10 seconds is usually enough to identify a song. For the best results, record a clear and recognizable part of the music, such as the chorus or a distinctive melody.",
    },
    {
      question: "Is my recording stored?",
      answer:
        "No. Your recording is processed only to generate an audio fingerprint for matching. The recording itself is not permanently stored on our servers. Only the generated fingerprint is used during the search process.",
    },
    {
      question: "Does background noise affect results?",
      answer:
        "Yes, but Musicovery is designed to focus on the strongest frequency patterns in the audio. Moderate background noise is often acceptable, but excessive noise, conversations, or very quiet music can reduce recognition accuracy. For the best experience, record as close to the music source as possible.",
    },
  ];
  return (
    <SectionLayout headingText="FAQ" className="flex flex-col gap-4">
      {data.map((item, index) => {
        return (
          <Accordion key={index} type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xl lg:text-2xl font-display">
                {item["question"]}
              </AccordionTrigger>
              <AccordionContent className="text-base lg:text-lg">
                {item["answer"]}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      })}
    </SectionLayout>
  );
};
