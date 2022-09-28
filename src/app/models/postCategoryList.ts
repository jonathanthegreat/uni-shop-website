import {Pageable} from "./pageable";
import {Sort} from "./sort";
import {PostCategory} from "./postCategory";

export interface PostCategoryList {
  content?: PostCategory[],
  pageable?: Pageable;
  totalElements?: number;
  last?: boolean;
  totalPages?: number;
  sort?: Sort;
  first?: boolean;
  numberOfElements?: number;
  size?: number;
  number?: number;
  empty?: boolean;
}
