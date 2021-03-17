import { Action } from '@ngrx/store';

import { IExempt, IPlan } from '@nutela/models/talent/performance';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';
import { IAnalysis, IAnalysisDetail, IPosition, IDesignation, IGrade } from '@nutela/models/workforce/personnel';

export enum ExemptActionTypes {
  SHOW_EDITOR = '[PERFORMANCE SETUPS EXEMPTS] Show Editor',
  HIDE_EDITOR = '[PERFORMANCE SETUPS EXEMPTS] Hide Editor',

  SHOW_VIEWER = '[PERFORMANCE SETUPS EXEMPTS] Show Viewer',
  HIDE_VIEWER = '[PERFORMANCE SETUPS EXEMPTS] Hide Viewer',

  PROCESSING = '[PERFORMANCE SETUPS EXEMPTS] Processing',
  NOT_PROCESSING = '[PERFORMANCE SETUPS EXEMPTS] Not Processing',

  LOAD_DATA = '[PERFORMANCE SETUPS EXEMPTS] Load Data',
  LOAD_DATA_SUCCESS = '[PERFORMANCE SETUPS EXEMPTS] Load Data Success',

  LOAD_PLAN_LIST = '[PERFORMANCE SETUPS EXEMPTS] Load Plan List',
  LOAD_PLAN_LIST_SUCCESS = '[PERFORMANCE SETUPS EXEMPTS] Load Plan List Success',

  LOAD_DOCUMENT = '[PERFORMANCE SETUPS EXEMPTS] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[PERFORMANCE SETUPS EXEMPTS] Load Document Success',
  CLEAR_DOCUMENT = '[PERFORMANCE SETUPS EXEMPTS] Clear Document',

  LOAD_INLINE_DOCUMENT = '[PERFORMANCE SETUPS EXEMPTS] Load Inline Document',

  SAVE = '[PERFORMANCE SETUPS EXEMPTS] Save',
  SAVE_SUCCESS = '[PERFORMANCE SETUPS EXEMPTS] Save Success',

  ADD = '[PERFORMANCE SETUPS EXEMPTS] Add',
  ADD_SUCCESS = '[PERFORMANCE SETUPS EXEMPTS] Add Success',

  DELETE_DATA = '[PERFORMANCE SETUPS EXEMPTS] Delete Data',

  REMOVE_DATA = '[PERFORMANCE SETUPS EXEMPTS] Remove Data',

  LOAD_ANALYSIS_LIST = '[PERFORMANCE SETUPS EXEMPTS] Load Analysis List',
  LOAD_ANALYSIS_LIST_SUCCESS = '[PERFORMANCE SETUPS EXEMPTS] Load Analysis List Success',

  LOAD_ANALYSIS_DETAIL_LIST = '[PERFORMANCE SETUPS EXEMPTS] Load Analysis Detail List',
  LOAD_ANALYSIS_DETAIL_LIST_SUCCESS = '[PERFORMANCE SETUPS EXEMPTS] Load Analysis Detail List Success',

  LOAD_POSITION_LIST = '[PERFORMANCE SETUPS EXEMPTS] Load Position List',
  LOAD_POSITION_LIST_SUCCESS = '[PERFORMANCE SETUPS EXEMPTS] Load Position List Success',

  LOAD_DESIGNATION_LIST = '[PERFORMANCE SETUPS EXEMPTS] Load Designation List',
  LOAD_DESIGNATION_LIST_SUCCESS = '[PERFORMANCE SETUPS EXEMPTS] Load Designation List Success',

  LOAD_GRADE_LIST = '[PERFORMANCE SETUPS EXEMPTS] Load Grade List',
  LOAD_GRADE_LIST_SUCCESS = '[PERFORMANCE SETUPS EXEMPTS] Load Grade List Success',

  LOAD_EMPLOYEE_LIST = '[PERFORMANCE SETUPS EXEMPTS] Load Employee List',
  LOAD_EMPLOYEE_LIST_SUCCESS = '[PERFORMANCE SETUPS EXEMPTS] Load Employee List Success',

}

export class ShowEditorExempt implements Action {
  readonly type = ExemptActionTypes.SHOW_EDITOR;
}

export class HideEditorExempt implements Action {
  readonly type = ExemptActionTypes.HIDE_EDITOR;
}


export class ShowViewerExempt implements Action {
  readonly type = ExemptActionTypes.SHOW_VIEWER;
}

export class HideViewerExempt implements Action {
  readonly type = ExemptActionTypes.HIDE_VIEWER;
}


export class ProcessingExempt implements Action {
  readonly type = ExemptActionTypes.PROCESSING;
}

export class NotProcessingExempt implements Action {
  readonly type = ExemptActionTypes.NOT_PROCESSING;
}


export class LoadDataExempt implements Action {
  readonly type = ExemptActionTypes.LOAD_DATA;
}

export class LoadDataExemptSuccess implements Action {
  readonly type = ExemptActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IExempt[]) {}
}

export class LoadPlanListExempt implements Action {
  readonly type = ExemptActionTypes.LOAD_PLAN_LIST;
}

export class LoadPlanListExemptSuccess implements Action {
  readonly type = ExemptActionTypes.LOAD_PLAN_LIST_SUCCESS;

  constructor(public payload: IPlan[]) {}
}

export class LoadDocumentExempt implements Action {
  readonly type = ExemptActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentExemptSuccess implements Action {
  readonly type = ExemptActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentExempt implements Action {
  readonly type = ExemptActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentExempt implements Action {
  readonly type = ExemptActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}


export class SaveExempt implements Action {
  readonly type = ExemptActionTypes.SAVE;

  constructor(public payload: {data: IExempt, recordId: number, editMode: boolean}) {}
}

export class AddExempt implements Action {
  readonly type = ExemptActionTypes.ADD;

  constructor(public payload: {data: IExempt}) {}
}


export class DeleteDataExempt implements Action {
  readonly type = ExemptActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number}) {}
}

export class RemoveDataExempt implements Action {
  readonly type = ExemptActionTypes.REMOVE_DATA;

  constructor(public payload: {recordId: number}) {}
}


export class LoadAnalysisListExempt implements Action {
  readonly type = ExemptActionTypes.LOAD_ANALYSIS_LIST;
}

export class LoadAnalysisListExemptSuccess implements Action {
  readonly type = ExemptActionTypes.LOAD_ANALYSIS_LIST_SUCCESS;

  constructor(public payload: IAnalysis[]) {}
}

export class LoadAnalysisDetListExempt implements Action {
  readonly type = ExemptActionTypes.LOAD_ANALYSIS_DETAIL_LIST;
  constructor(public payload: number) {}
}

export class LoadAnalysisDetListExemptSuccess implements Action {
  readonly type = ExemptActionTypes.LOAD_ANALYSIS_DETAIL_LIST_SUCCESS;

  constructor(public payload: IAnalysisDetail[]) {}
}

export class LoadPositionListExempt implements Action {
  readonly type = ExemptActionTypes.LOAD_POSITION_LIST;
}

export class LoadPositionListExemptSuccess implements Action {
  readonly type = ExemptActionTypes.LOAD_POSITION_LIST_SUCCESS;

  constructor(public payload: IPosition[]) {}
}

export class LoadDesignationListExempt implements Action {
  readonly type = ExemptActionTypes.LOAD_DESIGNATION_LIST;
}

export class LoadDesignationListExemptSuccess implements Action {
  readonly type = ExemptActionTypes.LOAD_DESIGNATION_LIST_SUCCESS;

  constructor(public payload: IDesignation[]) {}
}

export class LoadGradeListExempt implements Action {
  readonly type = ExemptActionTypes.LOAD_GRADE_LIST;
}

export class LoadGradeListExemptSuccess implements Action {
  readonly type = ExemptActionTypes.LOAD_GRADE_LIST_SUCCESS;

  constructor(public payload: IGrade[]) {}
}

export class LoadEmployeeListExempt implements Action {
  readonly type = ExemptActionTypes.LOAD_EMPLOYEE_LIST;
}

export class LoadEmployeeListExemptSuccess implements Action {
  readonly type = ExemptActionTypes.LOAD_EMPLOYEE_LIST_SUCCESS;

  constructor(public payload: IPersonal[]) {}
}

export type ExemptActions =
  | ShowEditorExempt
  | HideEditorExempt
  | ShowViewerExempt
  | HideViewerExempt
  | ProcessingExempt
  | NotProcessingExempt
  | LoadDataExempt
  | LoadDataExemptSuccess
  | LoadPlanListExempt
  | LoadPlanListExemptSuccess
  | LoadDocumentExempt
  | LoadDocumentExemptSuccess
  | ClearDocumentExempt
  | LoadInlineDocumentExempt
  | SaveExempt
  | AddExempt
  | DeleteDataExempt
  | RemoveDataExempt
  | LoadAnalysisListExempt
  | LoadAnalysisListExemptSuccess
  | LoadAnalysisDetListExempt
  | LoadAnalysisDetListExemptSuccess
  | LoadPositionListExempt
  | LoadPositionListExemptSuccess
  | LoadDesignationListExempt
  | LoadDesignationListExemptSuccess
  | LoadGradeListExempt
  | LoadGradeListExemptSuccess
  | LoadEmployeeListExempt
  | LoadEmployeeListExemptSuccess;
