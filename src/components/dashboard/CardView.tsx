import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { platform: "Instagram", followers: 4000, engagement: 2400, posts: 120 },
  { platform: "Facebook", followers: 3000, engagement: 1398, posts: 85 },
  { platform: "YouTube", followers: 2000, engagement: 9800, posts: 50 },
  { platform: "Twitter", followers: 2780, engagement: 3908, posts: 200 },
];

const CardView: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {data.map((item) => (
        <Card key={item.platform}>
          <CardHeader>
            <CardTitle>{item.platform}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">Followers: {item.followers}</p>
            <p className="text-sm text-gray-500">
              Engagement: {item.engagement}
            </p>
            <p className="text-sm text-gray-500">Posts: {item.posts}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CardView;
