import { FC } from "react";

import { Student } from "@/types";
import { UserAvatar } from "@/components/user-avatar";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface GradeInfoCardProps {
  studentInfo?: Student;
}

const GradeInfoCard: FC<GradeInfoCardProps> = ({ studentInfo }) => {
  return (
    <Card className="my-auto w-full md:w-2/3">
      <CardHeader className="space-y-2">
        <div className="flex">
          <UserAvatar
            user={{
              name: studentInfo?.name || null,
              image: studentInfo?.image || null,
            }}
            className="my-2 h-20 w-20"
          />
          <div className="mx-2 my-auto flex flex-col gap-2">
            <CardTitle>{studentInfo?.name}</CardTitle>
            <Label>{studentInfo?.email}</Label>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <ScrollArea className="h-full space-y-2 p-4 md:h-[360px]">
          <div className="space-y-4">
            <Separator className="mt-4" />
            <h3>Report Card Information</h3>
            <Separator />
            {studentInfo?.studentProfile?.strand?.subjects.map((sub) => (
              <div key={sub.id}>
                <Label>{sub.subjectName}:</Label>
                {sub.grades ? (
                  sub.grades.map((grade) => (
                    <div key={grade.id}>
                      <Label>
                        1Q: {grade.firstQuarter}% | 2Q: {grade.secondQuarter}% |
                        Final: {grade.finalGrade}%
                      </Label>
                    </div>
                  ))
                ) : (
                  <Label>No grades available</Label>
                )}
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <Separator className="mt-4" />
            <h3>Student Personal Information</h3>
            <Separator />
            <div className="flex flex-nowrap items-center justify-between">
              <Label>LRN:</Label>
              <Label>{studentInfo?.studentProfile.lrnNumber}</Label>
            </div>
            <div className="flex flex-nowrap items-center justify-between">
              <Label>Last Name:</Label>
              <Label>{studentInfo?.studentProfile.lastName}</Label>
            </div>
            <div className="flex flex-nowrap items-center justify-between">
              <Label>First Name:</Label>
              <Label>{studentInfo?.studentProfile.firstName}</Label>
            </div>
            <div className="flex flex-nowrap items-center justify-between">
              <Label>Middle Name:</Label>
              <Label>{studentInfo?.studentProfile.middleName}</Label>
            </div>
            <div className="flex flex-nowrap items-center justify-between">
              <Label>Age:</Label>
              <Label>{studentInfo?.studentProfile.age}</Label>
            </div>
            <div className="flex flex-nowrap items-center justify-between">
              <Label>Date of Birth:</Label>
              <Label>
                {new Date(
                  studentInfo?.studentProfile.dateOfBirth as unknown as string,
                ).toLocaleDateString()}
              </Label>
            </div>
            <div className="flex flex-nowrap items-center justify-between">
              <Label>Sex:</Label>
              <Label>{studentInfo?.studentProfile.sex}</Label>
            </div>
            <div className="flex flex-nowrap items-center justify-between">
              <Label>Address:</Label>
              <Label>{studentInfo?.studentProfile.address}</Label>
            </div>
            <div className="flex flex-nowrap items-center justify-between">
              <Label>Contact Number:</Label>
              <Label>{studentInfo?.studentProfile.contactNumber}</Label>
            </div>
          </div>
          <div className="space-y-4">
            <Separator className="mt-4" />
            <h3>Student School Information</h3>
            <Separator />
            <div className="flex flex-nowrap items-center justify-between">
              <Label>Work Immersion:</Label>
              <Label>{studentInfo?.studentProfile.workImmersion}</Label>
            </div>
            <div className="flex flex-nowrap items-center justify-between">
              <Label>Junior High School:</Label>
              <Label>{studentInfo?.studentProfile.nameofJHS}</Label>
            </div>
            <div className="flex flex-nowrap items-center justify-between">
              <Label>General Average ( JHS ):</Label>
              <Label>{studentInfo?.studentProfile.genAveJHS}</Label>
            </div>
            <div className="flex flex-nowrap items-center justify-between">
              <Label>Completed ( JHS ):</Label>
              <Label>{studentInfo?.studentProfile.jhsCompleted}</Label>
            </div>
          </div>
          <div className="space-y-4">
            <Separator className="mt-4" />
            <h3>Parent / Guardian Information</h3>
            <Separator />
            <div className="flex flex-nowrap items-center justify-between">
              <Label>Name:</Label>
              <Label>{studentInfo?.studentProfile.parentGuardianName}</Label>
            </div>
            <div className="flex flex-nowrap items-center justify-between">
              <Label>Address:</Label>
              <Label>{studentInfo?.studentProfile.parentGuardianAddress}</Label>
            </div>
            <div className="flex flex-nowrap items-center justify-between">
              <Label>Occupation:</Label>
              <Label>
                {studentInfo?.studentProfile.parentGuardianOccupation}
              </Label>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default GradeInfoCard;
