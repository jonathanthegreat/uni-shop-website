import {Doctor} from "./doctor";
import {Pageable} from "./pageable";
import {Sort} from "./sort";

export interface DoctorList {
  content?: Doctor[],
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
