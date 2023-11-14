import { FC, ReactNode } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Heading from "@/components/ui/heading";

interface SectionProgramsProps {}

const SectionPrograms: FC<SectionProgramsProps> = ({}) => {
  return (
    <section id="programs" className="p-10">
      <div className="bg-primary-500 rounded-xl md:p-10">
        <Card className="flex flex-col items-center lg:px-10 lg:py-5">
          <CardHeader>
            <CardTitle>Programs</CardTitle>
          </CardHeader>
          <CardContent>
            <Image
              width={1000}
              height={1000}
              src="/programs.jpg"
              alt="Programs Image"
              className="rounded-xl"
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SectionPrograms;
