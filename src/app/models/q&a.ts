import {Answer} from "./answer";
import {Doctor} from "./doctor";
import {MedicalList} from "./medicalList";
import {Topic} from "./topic";
import {User} from "./user";

export interface QA {
  answers?: Answer[];
  code?: string;
  created?: string;
  disLikeCount?: number;
  doctor?: Doctor;
  id?: string;
  isBookmarked?: boolean;
  isUserLiked?: boolean;
  likeCount?: number;
  medicalFields?: MedicalList[];
  question?: string;
  status?: string;
  subject?: string;
  topics?: Topic[];
  updated?: string;
  user?: User;
}
