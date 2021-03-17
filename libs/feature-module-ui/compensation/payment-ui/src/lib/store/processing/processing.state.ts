import { ISchedule, ICurrency, IScheduleKnownType, IPayDesk } from "@nutela/models/compensation/payment";
import { IProfile } from "@nutela/models/compensation/payroll";

export interface IProcessingState {
  processingData: ISchedule[];
  awaitingData: ISchedule[];
  isLoading: boolean;
  showViewer: boolean;
}

export const initialProcessingState: IProcessingState = {
  processingData: [],
  awaitingData: [],
  isLoading: false,
  showViewer: false,
}
