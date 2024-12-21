import React from "react";
import { Button } from "@/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { Instagram, Facebook, Youtube } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

// Mock API functions (replace these with actual API calls)
const fetchConnections = async () => {
  // Simulating API call
  return [
    { name: "Instagram", connected: false },
    { name: "Facebook", connected: false },
    { name: "YouTube", connected: false },
  ];
};

const connectPlatform = async (platform: string) => {
  // Simulating API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { success: true, platform };
};

const disconnectPlatform = async (platform: string) => {
  // Simulating API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { success: true, platform };
};

const Connections: React.FC = () => {
  const { data: socialPlatforms, refetch } = useQuery({
    queryKey: ["socialConnections"],
    queryFn: fetchConnections,
  });

  const connectMutation = useMutation({
    mutationFn: connectPlatform,
    onSuccess: (data) => {
      toast.success(`Connected to ${data.platform}`);
      refetch();
    },
    onError: (error) => {
      toast.error(`Failed to connect: ${error}`);
    },
  });

  const disconnectMutation = useMutation({
    mutationFn: disconnectPlatform,
    onSuccess: (data) => {
      toast.success(`Disconnected from ${data.platform}`);
      refetch();
    },
    onError: (error) => {
      toast.error(`Failed to disconnect: ${error}`);
    },
  });

  const handleConnection = (platform: string, isConnected: boolean) => {
    if (isConnected) {
      disconnectMutation.mutate(platform);
    } else {
      connectMutation.mutate(platform);
    }
  };

  const getIcon = (name: string) => {
    switch (name) {
      case "Instagram":
        return Instagram;
      case "Facebook":
        return Facebook;
      case "YouTube":
        return Youtube;
      default:
        return Instagram;
    }
  };

  if (!socialPlatforms) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Connections</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {socialPlatforms.map((platform) => {
          const Icon = getIcon(platform.name);
          return (
            <Card key={platform.name}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon className="w-6 h-6" />
                  <span>{platform.name}</span>
                </CardTitle>
                <CardDescription>
                  {platform.connected ? "Connected" : "Not connected"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  {platform.connected
                    ? "Your account is connected and syncing data."
                    : "Connect your account to start syncing data."}
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  variant={platform.connected ? "outline" : "default"}
                  onClick={() =>
                    handleConnection(platform.name, platform.connected)
                  }
                  disabled={
                    connectMutation.isPending || disconnectMutation.isPending
                  }
                >
                  {platform.connected ? "Disconnect" : "Connect"}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
