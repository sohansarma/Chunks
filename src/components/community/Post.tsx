import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Button } from "@/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/ui/card";
import { Textarea } from "@/ui/textarea";
import { MessageCircle, ThumbsUp } from "lucide-react";

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

interface PostProps {
  id: string;
  author: string;
  content: string;
  imageUrl?: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
}

export const Post = ({
  author,
  content,
  imageUrl,
  timestamp,
  likes,
  comments: initialComments,
}: PostProps) => {
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [localLikes, setLocalLikes] = useState(likes);

  const handleAddComment = () => {
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now().toString(),
      author: "Current User",
      content: commentText,
      timestamp: new Date().toISOString(),
    };

    setComments([...comments, newComment]);
    setCommentText("");
    setIsCommenting(false);
  };

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src={`https://avatar.vercel.sh/${author}`} />
          <AvatarFallback>{author[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{author}</h3>
          <p className="text-sm text-gray-500">
            {new Date(timestamp).toLocaleDateString()}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 mb-4">{content}</p>
        {imageUrl && (
          <div className="rounded-lg overflow-hidden mb-4">
            <img src={imageUrl} alt="Post content" className="w-full h-auto" />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="flex gap-4 w-full">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocalLikes((prev) => prev + 1)}
          >
            <ThumbsUp className="w-4 h-4 mr-2" />
            {localLikes}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCommenting(!isCommenting)}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            {comments.length}
          </Button>
        </div>

        {isCommenting && (
          <div className="w-full space-y-2">
            <Textarea
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <Button onClick={handleAddComment}>Post Comment</Button>
          </div>
        )}

        {comments.map((comment) => (
          <div key={comment.id} className="w-full p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Avatar className="w-6 h-6">
                <AvatarImage
                  src={`https://avatar.vercel.sh/${comment.author}`}
                />
                <AvatarFallback>{comment.author[0]}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{comment.author}</span>
              <span className="text-xs text-gray-500">
                {new Date(comment.timestamp).toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm text-gray-700">{comment.content}</p>
          </div>
        ))}
      </CardFooter>
    </Card>
  );
};
