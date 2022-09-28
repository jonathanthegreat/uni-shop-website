import {Coupon} from "./coupon";
import {Doctor} from "./doctor";
import {User} from "./user";
import {AppointmentTime} from "./appointmentTime";

export interface DocReserve {
  appointmentTime?: AppointmentTime;
  bankReferenceNumber?: string;
  coupon?: Coupon;
  created?: string;
  disCountPrice?: number;
  disCountPriceFormatted?: string;
  doctor?: Doctor;
  payGate?: any;
  id?: string;
  link?: string;
  payAuthority?: string;
  referenceNumber?: string;
  regularPrice?: number;
  regularPriceFormatted?: string;
  status?: string;
  totalPrice?: number;
  totalPriceFormatted?: string;
  updated?: string;
  user?: User;
}
