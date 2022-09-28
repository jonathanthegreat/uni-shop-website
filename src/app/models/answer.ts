import {Question} from "./question";
import {Doctor} from "./doctor";

export interface Answer {
  answer?: string;
  created?: string;
  id?: string;
  question?: Question;
  updated?: string;
  verified?: boolean;
  disLikeCount?: number;
  doctor?: Doctor;
  isUserLiked?: boolean;
  likeCount?: number;
}
