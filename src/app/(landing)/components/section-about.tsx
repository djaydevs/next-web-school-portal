import { FC } from "react";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface SectionAboutProps {}

const SectionAbout: FC<SectionAboutProps> = ({}) => {
  return (
    <section id="about" className="w-full p-10">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <Card className="dark:bg-brown-300/50 lg:px-16 lg:py-10">
          <CardHeader>
            <CardTitle>About</CardTitle>
            <Separator className="h-1 bg-gold-500" />
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-between gap-2 lg:flex-row">
            <div>
              <p>
                Mary Josette Academy is a family corporation headed by the late
                Brgy. Capt Jose SP Gravador Sr, the corporate president then and
                Mrs. Remedios SM Gravador, a public elementary school Principal
                that time. Year 2004 when it was opened, with only three
                teachers and thirty-eight students in Pre-Elem and Grade One.
                With that felt need of the community to send their High School
                children at a nearer school, a secondary course was organized
                2007, 3 years after its opening and was recognized by the
                government 2009.
              </p>
              <br />
              <p>
                The ultimate aims of the administrators are to cater the young
                pupils with a quality education at a very affordable tuition fee
                and to help the marginalized community having an institution
                where they could finish secondary schooling at less expense,
                effort and time.
              </p>
              <br />
              <p>
                Fortunately, MJA has been enjoying the government subsidy,
                FAPE-ESC for 13 years, and SHS voucher Program for 6 years. To
                meet the goals of the school, MJA continues to gear towards
                excellence by adhering to its Vision and Mission of providing
                quality and descent education with very affordable tuition fees.
              </p>
            </div>
            <Image
              width={500}
              height={500}
              src="/about.png"
              alt="Hero Image"
              className="rounded-xl"
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SectionAbout;
