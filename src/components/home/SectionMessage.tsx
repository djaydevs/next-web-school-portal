import { FC } from "react";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";

interface SectionMessageProps {}

const SectionMessage: FC<SectionMessageProps> = ({}) => {
  return (
    <section id="message" className="p-10">
      <Heading size="sm">Principal Message</Heading>
      <Paragraph>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis et,
        esse sequi modi veritatis veniam ullam fugiat fuga ut sed assumenda
        accusamus nobis, asperiores autem nostrum perspiciatis unde. Quae,
        facere.
      </Paragraph>
    </section>
  );
};

export default SectionMessage;
