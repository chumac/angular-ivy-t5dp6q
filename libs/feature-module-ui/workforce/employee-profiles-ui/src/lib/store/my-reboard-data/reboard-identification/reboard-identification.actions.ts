import { Action } from '@ngrx/store';

import { IIdentification } from '@nutela/models/workforce/employee-profiles';

export enum ReboardIdentificationActionTypes {
  SHOW_EDITOR = '[MY REBOARDING DATA - IDENTIFICATION] Show Editor',
  HIDE_EDITOR = '[MY REBOARDING DATA - IDENTIFICATION] Hide Editor',

  SHOW_VIEWER = '[MY REBOARDING DATA - IDENTIFICATION] Show Viewer',
  HIDE_VIEWER = '[MY REBOARDING DATA - IDENTIFICATION] Hide Viewer',

  PROCESSING = '[MY REBOARDING DATA - IDENTIFICATION] Processing',
  NOT_PROCESSING = '[MY REBOARDING DATA -IDENTIFICATION] Not Processing',

  LOADING = '[MY REBOARDING DATA - IDENTIFICATION] Loading',
  NOT_LOADING = '[MY REBOARDING DATA -IDENTIFICATION] Not Loading',

  LOAD_DATA = '[MY REBOARDING DATA - IDENTIFICATION] Load Data',
  LOAD_DATA_SUCCESS = '[MY REBOARDING DATA - IDENTIFICATION] Load Data Success',

  LOAD_SIGNATURE_IMAGE = '[MY REBOARDING DATA - IDENTIFICATION PHOTO] Load signature Image',
  LOAD_SIGNATURE_IMAGE_SUCCESS = '[MY REBOARDING DATA - IDENTIFICATION PHOTO] Load signature Image Data Success',

  LOAD_PAYGROUP = '[MY REBOARDING DATA - IDENTIFICATION] Load Paygroup',
  LOAD_PAYGROUP_SUCCESS = '[MY REBOARDING DATA - IDENTIFICATION] Load Paygroup Success',

  LOAD_GRADE = '[MY REBOARDING DATA - IDENTIFICATION] Load Grade',
  LOAD_GRADE_SUCCESS = '[MY REBOARDING DATA - IDENTIFICATION] Load Grade Success',

  LOAD_POSITION = '[MY REBOARDING DATA - IDENTIFICATION] Load Position',
  LOAD_POSITION_SUCCESS = '[MY REBOARDING DATA - IDENTIFICATION] Load Position Success',

  SAVE = '[MY REBOARDING DATA - IDENTIFICATION] Save',
  UPDATE = '[MY REBOARDING DATA - IDENTIFICATION] Save Update',
}

export class ShowEditorReboardIdentification implements Action {
  readonly type = ReboardIdentificationActionTypes.SHOW_EDITOR;
}

export class HideEditorReboardIdentification implements Action {
  readonly type = ReboardIdentificationActionTypes.HIDE_EDITOR;
}

export class ShowViewerReboardIdentification implements Action {
  readonly type = ReboardIdentificationActionTypes.SHOW_VIEWER;
}

export class HideViewerReboardIdentification implements Action {
  readonly type = ReboardIdentificationActionTypes.HIDE_VIEWER;
}

export class ProcessingReboardIdentification implements Action {
  readonly type =ReboardIdentificationActionTypes.PROCESSING;
}

export class NotProcessingReboardIdentification implements Action {
  readonly type = ReboardIdentificationActionTypes.NOT_PROCESSING;
}

export class LoadingReboardIdentification implements Action {
  readonly type =ReboardIdentificationActionTypes.LOADING;
}

export class NotLoadingReboardIdentification implements Action {
  readonly type = ReboardIdentificationActionTypes.NOT_LOADING;
}

export class LoadDataReboardIdentification implements Action {
  readonly type = ReboardIdentificationActionTypes.LOAD_DATA;
}

export class LoadDataReboardIdentificationSuccess implements Action {
  readonly type = ReboardIdentificationActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IIdentification) {}
}

export class LoadSignatureImageReboardIdentification implements Action {
  readonly type =ReboardIdentificationActionTypes.LOAD_SIGNATURE_IMAGE;
}

export class LoadSignatureImageReboardIdentificationSuccess implements Action {
  readonly type = ReboardIdentificationActionTypes.LOAD_SIGNATURE_IMAGE_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadPaygroupDataReboardIdentification implements Action {
  readonly type = ReboardIdentificationActionTypes.LOAD_PAYGROUP;

  constructor(public payload: {gradeId: number}) {}
}

export class LoadPaygroupDataReboardIdentificationSuccess implements Action {
  readonly type = ReboardIdentificationActionTypes.LOAD_PAYGROUP_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadGradeDataReboardIdentification implements Action {
  readonly type = ReboardIdentificationActionTypes.LOAD_GRADE;

  constructor() {}
}

export class LoadGradeDataReboardIdentificationSuccess implements Action {
  readonly type = ReboardIdentificationActionTypes.LOAD_GRADE_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadPositionDataReboardIdentification implements Action {
  readonly type = ReboardIdentificationActionTypes.LOAD_POSITION;

  constructor() {}
}

export class LoadPositionDataReboardIdentificationSuccess implements Action {
  readonly type = ReboardIdentificationActionTypes.LOAD_POSITION_SUCCESS;

  constructor(public payload: any) {}
}

export class SaveReboardIdentification implements Action {
  readonly type = ReboardIdentificationActionTypes.SAVE;

  constructor(public payload: IIdentification) {}
}

export class SaveUpdateReboardIdentification implements Action {
  readonly type = ReboardIdentificationActionTypes.UPDATE;

  constructor(public payload: {data: IIdentification, recordId: number}) {}
}

export type ReboardIdentificationActions =
  | ShowEditorReboardIdentification
  | HideEditorReboardIdentification
  | ShowViewerReboardIdentification
  | HideViewerReboardIdentification
  | ProcessingReboardIdentification
  | NotProcessingReboardIdentification
  | LoadingReboardIdentification
  | NotLoadingReboardIdentification
  | LoadDataReboardIdentification
  | LoadDataReboardIdentificationSuccess
  | LoadSignatureImageReboardIdentification
  | LoadSignatureImageReboardIdentificationSuccess
  | SaveReboardIdentification
  | SaveUpdateReboardIdentification
  | LoadGradeDataReboardIdentification
  | LoadGradeDataReboardIdentificationSuccess
  | LoadPaygroupDataReboardIdentification
  | LoadPaygroupDataReboardIdentificationSuccess
  | LoadPositionDataReboardIdentification
  | LoadPositionDataReboardIdentificationSuccess
