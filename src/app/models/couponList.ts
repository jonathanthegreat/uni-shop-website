import {Pageable} from "./pageable";
import {Sort} from "./sort";
import {Coupon} from "./coupon";

export interface CouponList {
  content?: Coupon[];
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
