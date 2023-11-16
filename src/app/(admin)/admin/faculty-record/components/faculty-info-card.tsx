import { FC } from "react";

import { Faculty } from "@/types";
import { UserAvatar } from "@/components/user-avatar";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FacultyInfoCardProps {
  facultyInfo?: Faculty;
}

const FacultyInfoCard: FC<FacultyInfoCardProps> = ({ facultyInfo }) => {
  return (
    <Card className="my-auto w-full md:w-2/3">
      <CardHeader className="space-y-2">
        <div className="flex">
          <UserAvatar
            user={{
              name: facultyInfo?.name || null,
              image: facultyInfo?.image || null,
            }}
            className="my-2 h-20 w-20"
          />
          <div className="mx-2 my-auto flex flex-col gap-2">
            <CardTitle>{facultyInfo?.name}</CardTitle>
            <Label>{facultyInfo?.email}</Label>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <ScrollArea className="h-full space-y-2 p-4 md:h-[360px]">
          <div className="space-y-4">
            <h3>Faculty Personal Information</h3>
            <Separator />
            <div className="flex flex-nowrap items-center justify-between">
              <Label>ID:</Label>
              <Label>{facultyInfo?.facultyProfile.empNumber}</Label>
            </div>
            <div className="flex flex-nowrap items-center justify-between">
              <Label>Last Name:</Label>
              <Label>{facultyInfo?.facultyProfile.lastName}</Label>
            </div>
            <div className="flex flex-nowrap items-center justify-between">
              <Label>First Name:</Label>
              <Label>{facultyInfo?.facultyProfile.firstName}</Label>
            </div>
            <div className="flex flex-nowrap items-center justify-between">
              <Label>Middle Name:</Label>
              <Label>{facultyInfo?.facultyProfile.middleName}</Label>
            </div>
            <div className="flex flex-nowrap items-center justify-between">
              <Label>Age:</Label>
              <Label>{facultyInfo?.facultyProfile.age}</Label>
            </div>
            {/* <div className="flex flex-nowrap items-center justify-between">
              <Label>Date of Birth:</Label>
              <Label>
                {new Date(
                  facultyInfo?.facultyProfile.dateOfBirth as unknown as string,
                ).toLocaleDateString()}
              </Label>
            </div> */}
            <div className="flex flex-nowrap items-center justify-between">
              <Label>Sex:</Label>
              <Label>{facultyInfo?.facultyProfile.sex}</Label>
            </div>
            <div className="flex flex-nowrap items-center justify-between">
              <Label>Civil Status:</Label>
              <Label>{facultyInfo?.facultyProfile.civilStatus}</Label>
            </div>
            {/* <div className="flex flex-nowrap items-center justify-between">
              <Label>Address:</Label>
              <Label>{facultyInfo?.facultyProfile.address}</Label>
            </div>
            <div className="flex flex-nowrap items-center justify-between">
              <Label>Contact Number:</Label>
              <Label>{facultyInfo?.facultyProfile.contactNumber}</Label>
            </div> */}
          </div>
          <div className="space-y-4">
            <Separator className="mt-4" />
            <h3>Faculty School Information</h3>
            <Separator />
            <div className="flex flex-nowrap items-center justify-between">
              <Label>Years in MJA:</Label>
              <Label>{facultyInfo?.facultyProfile.yearsInMJA}</Label>
            </div>
            <div className="flex flex-nowrap items-center justify-between">
              <Label>Other School:</Label>
              <Label>{facultyInfo?.facultyProfile.otherSchool}</Label>
            </div>
            <div className="flex flex-nowrap items-center justify-between">
              <Label>License (Date Issued):</Label>
              <Label>
                {new Date(
                  facultyInfo?.facultyProfile.dateIssued as unknown as string,
                ).toLocaleDateString()}
              </Label>
            </div>
            <div className="flex flex-nowrap items-center justify-between">
              <Label>License (Date Valid):</Label>
              <Label>
                {new Date(
                  facultyInfo?.facultyProfile.dateValid as unknown as string,
                ).toLocaleDateString()}
              </Label>
            </div>
            <div className="flex flex-nowrap items-center justify-between">
              <Label>License Number:</Label>
              <Label>{facultyInfo?.facultyProfile.licenseNumber}</Label>
            </div>
            <div className="flex flex-nowrap items-center justify-between">
              <Label>Organization:</Label>
              <Label>{facultyInfo?.facultyProfile.profOrg}</Label>
            </div>
            <div className="flex flex-nowrap items-center justify-between">
              <Label>Degree:</Label>
              <Label>{facultyInfo?.facultyProfile.degree}</Label>
            </div>
            <div className="flex flex-nowrap items-center justify-between">
              <Label>Major:</Label>
              <Label>{facultyInfo?.facultyProfile.major}</Label>
            </div>
            <div className="flex flex-nowrap items-center justify-between">
              <Label>Minor:</Label>
              <Label>{facultyInfo?.facultyProfile.minor}</Label>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default FacultyInfoCard;
