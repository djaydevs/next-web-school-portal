import { FC } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SafeUser } from "@/types";

interface accountTableProps {
  allUsers?: SafeUser | null;
}

const AccountTable: FC<accountTableProps> = ({ allUsers }) => {
  const accounts = [
    {
      id: allUsers?.id,
      name: allUsers?.name,
      email: allUsers?.email,
      role: allUsers?.role,
      image: allUsers?.image,
    },
  ];

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
            <TableCell className="flex items-center justify-start">
              <Avatar>
                {account?.image && (
                  <AvatarImage src={account?.image} alt="avatar image" />
                )}
                <AvatarFallback>J{account?.name}</AvatarFallback>
              </Avatar>
              <p className="ms-2">{account.name}</p>
            </TableCell>
            <TableCell>{account.email}</TableCell>
            <TableCell>{account.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AccountTable;
