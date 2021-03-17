import { Action } from "@ngrx/store";
import { IPayDesk, ICurrency, IScheduleKnownType, IPayProcess, ISchedule } from "@nutela/models/compensation/payment";


export enum ScheduleActionTypes {
  SHOW_EDITOR = '[HR PAYMENTS - SCHEDULE] Show Editor',
  HIDE_EDITOR = '[HR PAYMENTS - SCHEDULE] Hide Editor',

  SHOW_VIEWER = '[HR PAYMENTS - SCHEDULE] Show Viewer',
  HIDE_VIEWER = '[HR PAYMENTS - SCHEDULE] Hide Viewer',

  PROCESSING_DATA = '[HR PAYMENTS - SCHEDULE] Processing Data',
  NOT_PROCESSING_DATA = '[HR PAYMENTS - SCHEDULE] Not Processing Data',

  LOADING_DATA = '[HR PAYMENTS - SCHEDULE] Loading Data',
  NOT_LOADING_DATA = '[HR PAYMENTS - SCHEDULE]  Not Loading Data',

  LOAD_APPROVED_DATA = '[HR PAYMENTS - SCHEDULE]  Load Approved Data',
  LOAD_APPROVED_DATA_SUCCESS = '[HR PAYMENTS - SCHEDULE]  Load Approved Data Success',

  LOAD_AWAITING_APPROVAL_DATA = '[HR PAYMENTS - SCHEDULE]  Load Awaiting Approval Data',
  LOAD_AWAITING_APPROVAL_DATA_SUCCESS = '[HR PAYMENTS - SCHEDULE]  Load Awaiting Approval Data Success',

  LOAD_CLOSED_DATA = '[HR PAYMENTS - SCHEDULE]  Load Closed Data',
  LOAD_CLOSED_DATA_SUCCESS = '[HR PAYMENTS - SCHEDULE]  Load Closed Data Success',

  LOAD_COMPLETED_DATA = '[HR PAYMENTS - SCHEDULE]  Load Completed Data',
  LOAD_COMPLETED_DATA_SUCCESS = '[HR PAYMENTS - SCHEDULE]  Load Completed Data Success',

  LOAD_PAYMENT_PLATFORM_DATA = '[HR PAYMENTS - SCHEDULE]  Load Payment Platform Data',
  LOAD_PAYMENT_PLATFORM_DATA_SUCCESS = '[HR PAYMENTS - SCHEDULE]  Load Payment Platform Data Success',

  LOAD_CURRENCY_DATA = '[HR PAYMENTS - SCHEDULE]  Load Currency Data',
  LOAD_CURRENCY_DATA_SUCCESS = '[HR PAYMENTS - SCHEDULE]  Load Currency Data Success',

  LOAD_ACCOUNT_TYPE_DATA = '[HR PAYMENTS - SCHEDULE]  Load Account Type Data',
  LOAD_ACCOUNT_TYPE_DATA_SUCCESS = '[HR PAYMENTS - SCHEDULE]  Load Account Type Data Success',

  LOAD_PAYMENT_SOURCE_DATA = '[HR PAYMENTS - SCHEDULE]  Load Payment Source Data',
  LOAD_PAYMENT_SOURCE_DATA_SUCCESS = '[HR PAYMENTS - SCHEDULE]  Load Payment Source Data Success',

  LOAD_PAYROLL_PROFILE_DATA = '[HR PAYMENTS - SCHEDULE]  Load Payroll Profile Data',
  LOAD_PAYROLL_PROFILE_DATA_SUCCESS = '[HR PAYMENTS - SCHEDULE]  Load Payroll Profile Data Success',

  LOAD_PAYROLL_SOURCE_DATA = '[HR PAYMENTS - SCHEDULE]  Load Payroll Source Data',
  LOAD_PAYROLL_SOURCE_DATA_SUCCESS = '[HR PAYMENTS - SCHEDULE]  Load Payroll Source Data Success',

  SAVING_SCHEDULE = '[HR PAYMENTS - SCHEDULE] Saving Schedule',
  NOT_SAVING_SCHEDULE = '[HR PAYMENTS - SCHEDULE] Not Saving Schedule',

  SAVE = '[HR PAYMENTS - SCHEDULE] Save Data',
  SAVE_PAYMENT_PROCESS = '[HR PAYMENTS - SCHEDULE] Save Payment Process',
  PAYMENT_SUCCESS = '[HR PAYMENTS - SCHEDULE] Save Payment Process Success',
  PAYMENT_FAILURE = '[HR PAYMENTS - SCHEDULE] Save Payment Process Failure',

  ARCHIVE_SCHEDULE = '[HR PAYMENTS - SCHEDULE] Archive Schedule',
  DELETE_SCHEDULE = '[HR PAYMENTS - SCHEDULE] Delete Schedule',
  REQUEUE_SCHEDULE = '[HR PAYMENTS - SCHEDULE] Requeue Schedule',
  VALIDATE_UPLOAD = '[HR PAYMENTS - SCHEDULE] Validate Upload',
  VALIDATE_SCHEDULE = '[HR PAYMENTS - SCHEDULE] Validate Schedule',
}

export class ShowEditorSchedule implements Action {
  readonly type = ScheduleActionTypes.SHOW_EDITOR;
}

export class HideEditorSchedule implements Action {
  readonly type = ScheduleActionTypes.HIDE_EDITOR;
}

export class ShowViewerSchedule implements Action {
  readonly type = ScheduleActionTypes.SHOW_VIEWER;
}

export class HideViewerSchedule implements Action {
  readonly type = ScheduleActionTypes.HIDE_VIEWER;
}

export class ProcessingDataSchedule implements Action {
  readonly type = ScheduleActionTypes.PROCESSING_DATA;
}

export class NotProcessingDataSchedule implements Action {
  readonly type = ScheduleActionTypes.NOT_PROCESSING_DATA;
}

export class LoadingDataSchedule implements Action {
  readonly type = ScheduleActionTypes.LOADING_DATA;
}

export class NotLoadingDataSchedule implements Action {
  readonly type = ScheduleActionTypes.NOT_LOADING_DATA;
}

export class LoadApprovedDataSchedule implements Action {
  readonly type = ScheduleActionTypes.LOAD_APPROVED_DATA;
}

export class LoadApprovedDataScheduleSuccess implements Action {
  readonly type =
    ScheduleActionTypes.LOAD_APPROVED_DATA_SUCCESS;

  constructor(public payload: ISchedule[]) { }
}

export class LoadAwaitingApprovalDataSchedule implements Action {
  readonly type = ScheduleActionTypes.LOAD_AWAITING_APPROVAL_DATA;
}

export class LoadAwaitingApprovalDataScheduleSuccess implements Action {
  readonly type =
    ScheduleActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS;

  constructor(public payload: ISchedule[]) { }
}

export class LoadDataClosedSchedule implements Action {
  readonly type = ScheduleActionTypes.LOAD_CLOSED_DATA;
}

export class LoadDataClosedScheduleSuccess implements Action {
  readonly type =
    ScheduleActionTypes.LOAD_CLOSED_DATA_SUCCESS;

  constructor(public payload: ISchedule[]) { }
}

export class LoadDataCompletedSchedule implements Action {
  readonly type = ScheduleActionTypes.LOAD_COMPLETED_DATA;
}

export class LoadDataCompletedScheduleSuccess implements Action {
  readonly type =
    ScheduleActionTypes.LOAD_COMPLETED_DATA_SUCCESS;

  constructor(public payload: ISchedule[]) { }
}

export class LoadPaymentPlatformDataSchedule implements Action {
  readonly type = ScheduleActionTypes.LOAD_PAYMENT_PLATFORM_DATA;
}

export class LoadPaymentPlatformDataScheduleSuccess implements Action {
  readonly type =
    ScheduleActionTypes.LOAD_PAYMENT_PLATFORM_DATA_SUCCESS;

  constructor(public payload: IPayDesk[]) { }
}

export class LoadCurrencyDataSchedule implements Action {
  readonly type = ScheduleActionTypes.LOAD_CURRENCY_DATA;
}

export class LoadCurrencyDataScheduleSuccess implements Action {
  readonly type =
    ScheduleActionTypes.LOAD_CURRENCY_DATA_SUCCESS;

  constructor(public payload: ICurrency[]) { }
}

export class LoadAccountTypeDataSchedule implements Action {
  readonly type = ScheduleActionTypes.LOAD_ACCOUNT_TYPE_DATA;
}

export class LoadAccountTypeDataScheduleSuccess implements Action {
  readonly type =
    ScheduleActionTypes.LOAD_ACCOUNT_TYPE_DATA_SUCCESS;

  constructor(public payload: any[]) { }
}

export class LoadPaymentSourceDataSchedule implements Action {
  readonly type = ScheduleActionTypes.LOAD_PAYMENT_SOURCE_DATA;
}

export class LoadPaymentSourceDataScheduleSuccess implements Action {
  readonly type =
    ScheduleActionTypes.LOAD_PAYMENT_SOURCE_DATA_SUCCESS;

  constructor(public payload: IScheduleKnownType[]) { }
}

export class LoadPayrollProfileDataSchedule implements Action {
  readonly type = ScheduleActionTypes.LOAD_PAYROLL_PROFILE_DATA;
}

export class LoadPayrollProfileDataScheduleSuccess implements Action {
  readonly type =
    ScheduleActionTypes.LOAD_PAYROLL_PROFILE_DATA_SUCCESS;

  constructor(public payload: any[]) { }
}

export class LoadPayrollSourceDataSchedule implements Action {
  readonly type = ScheduleActionTypes.LOAD_PAYROLL_SOURCE_DATA;
}

export class LoadPayrollSourceDataScheduleSuccess implements Action {
  readonly type =
    ScheduleActionTypes.LOAD_PAYROLL_SOURCE_DATA_SUCCESS;

  constructor(public payload: IScheduleKnownType[]) { }
}

export class SaveDataSchedule implements Action {
  readonly type = ScheduleActionTypes.SAVE;

  constructor(public payload: { data: any }) { }
}

export class ValidateSchedule implements Action {
  readonly type = ScheduleActionTypes.VALIDATE_SCHEDULE;
  constructor(public payload: { scheduleID: number }) { }
}

export class SavingSchedule implements Action {
  readonly type = ScheduleActionTypes.SAVING_SCHEDULE;
}

export class NotSavingSchedule implements Action {
  readonly type = ScheduleActionTypes.NOT_SAVING_SCHEDULE;
}

export class RequeueSchedule implements Action {
  readonly type = ScheduleActionTypes.REQUEUE_SCHEDULE;

  constructor(public payload: { recordId: number }) { }
}

export class ArchiveSchedule implements Action {
  readonly type = ScheduleActionTypes.ARCHIVE_SCHEDULE;

  constructor(public payload: { recordId: number }) { }
}

export class DeleteSchedule implements Action {
  readonly type = ScheduleActionTypes.DELETE_SCHEDULE;

  constructor(public payload: { recordId: number }) { }
}

export class ValidateUploadSchedule implements Action {
  readonly type = ScheduleActionTypes.VALIDATE_UPLOAD;
  constructor(public payload: { scheduleID: number }) { }
}


export type ScheduleActions =
  | ShowEditorSchedule
  | HideEditorSchedule
  | ShowViewerSchedule
  | HideViewerSchedule
  | ProcessingDataSchedule
  | NotProcessingDataSchedule
  | LoadingDataSchedule
  | NotLoadingDataSchedule
  | SavingSchedule
  | NotSavingSchedule
  | LoadApprovedDataSchedule
  | LoadApprovedDataScheduleSuccess
  | LoadAwaitingApprovalDataSchedule
  | LoadAwaitingApprovalDataScheduleSuccess
  | LoadDataClosedSchedule
  | LoadDataClosedScheduleSuccess
  | LoadDataCompletedSchedule
  | LoadDataCompletedScheduleSuccess
  | LoadPaymentPlatformDataSchedule
  | LoadPaymentPlatformDataScheduleSuccess
  | LoadCurrencyDataSchedule
  | LoadCurrencyDataScheduleSuccess
  | LoadAccountTypeDataSchedule
  | LoadAccountTypeDataScheduleSuccess
  | LoadPaymentSourceDataSchedule
  | LoadPaymentSourceDataScheduleSuccess
  | LoadPayrollProfileDataSchedule
  | LoadPayrollProfileDataScheduleSuccess
  | LoadPayrollSourceDataSchedule
  | LoadPayrollSourceDataScheduleSuccess
  | ValidateSchedule
  | ValidateUploadSchedule
  | SaveDataSchedule
  | ArchiveSchedule
  | DeleteSchedule
