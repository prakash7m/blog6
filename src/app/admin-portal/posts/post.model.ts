import { GalleryModel } from '../gallery/gallery.model';
import { CategoryModel } from '../categories/category.model';
import { UserModel } from '../core/user.model';

export interface PostModel {
  _id?: string;
  title: string;
  synopsis: string;
  slug: string;
  content?: string;
  hero?: GalleryModel;
  category?: CategoryModel[];
  active?: boolean;
  user?: UserModel;
  created?: string;
  updated?: string;
  meta?: string;
  stars?: number;
  readtime?: number;
  views?: number;
}
