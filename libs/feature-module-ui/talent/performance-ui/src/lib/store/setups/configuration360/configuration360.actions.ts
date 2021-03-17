import { Action } from '@ngrx/store';

import { IConfiguration360, IPlan } from '@nutela/models/talent/performance';
import { IAnalysis, IAnalysisDetail, IPosition, IDesignation, IGrade } from '@nutela/models/workforce/personnel';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';
import { ISelectOption } from '@nutela/models/core-data';

export enum Configuration360ActionTypes {
  SHOW_EDITOR = '[PERFORMANCE SETUPS CONFIGURATION360S] Show Editor',
  HIDE_EDITOR = '[PERFORMANCE SETUPS CONFIGURATION360S] Hide Editor',

  SHOW_VIEWER = '[PERFORMANCE SETUPS CONFIGURATION360S] Show Viewer',
  HIDE_VIEWER = '[PERFORMANCE SETUPS CONFIGURATION360S] Hide Viewer',

  PROCESSING = '[PERFORMANCE SETUPS CONFIGURATION360S] Processing',
  NOT_PROCESSING = '[PERFORMANCE SETUPS CONFIGURATION360S] Not Processing',

  LOAD_DATA = '[PERFORMANCE SETUPS CONFIGURATION360S] Load Data',
  LOAD_DATA_SUCCESS = '[PERFORMANCE SETUPS CONFIGURATION360S] Load Data Success',

  LOAD_DOCUMENT = '[PERFORMANCE SETUPS CONFIGURATION360S] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[PERFORMANCE SETUPS CONFIGURATION360S] Load Document Success',
  CLEAR_DOCUMENT = '[PERFORMANCE SETUPS CONFIGURATION360S] Clear Document',

  LOAD_INLINE_DOCUMENT = '[PERFORMANCE SETUPS CONFIGURATION360S] Load Inline Document',

  SAVE = '[PERFORMANCE SETUPS CONFIGURATION360S] Save',
  SAVE_SUCCESS = '[PERFORMANCE SETUPS CONFIGURATION360S] Save Success',

  ADD = '[PERFORMANCE SETUPS CONFIGURATION360S] Add',
  ADD_SUCCESS = '[PERFORMANCE SETUPS CONFIGURATION360S] Add Success',

  DELETE_DATA = '[PERFORMANCE SETUPS CONFIGURATION360S] Delete Data',

  REMOVE_DATA = '[PERFORMANCE SETUPS CONFIGURATION360S] Remove Data',

  LOAD_PLAN_LIST = '[PERFORMANCE SETUPS CONFIGURATION360S] Load Plan List',
  LOAD_PLAN_LIST_SUCCESS = '[PERFORMANCE SETUPS CONFIGURATION360S] Load Plan List Success',

  LOAD_ANALYSIS_LIST = '[PERFORMANCE SETUPS CONFIGURATION360S] Load Analysis List',
  LOAD_ANALYSIS_LIST_SUCCESS = '[PERFORMANCE SETUPS CONFIGURATION360S] Load Analysis List Success',

  LOAD_ANALYSIS_DETAIL_LIST = '[PERFORMANCE SETUPS CONFIGURATION360S] Load Analysis Detail List',
  LOAD_ANALYSIS_DETAIL_LIST_SUCCESS = '[PERFORMANCE SETUPS CONFIGURATION360S] Load Analysis Detail List Success',

  LOAD_POSITION_LIST = '[PERFORMANCE SETUPS CONFIGURATION360S] Load Position List',
  LOAD_POSITION_LIST_SUCCESS = '[PERFORMANCE SETUPS CONFIGURATION360S] Load Position List Success',

  LOAD_DESIGNATION_LIST = '[PERFORMANCE SETUPS CONFIGURATION360S] Load Designation List',
  LOAD_DESIGNATION_LIST_SUCCESS = '[PERFORMANCE SETUPS CONFIGURATION360S] Load Designation List Success',

  LOAD_GRADE_LIST = '[PERFORMANCE SETUPS CONFIGURATION360S] Load Grade List',
  LOAD_GRADE_LIST_SUCCESS = '[PERFORMANCE SETUPS CONFIGURATION360S] Load Grade List Success',

  LOAD_EMPLOYEE_LIST = '[PERFORMANCE SETUPS CONFIGURATION360S] Load Employee List',
  LOAD_EMPLOYEE_LIST_SUCCESS = '[PERFORMANCE SETUPS CONFIGURATION360S] Load Employee List Success',

}

export class ShowEditorConfiguration360 implements Action {
  readonly type = Configuration360ActionTypes.SHOW_EDITOR;
}

export class HideEditorConfiguration360 implements Action {
  readonly type = Configuration360ActionTypes.HIDE_EDITOR;
}


export class ShowViewerConfiguration360 implements Action {
  readonly type = Configuration360ActionTypes.SHOW_VIEWER;
}

export class HideViewerConfiguration360 implements Action {
  readonly type = Configuration360ActionTypes.HIDE_VIEWER;
}


export class ProcessingConfiguration360 implements Action {
  readonly type = Configuration360ActionTypes.PROCESSING;
}

export class NotProcessingConfiguration360 implements Action {
  readonly type = Configuration360ActionTypes.NOT_PROCESSING;
}


export class LoadDataConfiguration360 implements Action {
  readonly type = Configuration360ActionTypes.LOAD_DATA;
}

export class LoadDataConfiguration360Success implements Action {
  readonly type = Configuration360ActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IConfiguration360[]) {}
}


export class LoadDocumentConfiguration360 implements Action {
  readonly type = Configuration360ActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentConfiguration360Success implements Action {
  readonly type = Configuration360ActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentConfiguration360 implements Action {
  readonly type = Configuration360ActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentConfiguration360 implements Action {
  readonly type = Configuration360ActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}


export class SaveConfiguration360 implements Action {
  readonly type = Configuration360ActionTypes.SAVE;

  constructor(public payload: {data: IConfiguration360, recordId: number, editMode: boolean}) {}
}

export class AddConfiguration360 implements Action {
  readonly type = Configuration360ActionTypes.ADD;

  constructor(public payload: {data: IConfiguration360}) {}
}


export class DeleteDataConfiguration360 implements Action {
  readonly type = Configuration360ActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number}) {}
}


export class RemoveDataConfiguration360 implements Action {
  readonly type = Configuration360ActionTypes.REMOVE_DATA;
  constructor(public payload: {recordId: number}) {}
}

export class LoadPlanListConfiguration360 implements Action {
  readonly type = Configuration360ActionTypes.LOAD_PLAN_LIST;
}

export class LoadPlanListConfiguration360Success implements Action {
  readonly type = Configuration360ActionTypes.LOAD_PLAN_LIST_SUCCESS;

  constructor(public payload: IPlan[]) {}
}


export class LoadAnalysisListConfiguration360 implements Action {
  readonly type = Configuration360ActionTypes.LOAD_ANALYSIS_LIST;
}

export class LoadAnalysisListConfiguration360Success implements Action {
  readonly type = Configuration360ActionTypes.LOAD_ANALYSIS_LIST_SUCCESS;

  constructor(public payload: IAnalysis[]) {}
}

export class LoadAnalysisDetListConfiguration360 implements Action {
  readonly type = Configuration360ActionTypes.LOAD_ANALYSIS_DETAIL_LIST;
  constructor(public payload: number) {}

}

export class LoadAnalysisDetListConfiguration360Success implements Action {
  readonly type = Configuration360ActionTypes.LOAD_ANALYSIS_DETAIL_LIST_SUCCESS;

  constructor(public payload: IAnalysisDetail[]) {}
}

export class LoadPositionListConfiguration360 implements Action {
  readonly type = Configuration360ActionTypes.LOAD_POSITION_LIST;
}

export class LoadPositionListConfiguration360Success implements Action {
  readonly type = Configuration360ActionTypes.LOAD_POSITION_LIST_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadDesignationListConfiguration360 implements Action {
  readonly type = Configuration360ActionTypes.LOAD_DESIGNATION_LIST;
}

export class LoadDesignationListConfiguration360Success implements Action {
  readonly type = Configuration360ActionTypes.LOAD_DESIGNATION_LIST_SUCCESS;

  constructor(public payload: IDesignation[]) {}
}

export class LoadGradeListConfiguration360 implements Action {
  readonly type = Configuration360ActionTypes.LOAD_GRADE_LIST;
}

export class LoadGradeListConfiguration360Success implements Action {
  readonly type = Configuration360ActionTypes.LOAD_GRADE_LIST_SUCCESS;

  constructor(public payload: IGrade[]) {}
}

export class LoadEmployeeListConfiguration360 implements Action {
  readonly type = Configuration360ActionTypes.LOAD_EMPLOYEE_LIST;
}

export class LoadEmployeeListConfiguration360Success implements Action {
  readonly type = Configuration360ActionTypes.LOAD_EMPLOYEE_LIST_SUCCESS;

  constructor(public payload: IPersonal[]) {}
}

export type Configuration360Actions =
  | ShowEditorConfiguration360
  | HideEditorConfiguration360
  | ShowViewerConfiguration360
  | HideViewerConfiguration360
  | ProcessingConfiguration360
  | NotProcessingConfiguration360
  | LoadDataConfiguration360
  | LoadDataConfiguration360Success
  | LoadDocumentConfiguration360
  | LoadDocumentConfiguration360Success
  | ClearDocumentConfiguration360
  | LoadInlineDocumentConfiguration360
  | SaveConfiguration360
  | AddConfiguration360
  | DeleteDataConfiguration360
  | RemoveDataConfiguration360
  | LoadPlanListConfiguration360
  | LoadPlanListConfiguration360Success
  | LoadAnalysisListConfiguration360
  | LoadAnalysisListConfiguration360Success
  | LoadAnalysisDetListConfiguration360
  | LoadAnalysisDetListConfiguration360Success
  | LoadPositionListConfiguration360
  | LoadPositionListConfiguration360Success
  | LoadDesignationListConfiguration360
  | LoadDesignationListConfiguration360Success
  | LoadGradeListConfiguration360
  | LoadGradeListConfiguration360Success
  | LoadEmployeeListConfiguration360
  | LoadEmployeeListConfiguration360Success;
