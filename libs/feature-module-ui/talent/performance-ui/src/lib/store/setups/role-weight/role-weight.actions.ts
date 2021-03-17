import { Action } from '@ngrx/store';

import { IRoleWeight } from '@nutela/models/talent/performance';
import { IAnalysis, IAnalysisDetail, IPosition, IDesignation, IGrade } from '@nutela/models/workforce/personnel';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';

export enum RoleWeightActionTypes {
  SHOW_EDITOR = '[PERFORMANCE SETUPS ROLE_WEIGHTS] Show Editor',
  HIDE_EDITOR = '[PERFORMANCE SETUPS ROLE_WEIGHTS] Hide Editor',

  SHOW_VIEWER = '[PERFORMANCE SETUPS ROLE_WEIGHTS] Show Viewer',
  HIDE_VIEWER = '[PERFORMANCE SETUPS ROLE_WEIGHTS] Hide Viewer',

  PROCESSING = '[PERFORMANCE SETUPS ROLE_WEIGHTS] Processing',
  NOT_PROCESSING = '[PERFORMANCE SETUPS ROLE_WEIGHTS] Not Processing',

  LOAD_DATA = '[PERFORMANCE SETUPS ROLE_WEIGHTS] Load Data',
  LOAD_DATA_SUCCESS = '[PERFORMANCE SETUPS ROLE_WEIGHTS] Load Data Success',

  LOAD_DOCUMENT = '[PERFORMANCE SETUPS ROLE_WEIGHTS] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[PERFORMANCE SETUPS ROLE_WEIGHTS] Load Document Success',
  CLEAR_DOCUMENT = '[PERFORMANCE SETUPS ROLE_WEIGHTS] Clear Document',

  LOAD_INLINE_DOCUMENT = '[PERFORMANCE SETUPS ROLE_WEIGHTS] Load Inline Document',

  SAVE = '[PERFORMANCE SETUPS ROLE_WEIGHTS] Save',
  SAVE_SUCCESS = '[PERFORMANCE SETUPS ROLE_WEIGHTS] Save Success',

  ADD = '[PERFORMANCE SETUPS ROLE_WEIGHTS] Add',
  ADD_SUCCESS = '[PERFORMANCE SETUPS ROLE_WEIGHTS] Add Success',

  DELETE_DATA = '[PERFORMANCE SETUPS ROLE_WEIGHTS] Delete Data',

  REMOVE_DATA = '[PERFORMANCE SETUPS ROLE_WEIGHTS] Remove Data',

  LOAD_ANALYSIS_LIST = '[PERFORMANCE SETUPS ROLE_WEIGHTS] Load Analysis List',
  LOAD_ANALYSIS_LIST_SUCCESS = '[PERFORMANCE SETUPS ROLE_WEIGHTS] Load Analysis List Success',

  LOAD_ANALYSIS_DETAIL_LIST = '[PERFORMANCE SETUPS ROLE_WEIGHTS] Load Analysis Detail List',
  LOAD_ANALYSIS_DETAIL_LIST_SUCCESS = '[PERFORMANCE SETUPS ROLE_WEIGHTS] Load Analysis Detail List Success',

  LOAD_POSITION_LIST = '[PERFORMANCE SETUPS ROLE_WEIGHTS] Load Position List',
  LOAD_POSITION_LIST_SUCCESS = '[PERFORMANCE SETUPS ROLE_WEIGHTS] Load Position List Success',

  LOAD_DESIGNATION_LIST = '[PERFORMANCE SETUPS ROLE_WEIGHTS] Load Designation List',
  LOAD_DESIGNATION_LIST_SUCCESS = '[PERFORMANCE SETUPS ROLE_WEIGHTS] Load Designation List Success',

  LOAD_GRADE_LIST = '[PERFORMANCE SETUPS ROLE_WEIGHTS] Load Grade List',
  LOAD_GRADE_LIST_SUCCESS = '[PERFORMANCE SETUPS ROLE_WEIGHTS] Load Grade List Success',

  LOAD_EMPLOYEE_LIST = '[PERFORMANCE SETUPS ROLE_WEIGHTS] Load Employee List',
  LOAD_EMPLOYEE_LIST_SUCCESS = '[PERFORMANCE SETUPS ROLE_WEIGHTS] Load Employee List Success',

}

export class ShowEditorRoleWeight implements Action {
  readonly type = RoleWeightActionTypes.SHOW_EDITOR;
}

export class HideEditorRoleWeight implements Action {
  readonly type = RoleWeightActionTypes.HIDE_EDITOR;
}


export class ShowViewerRoleWeight implements Action {
  readonly type = RoleWeightActionTypes.SHOW_VIEWER;
}

export class HideViewerRoleWeight implements Action {
  readonly type = RoleWeightActionTypes.HIDE_VIEWER;
}


export class ProcessingRoleWeight implements Action {
  readonly type = RoleWeightActionTypes.PROCESSING;
}

export class NotProcessingRoleWeight implements Action {
  readonly type = RoleWeightActionTypes.NOT_PROCESSING;
}


export class LoadDataRoleWeight implements Action {
  readonly type = RoleWeightActionTypes.LOAD_DATA;
}

export class LoadDataRoleWeightSuccess implements Action {
  readonly type = RoleWeightActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IRoleWeight[]) {}
}


export class LoadDocumentRoleWeight implements Action {
  readonly type = RoleWeightActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentRoleWeightSuccess implements Action {
  readonly type = RoleWeightActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentRoleWeight implements Action {
  readonly type = RoleWeightActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentRoleWeight implements Action {
  readonly type = RoleWeightActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}


export class SaveRoleWeight implements Action {
  readonly type = RoleWeightActionTypes.SAVE;

  constructor(public payload: {data: IRoleWeight, recordId: number, editMode: boolean}) {}
}

export class AddRoleWeight implements Action {
  readonly type = RoleWeightActionTypes.ADD;

  constructor(public payload: {data: IRoleWeight}) {}
}


export class DeleteDataRoleWeight implements Action {
  readonly type = RoleWeightActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number}) {}
}


export class RemoveDataRoleWeight implements Action {
  readonly type = RoleWeightActionTypes.REMOVE_DATA;

  constructor(public payload: {recordId: number}) {}
}


export class LoadAnalysisListRoleWeight implements Action {
  readonly type = RoleWeightActionTypes.LOAD_ANALYSIS_LIST;
}

export class LoadAnalysisListRoleWeightSuccess implements Action {
  readonly type = RoleWeightActionTypes.LOAD_ANALYSIS_LIST_SUCCESS;

  constructor(public payload: IAnalysis[]) {}
}

export class LoadAnalysisDetListRoleWeight implements Action {
  readonly type = RoleWeightActionTypes.LOAD_ANALYSIS_DETAIL_LIST;
}

export class LoadAnalysisDetListRoleWeightSuccess implements Action {
  readonly type = RoleWeightActionTypes.LOAD_ANALYSIS_DETAIL_LIST_SUCCESS;

  constructor(public payload: IAnalysisDetail[]) {}
}

export class LoadPositionListRoleWeight implements Action {
  readonly type = RoleWeightActionTypes.LOAD_POSITION_LIST;
}

export class LoadPositionListRoleWeightSuccess implements Action {
  readonly type = RoleWeightActionTypes.LOAD_POSITION_LIST_SUCCESS;

  constructor(public payload: IPosition[]) {}
}

export class LoadDesignationListRoleWeight implements Action {
  readonly type = RoleWeightActionTypes.LOAD_DESIGNATION_LIST;
}

export class LoadDesignationListRoleWeightSuccess implements Action {
  readonly type = RoleWeightActionTypes.LOAD_DESIGNATION_LIST_SUCCESS;

  constructor(public payload: IDesignation[]) {}
}

export class LoadGradeListRoleWeight implements Action {
  readonly type = RoleWeightActionTypes.LOAD_GRADE_LIST;
}

export class LoadGradeListRoleWeightSuccess implements Action {
  readonly type = RoleWeightActionTypes.LOAD_GRADE_LIST_SUCCESS;

  constructor(public payload: IGrade[]) {}
}

export class LoadEmployeeListRoleWeight implements Action {
  readonly type = RoleWeightActionTypes.LOAD_EMPLOYEE_LIST;
}

export class LoadEmployeeListRoleWeightSuccess implements Action {
  readonly type = RoleWeightActionTypes.LOAD_EMPLOYEE_LIST_SUCCESS;

  constructor(public payload: IPersonal[]) {}
}

export type RoleWeightActions =
  | ShowEditorRoleWeight
  | HideEditorRoleWeight
  | ShowViewerRoleWeight
  | HideViewerRoleWeight
  | ProcessingRoleWeight
  | NotProcessingRoleWeight
  | LoadDataRoleWeight
  | LoadDataRoleWeightSuccess
  | LoadDocumentRoleWeight
  | LoadDocumentRoleWeightSuccess
  | ClearDocumentRoleWeight
  | LoadInlineDocumentRoleWeight
  | SaveRoleWeight
  | AddRoleWeight
  | DeleteDataRoleWeight
  | RemoveDataRoleWeight
  | LoadAnalysisListRoleWeight
  | LoadAnalysisListRoleWeightSuccess
  | LoadAnalysisDetListRoleWeight
  | LoadAnalysisDetListRoleWeightSuccess
  | LoadPositionListRoleWeight
  | LoadPositionListRoleWeightSuccess
  | LoadDesignationListRoleWeight
  | LoadDesignationListRoleWeightSuccess
  | LoadGradeListRoleWeight
  | LoadGradeListRoleWeightSuccess
  | LoadEmployeeListRoleWeight
  | LoadEmployeeListRoleWeightSuccess;
