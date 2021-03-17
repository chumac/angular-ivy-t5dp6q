import { Action } from '@ngrx/store';

import { IEcosystem360, IPlan } from '@nutela/models/talent/performance';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';

export enum Ecosystem360ActionTypes {
  SHOW_EDITOR = '[PERFORMANCE SETUPS ECOSYSTEM360S] Show Editor',
  HIDE_EDITOR = '[PERFORMANCE SETUPS ECOSYSTEM360S] Hide Editor',

  SHOW_VIEWER = '[PERFORMANCE SETUPS ECOSYSTEM360S] Show Viewer',
  HIDE_VIEWER = '[PERFORMANCE SETUPS ECOSYSTEM360S] Hide Viewer',

  PROCESSING = '[PERFORMANCE SETUPS ECOSYSTEM360S] Processing',
  NOT_PROCESSING = '[PERFORMANCE SETUPS ECOSYSTEM360S] Not Processing',

  PROCESSING_GRID = '[PERFORMANCE SETUPS ECOSYSTEM360S] Processing Grid',
  NOT_PROCESSING_GRID = '[PERFORMANCE SETUPS ECOSYSTEM360S] Not Processing Grid',

  PROCESSING_UPLOAD = '[PERFORMANCE SETUPS ECOSYSTEM360S] Processing Upload',
  NOT_PROCESSING_UPLOAD = '[PERFORMANCE SETUPS ECOSYSTEM360S] Not Processing Upload',

  LOAD_DATA = '[PERFORMANCE SETUPS ECOSYSTEM360S] Load Data',
  LOAD_DATA_SUCCESS = '[PERFORMANCE SETUPS ECOSYSTEM360S] Load Data Success',

  LOAD_PLAN_LIST = '[PERFORMANCE SETUPS ECOSYSTEM360S] Load Plan List',
  LOAD_PLAN_LIST_SUCCESS = '[PERFORMANCE SETUPS ECOSYSTEM360S] Load Plan List Success',

  LOAD_EMPLOYEE_LIST = '[PERFORMANCE SETUPS ECOSYSTEM360S] Load Employee List',
  LOAD_EMPLOYEE_LIST_SUCCESS = '[PERFORMANCE SETUPS ECOSYSTEM360S] Load Employee List Success',

  LOAD_DOCUMENT = '[PERFORMANCE SETUPS ECOSYSTEM360S] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[PERFORMANCE SETUPS ECOSYSTEM360S] Load Document Success',
  CLEAR_DOCUMENT = '[PERFORMANCE SETUPS ECOSYSTEM360S] Clear Document',

  LOAD_INLINE_DOCUMENT = '[PERFORMANCE SETUPS ECOSYSTEM360S] Load Inline Document',

  SAVE = '[PERFORMANCE SETUPS ECOSYSTEM360S] Save',
  SAVE_SUCCESS = '[PERFORMANCE SETUPS ECOSYSTEM360S] Save Success',

  ADD = '[PERFORMANCE SETUPS ECOSYSTEM360S] Add',
  ADD_SUCCESS = '[PERFORMANCE SETUPS ECOSYSTEM360S] Add Success',

  DELETE_DATA = '[PERFORMANCE SETUPS ECOSYSTEM360S] Delete Data',

  REMOVE_DATA = '[PERFORMANCE SETUPS ECOSYSTEM360S] Remove Data',

}

export class ShowEditorEcosystem360 implements Action {
  readonly type = Ecosystem360ActionTypes.SHOW_EDITOR;
}

export class HideEditorEcosystem360 implements Action {
  readonly type = Ecosystem360ActionTypes.HIDE_EDITOR;
}


export class ShowViewerEcosystem360 implements Action {
  readonly type = Ecosystem360ActionTypes.SHOW_VIEWER;
}

export class HideViewerEcosystem360 implements Action {
  readonly type = Ecosystem360ActionTypes.HIDE_VIEWER;
}


export class ProcessingEcosystem360 implements Action {
  readonly type = Ecosystem360ActionTypes.PROCESSING;
}

export class NotProcessingEcosystem360 implements Action {
  readonly type = Ecosystem360ActionTypes.NOT_PROCESSING;
}

export class ProcessingGridEcosystem360 implements Action {
  readonly type = Ecosystem360ActionTypes.PROCESSING_GRID;
}

export class NotProcessingGridEcosystem360 implements Action {
  readonly type = Ecosystem360ActionTypes.NOT_PROCESSING_GRID;
}

export class ProcessingUploadEcosystem360 implements Action {
  readonly type = Ecosystem360ActionTypes.PROCESSING_UPLOAD;
}

export class NotProcessingUploadEcosystem360 implements Action {
  readonly type = Ecosystem360ActionTypes.NOT_PROCESSING_UPLOAD;
}


export class LoadDataEcosystem360 implements Action {
  readonly type = Ecosystem360ActionTypes.LOAD_DATA;
  constructor(public payload: {planId: number, employeeId: number}) {}
}

export class LoadDataEcosystem360Success implements Action {
  readonly type = Ecosystem360ActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IEcosystem360[]) {}
}

export class LoadPlanListEcosystem360 implements Action {
  readonly type = Ecosystem360ActionTypes.LOAD_PLAN_LIST;
}

export class LoadPlanListEcosystem360Success implements Action {
  readonly type = Ecosystem360ActionTypes.LOAD_PLAN_LIST_SUCCESS;

  constructor(public payload: IPlan[]) {}
}

export class LoadEmployeeListEcosystem360 implements Action {
  readonly type = Ecosystem360ActionTypes.LOAD_EMPLOYEE_LIST;
}

export class LoadEmployeeListEcosystem360Success implements Action {
  readonly type = Ecosystem360ActionTypes.LOAD_EMPLOYEE_LIST_SUCCESS;

  constructor(public payload: IPersonal[]) {}
}


export class LoadDocumentEcosystem360 implements Action {
  readonly type = Ecosystem360ActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentEcosystem360Success implements Action {
  readonly type = Ecosystem360ActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentEcosystem360 implements Action {
  readonly type = Ecosystem360ActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentEcosystem360 implements Action {
  readonly type = Ecosystem360ActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}


export class SaveEcosystem360 implements Action {
  readonly type = Ecosystem360ActionTypes.SAVE;

  constructor(public payload: {data: IEcosystem360, recordId: number, editMode: boolean}) {}
}

export class AddEcosystem360 implements Action {
  readonly type = Ecosystem360ActionTypes.ADD;

  constructor(public payload: {data: IEcosystem360}) {}
}


export class DeleteDataEcosystem360 implements Action {
  readonly type = Ecosystem360ActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number, planId: number, employeeId: number}) {}
}


export class RemoveDataEcosystem360 implements Action {
  readonly type = Ecosystem360ActionTypes.REMOVE_DATA;

  constructor(public payload: {recordId: number}) {}
}

export type Ecosystem360Actions =
  | ShowEditorEcosystem360
  | HideEditorEcosystem360
  | ShowViewerEcosystem360
  | HideViewerEcosystem360
  | ProcessingEcosystem360
  | NotProcessingEcosystem360
  | ProcessingGridEcosystem360
  | NotProcessingGridEcosystem360
  | ProcessingUploadEcosystem360
  | NotProcessingUploadEcosystem360
  | LoadDataEcosystem360
  | LoadDataEcosystem360Success
  | LoadPlanListEcosystem360
  | LoadPlanListEcosystem360Success
  | LoadEmployeeListEcosystem360
  | LoadEmployeeListEcosystem360Success
  | LoadDocumentEcosystem360
  | LoadDocumentEcosystem360Success
  | ClearDocumentEcosystem360
  | LoadInlineDocumentEcosystem360
  | SaveEcosystem360
  | AddEcosystem360
  | DeleteDataEcosystem360
  | RemoveDataEcosystem360;
