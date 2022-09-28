import {Pageable} from "./pageable";
import {Sort} from "./sort";
import {CommentModel} from "./comment";

export interface CommentList {
  content?: CommentModel[];
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
