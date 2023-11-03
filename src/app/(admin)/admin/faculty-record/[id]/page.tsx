import { FC } from "react";

interface ManageFacultyRecordProps {
  params: {
    id: string;
  };
}

const ManageFacultyRecord: FC<ManageFacultyRecordProps> = ({ params }) => {
  const { id } = params;

  return <div>ManageFacultyRecord</div>;
};

export default ManageFacultyRecord;
