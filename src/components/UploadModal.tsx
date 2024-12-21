import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { toast } from "sonner";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose }) => {
  const [uploadType, setUploadType] = useState<"link" | "file" | null>(null);
  const [link, setLink] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = () => {
    if (uploadType === "link" && link) {
      // Handle link upload
      toast.success("Link uploaded successfully");
    } else if (uploadType === "file" && file) {
      // Handle file upload
      toast.success("File uploaded successfully");
    } else {
      toast.error("Please provide a link or select a file");
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Content</DialogTitle>
          <DialogDescription>
            Choose how you want to upload your content
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {!uploadType && (
            <div className="flex space-x-4">
              <Button onClick={() => setUploadType("link")}>
                Extract from Link
              </Button>
              <Button onClick={() => setUploadType("file")}>
                Upload Directly
              </Button>
            </div>
          )}
          {uploadType === "link" && (
            <div className="space-y-2">
              <Label htmlFor="link">Enter URL</Label>
              <Input
                id="link"
                placeholder="https://example.com/video"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
          )}
          {uploadType === "file" && (
            <div className="space-y-2">
              <Label htmlFor="file">Select File</Label>
              <Input
                id="file"
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </div>
          )}
          {uploadType && (
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setUploadType(null)}>
                Back
              </Button>
              <Button onClick={handleUpload}>Upload</Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadModal;
