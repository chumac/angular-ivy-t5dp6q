import { Action } from '@ngrx/store';

import { IIdentification } from '@nutela/models/workforce/employee-profiles';

export enum HrReboardIdentificationActionTypes {
  SHOW_EDITOR = '[HR REBOARDING DATA - IDENTIFICATION] Show Editor',
  HIDE_EDITOR = '[HR REBOARDING DATA - IDENTIFICATION] Hide Editor',

  SHOW_VIEWER = '[HR REBOARDING DATA - IDENTIFICATION] Show Viewer',
  HIDE_VIEWER = '[HR REBOARDING DATA - IDENTIFICATION] Hide Viewer',

  PROCESSING = '[HR REBOARDING DATA - IDENTIFICATION] Processing',
  NOT_PROCESSING = '[HR REBOARDING DATA -IDENTIFICATION] Not Processing',

  LOADING = '[HR REBOARDING DATA - IDENTIFICATION] Loading',
  NOT_LOADING = '[HR REBOARDING DATA -IDENTIFICATION] Not Loading',

  LOAD_DATA = '[HR REBOARDING DATA - IDENTIFICATION] Load Data',
  LOAD_DATA_SUCCESS = '[HR REBOARDING DATA - IDENTIFICATION] Load Data Success',

  LOAD_SIGNATURE_IMAGE = '[HR REBOARDING DATA - IDENTIFICATION PHOTO] Load signature Image',
  LOAD_SIGNATURE_IMAGE_SUCCESS = '[HR REBOARDING DATA - IDENTIFICATION PHOTO] Load signature Image Data Success',

  LOAD_PAYGROUP = '[HR REBOARDING DATA - IDENTIFICATION] Load Paygroup',
  LOAD_PAYGROUP_SUCCESS = '[HR REBOARDING DATA - IDENTIFICATION] Load Paygroup Success',

  LOAD_GRADE = '[HR REBOARDING DATA - IDENTIFICATION] Load Grade',
  LOAD_GRADE_SUCCESS = '[HR REBOARDING DATA - IDENTIFICATION] Load Grade Success',

  LOAD_POSITION = '[HR REBOARDING DATA - IDENTIFICATION] Load Position',
  LOAD_POSITION_SUCCESS = '[HR REBOARDING DATA - IDENTIFICATION] Load Position Success',

  HR_LOAD_JOB_TITLES = '[HR REBOARDING DATA - IDENTIFICATION] Load Job Titles',
  HR_LOAD_JOB_TITLES_SUCCESS = '[HR REBOARDING DATA - IDENTIFICATION] Load Job Titles Success',

  HR_LOAD_PAYMENT_MODES = '[HR REBOARDING DATA - IDENTIFICATION] Load Payment Modes',
  HR_LOAD_PAYMENT_MODES_SUCCESS = '[HR REBOARDING DATA - IDENTIFICATION] Load Payment Modes Success',

  HR_LOAD_STAFF_LIST = '[HR REBOARDING DATA - IDENTIFICATION] Load Staff List',
  HR_LOAD_STAFF_LIST_SUCCESS = '[HR REBOARDING DATA - IDENTIFICATION] Load Staff List Success',

  SAVE = '[HR REBOARDING DATA - IDENTIFICATION] Save',
  UPDATE = '[HR REBOARDING DATA - IDENTIFICATION] Save Update',
}

export class ShowEditorHrReboardIdentification implements Action {
  readonly type = HrReboardIdentificationActionTypes.SHOW_EDITOR;
}

export class HideEditorHrReboardIdentification implements Action {
  readonly type = HrReboardIdentificationActionTypes.HIDE_EDITOR;
}

export class ShowViewerHrReboardIdentification implements Action {
  readonly type = HrReboardIdentificationActionTypes.SHOW_VIEWER;
}

export class HideViewerHrReboardIdentification implements Action {
  readonly type = HrReboardIdentificationActionTypes.HIDE_VIEWER;
}

export class ProcessingHrReboardIdentification implements Action {
  readonly type =HrReboardIdentificationActionTypes.PROCESSING;
}

export class NotProcessingHrReboardIdentification implements Action {
  readonly type = HrReboardIdentificationActionTypes.NOT_PROCESSING;
}

export class LoadingHrReboardIdentification implements Action {
  readonly type =HrReboardIdentificationActionTypes.LOADING;
}

export class NotLoadingHrReboardIdentification implements Action {
  readonly type = HrReboardIdentificationActionTypes.NOT_LOADING;
}

export class LoadDataHrReboardIdentification implements Action {
  readonly type = HrReboardIdentificationActionTypes.LOAD_DATA;

  constructor(public payload: { employeeId: number }) {}
}

export class LoadDataHrReboardIdentificationSuccess implements Action {
  readonly type = HrReboardIdentificationActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IIdentification) {}
}

export class LoadSignatureImageHrReboardIdentification implements Action {
  readonly type = HrReboardIdentificationActionTypes.LOAD_SIGNATURE_IMAGE;

  constructor(public payload: { employeeId: number }) { }
}

export class LoadSignatureImageHrReboardIdentificationSuccess implements Action {
  readonly type = HrReboardIdentificationActionTypes.LOAD_SIGNATURE_IMAGE_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadPaygroupDataHrReboardIdentification implements Action {
  readonly type = HrReboardIdentificationActionTypes.LOAD_PAYGROUP;

  constructor(public payload: {gradeId: number}) {}
}

export class LoadPaygroupDataHrReboardIdentificationSuccess implements Action {
  readonly type = HrReboardIdentificationActionTypes.LOAD_PAYGROUP_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadGradeDataHrReboardIdentification implements Action {
  readonly type = HrReboardIdentificationActionTypes.LOAD_GRADE;

  constructor() {}
}

export class LoadGradeDataHrReboardIdentificationSuccess implements Action {
  readonly type = HrReboardIdentificationActionTypes.LOAD_GRADE_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadPositionDataHrReboardIdentification implements Action {
  readonly type = HrReboardIdentificationActionTypes.LOAD_POSITION;

  constructor() {}
}

export class LoadPositionDataHrReboardIdentificationSuccess implements Action {
  readonly type = HrReboardIdentificationActionTypes.LOAD_POSITION_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadJobTitleDataHrReboardIdentification implements Action {
  readonly type = HrReboardIdentificationActionTypes.HR_LOAD_JOB_TITLES;

  constructor() {}
}

export class LoadJobTitleDataHrReboardIdentificationSuccess implements Action {
  readonly type = HrReboardIdentificationActionTypes.HR_LOAD_JOB_TITLES_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadPaymentModeDataHrReboardIdentification implements Action {
  readonly type = HrReboardIdentificationActionTypes.HR_LOAD_PAYMENT_MODES;

  constructor() {}
}

export class LoadPaymentModeDataHrReboardIdentificationSuccess implements Action {
  readonly type = HrReboardIdentificationActionTypes.HR_LOAD_PAYMENT_MODES_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadStaffListDataHrReboardIdentification implements Action {
  readonly type = HrReboardIdentificationActionTypes.HR_LOAD_STAFF_LIST;

  constructor() {}
}

export class LoadStaffListDataHrReboardIdentificationSuccess implements Action {
  readonly type = HrReboardIdentificationActionTypes.HR_LOAD_STAFF_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class SaveHrReboardIdentification implements Action {
  readonly type = HrReboardIdentificationActionTypes.SAVE;

  constructor(public payload: {data: IIdentification, employeeId: number}) {}
}

export class SaveUpdateHrReboardIdentification implements Action {
  readonly type = HrReboardIdentificationActionTypes.UPDATE;

  constructor(public payload: {data: IIdentification, employeeId: number}) {}
}

export type HrReboardIdentificationActions =
  | ShowEditorHrReboardIdentification
  | HideEditorHrReboardIdentification
  | ShowViewerHrReboardIdentification
  | HideViewerHrReboardIdentification
  | ProcessingHrReboardIdentification
  | NotProcessingHrReboardIdentification
  | LoadingHrReboardIdentification
  | NotLoadingHrReboardIdentification
  | LoadDataHrReboardIdentification
  | LoadDataHrReboardIdentificationSuccess
  | LoadSignatureImageHrReboardIdentification
  | LoadSignatureImageHrReboardIdentificationSuccess
  | SaveHrReboardIdentification
  | SaveUpdateHrReboardIdentification
  | LoadGradeDataHrReboardIdentification
  | LoadGradeDataHrReboardIdentificationSuccess
  | LoadPaygroupDataHrReboardIdentification
  | LoadPaygroupDataHrReboardIdentificationSuccess
  | LoadPositionDataHrReboardIdentification
  | LoadPositionDataHrReboardIdentificationSuccess
  | LoadJobTitleDataHrReboardIdentification
  | LoadJobTitleDataHrReboardIdentificationSuccess
  | LoadPaymentModeDataHrReboardIdentification
  | LoadPaymentModeDataHrReboardIdentificationSuccess
  | LoadStaffListDataHrReboardIdentification
  | LoadStaffListDataHrReboardIdentificationSuccess
