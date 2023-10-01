import { FC, ReactNode } from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Heading from "@/components/ui/heading";

interface SectionProgramsProps {}

const SectionPrograms: FC<SectionProgramsProps> = ({}) => {
  return (
    <section id="programs" className="p-10">
      <Heading size="sm">Programs</Heading>
      <div className="bg-primary-500 p-10 rounded-xl">
        <Card>
          <CardHeader>
            <Image
              width="300"
              height="100"
              src="/elem.webp"
              alt="Programs Image"
              style={{ objectFit: "contain" }}
              className="rounded-xl"
            />
            <CardTitle>Pre-Elementary and Elementary</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <Image
              width="300"
              height="100"
              src="/jhs.webp"
              alt="Programs Image"
              style={{ objectFit: "contain" }}
              className="rounded-xl"
            />
            <CardTitle>Junior High School</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <Image
              width="300"
              height="100"
              src="/shs.webp"
              alt="Programs Image"
              style={{ objectFit: "contain" }}
              className="rounded-xl"
            />
            <CardTitle>Senior High School</CardTitle>
          </CardHeader>
        </Card>
      </div>
    </section>
  );
};

export default SectionPrograms;
