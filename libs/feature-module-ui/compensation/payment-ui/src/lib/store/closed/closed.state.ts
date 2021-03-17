import { ISchedule, ICurrency, IScheduleKnownType, IPayDesk } from "@nutela/models/compensation/payment";
import { IProfile } from "@nutela/models/compensation/payroll";

export interface IClosedState {
  closedData: ISchedule[];
  isLoading: boolean;
  showViewer: boolean;
}

export const initialClosedState: IClosedState = {
  closedData: [],
  isLoading: false,
  showViewer: false,
}
