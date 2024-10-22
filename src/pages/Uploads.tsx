import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List } from "lucide-react";
import { UploadsCardView } from "@/components/uploads/UploadsCardView";
import { UploadsTableView } from "@/components/uploads/UploadsTableView";
import { Upload } from "@/types/uploads";

const mockUploads: Upload[] = [
  {
    id: 1,
    title: "Summer Vlog",
    platforms: [
      { name: "YouTube", views: 1500, likes: 200 },
      { name: "Instagram", views: 1000, likes: 150 },
    ],
  },
  {
    id: 2,
    title: "Product Review",
    platforms: [
      { name: "Instagram", views: 3000, likes: 500 },
      { name: "Facebook", views: 2500, likes: 400 },
    ],
  },
  {
    id: 3,
    title: "Tutorial Video",
    platforms: [
      { name: "YouTube", views: 2000, likes: 300 },
      { name: "Facebook", views: 1800, likes: 250 },
    ],
  },
  {
    id: 4,
    title: "Behind the Scenes",
    platforms: [
      { name: "Instagram", views: 5000, likes: 800 },
      { name: "YouTube", views: 4500, likes: 700 },
      { name: "Facebook", views: 4000, likes: 600 },
    ],
  },
];

const Uploads = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<
    string | undefined
  >();
  const [selectedUploadId, setSelectedUploadId] = useState<number | null>(null);
  const [selectedPlatformData, setSelectedPlatformData] = useState<
    Upload["platforms"][0] | null
  >(null);
  const [viewMode, setViewMode] = useState<"card" | "table">("card");

  const filteredUploads =
    selectedPlatform && selectedPlatform !== "all"
      ? mockUploads.filter((upload) =>
          upload.platforms.some((p) => p.name === selectedPlatform)
        )
      : mockUploads;

  const handlePlatformClick = (
    uploadId: number,
    platformData: Upload["platforms"][0]
  ) => {
    setSelectedUploadId(uploadId);
    setSelectedPlatformData(platformData);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Uploads</h2>
        <div className="flex items-center space-x-4">
          <Select onValueChange={setSelectedPlatform}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="YouTube">YouTube</SelectItem>
              <SelectItem value="Instagram">Instagram</SelectItem>
              <SelectItem value="Facebook">Facebook</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex space-x-2">
            <Button
              variant={viewMode === "card" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("card")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "table" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("table")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      {viewMode === "card" ? (
        <UploadsCardView
          uploads={filteredUploads}
          onPlatformClick={handlePlatformClick}
        />
      ) : (
        <UploadsTableView
          uploads={filteredUploads}
          onPlatformClick={handlePlatformClick}
        />
      )}
    </div>
  );
};

export default Uploads;
