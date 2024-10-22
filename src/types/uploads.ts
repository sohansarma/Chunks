export interface PlatformData {
  name: string;
  views: number;
  likes: number;
}

export interface Upload {
  id: number;
  title: string;
  platforms: PlatformData[];
}
