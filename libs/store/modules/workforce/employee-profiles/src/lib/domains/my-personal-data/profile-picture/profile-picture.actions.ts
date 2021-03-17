import { Action } from '@ngrx/store';
import { IProfilePicture } from '@nutela/models/workforce/employee-profiles';

export enum ProfilePictureActionTypes {
  SHOW_EDITOR = '[PROFILE PICTURE - EMPLOYEE PHOTO] Show Editor',
  HIDE_EDITOR = '[PROFILE PICTURE - EMPLOYEE PHOTO] Hide Editor',

  SHOW_VIEWER = '[PROFILE PICTURE - EMPLOYEE PHOTO] Show Viewer',
  HIDE_VIEWER = '[PROFILE PICTURE - EMPLOYEE PHOTO] Hide Viewer',

  PROCESSING = '[PROFILE PICTURE - EMPLOYEE PHOTO] Processing',
  NOT_PROCESSING = '[PROFILE PICTURE - EMPLOYEE PHOTO] Not Processing',

  LOAD_EMPLOYEE_PHOTO = '[PROFILE PICTURE - EMPLOYEE PHOTO] Load Employee Photo',
  LOAD_EMPLOYEE_PHOTO_SUCCESS = '[PROFILE PICTURE - EMPLOYEE PHOTO] Load Employee Photo Success',

  LOAD_AWAITING_APPROVAL_EMPLOYEE_PHOTO = '[PROFILE PICTURE - EMPLOYEE PHOTO] Load Awaiting Approval Employee Photo',
  LOAD_AWAITING_APPROVAL_EMPLOYEE_PHOTO_SUCCESS = '[PROFILE PICTURE - EMPLOYEE PHOTO] Load Awaiting Approval Employee Photo Success',

  SAVE = '[PROFILE PICTURE - EMPLOYEE PHOTO] Save',
  SAVE_SUCCESS = '[PROFILE PICTURE - EMPLOYEE PHOTOL] Save Success',
  SAVE_FAILURE = '[PROFILE PICTURE - EMPLOYEE PHOTO] Save Failure',

  DELETE_AWAITING_APPROVAL_DATA = '[PROFILE PICTURE - EMPLOYEE PHOTO] Delete Awaiting Approval Employee Photo',
}

export class ShowEditorProfilePicture implements Action {
  readonly type = ProfilePictureActionTypes.SHOW_EDITOR;
}

export class HideEditorProfilePicture implements Action {
  readonly type = ProfilePictureActionTypes.HIDE_EDITOR;
}


export class ShowViewerProfilePicture implements Action {
  readonly type = ProfilePictureActionTypes.SHOW_VIEWER;
}

export class HideViewerProfilePicture implements Action {
  readonly type = ProfilePictureActionTypes.HIDE_VIEWER;
}

export class LoadProfilePicture implements Action {
  readonly type = ProfilePictureActionTypes.LOAD_EMPLOYEE_PHOTO;

  constructor(public payload: number) {}
}

export class LoadProfilePictureSuccess implements Action {
  readonly type = ProfilePictureActionTypes.LOAD_EMPLOYEE_PHOTO_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadAwaitingApprovalProfilePicture implements Action {
  readonly type = ProfilePictureActionTypes.LOAD_AWAITING_APPROVAL_EMPLOYEE_PHOTO;
}

export class LoadAwaitingApprovalProfilePictureSuccess implements Action {
  readonly type = ProfilePictureActionTypes.LOAD_AWAITING_APPROVAL_EMPLOYEE_PHOTO_SUCCESS;

  constructor(public payload: IProfilePicture) {}
}

export class ProcessingProfilePicture implements Action {
  readonly type = ProfilePictureActionTypes.PROCESSING;
}

export class NotProcessingProfilePicture implements Action {
  readonly type = ProfilePictureActionTypes.NOT_PROCESSING;
}

export class SaveProfilePicture implements Action {
  readonly type = ProfilePictureActionTypes.SAVE;

  constructor(public payload: IProfilePicture) {}
}

export class SaveProfilePictureSuccess implements Action {
  readonly type = ProfilePictureActionTypes.SAVE_SUCCESS;
}

export class SaveProfilePictureFailure implements Action {
  readonly type =ProfilePictureActionTypes.SAVE_FAILURE;

  constructor(public error: any) {}
}

export class DeleteAwaitingApprovalProfilePicture implements Action {
  readonly type = ProfilePictureActionTypes.DELETE_AWAITING_APPROVAL_DATA;
  constructor(public payload: number) {}
}

export type ProfilePictureActions =
  | ShowEditorProfilePicture
  | HideEditorProfilePicture
  | ShowViewerProfilePicture
  | HideViewerProfilePicture
  | LoadProfilePicture
  | LoadProfilePictureSuccess
  | LoadAwaitingApprovalProfilePicture
  | LoadAwaitingApprovalProfilePictureSuccess
  | ProcessingProfilePicture
  | NotProcessingProfilePicture
  | SaveProfilePicture
  | SaveProfilePictureSuccess
  | SaveProfilePictureFailure
  | DeleteAwaitingApprovalProfilePicture;
