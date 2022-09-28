import {Admin} from "./admin";
import {Doctor} from "./doctor";
import {PostCategory} from "./postCategory";

export interface Blog {
  admin?: Admin;
  content?: string;
  created?: string;
  doctor?: Doctor;
  id?: string;
  isHaveVideo?: boolean;
  postCategories?: PostCategory[];
  tags?: string[];
  thumbnail?: string;
  title?: string;
  updated?: string;
  video?: string;
  viewCount?: number;
}

export interface PostBlog {
  adminId?: string;
  categoryIds?: string[];
  content?: string;
  docId?: string;
  tags?: string[];
  title?: string;
}
