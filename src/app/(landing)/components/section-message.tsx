import { FC } from "react";
import Heading from "@/components/ui/heading";
import Paragraph from "@/components/ui/paragraph";

interface SectionMessageProps {}

const SectionMessage: FC<SectionMessageProps> = ({}) => {
  return (
    <section id="message" className="p-10">
      <Heading size="sm">Principal Message</Heading>
      <div className="md:flex">
        {/* <div>Picture</div>
        <p className="max-w-prose text-center">
          Warm greetings from your School Administration. Congratulations batch
          2023. As time goes by, your personality changes and improves from
          childhood to what you are now. Your stay in Mary Josette Academy from
          Kinder to Grade 6 prepared you to the next episode in life, the
          secondary schooling. Go, move on! To our Junior and Senior Students,
          don&apos;t forget that knowledge is the heritage of mankind and mostly the
          courageous ones inherit it. So be brave facing the next chapter of
          your life. You are now to begin a new Journey, more exciting yet
          demanding. What you need is to strive harder, work seriously and
          capitalize on the knowledge you gained in your fruitful stay at Mary
          Josette Academy. May you successfully reach your dreams! Goodluck!
        </p> */}
      </div>
    </section>
  );
};

export default SectionMessage;
