import { ISchedule, ICurrency, IScheduleKnownType, IPayDesk, IPayrollProfile } from "@nutela/models/compensation/payment";

export interface IPendingScheduleState {
  newScheduleData: ISchedule[];
  awaitingSubmissionData: ISchedule[];
  payrollProfileData: IPayrollProfile[];
  currencyData: ICurrency[];
  accountTypeData: any[];
  paymentSourceData: IScheduleKnownType[];
  paymentPlatformData: IPayDesk[];
  payrollSourceData: IScheduleKnownType[];
  payrollDates: any;
  isLoading: boolean;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
  isSubmitting: boolean;
}

export const initialPendingScheduleState: IPendingScheduleState = {
  newScheduleData: [],
  awaitingSubmissionData: [],
  payrollProfileData: null,
  currencyData: null,
  accountTypeData: null,
  paymentSourceData: null,
  paymentPlatformData: null,
  payrollSourceData: null,
  payrollDates: null,
  isLoading: false,
  isProcessing: false,
  showEditor: false,
  showViewer: false,
  isSubmitting: false,
}
