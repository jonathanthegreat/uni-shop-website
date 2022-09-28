import {User} from "./user";
import {Topic} from "./topic";
import {MedicalList} from "./medicalList";
import {Answers} from "./answers";

export interface QuestionAnswer {
  code?: string;
  created?: Date;
  firstAnswer?: Answers;
  id?: string;
  isBookmarked?: boolean;
  medicalFields?: MedicalList[];
  question?: string;
  status?: string; // Enum: NEW, VERIFIED, REJECTED, ALL
  subject?: string;
  topics?: Topic[];
  updated?: Date;
  user?: User;
}
