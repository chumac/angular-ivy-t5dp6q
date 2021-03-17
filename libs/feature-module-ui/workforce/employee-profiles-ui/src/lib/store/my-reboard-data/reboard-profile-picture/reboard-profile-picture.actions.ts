import { Action } from '@ngrx/store';
import { IProfilePicture } from '@nutela/models/workforce/employee-profiles';

export enum ReboardProfilePictureActionTypes {
  SHOW_EDITOR = '[MY REBOARDING DATA - EMPLOYEE PHOTO] Show Editor',
  HIDE_EDITOR = '[MY REBOARDING DATA - EMPLOYEE PHOTO] Hide Editor',

  SHOW_VIEWER = '[MY REBOARDING DATA - EMPLOYEE PHOTO] Show Viewer',
  HIDE_VIEWER = '[MY REBOARDING DATA - EMPLOYEE PHOTO] Hide Viewer',

  PROCESSING = '[MY REBOARDING DATA - EMPLOYEE PHOTO] Processing',
  NOT_PROCESSING = '[MY REBOARDING DATA - EMPLOYEE PHOTO] Not Processing',

  LOAD_EMPLOYEE_PHOTO = '[MY REBOARDING DATA - EMPLOYEE PHOTO] Load Employee Photo',
  LOAD_EMPLOYEE_PHOTO_SUCCESS = '[MY REBOARDING DATA - EMPLOYEE PHOTO] Load Employee Photo Success',

  LOAD_AWAITING_APPROVAL_EMPLOYEE_PHOTO = '[MY REBOARDING DATA - EMPLOYEE PHOTO] Load Awaiting Approval Employee Photo',
  LOAD_AWAITING_APPROVAL_EMPLOYEE_PHOTO_SUCCESS = '[MY REBOARDING DATA - EMPLOYEE PHOTO] Load Awaiting Approval Employee Photo Success',

  SAVE = '[MY REBOARDING DATA - EMPLOYEE PHOTO] Save',
  UPDATE = '[MY REBOARDING DATA - EMPLOYEE PHOTO] Save Update',
  SAVE_SUCCESS = '[MY REBOARDING DATA - EMPLOYEE PHOTO] Save Success',
  SAVE_FAILURE = '[MY REBOARDING DATA - EMPLOYEE PHOTO] Save Failure',

  DELETE_AWAITING_APPROVAL_DATA = '[MY REBOARDING DATA - EMPLOYEE PHOTO] Delete Awaiting Approval Employee Photo',
}

export class ShowEditorReboardProfilePicture implements Action {
  readonly type = ReboardProfilePictureActionTypes.SHOW_EDITOR;
}

export class HideEditorReboardProfilePicture implements Action {
  readonly type = ReboardProfilePictureActionTypes.HIDE_EDITOR;
}


export class ShowViewerReboardProfilePicture implements Action {
  readonly type = ReboardProfilePictureActionTypes.SHOW_VIEWER;
}

export class HideViewerReboardProfilePicture implements Action {
  readonly type = ReboardProfilePictureActionTypes.HIDE_VIEWER;
}

export class LoadReboardProfilePicture implements Action {
  readonly type = ReboardProfilePictureActionTypes.LOAD_EMPLOYEE_PHOTO;

  // constructor(public payload: number) {}
}

export class LoadReboardProfilePictureSuccess implements Action {
  readonly type = ReboardProfilePictureActionTypes.LOAD_EMPLOYEE_PHOTO_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadAwaitingApprovalReboardProfilePicture implements Action {
  readonly type = ReboardProfilePictureActionTypes.LOAD_AWAITING_APPROVAL_EMPLOYEE_PHOTO;
}

export class LoadAwaitingApprovalReboardProfilePictureSuccess implements Action {
  readonly type = ReboardProfilePictureActionTypes.LOAD_AWAITING_APPROVAL_EMPLOYEE_PHOTO_SUCCESS;

  constructor(public payload: IProfilePicture) {}
}

export class ProcessingReboardProfilePicture implements Action {
  readonly type = ReboardProfilePictureActionTypes.PROCESSING;
}

export class NotProcessingReboardProfilePicture implements Action {
  readonly type = ReboardProfilePictureActionTypes.NOT_PROCESSING;
}

export class SaveReboardProfilePicture implements Action {
  readonly type = ReboardProfilePictureActionTypes.SAVE;

  constructor(public payload: IProfilePicture) {}
}

export class SaveUpdateReboardProfilePicture implements Action {
  readonly type = ReboardProfilePictureActionTypes.UPDATE;

  constructor(public payload: IProfilePicture) {}
}

export class SaveReboardProfilePictureSuccess implements Action {
  readonly type = ReboardProfilePictureActionTypes.SAVE_SUCCESS;
}

export class SaveReboardProfilePictureFailure implements Action {
  readonly type =ReboardProfilePictureActionTypes.SAVE_FAILURE;

  constructor(public error: any) {}
}

export class DeleteAwaitingApprovalReboardProfilePicture implements Action {
  readonly type = ReboardProfilePictureActionTypes.DELETE_AWAITING_APPROVAL_DATA;
  constructor(public payload: number) {}
}

export type ReboardProfilePictureActions =
  | ShowEditorReboardProfilePicture
  | HideEditorReboardProfilePicture
  | ShowViewerReboardProfilePicture
  | HideViewerReboardProfilePicture
  | LoadReboardProfilePicture
  | LoadReboardProfilePictureSuccess
  | LoadAwaitingApprovalReboardProfilePicture
  | LoadAwaitingApprovalReboardProfilePictureSuccess
  | ProcessingReboardProfilePicture
  | NotProcessingReboardProfilePicture
  | SaveReboardProfilePicture
  | SaveUpdateReboardProfilePicture
  | SaveReboardProfilePictureSuccess
  | SaveReboardProfilePictureFailure
  | DeleteAwaitingApprovalReboardProfilePicture;
