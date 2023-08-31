import { FC } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const accounts = [
  {
    id: "101010101010",
    name: "Taylor Swift",
    email: "swift.taylor@gmail.com",
    role: "STUDENT",
  },
  {
    id: "101010101010",
    name: "Taylor Swift",
    email: "swift.taylor@gmail.com",
    role: "STUDENT",
  },
  {
    id: "101010101010",
    name: "Taylor Swift",
    email: "swift.taylor@gmail.com",
    role: "STUDENT",
  },
  {
    id: "101010101010",
    name: "Taylor Swift",
    email: "swift.taylor@gmail.com",
    role: "STUDENT",
  },
  {
    id: "101010101010",
    name: "Taylor Swift",
    email: "swift.taylor@gmail.com",
    role: "STUDENT",
  },
  {
    id: "101010101010",
    name: "Taylor Swift",
    email: "swift.taylor@gmail.com",
    role: "STUDENT",
  },
];

interface accountTableProps {}

const AccountTable: FC<accountTableProps> = ({}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>E-mail</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {accounts.map((account) => (
          <TableRow key={account.id}>
            <TableCell className="font-medium">{account.id}</TableCell>
            <TableCell>{account.name}</TableCell>
            <TableCell>{account.email}</TableCell>
            <TableCell>{account.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AccountTable;
