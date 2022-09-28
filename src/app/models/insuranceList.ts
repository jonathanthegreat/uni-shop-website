import {Pageable} from "./pageable";
import {Sort} from "./sort";
import {Insurance} from "./insurance";

export interface InsuranceList {
  content?: Insurance[],
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
