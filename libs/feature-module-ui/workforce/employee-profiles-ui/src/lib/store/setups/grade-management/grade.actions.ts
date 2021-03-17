import { Action } from '@ngrx/store';
import { IGradeManagement } from '@nutela/models/workforce/employee-profiles';

export enum GradeManagementActionTypes {
  SHOW_EDITOR = '[HR_TRANSACTION SETUPS - GRADE_MANAGEMENT] Show Editor',
  HIDE_EDITOR = '[HR_TRANSACTION SETUPS - GRADE_MANAGEMENT] Hide Editor',

  SHOW_VIEWER = '[HR_TRANSACTION SETUPS - GRADE_MANAGEMENT] Show Viewer',
  HIDE_VIEWER = '[HR_TRANSACTION SETUPS - GRADE_MANAGEMENT] Hide Viewer',

  PROCESSING = '[HR_TRANSACTION SETUPS - GRADE_MANAGEMENT] Processing',
  NOT_PROCESSING = '[HR_TRANSACTION SETUPS - GRADE_MANAGEMENT] Not Processing',

  LOADING = '[HR_TRANSACTION SETUPS - GRADE_MANAGEMENT] Loading',
  NOT_LOADING = '[HR_TRANSACTION SETUPS - GRADE_MANAGEMENT] Not Loading',

  LOAD_DATA = '[HR_TRANSACTION SETUPS - GRADE_MANAGEMENT] Load Data',
  LOAD_DATA_SUCCESS = '[HR_TRANSACTION SETUPS - GRADE_MANAGEMENT] Load Data Success',

  ADD = '[HR_TRANSACTION SETUPS - GRADE_MANAGEMENT] Add',
  ADD_SUCCESS = '[HR_TRANSACTION SETUPS - GRADE_MANAGEMENT] Add Success',

  SAVE = '[HR_TRANSACTION SETUPS - GRADE_MANAGEMENT] Save',

  UPDATE = '[HR_TRANSACTION SETUPS - GRADE_MANAGEMENT] Save Update',

  DELETE_DATA = '[HR_TRANSACTION SETUPS - GRADE_MANAGEMENT] Delete Data',
}

export class ShowEditorGradeManagement implements Action {
  readonly type = GradeManagementActionTypes.SHOW_EDITOR;
}

export class HideEditorGradeManagement implements Action {
  readonly type = GradeManagementActionTypes.HIDE_EDITOR;
}


export class ShowViewerGradeManagement implements Action {
  readonly type = GradeManagementActionTypes.SHOW_VIEWER;
}

export class HideViewerGradeManagement implements Action {
  readonly type = GradeManagementActionTypes.HIDE_VIEWER;
}


export class ProcessingGradeManagement implements Action {
  readonly type = GradeManagementActionTypes.PROCESSING;
}

export class NotProcessingGradeManagement implements Action {
  readonly type = GradeManagementActionTypes.NOT_PROCESSING;
}

export class LoadingGradeManagement implements Action {
  readonly type = GradeManagementActionTypes.LOADING;
}

export class NotLoadingGradeManagement implements Action {
  readonly type = GradeManagementActionTypes.NOT_LOADING;
}


export class LoadDataGradeManagement implements Action {
  readonly type = GradeManagementActionTypes.LOAD_DATA;
}

export class LoadDataGradeManagementSuccess implements Action {
  readonly type = GradeManagementActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IGradeManagement[]) {}
}

export class AddGradeManagement implements Action {
  readonly type = GradeManagementActionTypes.ADD;

  constructor(public payload: {data: IGradeManagement }) {}
}

export class SaveGradeManagement implements Action {
  readonly type = GradeManagementActionTypes.SAVE;

  constructor(public payload: {data: IGradeManagement }) {}
}

export class UpdateGradeManagement implements Action {
  readonly type = GradeManagementActionTypes.UPDATE;

  constructor(public payload: {data: IGradeManagement , recordId: number}) {}
}

export class DeleteDataGradeManagement implements Action {
  readonly type = GradeManagementActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number}) {}
}


export type GradeManagementActions =
  | ShowEditorGradeManagement
  | HideEditorGradeManagement
  | ShowViewerGradeManagement
  | HideViewerGradeManagement
  | ProcessingGradeManagement
  | NotProcessingGradeManagement
  | LoadDataGradeManagement
  | LoadDataGradeManagementSuccess
  | LoadingGradeManagement
  | NotLoadingGradeManagement
  | SaveGradeManagement
  | UpdateGradeManagement
  | AddGradeManagement
  | DeleteDataGradeManagement;
