import { Action } from '@ngrx/store';

import { IIdentification } from '@nutela/models/workforce/employee-profiles';
import { ISelectOption } from '@nutela/models/core-data';

export enum IdentificationActionTypes {
  HR_SHOW_EDITOR = '[IDENTIFICATION DATA (HR)] Show Editor',
  HR_HIDE_EDITOR = '[IDENTIFICATION DATA (HR)] Hide Editor',

  HR_SHOW_VIEWER = '[IDENTIFICATION DATA (HR)] Show Viewer',
  HR_HIDE_VIEWER = '[IDENTIFICATION DATA (HR)] Hide Viewer',

  HR_PROCESSING = '[IDENTIFICATION DATA (HR)] Processing',
  HR_NOT_PROCESSING = '[IDENTIFICATION DATA (HR)] Not Processing',

  HR_LOAD_APPROVED_DATA = '[IDENTIFICATION DATA (HR)] Load Approved Data',
  HR_LOAD_APPROVED_DATA_SUCCESS = '[IDENTIFICATION DATA (HR)] Load Approved Data Success',
  HR_LOAD_APPROVED_DATA_FAILURE = '[IDENTIFICATION DATA (HR)] Load Approved Data Failure',

  HR_LOAD_AWAITING_APPROVAL_DATA = '[IDENTIFICATION DATA (HR)] Load Awaiting Approval Data',
  HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS = '[IDENTIFICATION DATA (HR)] Load Awaiting Approval Data Success',
  HR_LOAD_AWAITING_APPROVAL_DATA_FAILURE = '[IDENTIFICATION DATA (HR)] Load Awaiting Approval Data Failure',

  HR_LOAD_SIGNATURE_IMAGE = '[IDENTIFICATION DATA (HR) PHOTO] Load signature Image',
  HR_LOAD_SIGNATURE_IMAGE_SUCCESS = '[IDENTIFICATION DATA (HR) PHOTO] Load signature Image Data Success',

  HR_LOAD_AWAITING_APPROVAL_SIGNATURE_IMAGE = '[IDENTIFICATION DATA (HR) PHOTO] Load Awaiting Approval Signature Image',
  HR_LOAD_AWAITING_APPROVAL_SIGNATURE_IMAGE_SUCCESS = '[IDENTIFICATION DATA (HR) PHOTO] Load Awaiting Approval Signature Image Success',

  HR_LOAD_GRADE = '[IDENTIFICATION DATA (HR) ] Load GRADE DATA',
  HR_LOAD_GRADE_SUCCESS = '[IDENTIFICATION DATA (HR) ] Load GRADE Data Success',

  HR_LOAD_POSITION = '[IDENTIFICATION DATA (HR) ] Load POSITION  Data',
  HR_LOAD_POSITION_SUCCESS = '[IDENTIFICATION DATA (HR) ] Load POSITION  Data Success',

  HR_LOAD_PAY_GROUP = '[IDENTIFICATION DATA (HR)] Load PAY GROUP',
  HR_LOAD_PAY_GROUP_SUCCESS = '[IDENTIFICATION DATA (HR)] Load PAY GROUP Data Success',

  HR_LOAD_JOB_TITLE = '[IDENTIFICATION DATA (HR)] Load JOB TITLE',
  HR_LOAD_JOB_TITLE_SUCCESS = '[IDENTIFICATION DATA (HR)] Load JOB TITLE Data Success',

  HR_LOAD_ACTING_JOB_TITLE = '[IDENTIFICATION DATA (HR)] Load ACTING JOB TITLE',
  HR_LOAD_ACTING_JOB_TITLE_SUCCESS = '[IDENTIFICATION DATA (HR)] Load ACTING JOB TITLE Data Success',

  HR_LOAD_PAYMENT_MODE = '[IDENTIFICATION DATA (HR) ] Load PAYMENT_MODE  Data',
  HR_LOAD_PAYMENT_MODE_SUCCESS = '[IDENTIFICATION DATA (HR) ] Load PAYMENT_MODE  Data Success',

  HR_LOAD_REPORT_TO = '[IDENTIFICATION DATA (HR) ] Load REPORT TO  Data',
  HR_LOAD_REPORT_TO_SUCCESS = '[IDENTIFICATION DATA (HR) ] Load REPORT TO  Data Success',

  HR_LOAD_BACK_UP_OFFICER = '[IDENTIFICATION DATA (HR) ] Load BACKUP OFFICER  Data',
  HR_LOAD_BACK_UP_OFFICER_SUCCESS = '[IDENTIFICATION DATA (HR) ] Load BACKUP OFFICER  Data Success',

  HR_SAVE = '[IDENTIFICATION DATA (HR)] Save',
  HR_SAVE_SUCCESS = '[IDENTIFICATION DATA (HR)] Save Success',
  HR_SAVE_FAILURE = '[IDENTIFICATION DATA (HR)] Save Failure',

  HR_DELETE_AWAITING_APPROVAL_DATA = '[IDENTIFICATION DATA (HR)] Delete Awaiting Approval Data',

  HR_RESET_DATA = '[IDENTIFICATION DATA (HR)] Reset Data'
}

export class ShowEditorHRIdentification implements Action {
  readonly type = IdentificationActionTypes.HR_SHOW_EDITOR;
}

export class HideEditorHRIdentification implements Action {
  readonly type = IdentificationActionTypes.HR_HIDE_EDITOR;
}


export class ShowViewerHRIdentification implements Action {
  readonly type = IdentificationActionTypes.HR_SHOW_VIEWER;
}

export class HideViewerHRIdentification implements Action {
  readonly type = IdentificationActionTypes.HR_HIDE_VIEWER;
}


export class ProcessingHRIdentification implements Action {
  readonly type =IdentificationActionTypes.HR_PROCESSING;
}

export class NotProcessingHRIdentification implements Action {
  readonly type = IdentificationActionTypes.HR_NOT_PROCESSING;
}


export class LoadApprovedDataHRIdentification implements Action {
  readonly type = IdentificationActionTypes.HR_LOAD_APPROVED_DATA;

  constructor(public payload: { employeeId: number }) {}
}

export class LoadApprovedDataHRIdentificationSuccess implements Action {
  readonly type = IdentificationActionTypes.HR_LOAD_APPROVED_DATA_SUCCESS;

  constructor(public payload: IIdentification) {}
}

export class LoadApprovedDataHRIdentificationFailure implements Action {
  readonly type = IdentificationActionTypes.HR_LOAD_APPROVED_DATA_FAILURE;

  constructor(public error: any) {}
}

export class LoadAwaitingApprovalDataHRIdentification implements Action {
  readonly type = IdentificationActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA;

  constructor(public payload: { employeeId: number }) {}
}

export class LoadAwaitingApprovalDataHRIdentificationSuccess implements Action {
  readonly type = IdentificationActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS;

  constructor(public payload: IIdentification) {}
}

export class LoadAwaitingApprovalDataHRIdentificationFailure implements Action {
  readonly type = IdentificationActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA_FAILURE;

  constructor(public error: any) {}
}

export class LoadSignatureImageHRIdentification implements Action {
  readonly type =IdentificationActionTypes.HR_LOAD_SIGNATURE_IMAGE;
}

export class LoadSignatureImageHRIdentificationSuccess implements Action {
  readonly type = IdentificationActionTypes.HR_LOAD_SIGNATURE_IMAGE_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadGrade implements Action {
  readonly type =IdentificationActionTypes.HR_LOAD_GRADE;
}

export class LoadGradeSuccess implements Action {
  readonly type = IdentificationActionTypes.HR_LOAD_GRADE_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class LoadPosition implements Action {
  readonly type =IdentificationActionTypes.HR_LOAD_POSITION;
}

export class LoadPositionSuccess implements Action {
  readonly type = IdentificationActionTypes.HR_LOAD_POSITION_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class LoadPayGroup implements Action {
  readonly type = IdentificationActionTypes.HR_LOAD_PAY_GROUP;
  constructor(public payload: {gradeId: number}) { }
}

export class LoadPayGroupSuccess implements Action {
  readonly type = IdentificationActionTypes.HR_LOAD_PAY_GROUP_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class LoadJobTitle implements Action {
  readonly type =IdentificationActionTypes.HR_LOAD_JOB_TITLE;
}

export class LoadJobTitleSuccess implements Action {
  readonly type = IdentificationActionTypes.HR_LOAD_JOB_TITLE_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class LoadActingJobTitle implements Action {
  readonly type =IdentificationActionTypes.HR_LOAD_ACTING_JOB_TITLE;
}

export class LoadActingJobTitleSuccess implements Action {
  readonly type = IdentificationActionTypes.HR_LOAD_ACTING_JOB_TITLE_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class LoadPaymentMode implements Action {
  readonly type =IdentificationActionTypes.HR_LOAD_PAYMENT_MODE;
}

export class LoadPaymentModeSuccess implements Action {
  readonly type = IdentificationActionTypes.HR_LOAD_PAYMENT_MODE_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class LoadReportTo implements Action {
  readonly type =IdentificationActionTypes.HR_LOAD_REPORT_TO;
}

export class LoadReportToSuccess implements Action {
  readonly type = IdentificationActionTypes.HR_LOAD_REPORT_TO_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class LoadBackUpOfficer implements Action {
  readonly type =IdentificationActionTypes.HR_LOAD_BACK_UP_OFFICER;
}

export class LoadBackUpOfficerSuccess implements Action {
  readonly type = IdentificationActionTypes.HR_LOAD_BACK_UP_OFFICER_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class LoadAwaitingApprovalSignatureImage implements Action {
  readonly type = IdentificationActionTypes.HR_LOAD_AWAITING_APPROVAL_SIGNATURE_IMAGE;
}

export class LoadAwaitingApprovalSignatureImageSuccess implements Action {
  readonly type = IdentificationActionTypes.HR_LOAD_AWAITING_APPROVAL_SIGNATURE_IMAGE_SUCCESS;

  constructor(public payload: any) {}
}


export class SaveHRIdentification implements Action {
  readonly type = IdentificationActionTypes.HR_SAVE;

  constructor(public payload: { employeeId: number, employeeinfo_id: number, data:  IIdentification }) {}
}

export class DeleteAwaitingApprovalDataIdentification implements Action {
  readonly type = IdentificationActionTypes.HR_DELETE_AWAITING_APPROVAL_DATA;

  constructor(public payload: { id: number, employeeId: number }) {}
}

export class ResetIdentificationData implements Action {
  readonly type = IdentificationActionTypes.HR_RESET_DATA;
}

export type IdentificationActions =
  | ShowEditorHRIdentification
  | HideEditorHRIdentification
  | ShowViewerHRIdentification
  | HideViewerHRIdentification
  | ProcessingHRIdentification
  | NotProcessingHRIdentification
  | LoadApprovedDataHRIdentification
  | LoadApprovedDataHRIdentificationSuccess
  | LoadApprovedDataHRIdentificationFailure
  | LoadAwaitingApprovalDataHRIdentification
  | LoadAwaitingApprovalDataHRIdentificationSuccess
  | LoadAwaitingApprovalDataHRIdentificationFailure
  | LoadSignatureImageHRIdentification
  | LoadSignatureImageHRIdentificationSuccess
  | LoadGrade
  | LoadGradeSuccess
  | LoadPosition
  | LoadPositionSuccess
  | LoadPayGroup
  | LoadPayGroupSuccess
  | LoadJobTitle
  | LoadJobTitleSuccess
  | LoadActingJobTitle
  | LoadActingJobTitleSuccess
  | LoadPaymentMode
  | LoadPaymentModeSuccess
  | LoadReportTo
  | LoadReportToSuccess
  | LoadBackUpOfficer
  | LoadBackUpOfficerSuccess
  | SaveHRIdentification
  | DeleteAwaitingApprovalDataIdentification
  | LoadAwaitingApprovalSignatureImage
  | LoadAwaitingApprovalSignatureImageSuccess
  | ResetIdentificationData;
