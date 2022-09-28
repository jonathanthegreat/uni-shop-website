import {Language} from "./language";
import {InsuranceList} from "./insuranceList";
import {MedicalList} from "./medicalList";

export interface Doctor {
  address?: string;
  bdate?: Date;
  bio?: string;
  canOfflineReserve?: boolean;
  canOnlineReserve?: boolean;
  created?: string;
  description?: string;
  email?: string;
  firstName?: string;
  commentCount?: number;
  id?: string;
  insurList?: InsuranceList[];
  language?: Language;
  lastName?: string;
  medicalFields?: MedicalList[];
  mobile?: string;
  officeNumber?: string;
  offlinePrice?: number;
  offlinePriceFormatted?: string;
  onlinePrice?: number;
  onlinePriceFormatted?: string;
  profileImage?: string;
  rate?: number;
  shebaNumber?: string;
  status?: string;
  updated?: string;
}
