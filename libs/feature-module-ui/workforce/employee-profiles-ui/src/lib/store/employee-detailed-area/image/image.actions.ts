import { Action } from '@ngrx/store';
import { IProfilePicture } from '@nutela/models/workforce/employee-profiles';

export enum ImageActionTypes {

  HR_LOAD_EMPLOYEE_PHOTO = '[IMAGE DATA (HR)] Load Photo',
  HR_LOAD_EMPLOYEE_PHOTO_SUCCESS = '[IMAGE DATA (HR)] Load Photo Success',

  HR_LOAD_EMPLOYEE_FILE_PHOTO = '[IMAGE DATA (HR)] Load File Photo',
  HR_LOAD_EMPLOYEE_FILE_PHOTO_SUCCESS = '[IMAGE DATA (HR)] Load File Photo Success',

  HR_SHOW_EDITOR = '[IMAGE DATA (HR)] Show Editor',
  HR_HIDE_EDITOR = '[IMAGE DATA (HR)] Hide Editor',

  HR_SHOW_VIEWER = '[IMAGE DATA (HR)] Show Viewer',
  HR_HIDE_VIEWER = '[IMAGE DATA (HR)] Hide Viewer',

  HR_PROCESSING = '[IMAGE DATA (HR)] Processing',
  HR_NOT_PROCESSING = '[IMAGE DATA (HR)] Not Processing',

  HR_LOAD_AWAITING_APPROVAL_EMPLOYEE_PHOTO = '[IMAGE DATA (HR)] Load Awaiting Approval Photo',
  HR_LOAD_AWAITING_APPROVAL_EMPLOYEE_PHOTO_SUCCESS = '[IMAGE DATA (HR)] Load Awaiting Approval Photo Success',

  HR_LOAD_REPORTS_TO_EMPLOYEE_PHOTO = '[IMAGE  DATA (HR)] Load Reports To Photo',
  HR_LOAD_REPORTS_TO_EMPLOYEE_PHOTO_SUCCESS = '[IMAGE  DATA (HR)] Load Reports To Photo Success',

  HR_LOAD_EMPLOYEE_SIGNATURE = '[IMAGE DATA (HR)] Load Signature',
  HR_LOAD_EMPLOYEE_SIGNATURE_SUCCESS = '[IMAGE DATA (HR)] Load Signature Success',

  HR_SAVE = '[IMAGE DATA (HR)] Save',
  HR_SAVE_SUCCESS = '[IMAGE DATA (HR)] Save Success',
  HR_SAVE_FAILURE = '[IMAGE DATA (HR)] Save Failure',

  HR_DELETE_AWAITING_APPROVAL_DATA = '[IMAGE DATA (HR)] Delete Awaiting Approval Photo',

  HR_RESET_DATA = '[IMAGE  DATA (HR)] Reset Data'
}

export class LoadEmployeePhoto implements Action {
  readonly type = ImageActionTypes.HR_LOAD_EMPLOYEE_PHOTO;

  constructor(public payload: {employeeId: number}) {}
}

export class LoadEmployeePhotoSuccess implements Action {
  readonly type = ImageActionTypes.HR_LOAD_EMPLOYEE_PHOTO_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadEmployeeFilePhoto implements Action {
  readonly type = ImageActionTypes.HR_LOAD_EMPLOYEE_FILE_PHOTO;

  constructor(public payload: {employeeId: number}) {}
}

export class LoadEmployeeFilePhotoSuccess implements Action {
  readonly type = ImageActionTypes.HR_LOAD_EMPLOYEE_FILE_PHOTO_SUCCESS;

  constructor(public payload: any) {}
}

export class ShowEditorEmployeePhoto implements Action {
  readonly type = ImageActionTypes.HR_SHOW_EDITOR;
}

export class HideEditorEmployeePhoto implements Action {
  readonly type = ImageActionTypes.HR_HIDE_EDITOR;
}


export class ShowViewerEmployeePhoto implements Action {
  readonly type = ImageActionTypes.HR_SHOW_VIEWER;
}

export class HideViewerEmployeePhoto implements Action {
  readonly type = ImageActionTypes.HR_HIDE_VIEWER;
}

export class LoadAwaitingApprovalEmployeePhoto implements Action {
  readonly type = ImageActionTypes.HR_LOAD_AWAITING_APPROVAL_EMPLOYEE_PHOTO;

  constructor(public payload: { employeeId: number }) {}
}

export class LoadAwaitingApprovalEmployeePhotoSuccess implements Action {
  readonly type = ImageActionTypes.HR_LOAD_AWAITING_APPROVAL_EMPLOYEE_PHOTO_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadReportsToEmployeePhoto implements Action {
  readonly type = ImageActionTypes.HR_LOAD_REPORTS_TO_EMPLOYEE_PHOTO;

  constructor(public payload: {reportsToEmployeeId: number}) {}
}

export class LoadReportsToEmployeePhotoSuccess implements Action {
  readonly type = ImageActionTypes.HR_LOAD_REPORTS_TO_EMPLOYEE_PHOTO_SUCCESS;

  constructor(public payload: any) {}
}


export class LoadEmployeeSignature implements Action {
  readonly type = ImageActionTypes.HR_LOAD_EMPLOYEE_SIGNATURE;
}

export class LoadEmployeeSignatureSuccess implements Action {
  readonly type = ImageActionTypes.HR_LOAD_EMPLOYEE_SIGNATURE_SUCCESS;

  constructor(public payload: any) {}
}


export class ProcessingImage implements Action {
  readonly type = ImageActionTypes.HR_PROCESSING;
}

export class NotProcessingImage implements Action {
  readonly type = ImageActionTypes.HR_NOT_PROCESSING;
}

export class SaveEmployeePhoto implements Action {
  readonly type = ImageActionTypes.HR_SAVE;

  constructor(public payload: {employeeId: number, data: IProfilePicture}) {}
}

export class SaveEmployeePhotoSuccess implements Action {
  readonly type = ImageActionTypes.HR_SAVE_SUCCESS;
}

export class SaveEmployeePhotoFailure implements Action {
  readonly type =ImageActionTypes.HR_SAVE_FAILURE;

  constructor(public error: any) {}
}

export class DeleteAwaitingApprovalEmployeePhoto implements Action {
  readonly type = ImageActionTypes.HR_DELETE_AWAITING_APPROVAL_DATA;
  constructor(public payload: { id: number ,employeeId:number}) {}
}

export class ResetImageData implements Action {
  readonly type = ImageActionTypes.HR_RESET_DATA;
}


export type ImageActions =
| ShowEditorEmployeePhoto
| HideEditorEmployeePhoto
| ShowViewerEmployeePhoto
| HideViewerEmployeePhoto
| LoadEmployeePhoto
| LoadEmployeePhotoSuccess
| LoadEmployeeFilePhoto
| LoadEmployeeFilePhotoSuccess
| LoadAwaitingApprovalEmployeePhoto
| LoadAwaitingApprovalEmployeePhotoSuccess
| LoadReportsToEmployeePhoto
| LoadReportsToEmployeePhotoSuccess
| LoadEmployeeSignature
| LoadEmployeeSignatureSuccess
| ProcessingImage
| NotProcessingImage
| SaveEmployeePhoto
| SaveEmployeePhotoSuccess
| SaveEmployeePhotoFailure
| DeleteAwaitingApprovalEmployeePhoto
| ResetImageData;
