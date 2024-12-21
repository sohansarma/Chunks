import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { PlatformStatsDialog } from "./PlatformStatsDialog";
import { Upload } from "@/types/uploads";
import { getAccumulatedStats } from "@/utils/uploads";

interface UploadsCardViewProps {
  uploads: Upload[];
  onPlatformClick: (uploadId: number, platform: Upload["platforms"][0]) => void;
}

export const UploadsCardView = ({
  uploads,
  onPlatformClick,
}: UploadsCardViewProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {uploads.map((upload) => {
      const accumulatedStats = getAccumulatedStats(upload.platforms);
      return (
        <Card key={upload.id}>
          <CardHeader>
            <CardTitle>{upload.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-sm font-semibold">Total Stats:</p>
              <p className="text-sm text-gray-500">
                Views: {accumulatedStats.views}
              </p>
              <p className="text-sm text-gray-500">
                Likes: {accumulatedStats.likes}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {upload.platforms.map((platform) => (
                <PlatformStatsDialog
                  key={platform.name}
                  platform={platform}
                  title={upload.title}
                  onPlatformClick={() => onPlatformClick(upload.id, platform)}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      );
    })}
  </div>
);
