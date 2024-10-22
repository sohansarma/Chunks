import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data = [
  { platform: "Instagram", followers: 4000, engagement: 2400, posts: 120 },
  { platform: "Facebook", followers: 3000, engagement: 1398, posts: 85 },
  { platform: "YouTube", followers: 2000, engagement: 9800, posts: 50 },
  { platform: "Twitter", followers: 2780, engagement: 3908, posts: 200 },
];

const TableView: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Social Media Analytics</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Platform</TableHead>
            <TableHead className="text-right">Followers</TableHead>
            <TableHead className="text-right">Engagement</TableHead>
            <TableHead className="text-right">Posts</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.platform}>
              <TableCell className="font-medium">{row.platform}</TableCell>
              <TableCell className="text-right">{row.followers}</TableCell>
              <TableCell className="text-right">{row.engagement}</TableCell>
              <TableCell className="text-right">{row.posts}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableView;
