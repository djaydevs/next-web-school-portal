import { FC } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { SchoolYear } from "@prisma/client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { fetchGradesBySchoolYear, fetchSchoolYear } from "@/hooks/getInfos";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Grades, Student, gradesSchema } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UserAvatar } from "@/components/user-avatar";

interface ReportCardProps {
  studentInfo?: Student;
}

const ReportCard: FC<ReportCardProps> = ({ studentInfo }) => {
  const form = useForm<z.infer<typeof gradesSchema>>({
    resolver: zodResolver(gradesSchema),
  });

  const userId = studentInfo?.id ?? "";
  const schoolYearId = form.watch("schoolYearId");

  const {
    data: schoolYears,
    isPending: isLoadingSchoolYears,
    isError: isErrorFetchingSchoolYears,
    error: schoolYearsError,
  } = useQuery<SchoolYear[]>({
    queryKey: ["schoolYears"],
    queryFn: async () => fetchSchoolYear(),
  });

  const {
    data: gradesBySchoolYear,
    isPending: isLoadingGradesBySchoolYear,
    isError: isErrorFetchingGradesBySchoolYear,
    error: gradesBySchoolYearError,
  } = useQuery<Grades[]>({
    queryKey: ["gradesBySchoolYear", userId, schoolYearId],
    queryFn: async () => fetchGradesBySchoolYear(userId, schoolYearId),
  });

  return (
    <div className="space-y-3">
      <Form {...form}>
        <form
          // onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <div className="flex items-center justify-end">
            <FormField
              control={form.control}
              name="schoolYearId"
              render={({ field }) => (
                <FormItem className="mb-2">
                  {isLoadingSchoolYears ? (
                    "loading..."
                  ) : (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[350px]">
                          <SelectValue placeholder="Select school year..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {schoolYears?.map((schoolYear) => {
                          const from = new Date(schoolYear.from).getFullYear();
                          const to = new Date(schoolYear.to).getFullYear();

                          return (
                            <SelectItem
                              key={schoolYear.id}
                              value={schoolYear.id}
                            >
                              <Badge variant="outline" className="mr-2">
                                School Year
                              </Badge>
                              {from} - {to}{" "}
                              {schoolYear.semester === 1
                                ? `(1st semester)`
                                : `(2nd semester)`}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
      <Card className="my-auto w-full">
        <CardHeader className="space-y-2">
          <CardTitle>Report Card Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Subjects</TableHead>
                <TableHead className="text-center">1st Quarter</TableHead>
                <TableHead className="text-center">2nd Quarter</TableHead>
                <TableHead className="text-center">Final Grade</TableHead>
                <TableHead className="text-center">Remarks</TableHead>
                <TableHead className="text-center"></TableHead>
              </TableRow>
            </TableHeader>
            {isLoadingGradesBySchoolYear ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              <TableBody>
                {isErrorFetchingGradesBySchoolYear ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      Error: {gradesBySchoolYearError.message}
                    </TableCell>
                  </TableRow>
                ) : gradesBySchoolYear &&
                  Array.isArray(gradesBySchoolYear) &&
                  gradesBySchoolYear.length > 0 ? (
                  gradesBySchoolYear.map((grade) => {
                    return (
                      <TableRow key={grade.id}>
                        {grade.subject ? (
                          <TableCell className="font-medium">
                            {grade.subject.subjectName}
                          </TableCell>
                        ) : (
                          <TableCell>No subject</TableCell>
                        )}
                        <TableCell className="text-center">
                          {grade.firstQuarter}
                        </TableCell>
                        <TableCell className="text-center">
                          {grade.secondQuarter}
                        </TableCell>
                        <TableCell className="text-center">
                          {grade.finalGrade}
                        </TableCell>
                        <TableCell className="text-center font-bold">
                          {grade.remarks === "PASSED" ? (
                            <Badge variant="outline">PASSED</Badge>
                          ) : (
                            <Badge variant="destructive">FAILED</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full"
                              >
                                Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>More Details</DialogTitle>
                              </DialogHeader>
                              {grade.faculty ? (
                                <div className="flex flex-col gap-2">
                                  <Label>Graded by:</Label>
                                  <div className="flex w-full flex-col items-center justify-center gap-2">
                                    <UserAvatar
                                      user={{
                                        name: grade.faculty.user.name || null,
                                        image: grade.faculty.user.image || null,
                                      }}
                                      className="h-20 w-20"
                                    />
                                    <span>
                                      {grade.faculty?.firstName +
                                        ` ${grade.faculty?.lastName}`}
                                    </span>
                                    <Label className="font-sm text-gray-700 dark:text-gray-400">
                                      {grade.subject.subjectName + " Teacher"}
                                    </Label>
                                  </div>
                                </div>
                              ) : (
                                <span>No Faculty</span>
                              )}
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      <Badge variant="destructive">No grades found</Badge>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            )}
            <TableFooter>
              <TableRow>
                {/* <TableCell colSpan={4}>General Average</TableCell>
              {studentInfo?.studentProfile?.strand?.subjects.map(
                (sub) =>
                  sub.grades?.map((grade) => (
                    <TableCell className="font-medium" key={sub.id}>
                      {grade.genAverage}
                    </TableCell>
                  )),
              )} */}
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportCard;
