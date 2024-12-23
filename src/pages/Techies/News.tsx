import { useState } from "react";
import { Post } from "@/components/community/Post";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";

interface NewsItem {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  techStack: string;
  comments: {
    id: string;
    author: string;
    content: string;
    timestamp: string;
  }[];
}

const TechNews = () => {
  const [selectedTechStack, setSelectedTechStack] = useState<string>("all");

  const [news] = useState<NewsItem[]>([
    {
      id: "1",
      author: "Tech News Bot",
      content:
        "OpenAI announces GPT-5 with breakthrough capabilities in reasoning and understanding.",
      timestamp: new Date().toISOString(),
      likes: 15,
      techStack: "AI",
      comments: [],
    },
    {
      id: "2",
      author: "Tech News Bot",
      content:
        "New quantum computing breakthrough: Scientists achieve 1000-qubit processor.",
      timestamp: new Date().toISOString(),
      likes: 10,
      techStack: "Quantum Computing",
      comments: [],
    },
    {
      id: "3",
      author: "Tech News Bot",
      content:
        "React 19 announced with groundbreaking performance improvements.",
      timestamp: new Date().toISOString(),
      likes: 8,
      techStack: "React",
      comments: [],
    },
  ]);

  const techStacks = ["all", "AI", "Quantum Computing", "React"];

  const filteredNews =
    selectedTechStack === "all"
      ? news
      : news.filter((item) => item.techStack === selectedTechStack);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Latest Tech News</h1>
        <Select value={selectedTechStack} onValueChange={setSelectedTechStack}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select tech stack" />
          </SelectTrigger>
          <SelectContent>
            {techStacks.map((tech) => (
              <SelectItem key={tech} value={tech}>
                {tech === "all" ? "All Tech Stacks" : tech}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-4">
        {filteredNews.map((item) => (
          <Post key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default TechNews;
