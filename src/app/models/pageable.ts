import {Sort} from "./sort";

export interface Pageable {
  sort?: Sort;
  pageSize?: number;
  pageNumber?: number;
  offset?: number;
  paged?: boolean;
  unpaged?: boolean;
}
