import { ISchedule, ICurrency, IScheduleKnownType, IPayDesk } from "@nutela/models/compensation/payment";
import { IProfile } from "@nutela/models/compensation/payroll";

export interface IScheduleState {
  approvedData: ISchedule[];
  awaitingData: ISchedule[];
  closedData: ISchedule[];
  completedData: ISchedule[];
  payrollProfileData: IProfile[];
  currencyData: ICurrency[];
  accountTypeData: any[];
  paymentSourceData: IScheduleKnownType[];
  paymentPlatformData: IPayDesk[];
  payrollSourceData: IScheduleKnownType[];
  isLoading: boolean;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
  isSaving: boolean;

}

export const initialScheduleState: IScheduleState = {
  approvedData: [],
  awaitingData: [],
  closedData: [],
  completedData: [],
  payrollProfileData: null,
  currencyData: null,
  accountTypeData: null,
  paymentSourceData: null,
  paymentPlatformData: null,
  payrollSourceData: null,
  isLoading: false,
  isProcessing: false,
  showEditor: false,
  showViewer: false,
  isSaving: false,
}
