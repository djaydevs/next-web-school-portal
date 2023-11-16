import { FC } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface SectionProgramsProps {}

const SectionPrograms: FC<SectionProgramsProps> = ({}) => {
  return (
    <section id="programs" className="p-10">
      <div className="bg-primary-500 rounded-xl md:p-10">
        <Card className="flex flex-col dark:bg-brown-300/50 lg:px-10 lg:py-5">
          <CardHeader>
            <CardTitle className="text-center">Programs</CardTitle>
            <Separator className="h-1 bg-gold-500" />
          </CardHeader>
          <CardContent className="mx-auto">
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
