import { FC } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SectionMessageProps {}

const SectionMessage: FC<SectionMessageProps> = ({}) => {
  return (
    <section id="message" className="w-full p-10">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <Image
          width={350}
          height={350}
          src="/principal.jpg"
          alt="Hero Image"
          className="rounded-full"
        />
        <div>
          <Card className="lg:px-16 lg:py-10">
            <CardHeader>
              <CardTitle>Principal Message</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Warm greetings from your school administration. Congratulations
                batch 2023! As time goes by, your personality changes and
                improves from childhood to what you are now. Your stay in Mary
                Josette Academy from Kinder to Grade 6 prepared you to the next
                episode in life, the secondary schooling. Go, move on! To our
                junior and senior students, don&apos;t forget that knowledge is
                the heritage of mankind and mostly the courageous ones inherit
                it. So be brave facing the next chapter of your life. You are
                now to begin a new journey, more exciting yet demanding. What
                you need is to strive harder, work seriously and capitalize on
                the knowledge you gained in your fruitful stay at Mary Josette
                Academy. May you successfully reach your dreams! Goodluck!
              </p>
            </CardContent>
            <CardFooter>
              <p className="w-full text-right font-semibold italic">
                - Mrs. Remedios SM. Gravador
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SectionMessage;
