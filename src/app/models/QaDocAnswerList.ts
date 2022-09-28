import {Pageable} from "./pageable";
import {Sort} from "./sort";
import {QaDocAnswer} from "./qaDocAnswer";

export interface QaDocAnswerList {
  content?: QaDocAnswer[],
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
