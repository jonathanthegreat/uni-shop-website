import {Pageable} from "./pageable";
import {Sort} from "./sort";
import {QA} from "./q&a";

export interface QaList {
  content?: QA[],
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
