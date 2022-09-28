import {DocReserve} from "./docReserve";

export interface Transaction {
  created?: Date;
  id?: string;
  reserve?: DocReserve;
  type?: string; // Enum: SUCCESS, FAILED, ALL, UNKNOWN
  updated?: Date;
}
