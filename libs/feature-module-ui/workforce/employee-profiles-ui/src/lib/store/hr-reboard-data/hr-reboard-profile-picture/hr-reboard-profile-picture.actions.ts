import { Action } from '@ngrx/store';
import { IProfilePicture } from '@nutela/models/workforce/employee-profiles';

export enum HrReboardProfilePictureActionTypes {
  SHOW_EDITOR = '[HR REBOARDING DATA - EMPLOYEE PHOTO] Show Editor',
  HIDE_EDITOR = '[HR REBOARDING DATA - EMPLOYEE PHOTO] Hide Editor',

  SHOW_VIEWER = '[HR REBOARDING DATA - EMPLOYEE PHOTO] Show Viewer',
  HIDE_VIEWER = '[HR REBOARDING DATA - EMPLOYEE PHOTO] Hide Viewer',

  PROCESSING = '[HR REBOARDING DATA - EMPLOYEE PHOTO] Processing',
  NOT_PROCESSING = '[HR REBOARDING DATA - EMPLOYEE PHOTO] Not Processing',

  LOAD_EMPLOYEE_PHOTO = '[HR REBOARDING DATA - EMPLOYEE PHOTO] Load Employee Photo',
  LOAD_EMPLOYEE_PHOTO_SUCCESS = '[HR REBOARDING DATA - EMPLOYEE PHOTO] Load Employee Photo Success',

  LOAD_AWAITING_APPROVAL_EMPLOYEE_PHOTO = '[HR REBOARDING DATA - EMPLOYEE PHOTO] Load Awaiting Approval Employee Photo',
  LOAD_AWAITING_APPROVAL_EMPLOYEE_PHOTO_SUCCESS = '[HR REBOARDING DATA - EMPLOYEE PHOTO] Load Awaiting Approval Employee Photo Success',

  SAVE = '[HR REBOARDING DATA - EMPLOYEE PHOTO] Save',
  UPDATE = '[HR REBOARDING DATA - EMPLOYEE PHOTO] Save Update',
  SAVE_SUCCESS = '[HR REBOARDING DATA - EMPLOYEE PHOTO] Save Success',
  SAVE_FAILURE = '[HR REBOARDING DATA - EMPLOYEE PHOTO] Save Failure',

  DELETE_AWAITING_APPROVAL_DATA = '[HR REBOARDING DATA - EMPLOYEE PHOTO] Delete Awaiting Approval Employee Photo',
}

export class ShowEditorHrReboardProfilePicture implements Action {
  readonly type = HrReboardProfilePictureActionTypes.SHOW_EDITOR;
}

export class HideEditorHrReboardProfilePicture implements Action {
  readonly type = HrReboardProfilePictureActionTypes.HIDE_EDITOR;
}


export class ShowViewerHrReboardProfilePicture implements Action {
  readonly type = HrReboardProfilePictureActionTypes.SHOW_VIEWER;
}

export class HideViewerHrReboardProfilePicture implements Action {
  readonly type = HrReboardProfilePictureActionTypes.HIDE_VIEWER;
}

export class LoadHrReboardProfilePicture implements Action {
  readonly type = HrReboardProfilePictureActionTypes.LOAD_EMPLOYEE_PHOTO;

  constructor(public payload: number) {}
}

export class LoadHrReboardProfilePictureSuccess implements Action {
  readonly type = HrReboardProfilePictureActionTypes.LOAD_EMPLOYEE_PHOTO_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadAwaitingApprovalHrReboardProfilePicture implements Action {
  readonly type = HrReboardProfilePictureActionTypes.LOAD_AWAITING_APPROVAL_EMPLOYEE_PHOTO;
}

export class LoadAwaitingApprovalHrReboardProfilePictureSuccess implements Action {
  readonly type = HrReboardProfilePictureActionTypes.LOAD_AWAITING_APPROVAL_EMPLOYEE_PHOTO_SUCCESS;

  constructor(public payload: IProfilePicture) {}
}

export class ProcessingHrReboardProfilePicture implements Action {
  readonly type = HrReboardProfilePictureActionTypes.PROCESSING;
}

export class NotProcessingHrReboardProfilePicture implements Action {
  readonly type = HrReboardProfilePictureActionTypes.NOT_PROCESSING;
}

export class SaveHrReboardProfilePicture implements Action {
  readonly type = HrReboardProfilePictureActionTypes.SAVE;

  constructor(public payload: {employeeId: number, data: IProfilePicture}) {}
}

export class SaveUpdateHrReboardProfilePicture implements Action {
  readonly type = HrReboardProfilePictureActionTypes.UPDATE;

  constructor(public payload: {data: IProfilePicture, employeeId: number}) {}
}

export class SaveHrReboardProfilePictureSuccess implements Action {
  readonly type = HrReboardProfilePictureActionTypes.SAVE_SUCCESS;
}

export class SaveHrReboardProfilePictureFailure implements Action {
  readonly type =HrReboardProfilePictureActionTypes.SAVE_FAILURE;

  constructor(public error: any) {}
}

export class DeleteAwaitingApprovalHrReboardProfilePicture implements Action {
  readonly type = HrReboardProfilePictureActionTypes.DELETE_AWAITING_APPROVAL_DATA;
  constructor(public payload: number) {}
}

export type HrReboardProfilePictureActions =
  | ShowEditorHrReboardProfilePicture
  | HideEditorHrReboardProfilePicture
  | ShowViewerHrReboardProfilePicture
  | HideViewerHrReboardProfilePicture
  | LoadHrReboardProfilePicture
  | LoadHrReboardProfilePictureSuccess
  | LoadAwaitingApprovalHrReboardProfilePicture
  | LoadAwaitingApprovalHrReboardProfilePictureSuccess
  | ProcessingHrReboardProfilePicture
  | NotProcessingHrReboardProfilePicture
  | SaveHrReboardProfilePicture
  | SaveUpdateHrReboardProfilePicture
  | SaveHrReboardProfilePictureSuccess
  | SaveHrReboardProfilePictureFailure
  | DeleteAwaitingApprovalHrReboardProfilePicture;
