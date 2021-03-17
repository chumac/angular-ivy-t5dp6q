import { Action } from "@ngrx/store";
import { IPayDesk, ICurrency, IScheduleKnownType } from "@nutela/models/compensation/payment";


export enum PendingScheduleActionTypes {
  SHOW_EDITOR = '[HR PAYMENTS - PENDING SCHEDULE] Show Editor',
  HIDE_EDITOR = '[HR PAYMENTS - PENDING SCHEDULE] Hide Editor',

  SHOW_VIEWER = '[HR PAYMENTS - PENDING SCHEDULE] Show Viewer',
  HIDE_VIEWER = '[HR PAYMENTS - PENDING SCHEDULE] Hide Viewer',

  PROCESSING_DATA = '[HR PAYMENTS - PENDING SCHEDULE] Processing Data',
  NOT_PROCESSING_DATA = '[HR PAYMENTS - PENDING SCHEDULE] Not Processing Data',

  LOADING_DATA = '[HR PAYMENTS - PENDING SCHEDULE] Loading Data',
  NOT_LOADING_DATA = '[HR PAYMENTS - PENDING SCHEDULE]  Not Loading Data',

  SUBMITTING_DATA = '[HR PAYMENTS - PENDING SCHEDULE] Submitting Data',
  NOT_SUBMITTING_DATA = '[HR PAYMENTS - PENDING SCHEDULE]  Not Submitting Data',

  LOAD_NEW_SCHEDULE_DATA = '[HR PAYMENTS - PENDING SCHEDULE]  Load New Schedule Data',
  LOAD_NEW_SCHEDULE_DATA_SUCCESS = '[HR PAYMENTS - PENDING SCHEDULE]  Load New Schedule Data Success',

  LOAD_AWAITING_SUBMISSION_DATA = '[HR PAYMENTS - PENDING SCHEDULE]  Load Awaiting Submission Data',
  LOAD_AWAITING_SUBMISSION_DATA_SUCCESS = '[HR PAYMENTS - PENDING SCHEDULE]  Load Awaiting Submission Data Success',

  LOAD_PAYMENT_PLATFORM_DATA = '[HR PAYMENTS - PENDING SCHEDULE]  Load Payment Platform Data',
  LOAD_PAYMENT_PLATFORM_DATA_SUCCESS = '[HR PAYMENTS - PENDING SCHEDULE]  Load Payment Platform Data Success',

  LOAD_CURRENCY_DATA = '[HR PAYMENTS - PENDING SCHEDULE]  Load Currency Data',
  LOAD_CURRENCY_DATA_SUCCESS = '[HR PAYMENTS - PENDING SCHEDULE]  Load Currency Data Success',

  LOAD_ACCOUNT_TYPE_DATA = '[HR PAYMENTS - PENDING SCHEDULE]  Load Account Type Data',
  LOAD_ACCOUNT_TYPE_DATA_SUCCESS = '[HR PAYMENTS - PENDING SCHEDULE]  Load Account Type Data Success',

  LOAD_PAYMENT_SOURCE_DATA = '[HR PAYMENTS - PENDING SCHEDULE]  Load Payment Source Data',
  LOAD_PAYMENT_SOURCE_DATA_SUCCESS = '[HR PAYMENTS - PENDING SCHEDULE]  Load Payment Source Data Success',

  LOAD_PAYROLL_PROFILE_DATA = '[HR PAYMENTS - PENDING SCHEDULE]  Load Payroll Profile Data',
  LOAD_PAYROLL_PROFILE_DATA_SUCCESS = '[HR PAYMENTS - PENDING SCHEDULE]  Load Payroll Profile Data Success',

  LOAD_PAYROLL_SOURCE_DATA = '[HR PAYMENTS - PENDING SCHEDULE]  Load Payroll Source Data',
  LOAD_PAYROLL_SOURCE_DATA_SUCCESS = '[HR PAYMENTS - PENDING SCHEDULE]  Load Payroll Source Data Success',

  LOAD_PAYROLL_DATE_DATA = '[HR PAYMENTS - PENDING SCHEDULE]  Load Payroll Dates Data',
  LOAD_PAYROLL_DATE_DATA_SUCCESS = '[HR PAYMENTS - PENDING SCHEDULE]  Load Payroll Dates Data Success',

  // UPLOAD_PENDING_SCHEDULE = '[HR PAYMENTS - SCHEDULE]  Load Payroll Source Data',
  // LOAD_PAYROLL_SOURCE_DATA_SUCCESS = '[HR PAYMENTS - SCHEDULE]  Load Payroll Source Data Success',

  VALIDATE_SCHEDULE = '[HR PAYMENTS - PENDING SCHEDULE] Validate Schedule',
  VALIDATE_SCHEDULE_SUCCESS = '[HR PAYMENTS - PENDING SCHEDULE] Validate Schedule Success',
  VALIDATE_SCHEDULE_FAILURE = '[HR PAYMENTS - PENDING SCHEDULE] Validate Schedule Failure',

  VALIDATE_RECORD = '[HR PAYMENTS - PENDING SCHEDULE] Validate Record',

  VALIDATING_SCHEDULE = '[HR PAYMENTS - PENDING SCHEDULE] Validating Schedule',
  NOT_VALIDATING_SCHEDULE = '[HR PAYMENTS - PENDING SCHEDULE] Not Validating Schedule',

  SAVE = '[HR PAYMENTS - PENDING SCHEDULE] Save Data',
  SAVE_SUCCESS = '[HR PAYMENTS - PENDING SCHEDULE] Save Data Success',

  ARCHIVE_SCHEDULE = '[HR PAYMENTS - PENDING SCHEDULE] Archive Schedule',
  DELETE_SCHEDULE = '[HR PAYMENTS - PENDING SCHEDULE] Delete Schedule',
  SUBMIT_SCHEDULE = '[HR PAYMENTS - PENDING SCHEDULE] Submit Schedule',
}

export class ShowEditorPendingSchedule implements Action {
  readonly type = PendingScheduleActionTypes.SHOW_EDITOR;
}

export class HideEditorPendingSchedule implements Action {
  readonly type = PendingScheduleActionTypes.HIDE_EDITOR;
}

export class ShowViewerPendingSchedule implements Action {
  readonly type = PendingScheduleActionTypes.SHOW_VIEWER;
}

export class HideViewerPendingSchedule implements Action {
  readonly type = PendingScheduleActionTypes.HIDE_VIEWER;
}

export class ProcessingDataPendingSchedule implements Action {
  readonly type = PendingScheduleActionTypes.PROCESSING_DATA;
}

export class NotProcessingDataPendingSchedule implements Action {
  readonly type = PendingScheduleActionTypes.NOT_PROCESSING_DATA;
}

export class SubmittingDataPendingSchedule implements Action {
  readonly type = PendingScheduleActionTypes.SUBMITTING_DATA;
}

export class NotSubmittingDataPendingSchedule implements Action {
  readonly type = PendingScheduleActionTypes.NOT_SUBMITTING_DATA;
}

export class LoadingDataPendingSchedule implements Action {
  readonly type = PendingScheduleActionTypes.LOADING_DATA;
}

export class NotLoadingDataPendingSchedule implements Action {
  readonly type = PendingScheduleActionTypes.NOT_LOADING_DATA;
}

export class LoadDataNewSchedule implements Action {
  readonly type = PendingScheduleActionTypes.LOAD_NEW_SCHEDULE_DATA;
}

export class LoadDataNewScheduleSuccess implements Action {
  readonly type =
    PendingScheduleActionTypes.LOAD_NEW_SCHEDULE_DATA_SUCCESS;

  constructor(public payload: any[]) { }
}


export class LoadAwaitingSubmissionDataSchedule implements Action {
  readonly type = PendingScheduleActionTypes.LOAD_AWAITING_SUBMISSION_DATA;
}

export class LoadAwaitingSubmissionDataScheduleSuccess implements Action {
  readonly type =
    PendingScheduleActionTypes.LOAD_AWAITING_SUBMISSION_DATA_SUCCESS;

  constructor(public payload: any[]) { }
}

export class LoadPaymentPlatformDataPendingSchedule implements Action {
  readonly type = PendingScheduleActionTypes.LOAD_PAYMENT_PLATFORM_DATA;
}

export class LoadPaymentPlatformDataPendingScheduleSuccess implements Action {
  readonly type =
    PendingScheduleActionTypes.LOAD_PAYMENT_PLATFORM_DATA_SUCCESS;

  constructor(public payload: IPayDesk[]) { }
}

export class LoadCurrencyDataPendingSchedule implements Action {
  readonly type = PendingScheduleActionTypes.LOAD_CURRENCY_DATA;
}

export class LoadCurrencyDataPendingScheduleSuccess implements Action {
  readonly type =
    PendingScheduleActionTypes.LOAD_CURRENCY_DATA_SUCCESS;

  constructor(public payload: ICurrency[]) { }
}

export class LoadAccountTypeDataPendingSchedule implements Action {
  readonly type = PendingScheduleActionTypes.LOAD_ACCOUNT_TYPE_DATA;
}

export class LoadAccountTypeDataPendingScheduleSuccess implements Action {
  readonly type =
    PendingScheduleActionTypes.LOAD_ACCOUNT_TYPE_DATA_SUCCESS;

  constructor(public payload: any[]) { }
}

export class LoadPaymentSourceDataPendingSchedule implements Action {
  readonly type = PendingScheduleActionTypes.LOAD_PAYMENT_SOURCE_DATA;
}

export class LoadPaymentSourceDataPendingScheduleSuccess implements Action {
  readonly type =
    PendingScheduleActionTypes.LOAD_PAYMENT_SOURCE_DATA_SUCCESS;

  constructor(public payload: IScheduleKnownType[]) { }
}

export class LoadPayrollDateDataPendingSchedule implements Action {
  readonly type = PendingScheduleActionTypes.LOAD_PAYROLL_DATE_DATA;

  constructor(public payload: { payrollProfileId: number, payrollSource: number }) { }
}

export class LoadPayrollDateDataPendingScheduleSuccess implements Action {
  readonly type =
    PendingScheduleActionTypes.LOAD_PAYROLL_DATE_DATA_SUCCESS;

  constructor(public payload: any) { }
}

export class LoadPayrollProfileDataPendingSchedule implements Action {
  readonly type = PendingScheduleActionTypes.LOAD_PAYROLL_PROFILE_DATA;
}

export class LoadPayrollProfileDataPendingScheduleSuccess implements Action {
  readonly type =
    PendingScheduleActionTypes.LOAD_PAYROLL_PROFILE_DATA_SUCCESS;

  constructor(public payload: any[]) { }
}

export class LoadPayrollSourceDataPendingSchedule implements Action {
  readonly type = PendingScheduleActionTypes.LOAD_PAYROLL_SOURCE_DATA;
}

export class LoadPayrollSourceDataPendingScheduleSuccess implements Action {
  readonly type =
    PendingScheduleActionTypes.LOAD_PAYROLL_SOURCE_DATA_SUCCESS;

  constructor(public payload: IScheduleKnownType[]) { }
}

export class SaveDataPendingSchedule implements Action {
  readonly type = PendingScheduleActionTypes.SAVE;

  constructor(public payload: { data: any }) { }
}

export class SubmitPendingSchedule implements Action {
  readonly type = PendingScheduleActionTypes.SUBMIT_SCHEDULE;

  constructor(public payload: { recordId: number }) { }
}

export class ArchivePendingSchedule implements Action {
  readonly type = PendingScheduleActionTypes.ARCHIVE_SCHEDULE;

  constructor(public payload: { recordId: number }) { }
}

export class DeletePendingSchedule implements Action {
  readonly type = PendingScheduleActionTypes.DELETE_SCHEDULE;

  constructor(public payload: { recordId: number }) { }
}

export class ValidateRecordPendingSchedule implements Action {
  readonly type = PendingScheduleActionTypes.VALIDATE_RECORD;

  constructor(public payload: { recordId: number }) { }
}

export type PendingScheduleActions =
  | ShowEditorPendingSchedule
  | HideEditorPendingSchedule
  | ShowViewerPendingSchedule
  | HideViewerPendingSchedule
  | ProcessingDataPendingSchedule
  | NotProcessingDataPendingSchedule
  | SubmittingDataPendingSchedule
  | NotSubmittingDataPendingSchedule
  | LoadingDataPendingSchedule
  | NotLoadingDataPendingSchedule
  | LoadDataNewSchedule
  | LoadDataNewScheduleSuccess
  | LoadAwaitingSubmissionDataSchedule
  | LoadAwaitingSubmissionDataScheduleSuccess
  | LoadPaymentPlatformDataPendingSchedule
  | LoadPaymentPlatformDataPendingScheduleSuccess
  | LoadCurrencyDataPendingSchedule
  | LoadCurrencyDataPendingScheduleSuccess
  | LoadAccountTypeDataPendingSchedule
  | LoadAccountTypeDataPendingScheduleSuccess
  | LoadPaymentSourceDataPendingSchedule
  | LoadPaymentSourceDataPendingScheduleSuccess
  | LoadPayrollProfileDataPendingSchedule
  | LoadPayrollProfileDataPendingScheduleSuccess
  | LoadPayrollSourceDataPendingSchedule
  | LoadPayrollSourceDataPendingScheduleSuccess
  | LoadPayrollDateDataPendingSchedule
  | LoadPayrollDateDataPendingScheduleSuccess
  | ValidateRecordPendingSchedule
  | SaveDataPendingSchedule
  | ArchivePendingSchedule
  | DeletePendingSchedule
  | SubmitPendingSchedule
