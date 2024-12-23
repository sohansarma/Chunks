import { useState } from "react";
import { Post } from "@/components/community/Post";
import Topbar from "@/components/Topbar";
import UploadModal from "@/components/UploadModal";
import { CreatePost } from "@/components/community/createPost";
import { Button } from "@/ui/button";
import { Upload } from "lucide-react";

interface PostType {
  id: string;
  author: string;
  content: string;
  imageUrl?: string;
  timestamp: string;
  likes: number;
  comments: {
    id: string;
    author: string;
    content: string;
    timestamp: string;
  }[];
}

const Dashboard = () => {
  const [posts, setPosts] = useState<PostType[]>([
    {
      id: "1",
      author: "John Doe",
      content: "Just launched my new tech project! Check it out!",
      timestamp: new Date().toISOString(),
      likes: 5,
      comments: [
        {
          id: "1",
          author: "Jane Smith",
          content: "This looks amazing! Great work!",
          timestamp: new Date().toISOString(),
        },
      ],
    },
  ]);

  const handleNewPost = (content: string, currentImageUrl: any) => {
    console.log(content, currentImageUrl);
    const newPost: PostType = {
      id: Date.now().toString(),
      author: "Current User",
      content,
      imageUrl: currentImageUrl,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: [],
    };
    console.log(newPost);
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <CreatePost onPost={handleNewPost} />
      <div className="space-y-4">
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
