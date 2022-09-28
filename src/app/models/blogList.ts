import {Pageable} from "./pageable";
import {Sort} from "./sort";
import {Blog} from "./blog";

export interface BlogList {
  content?: Blog[],
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
