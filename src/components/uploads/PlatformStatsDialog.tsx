import { Button } from "@/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import { PlatformData } from "@/types/uploads";

interface PlatformStatsDialogProps {
  platform: PlatformData;
  title: string;
  onPlatformClick: () => void;
}

export const PlatformStatsDialog = ({
  platform,
  title,
  onPlatformClick,
}: PlatformStatsDialogProps) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline" size="sm" onClick={onPlatformClick}>
        {platform.name}
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {platform.name} Stats for {title}
        </DialogTitle>
      </DialogHeader>
      <div className="mt-4">
        <p className="text-sm text-gray-500">Views: {platform.views}</p>
        <p className="text-sm text-gray-500">Likes: {platform.likes}</p>
      </div>
    </DialogContent>
  </Dialog>
);
