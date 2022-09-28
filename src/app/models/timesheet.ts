import {Doctor} from "./doctor";

export interface Timesheet {
  created?: Date;
  dayTimes?: DayTimeRes[];
  doctor?: Doctor[];
  id?: string;
  minutes?: number;
  updated?: Date;
}

export interface DayTimeRes {
  created?: Date;
  id?: string;
  startEndTimes?: StartEndTimeRes[];
  updated?: Date;
  weekDays?: string; // Enum: SAT, SUN, MON, THE, WED, THU, FRI
}

export interface StartEndTimeRes {
  created?: Date;
  endTime?: string;
  id?: string;
  startTime?: string;
  updated?: Date;
}
