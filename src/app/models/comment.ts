import {User} from "./user";
import {Doctor} from "./doctor";

export interface CommentModel {
  id?: string;
  created?: string;
  updated?: string;
  senderUser?: User;
  doctorRes?: Doctor;
  rate?: number;
  comment?: string;
  showUserInfo?: boolean;
  status?: string;
}
