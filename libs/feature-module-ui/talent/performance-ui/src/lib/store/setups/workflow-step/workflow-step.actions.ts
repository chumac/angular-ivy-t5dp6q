import { Action } from '@ngrx/store';

import { IWorkflowStep, IWorkflowDefinition } from '@nutela/models/talent/performance';
import { ISelectOption } from '@nutela/models/core-data';

export enum WorkflowStepActionTypes {
  SHOW_EDITOR = '[PERFORMANCE SETUPS WORKFLOW_STEPS] Show Editor',
  HIDE_EDITOR = '[PERFORMANCE SETUPS WORKFLOW_STEPS] Hide Editor',

  SHOW_VIEWER = '[PERFORMANCE SETUPS WORKFLOW_STEPS] Show Viewer',
  HIDE_VIEWER = '[PERFORMANCE SETUPS WORKFLOW_STEPS] Hide Viewer',

  PROCESSING = '[PERFORMANCE SETUPS WORKFLOW_STEPS] Processing',
  NOT_PROCESSING = '[PERFORMANCE SETUPS WORKFLOW_STEPS] Not Processing',

  LOAD_DATA = '[PERFORMANCE SETUPS WORKFLOW_STEPS] Load Data',
  LOAD_DATA_SUCCESS = '[PERFORMANCE SETUPS WORKFLOW_STEPS] Load Data Success',

  LOAD_WORKFLOW_DEFINITION = '[PERFORMANCE SETUPS WORKFLOW_STEPS] Load Workflow Definition',
  LOAD_WORKFLOW_DEFINITION_SUCCESS = '[PERFORMANCE SETUPS WORKFLOW_STEPS] Load Workflow Definition Success',

  LOAD_DOCUMENT = '[PERFORMANCE SETUPS WORKFLOW_STEPS] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[PERFORMANCE SETUPS WORKFLOW_STEPS] Load Document Success',
  CLEAR_DOCUMENT = '[PERFORMANCE SETUPS WORKFLOW_STEPS] Clear Document',

  LOAD_INLINE_DOCUMENT = '[PERFORMANCE SETUPS WORKFLOW_STEPS] Load Inline Document',

  SAVE = '[PERFORMANCE SETUPS WORKFLOW_STEPS] Save',
  SAVE_SUCCESS = '[PERFORMANCE SETUPS WORKFLOW_STEPS] Save Success',

  ADD = '[PERFORMANCE SETUPS WORKFLOW_STEPS] Add',
  ADD_SUCCESS = '[PERFORMANCE SETUPS WORKFLOW_STEPS] Add Success',

  DELETE_DATA = '[PERFORMANCE SETUPS WORKFLOW_STEPS] Delete Data',

  REMOVE_DATA = '[PERFORMANCE SETUPS WORKFLOW_STEPS] Remove Data',

}

export class ShowEditorWorkflowStep implements Action {
  readonly type = WorkflowStepActionTypes.SHOW_EDITOR;
}

export class HideEditorWorkflowStep implements Action {
  readonly type = WorkflowStepActionTypes.HIDE_EDITOR;
}


export class ShowViewerWorkflowStep implements Action {
  readonly type = WorkflowStepActionTypes.SHOW_VIEWER;
}

export class HideViewerWorkflowStep implements Action {
  readonly type = WorkflowStepActionTypes.HIDE_VIEWER;
}


export class ProcessingWorkflowStep implements Action {
  readonly type = WorkflowStepActionTypes.PROCESSING;
}

export class NotProcessingWorkflowStep implements Action {
  readonly type = WorkflowStepActionTypes.NOT_PROCESSING;
}


export class LoadDataWorkflowStep implements Action {
  readonly type = WorkflowStepActionTypes.LOAD_DATA;
  constructor(public payload: {workFlowId: number}) {}
}

export class LoadDataWorkflowStepSuccess implements Action {
  readonly type = WorkflowStepActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IWorkflowStep[]) {}
}

export class LoadDefinitionWorkflowStep implements Action {
  readonly type = WorkflowStepActionTypes.LOAD_WORKFLOW_DEFINITION;
}

export class LoadDefinitionWorkflowStepSuccess implements Action {
  readonly type = WorkflowStepActionTypes.LOAD_WORKFLOW_DEFINITION_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadDocumentWorkflowStep implements Action {
  readonly type = WorkflowStepActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentWorkflowStepSuccess implements Action {
  readonly type = WorkflowStepActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentWorkflowStep implements Action {
  readonly type = WorkflowStepActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentWorkflowStep implements Action {
  readonly type = WorkflowStepActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}


export class SaveWorkflowStep implements Action {
  readonly type = WorkflowStepActionTypes.SAVE;

  constructor(public payload: {data: IWorkflowStep, recordId: number, editMode: boolean, workFlowId: number}) {}
}

export class AddWorkflowStep implements Action {
  readonly type = WorkflowStepActionTypes.ADD;

  constructor(public payload: {data: IWorkflowStep, workFlowId: number}) {}
}


export class DeleteDataWorkflowStep implements Action {
  readonly type = WorkflowStepActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number, workFlowId: number}) {}
}


export class RemoveDataWorkflowStep implements Action {
  readonly type = WorkflowStepActionTypes.REMOVE_DATA;

  constructor(public payload: {recordId: number}) {}
}

export type WorkflowStepActions =
  | ShowEditorWorkflowStep
  | HideEditorWorkflowStep
  | ShowViewerWorkflowStep
  | HideViewerWorkflowStep
  | ProcessingWorkflowStep
  | NotProcessingWorkflowStep
  | LoadDataWorkflowStep
  | LoadDataWorkflowStepSuccess
  | LoadDefinitionWorkflowStep
  | LoadDefinitionWorkflowStepSuccess
  | LoadDocumentWorkflowStep
  | LoadDocumentWorkflowStepSuccess
  | ClearDocumentWorkflowStep
  | LoadInlineDocumentWorkflowStep
  | SaveWorkflowStep
  | AddWorkflowStep
  | DeleteDataWorkflowStep
  | RemoveDataWorkflowStep;
