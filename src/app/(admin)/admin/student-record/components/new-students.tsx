"use client";

import { FC } from "react";
import UseCSV from "@usecsv/react";

import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";

interface newStudentsProps {}

const NewStudents: FC<newStudentsProps> = ({}) => {
  const renderButton = (openModal: any) => {
    return (
      <Button onClick={openModal}>
        <Icons.FilePlus2 className="mr-2" />
        Import Data
      </Button>
    );
  };

  return (
    <div>
      <UseCSV
        importerKey="d4dd9a93-3546-44f6-9cbf-4ba978759442"
        user={{ userId: 12345 }}
        render={(openModal) => renderButton(openModal)}
      />
    </div>
  );
};

export default NewStudents;
