import { Action } from '@ngrx/store';

import { IWorkflowDefinition } from '@nutela/models/talent/performance';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';
import { IGrade, IDesignation, IPosition, IAnalysisDetail, IAnalysis } from '@nutela/models/workforce/personnel';

export enum WorkflowDefinitionActionTypes {
  SHOW_EDITOR = '[PERFORMANCE SETUPS WORKFLOW_DEFINITIONS] Show Editor',
  HIDE_EDITOR = '[PERFORMANCE SETUPS WORKFLOW_DEFINITIONS] Hide Editor',

  SHOW_VIEWER = '[PERFORMANCE SETUPS WORKFLOW_DEFINITIONS] Show Viewer',
  HIDE_VIEWER = '[PERFORMANCE SETUPS WORKFLOW_DEFINITIONS] Hide Viewer',

  PROCESSING = '[PERFORMANCE SETUPS WORKFLOW_DEFINITIONS] Processing',
  NOT_PROCESSING = '[PERFORMANCE SETUPS WORKFLOW_DEFINITIONS] Not Processing',

  LOAD_DATA = '[PERFORMANCE SETUPS WORKFLOW_DEFINITIONS] Load Data',
  LOAD_DATA_SUCCESS = '[PERFORMANCE SETUPS WORKFLOW_DEFINITIONS] Load Data Success',

  LOAD_DOCUMENT = '[PERFORMANCE SETUPS WORKFLOW_DEFINITIONS] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[PERFORMANCE SETUPS WORKFLOW_DEFINITIONS] Load Document Success',
  CLEAR_DOCUMENT = '[PERFORMANCE SETUPS WORKFLOW_DEFINITIONS] Clear Document',

  LOAD_INLINE_DOCUMENT = '[PERFORMANCE SETUPS WORKFLOW_DEFINITIONS] Load Inline Document',

  SAVE = '[PERFORMANCE SETUPS WORKFLOW_DEFINITIONS] Save',
  SAVE_SUCCESS = '[PERFORMANCE SETUPS WORKFLOW_DEFINITIONS] Save Success',

  ADD = '[PERFORMANCE SETUPS WORKFLOW_DEFINITIONS] Add',
  ADD_SUCCESS = '[PERFORMANCE SETUPS WORKFLOW_DEFINITIONS] Add Success',

  DELETE_DATA = '[PERFORMANCE SETUPS WORKFLOW_DEFINITIONS] Delete Data',

  REMOVE_DATA = '[PERFORMANCE SETUPS WORKFLOW_DEFINITIONS] Remove Data',

  LOAD_ANALYSIS_LIST = '[PERFORMANCE SETUPS WORKFLOW_DEFINITIONS] Load Analysis List',
  LOAD_ANALYSIS_LIST_SUCCESS = '[PERFORMANCE SETUPS WORKFLOW_DEFINITIONS] Load Analysis List Success',

  LOAD_ANALYSIS_DETAIL_LIST = '[PERFORMANCE SETUPS WORKFLOW_DEFINITIONS] Load Analysis Detail List',
  LOAD_ANALYSIS_DETAIL_LIST_SUCCESS = '[PERFORMANCE SETUPS WORKFLOW_DEFINITIONS] Load Analysis Detail List Success',

  LOAD_POSITION_LIST = '[PERFORMANCE SETUPS WORKFLOW_DEFINITIONS] Load Position List',
  LOAD_POSITION_LIST_SUCCESS = '[PERFORMANCE SETUPS WORKFLOW_DEFINITIONS] Load Position List Success',

  LOAD_DESIGNATION_LIST = '[PERFORMANCE SETUPS WORKFLOW_DEFINITIONS] Load Designation List',
  LOAD_DESIGNATION_LIST_SUCCESS = '[PERFORMANCE SETUPS WORKFLOW_DEFINITIONS] Load Designation List Success',

  LOAD_GRADE_LIST = '[PERFORMANCE SETUPS WORKFLOW_DEFINITIONS] Load Grade List',
  LOAD_GRADE_LIST_SUCCESS = '[PERFORMANCE SETUPS WORKFLOW_DEFINITIONS] Load Grade List Success',

  LOAD_EMPLOYEE_LIST = '[PERFORMANCE SETUPS WORKFLOW_DEFINITIONS] Load Employee List',
  LOAD_EMPLOYEE_LIST_SUCCESS = '[PERFORMANCE SETUPS WORKFLOW_DEFINITIONS] Load Employee List Success',

}

export class ShowEditorWorkflowDefinition implements Action {
  readonly type = WorkflowDefinitionActionTypes.SHOW_EDITOR;
}

export class HideEditorWorkflowDefinition implements Action {
  readonly type = WorkflowDefinitionActionTypes.HIDE_EDITOR;
}


export class ShowViewerWorkflowDefinition implements Action {
  readonly type = WorkflowDefinitionActionTypes.SHOW_VIEWER;
}

export class HideViewerWorkflowDefinition implements Action {
  readonly type = WorkflowDefinitionActionTypes.HIDE_VIEWER;
}


export class ProcessingWorkflowDefinition implements Action {
  readonly type = WorkflowDefinitionActionTypes.PROCESSING;
}

export class NotProcessingWorkflowDefinition implements Action {
  readonly type = WorkflowDefinitionActionTypes.NOT_PROCESSING;
}


export class LoadDataWorkflowDefinition implements Action {
  readonly type = WorkflowDefinitionActionTypes.LOAD_DATA;
}

export class LoadDataWorkflowDefinitionSuccess implements Action {
  readonly type = WorkflowDefinitionActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IWorkflowDefinition[]) {}
}


export class LoadDocumentWorkflowDefinition implements Action {
  readonly type = WorkflowDefinitionActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentWorkflowDefinitionSuccess implements Action {
  readonly type = WorkflowDefinitionActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentWorkflowDefinition implements Action {
  readonly type = WorkflowDefinitionActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentWorkflowDefinition implements Action {
  readonly type = WorkflowDefinitionActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}


export class SaveWorkflowDefinition implements Action {
  readonly type = WorkflowDefinitionActionTypes.SAVE;

  constructor(public payload: {data: IWorkflowDefinition, recordId: number, editMode: boolean}) {}
}

export class AddWorkflowDefinition implements Action {
  readonly type = WorkflowDefinitionActionTypes.ADD;

  constructor(public payload: {data: IWorkflowDefinition}) {}
}


export class DeleteDataWorkflowDefinition implements Action {
  readonly type = WorkflowDefinitionActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number}) {}
}


export class RemoveDataWorkflowDefinition implements Action {
  readonly type = WorkflowDefinitionActionTypes.REMOVE_DATA;

  constructor(public payload: {recordId: number}) {}
}

export class LoadAnalysisListWorkflowDefinition implements Action {
  readonly type = WorkflowDefinitionActionTypes.LOAD_ANALYSIS_LIST;
}

export class LoadAnalysisListWorkflowDefinitionSuccess implements Action {
  readonly type = WorkflowDefinitionActionTypes.LOAD_ANALYSIS_LIST_SUCCESS;

  constructor(public payload: IAnalysis[]) {}
}

export class LoadAnalysisDetListWorkflowDefinition implements Action {
  readonly type = WorkflowDefinitionActionTypes.LOAD_ANALYSIS_DETAIL_LIST;
  constructor(public payload: number) {}

}

export class LoadAnalysisDetListWorkflowDefinitionSuccess implements Action {
  readonly type = WorkflowDefinitionActionTypes.LOAD_ANALYSIS_DETAIL_LIST_SUCCESS;

  constructor(public payload: IAnalysisDetail[]) {}
}

export class LoadPositionListWorkflowDefinition implements Action {
  readonly type = WorkflowDefinitionActionTypes.LOAD_POSITION_LIST;
}

export class LoadPositionListWorkflowDefinitionSuccess implements Action {
  readonly type = WorkflowDefinitionActionTypes.LOAD_POSITION_LIST_SUCCESS;

  constructor(public payload: IPosition[]) {}
}

export class LoadDesignationListWorkflowDefinition implements Action {
  readonly type = WorkflowDefinitionActionTypes.LOAD_DESIGNATION_LIST;
}

export class LoadDesignationListWorkflowDefinitionSuccess implements Action {
  readonly type = WorkflowDefinitionActionTypes.LOAD_DESIGNATION_LIST_SUCCESS;

  constructor(public payload: IDesignation[]) {}
}

export class LoadGradeListWorkflowDefinition implements Action {
  readonly type = WorkflowDefinitionActionTypes.LOAD_GRADE_LIST;
}

export class LoadGradeListWorkflowDefinitionSuccess implements Action {
  readonly type = WorkflowDefinitionActionTypes.LOAD_GRADE_LIST_SUCCESS;

  constructor(public payload: IGrade[]) {}
}

export class LoadEmployeeListWorkflowDefinition implements Action {
  readonly type = WorkflowDefinitionActionTypes.LOAD_EMPLOYEE_LIST;
}

export class LoadEmployeeListWorkflowDefinitionSuccess implements Action {
  readonly type = WorkflowDefinitionActionTypes.LOAD_EMPLOYEE_LIST_SUCCESS;

  constructor(public payload: IPersonal[]) {}
}

export type WorkflowDefinitionActions =
  | ShowEditorWorkflowDefinition
  | HideEditorWorkflowDefinition
  | ShowViewerWorkflowDefinition
  | HideViewerWorkflowDefinition
  | ProcessingWorkflowDefinition
  | NotProcessingWorkflowDefinition
  | LoadDataWorkflowDefinition
  | LoadDataWorkflowDefinitionSuccess
  | LoadDocumentWorkflowDefinition
  | LoadDocumentWorkflowDefinitionSuccess
  | ClearDocumentWorkflowDefinition
  | LoadInlineDocumentWorkflowDefinition
  | SaveWorkflowDefinition
  | AddWorkflowDefinition
  | DeleteDataWorkflowDefinition
  | RemoveDataWorkflowDefinition
  | LoadAnalysisListWorkflowDefinition
  | LoadAnalysisListWorkflowDefinitionSuccess
  | LoadAnalysisDetListWorkflowDefinition
  | LoadAnalysisDetListWorkflowDefinitionSuccess
  | LoadPositionListWorkflowDefinition
  | LoadPositionListWorkflowDefinitionSuccess
  | LoadDesignationListWorkflowDefinition
  | LoadDesignationListWorkflowDefinitionSuccess
  | LoadGradeListWorkflowDefinition
  | LoadGradeListWorkflowDefinitionSuccess
  | LoadEmployeeListWorkflowDefinition
  | LoadEmployeeListWorkflowDefinitionSuccess;
