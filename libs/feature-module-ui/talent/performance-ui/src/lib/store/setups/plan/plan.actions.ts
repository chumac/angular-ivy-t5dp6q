import { Action } from '@ngrx/store';

import { IPlan } from '@nutela/models/talent/performance';

export enum PlanActionTypes {
  SHOW_EDITOR = '[PERFORMANCE SETUPS - PLANS] Show Editor',
  HIDE_EDITOR = '[PERFORMANCE SETUPS - PLANS] Hide Editor',

  SHOW_VIEWER = '[PERFORMANCE SETUPS - PLANS] Show Viewer',
  HIDE_VIEWER = '[PERFORMANCE SETUPS - PLANS] Hide Viewer',

  PROCESSING = '[PERFORMANCE SETUPS - PLANS] Processing',
  NOT_PROCESSING = '[PERFORMANCE SETUPS - PLANS] Not Processing',

  LOAD_DATA = '[PERFORMANCE SETUPS - PLANS] Load Data',
  LOAD_DATA_SUCCESS = '[PERFORMANCE SETUPS - PLANS] Load Data Success',

  LOAD_DOCUMENT = '[PERFORMANCE SETUPS - PLANS] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[PERFORMANCE SETUPS - PLANS] Load Document Success',
  CLEAR_DOCUMENT = '[PERFORMANCE SETUPS - PLANS] Clear Document',

  LOAD_INLINE_DOCUMENT = '[PERFORMANCE SETUPS - PLANS] Load Inline Document',

  SAVE = '[PERFORMANCE SETUPS - PLANS] Save',
  SAVE_SUCCESS = '[PERFORMANCE SETUPS - PLANS] Save Success',

  PUBLISH_PLAN = '[PERFORMANCE SETUPS PLANS] Publish Plan',

  CLOSE_PLAN = '[PERFORMANCE SETUPS PLANS] Close Plan',

  ADD = '[PERFORMANCE SETUPS PLANS] Add',
  ADD_SUCCESS = '[PERFORMANCE SETUPS PLANS] Add Success',

  DELETE_DATA = '[PERFORMANCE SETUPS - PLANS] Delete Data',
  REMOVE_DATA = '[PERFORMANCE SETUPS - PLANS] Remove Data',

  LOAD_CURRENT_PLAN = '[PERFORMANCE SETUPS - PLANS] Load Current Plan',
  LOAD_CURRENT_PLAN_SUCCESS = '[PERFORMANCE SETUPS - PLANS] Load Current Plan Success'
}

export class ShowEditorPlan implements Action {
  readonly type = PlanActionTypes.SHOW_EDITOR;
}

export class HideEditorPlan implements Action {
  readonly type = PlanActionTypes.HIDE_EDITOR;
}


export class ShowViewerPlan implements Action {
  readonly type = PlanActionTypes.SHOW_VIEWER;
}

export class HideViewerPlan implements Action {
  readonly type = PlanActionTypes.HIDE_VIEWER;
}


export class ProcessingPlan implements Action {
  readonly type = PlanActionTypes.PROCESSING;
}

export class NotProcessingPlan implements Action {
  readonly type = PlanActionTypes.NOT_PROCESSING;
}


export class LoadDataPlan implements Action {
  readonly type = PlanActionTypes.LOAD_DATA;
}

export class LoadDataPlanSuccess implements Action {
  readonly type = PlanActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IPlan[]) {}
}


export class LoadDocumentPlan implements Action {
  readonly type = PlanActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentPlanSuccess implements Action {
  readonly type = PlanActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentPlan implements Action {
  readonly type = PlanActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentPlan implements Action {
  readonly type = PlanActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}


export class SavePlan implements Action {
  readonly type = PlanActionTypes.SAVE;

  constructor(public payload: {data: IPlan, recordId: number, editMode: boolean}) {}
}

export class PublishPlan implements Action {
  readonly type = PlanActionTypes.PUBLISH_PLAN;

  constructor(public payload: number) {}
}

export class ClosePlan implements Action {
  readonly type = PlanActionTypes.CLOSE_PLAN;

  constructor(public payload: number) {}
}

export class AddPlan implements Action {
  readonly type = PlanActionTypes.ADD;

  constructor(public payload: {data: IPlan}) {}
}


export class DeleteDataPlan implements Action {
  readonly type = PlanActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number}) {}
}


export class RemoveDataPlan implements Action {
  readonly type = PlanActionTypes.REMOVE_DATA;

  constructor(public payload: {recordId: number}) {}
}


export class LoadCurrentPlan implements Action {
  readonly type = PlanActionTypes.LOAD_CURRENT_PLAN;
}

export class LoadCurrentPlanSuccess implements Action {
  readonly type = PlanActionTypes.LOAD_CURRENT_PLAN_SUCCESS;

  constructor(public payload: IPlan) {}
}

export type PlanActions =
  | ShowEditorPlan
  | HideEditorPlan
  | ShowViewerPlan
  | HideViewerPlan
  | ProcessingPlan
  | NotProcessingPlan
  | LoadDataPlan
  | LoadDataPlanSuccess
  | LoadDocumentPlan
  | LoadDocumentPlanSuccess
  | ClearDocumentPlan
  | LoadInlineDocumentPlan
  | SavePlan
  | AddPlan
  | DeleteDataPlan
  | RemoveDataPlan
  | LoadCurrentPlan
  | LoadCurrentPlanSuccess;
