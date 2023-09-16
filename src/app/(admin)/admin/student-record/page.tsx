import { FC } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExistingStudents from "@/components/existing";
import NewStudents from "@/components/new-students";
import AlumniStudents from "@/components/alumni";

export const metadata = {
  title: "Student Record | Admin Portal",
  description: "Admin Portal Student Record",
};

interface adminSRProps {}

const AdminStudentRecord: FC<adminSRProps> = ({}) => {
  return (
    <Tabs defaultValue="existing" className="w-full p-4">
      <TabsList className="grid w-full md:w-[500px] grid-cols-3">
        <TabsTrigger value="existing">Existing</TabsTrigger>
        <TabsTrigger value="new-students">New Students</TabsTrigger>
        <TabsTrigger value="alumni">Alumni</TabsTrigger>
      </TabsList>
      <TabsContent value="existing">
        <ExistingStudents />
      </TabsContent>
      <TabsContent value="new-students">
        <NewStudents />
      </TabsContent>
      <TabsContent value="alumni">
        <AlumniStudents />
      </TabsContent>
    </Tabs>
  );
};

export default AdminStudentRecord;
