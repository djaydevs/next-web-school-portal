import { FC } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface SectionContactsProps {}

const SectionContacts: FC<SectionContactsProps> = ({}) => {
  return (
    <section id="contacts" className="p-10">
      <div className="bg-primary-500 rounded-xl md:p-10">
        <Card className="flex w-full flex-col justify-between dark:bg-brown-300/50 lg:px-10 lg:py-5">
          <CardHeader>
            <CardTitle className="text-center">Contacts</CardTitle>
            <Separator className="h-1 bg-gold-500" />
          </CardHeader>
          <CardContent className="flex flex-col gap-2 md:flex-row md:gap-6">
            <Card className="w-full rounded-2xl bg-brown-200/50 dark:bg-brown-800">
              <CardHeader>
                <CardTitle className="text-center">Address</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p>
                  Mary Josette Academy
                  <br />
                  Mataas na Kahoy
                  <br />
                  Tigbe, Norzagaray <br />
                  Bulacan, Philippines 3013
                </p>
              </CardContent>
            </Card>
            <Card className="w-full rounded-2xl bg-brown-200/50 dark:bg-brown-800">
              <CardHeader>
                <CardTitle className="text-center">Contact Number</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p>
                  Mobile
                  <br />
                  0917 526 9933
                </p>
              </CardContent>
            </Card>
            <Card className="w-full rounded-2xl bg-brown-200/50 dark:bg-brown-800">
              <CardHeader>
                <CardTitle className="text-center">School Hours</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p>
                  Monday - Friday
                  <br />
                  6:00 AM - 5:00 PM
                </p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SectionContacts;
