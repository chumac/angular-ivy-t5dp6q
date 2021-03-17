import { Action } from '@ngrx/store';
import { IProfilePicture } from '@nutela/models/workforce/employee-profiles';

export enum ImageActionTypes {
  LOAD_EMPLOYEE_PHOTO = '[IMAGE - EMPLOYEE PHOTO] Load Employee Photo',
  LOAD_EMPLOYEE_PHOTO_SUCCESS = '[IMAGE - EMPLOYEE PHOTO] Load Employee Photo Success',

  LOAD_REPORTS_TO_EMPLOYEE_PHOTO = '[IMAGE - EMPLOYEE PHOTO] Load Reports To Employee Photo',
  LOAD_REPORTS_TO_EMPLOYEE_PHOTO_SUCCESS = '[IMAGE - EMPLOYEE PHOTO] Load Reports To Employee Photo Success',

  LOAD_EMPLOYEE_SIGNATURE = '[IMAGE - EMPLOYEE PHOTO] Load Employee Signature',
  LOAD_EMPLOYEE_SIGNATURE_SUCCESS = '[IMAGE - EMPLOYEE PHOTO] Load Employee Signature Success',

  SAVE = '[IMAGE - EMPLOYEE PHOTO] Save',
  SAVE_SUCCESS = '[IMAGE - EMPLOYEE PHOTOL] Save Success',
  SAVE_FAILURE = '[IMAGE - EMPLOYEE PHOTO] Save Failure',

  DELETE_AWAITING_APPROVAL_DATA = '[IMAGE - EMPLOYEE PHOTO] Delete Awaiting Approval Employee Photo',
}

export class LoadEmployeePhoto implements Action {
  readonly type = ImageActionTypes.LOAD_EMPLOYEE_PHOTO;

  constructor(public payload: number) {}
}

export class LoadEmployeePhotoSuccess implements Action {
  readonly type = ImageActionTypes.LOAD_EMPLOYEE_PHOTO_SUCCESS;

  constructor(public payload: any) {}
}


export class LoadReportsToEmployeePhoto implements Action {
  readonly type = ImageActionTypes.LOAD_REPORTS_TO_EMPLOYEE_PHOTO;

  constructor(public payload: number) {}
}

export class LoadReportsToEmployeePhotoSuccess implements Action {
  readonly type = ImageActionTypes.LOAD_REPORTS_TO_EMPLOYEE_PHOTO_SUCCESS;

  constructor(public payload: any) {}
}


export class LoadEmployeeSignature implements Action {
  readonly type = ImageActionTypes.LOAD_EMPLOYEE_SIGNATURE;
}

export class LoadEmployeeSignatureSuccess implements Action {
  readonly type = ImageActionTypes.LOAD_EMPLOYEE_SIGNATURE_SUCCESS;

  constructor(public payload: any) {}
}

export type ImageActions =
  | LoadEmployeePhoto
  | LoadEmployeePhotoSuccess
  | LoadReportsToEmployeePhoto
  | LoadReportsToEmployeePhotoSuccess
  | LoadEmployeeSignature
  | LoadEmployeeSignatureSuccess;
