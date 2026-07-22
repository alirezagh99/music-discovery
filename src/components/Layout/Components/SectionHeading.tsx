export const SectionHeading = ({ text }: { text: string }) => {
  return (
    <div className="text-3xl lg:text-4xl font-semibold flex justify-center font-display text-center">
      <h2>{text}</h2>
    </div>
  );
};
