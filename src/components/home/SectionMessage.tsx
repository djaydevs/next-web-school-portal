import { FC } from "react";

interface SectionMessageProps {}

const SectionMessage: FC<SectionMessageProps> = ({}) => {
  return (
    <section className="p-10">
      <h3>Principal Message</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente,
        pariatur ex asperiores, error molestiae minus rem veniam facere
        accusantium corrupti velit quod. Perspiciatis voluptatum voluptas odio
        optio dignissimos, ipsum illo?
      </p>
    </section>
  );
};

export default SectionMessage;
