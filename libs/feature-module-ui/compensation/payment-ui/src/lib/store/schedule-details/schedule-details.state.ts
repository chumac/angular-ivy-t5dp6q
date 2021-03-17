import { IScheduleDetail, ICurrency, ISchedule } from "@nutela/models/compensation/payment";


export interface IScheduleDetailState {
  data: IScheduleDetail[];
  scheduleData: ISchedule;

  isProcessing: boolean;
  isLoading: boolean;
  isUploading: boolean;
  isProcessingDataGrid: boolean;
  isValidatingRecord: boolean;
  isSubmitting: boolean;
  isRequeueing: boolean;
  isReseting: boolean;

  showEditor: boolean;
  showViewer: boolean;
  currencyData: ICurrency[];
  accountTypeData: any[];
  paySuccess: boolean;
}

export const initialScheduleDetailState: IScheduleDetailState = {
  data: [],
  scheduleData: null,
  currencyData: null,
  accountTypeData: null,

  isProcessing: false,
  isLoading: false,
  isUploading: false,
  isProcessingDataGrid: false,
  isValidatingRecord: false,
  isSubmitting: false,
  isRequeueing: false,
  isReseting: false,

  showEditor: false,
  showViewer: false,
  paySuccess: false,
}
