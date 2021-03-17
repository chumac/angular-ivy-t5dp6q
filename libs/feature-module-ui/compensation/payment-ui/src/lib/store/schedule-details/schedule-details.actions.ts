import { Action } from "@ngrx/store";
import { IScheduleDetail, ICurrency, ISchedule, IPayProcess } from "@nutela/models/compensation/payment";


export enum ScheduleDetailActionTypes {
  SHOW_EDITOR = '[HR PAYMENTS - SCHEDULE DETAILS] Show Editor',
  HIDE_EDITOR = '[HR PAYMENTS - SCHEDULE DETAILS] Hide Editor',

  SHOW_VIEWER = '[HR PAYMENTS - SCHEDULE DETAILS] Show Viewer',
  HIDE_VIEWER = '[HR PAYMENTS - SCHEDULE DETAILS] Hide Viewer',

  PROCESSING_DATA = '[HR PAYMENTS - SCHEDULE DETAILS] Processing',
  NOT_PROCESSING_DATA = '[HR PAYMENTS - SCHEDULE DETAILS] Not Processing',

  UPLOADING_DATA = '[HR PAYMENTS - SCHEDULE DETAILS] Uploading',
  NOT_UPLOADING_DATA = '[HR PAYMENTS - SCHEDULE DETAILS] Not Uploading',

  VALIDATING_RECORD_DATA = '[HR PAYMENTS - SCHEDULE DETAILS] Validating Recording',
  NOT_VALIDATING_RECORD_DATA = '[HR PAYMENTS - SCHEDULE DETAILS] Not Validating Recording',

  SUBMITTING_DATA = '[HR PAYMENTS - SCHEDULE DETAILS] Submitting',
  NOT_SUBMITTING_DATA = '[HR PAYMENTS - SCHEDULE DETAILS] Not Submitting',

  REQUEUEING_DATA = '[HR PAYMENTS - SCHEDULE DETAILS] Requeueing',
  NOT_REQUEUEING_DATA = '[HR PAYMENTS - SCHEDULE DETAILS] Not Requeueing',

  RESETING_DATA = '[HR PAYMENTS - SCHEDULE DETAILS] Reseting',
  NOT_RESETING_DATA = '[HR PAYMENTS - SCHEDULE DETAILS] Not Reseting',

  LOADING_DATA = '[HR PAYMENTS - SCHEDULE DETAILS] Loading',
  NOT_LOADING_DATA = '[HR PAYMENTS - SCHEDULE DETAILS]  Not Loading',

  LOAD_DATA = '[HR PAYMENTS - SCHEDULE DETAILS]  Load Data',
  LOAD_DATA_SUCCESS = '[HR PAYMENTS - SCHEDULE DETAILS]  Load Data Success',

  LOAD_SINGLE_SCHEDULE_DATA = '[HR PAYMENTS - SCHEDULE DETAILS]  Load Scheudle Data By Schedule Id',
  LOAD_SINGLE_SCHEDULE_DATA_SUCCESS = '[HR PAYMENTS - SCHEDULE DETAILS]  Load Scheudle Data By Schedule Id Success',

  UPLOAD = '[HR PAYMENTS - SCHEDULE DETAILS] Upload',
  UPLOAD_SUCCESS = '[HR PAYMENTS - SCHEDULE DETAILS] Upload Success',
  UPLOAD_FAILURE = '[HR PAYMENTS - SCHEDULE DETAILS] Upload Failure',

  SCHEDULE_DETAIL_EXISTS = '[HR PAYMENTS - SCHEDULE DETAILS] Detail Exists',
  SCHEDULE_DETAIL_EXISTS_SUCCESS = '[HR PAYMENTS - SCHEDULE DETAILS] Detail Exists Success',
  SCHEDULE_DETAIL_EXISTS_FAILURE = '[HR PAYMENTS - SCHEDULE DETAILS] Detail Exists Failure',

  VALIDATE_PAYMENT = '[HR PAYMENTS - SCHEDULE DETAILS] Validate Payment',
  VALIDATE_UPLOAD = '[HR PAYMENTS - SCHEDULE DETAILS] Validate Upload',

  PROCESSING_DATA_GRID = '[HR PAYMENTS - SCHEDULE DETAILS] Processing Data Grid',
  NOT_PROCESSING_DATA_GRID = '[HR PAYMENTS - SCHEDULE DETAILS] Not Processing Data Grid',

  LOAD_CURRENCY_DATA = '[HR PAYMENTS - SCHEDULE DETAILS]  Load Currency Data',
  LOAD_CURRENCY_DATA_SUCCESS = '[HR PAYMENTS - SCHEDULE DETAILS]  Load Currency Data Success',

  LOAD_ACCOUNT_TYPE_DATA = '[HR PAYMENTS - SCHEDULE DETAILS]  Load Account Type Data',
  LOAD_ACCOUNT_TYPE_DATA_SUCCESS = '[HR PAYMENTS - SCHEDULE DETAILS]  Load Account Type Data Success',

  SAVE_PAYMENT_PROCESS = '[HR PAYMENTS - SCHEDULE DETAILS] Save Payment Process',
  PAYMENT_SUCCESS = '[HR PAYMENTS - SCHEDULE DETAILS] Save Payment Process Success',
  PAYMENT_FAILURE = '[HR PAYMENTS - SCHEDULE DETAILS] Save Payment Process Failure',

  SAVE_UPDATE = '[HR PAYMENTS - SCHEDULE DETAILS] Save Updated Data',
  SUBMIT_DATA = '[HR PAYMENTS - SCHEDULE DETAILS] Submit Schedule Details',
  REQUEUE = '[HR PAYMENTS - SCHEDULE DETAILS] Requeue Schedule Details',
  RESET = '[HR PAYMENTS - SCHEDULE DETAILS] Reset',
  PROCESS_PAYROLL = '[HR PAYMENTS - SCHEDULE DETAILS] Process Payroll',
}

export class ShowEditorScheduleDetail implements Action {
  readonly type = ScheduleDetailActionTypes.SHOW_EDITOR;
}

export class HideEditorScheduleDetail implements Action {
  readonly type = ScheduleDetailActionTypes.HIDE_EDITOR;
}

export class ShowViewerScheduleDetail implements Action {
  readonly type = ScheduleDetailActionTypes.SHOW_VIEWER;
}

export class HideViewerScheduleDetail implements Action {
  readonly type = ScheduleDetailActionTypes.HIDE_VIEWER;
}

export class ProcessingScheduleDetail implements Action {
  readonly type = ScheduleDetailActionTypes.PROCESSING_DATA;
}

export class NotProcessingScheduleDetail implements Action {
  readonly type = ScheduleDetailActionTypes.NOT_PROCESSING_DATA;
}

export class ProcessingDataGridScheduleDetail implements Action {
  readonly type = ScheduleDetailActionTypes.PROCESSING_DATA_GRID;
}

export class NotProcessingDataGridScheduleDetail implements Action {
  readonly type = ScheduleDetailActionTypes.NOT_PROCESSING_DATA_GRID;
}

export class UploadingScheduleDetail implements Action {
  readonly type = ScheduleDetailActionTypes.UPLOADING_DATA;
}

export class NotUploadingScheduleDetail implements Action {
  readonly type = ScheduleDetailActionTypes.NOT_UPLOADING_DATA;
}

export class LoadingDataScheduleDetail implements Action {
  readonly type = ScheduleDetailActionTypes.LOADING_DATA;
}

export class NotLoadingDataScheduleDetail implements Action {
  readonly type = ScheduleDetailActionTypes.NOT_LOADING_DATA;
}

export class ValidatingRecordScheduleDetail implements Action {
  readonly type = ScheduleDetailActionTypes.VALIDATING_RECORD_DATA;
}

export class NotValidatingRecordScheduleDetail implements Action {
  readonly type = ScheduleDetailActionTypes.NOT_VALIDATING_RECORD_DATA;
}

export class SubmittingDataScheduleDetail implements Action {
  readonly type = ScheduleDetailActionTypes.SUBMITTING_DATA;
}

export class NotSubmittingDataScheduleDetail implements Action {
  readonly type = ScheduleDetailActionTypes.NOT_SUBMITTING_DATA;
}

export class RequeueingDataScheduleDetail implements Action {
  readonly type = ScheduleDetailActionTypes.REQUEUEING_DATA;
}

export class NotRequeueingDataScheduleDetail implements Action {
  readonly type = ScheduleDetailActionTypes.NOT_REQUEUEING_DATA;
}

export class ResetingDataScheduleDetail implements Action {
  readonly type = ScheduleDetailActionTypes.RESETING_DATA;
}

export class NotResetingDataScheduleDetail implements Action {
  readonly type = ScheduleDetailActionTypes.NOT_RESETING_DATA;
}

export class LoadDataScheduleDetail implements Action {
  readonly type = ScheduleDetailActionTypes.LOAD_DATA;

  constructor(public payload: { scheduleID: number }) { }
}

export class LoadDataScheduleDetailSuccess implements Action {
  readonly type =
    ScheduleDetailActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IScheduleDetail[]) { }
}

export class LoadDataByIdSchedule implements Action {
  readonly type = ScheduleDetailActionTypes.LOAD_SINGLE_SCHEDULE_DATA;

  constructor(public payload: { scheduleID: number }) { }
}

export class LoadDataByIdScheduleSuccess implements Action {
  readonly type =
    ScheduleDetailActionTypes.LOAD_SINGLE_SCHEDULE_DATA_SUCCESS;

  constructor(public payload: ISchedule) { }
}

export class SaveUpdateDataScheduleDetail implements Action {
  readonly type = ScheduleDetailActionTypes.SAVE_UPDATE;

  constructor(public payload: { scheduleDetailID: number, data: IScheduleDetail, scheduleID: number }) { }
}

export class UploadScheduleDetails implements Action {
  readonly type = ScheduleDetailActionTypes.UPLOAD;
  constructor(public payload: { detailData: IScheduleDetail[], scheduleID: number }) { }
}

export class UploadScheduleDetailsSuccess implements Action {
  readonly type = ScheduleDetailActionTypes.UPLOAD_SUCCESS;
}

export class UploadScheduleDetailsFailure implements Action {
  readonly type = ScheduleDetailActionTypes.UPLOAD_FAILURE;

  constructor(public error: any) { }
}

export class SubmitDataScheduleDetails implements Action {
  readonly type = ScheduleDetailActionTypes
    .SUBMIT_DATA;

  constructor(public payload: { scheduleID: number }) { }
}

export class ProcessPayrollScheduleDetails implements Action {
  readonly type = ScheduleDetailActionTypes
    .PROCESS_PAYROLL;

  constructor(public payload: { scheduleID: number }) { }
}
export class RequeueScheduleDetails implements Action {
  readonly type = ScheduleDetailActionTypes.REQUEUE;

  constructor(public payload: { scheduleID: number }) { }
}

export class ValidatePaymentScheduleDetail implements Action {
  readonly type = ScheduleDetailActionTypes.VALIDATE_PAYMENT;
  constructor(public payload: { scheduleID: number }) { }
}

export class ValidateUploadScheduleDetail implements Action {
  readonly type = ScheduleDetailActionTypes.VALIDATE_UPLOAD;
  constructor(public payload: { scheduleID: number }) { }
}

export class ResetScheduleDetailData implements Action {
  readonly type = ScheduleDetailActionTypes.RESET;

  constructor(public payload: { scheduleID: number }) { }
}

export class LoadCurrencyDataScheduleDetail implements Action {
  readonly type = ScheduleDetailActionTypes.LOAD_CURRENCY_DATA;
}

export class LoadCurrencyDataScheduleDetailSuccess implements Action {
  readonly type =
    ScheduleDetailActionTypes.LOAD_CURRENCY_DATA_SUCCESS;

  constructor(public payload: ICurrency[]) { }
}

export class LoadAccountTypeDataScheduleDetail implements Action {
  readonly type = ScheduleDetailActionTypes.LOAD_ACCOUNT_TYPE_DATA;
}

export class LoadAccountTypeDataScheduleDetailSuccess implements Action {
  readonly type =
    ScheduleDetailActionTypes.LOAD_ACCOUNT_TYPE_DATA_SUCCESS;

  constructor(public payload: any[]) { }
}


export class SavePaymentProcessScheduleDetail implements Action {
  readonly type = ScheduleDetailActionTypes.SAVE_PAYMENT_PROCESS;

  constructor(public payload: { scheduleID: number, data: IPayProcess }) { }
}

export class SavePaymentProcessScheduleDetailSuccess implements Action {
  readonly type = ScheduleDetailActionTypes.PAYMENT_SUCCESS;
}

export class SavePaymentProcessScheduleDetailFailure implements Action {
  readonly type = ScheduleDetailActionTypes.PAYMENT_FAILURE;
}



export type ScheduleDetailActions =
  | ShowEditorScheduleDetail
  | HideEditorScheduleDetail
  | ShowViewerScheduleDetail
  | HideViewerScheduleDetail
  | ProcessingScheduleDetail
  | NotProcessingScheduleDetail
  | ProcessingDataGridScheduleDetail
  | NotProcessingDataGridScheduleDetail
  | UploadingScheduleDetail
  | NotUploadingScheduleDetail
  | ValidatingRecordScheduleDetail
  | NotValidatingRecordScheduleDetail
  | SubmittingDataScheduleDetail
  | NotSubmittingDataScheduleDetail
  | RequeueingDataScheduleDetail
  | NotRequeueingDataScheduleDetail
  | ResetingDataScheduleDetail
  | NotResetingDataScheduleDetail
  | LoadingDataScheduleDetail
  | NotLoadingDataScheduleDetail
  | LoadDataScheduleDetail
  | LoadDataScheduleDetailSuccess
  | LoadDataByIdSchedule
  | LoadDataByIdScheduleSuccess
  | SaveUpdateDataScheduleDetail
  | ValidatePaymentScheduleDetail
  | ValidateUploadScheduleDetail
  | RequeueScheduleDetails
  | ResetScheduleDetailData
  | UploadScheduleDetails
  | UploadScheduleDetailsSuccess
  | UploadScheduleDetailsFailure
  | SubmitDataScheduleDetails
  | LoadCurrencyDataScheduleDetail
  | LoadCurrencyDataScheduleDetailSuccess
  | LoadAccountTypeDataScheduleDetail
  | LoadAccountTypeDataScheduleDetailSuccess
  | SavePaymentProcessScheduleDetail
  | SavePaymentProcessScheduleDetailSuccess
  | SavePaymentProcessScheduleDetailFailure
  | ProcessPayrollScheduleDetails;
