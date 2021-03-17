import { ISchedule, ICurrency, IScheduleKnownType, IPayDesk } from "@nutela/models/compensation/payment";
import { IProfile } from "@nutela/models/compensation/payroll";

export interface ICompletedState {
  completedData: ISchedule[];
  isLoading: boolean;
  showViewer: boolean;
}

export const initialCompletedState: ICompletedState = {
  completedData: [],
  isLoading: false,
  showViewer: false,
}
