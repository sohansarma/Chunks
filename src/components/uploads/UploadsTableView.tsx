import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlatformStatsDialog } from "./PlatformStatsDialog";
import { Upload } from "@/types/uploads";
import { getAccumulatedStats } from "@/utils/uploads";

interface UploadsTableViewProps {
  uploads: Upload[];
  onPlatformClick: (uploadId: number, platform: Upload["platforms"][0]) => void;
}

export const UploadsTableView = ({
  uploads,
  onPlatformClick,
}: UploadsTableViewProps) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Title</TableHead>
        <TableHead>Total Views</TableHead>
        <TableHead>Total Likes</TableHead>
        <TableHead>Platforms</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {uploads.map((upload) => {
        const accumulatedStats = getAccumulatedStats(upload.platforms);
        return (
          <TableRow key={upload.id}>
            <TableCell>{upload.title}</TableCell>
            <TableCell>{accumulatedStats.views}</TableCell>
            <TableCell>{accumulatedStats.likes}</TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-2">
                {upload.platforms.map((platform) => (
                  <PlatformStatsDialog
                    key={platform.name}
                    platform={platform}
                    title={upload.title}
                    onPlatformClick={() => onPlatformClick(upload.id, platform)}
                  />
                ))}
              </div>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  </Table>
);
