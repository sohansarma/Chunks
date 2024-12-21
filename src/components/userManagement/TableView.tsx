import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";

const data = [{ id: 1, name: "Sohan", email: "sohan.sarma@gmail.com" }];

const TableView: any = ({ users }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Users</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((row: any) => (
            <TableRow key={row.id}>
              <TableCell className="font-medium">
                {row?.user_metadata?.name ?? "-"}
              </TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row?.phone ?? "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableView;
