import { PlatformData } from "@/types/uploads";

export const getAccumulatedStats = (platforms: PlatformData[]) => {
  return platforms.reduce(
    (acc, platform) => {
      acc.views += platform.views;
      acc.likes += platform.likes;
      return acc;
    },
    { views: 0, likes: 0 }
  );
};
