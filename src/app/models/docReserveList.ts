import {Pageable} from "./pageable";
import {Sort} from "./sort";
import {DocReserve} from "./docReserve";

export interface DocReserveList {
  content?: DocReserve[];
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
