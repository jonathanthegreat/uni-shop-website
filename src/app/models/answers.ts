import {Doctor} from "./doctor";

export interface Answers {
  answer?: string;
  created?: Date;
  disLikeCount?: number;
  doctor?: Doctor;
  id?: string;
  isUserLiked?: boolean;
  likeCount?: number;
  updated?: Date;
}
