export interface GalleryModel {
  _id?: string;
  filename: string;
  name: string;
  path: string;
  tags: string[];
  created?: string;
  updated?: string;
  thumbnail?: string;
}
