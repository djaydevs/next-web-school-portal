import { FC } from "react";

interface SectionProgramsProps {}

const SectionPrograms: FC<SectionProgramsProps> = ({}) => {
  return (
    <section id="programs" className="bg-white p-10">
      <div className="bg-primary-500 p-10 rounded-xl">
        <h3>Programs</h3>
      </div>
    </section>
  );
};

export default SectionPrograms;
