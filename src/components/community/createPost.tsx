import { useState } from "react";
import { Button } from "@/ui/button";
import { Card, CardContent, CardFooter } from "@/ui/card";
import { Textarea } from "@/ui/textarea";
import UploadModal from "../UploadModal";

interface CreatePostProps {
  onPost: (content: string, currentImageUrl: any) => void;
}

export const CreatePost = ({ onPost }: CreatePostProps) => {
  const [content, setContent] = useState("");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | undefined>();

  const handlePost = () => {
    if (!content.trim()) return;
    onPost(content, currentImageUrl);
    setContent("");
    setCurrentImageUrl(undefined);
  };

  const handleImageUpload = (imageUrl: string) => {
    setCurrentImageUrl(imageUrl);
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <Textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e: any) => setContent(e.target.value)}
          className="min-h-[100px]"
        />
      </CardContent>
      <CardFooter className="flex justify-space-between">
        <Button
          onClick={() => setIsUploadModalOpen(true)}
          variant="outline"
          className="mr-2"
        >
          Attach
        </Button>
        <Button onClick={handlePost}>Post</Button>
      </CardFooter>
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleImageUpload}
      />
    </Card>
  );
};
