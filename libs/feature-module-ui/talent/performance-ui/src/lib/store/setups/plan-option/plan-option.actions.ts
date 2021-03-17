import { Action } from '@ngrx/store';

import { IPlanOption, IPlan } from '@nutela/models/talent/performance';
import { ISelectOption } from '@nutela/models/core-data';

export enum PlanOptionActionTypes {
  SHOW_EDITOR = '[PERFORMANCE SETUPS PLAN_OPTIONS] Show Editor',
  HIDE_EDITOR = '[PERFORMANCE SETUPS PLAN_OPTIONS] Hide Editor',

  SHOW_VIEWER = '[PERFORMANCE SETUPS PLAN_OPTIONS] Show Viewer',
  HIDE_VIEWER = '[PERFORMANCE SETUPS PLAN_OPTIONS] Hide Viewer',

  PROCESSING = '[PERFORMANCE SETUPS PLAN_OPTIONS] Processing',
  NOT_PROCESSING = '[PERFORMANCE SETUPS PLAN_OPTIONS] Not Processing',

  LOAD_DATA = '[PERFORMANCE SETUPS PLAN_OPTIONS] Load Data',
  LOAD_DATA_SUCCESS = '[PERFORMANCE SETUPS PLAN_OPTIONS] Load Data Success',

  LOAD_PLAN_LIST = '[PERFORMANCE SETUPS PLAN_OPTIONS] Load Plan List',
  LOAD_PLAN_LIST_SUCCESS = '[PERFORMANCE SETUPS PLAN_OPTIONS] Load Plan List Success',

  LOAD_DOCUMENT = '[PERFORMANCE SETUPS PLAN_OPTIONS] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[PERFORMANCE SETUPS PLAN_OPTIONS] Load Document Success',
  CLEAR_DOCUMENT = '[PERFORMANCE SETUPS PLAN_OPTIONS] Clear Document',

  LOAD_INLINE_DOCUMENT = '[PERFORMANCE SETUPS PLAN_OPTIONS] Load Inline Document',

  SAVE = '[PERFORMANCE SETUPS PLAN_OPTIONS] Save',
  SAVE_SUCCESS = '[PERFORMANCE SETUPS PLAN_OPTIONS] Save Success',

  ADD = '[PERFORMANCE SETUPS PLAN_OPTIONS] Add',
  ADD_SUCCESS = '[PERFORMANCE SETUPS PLAN_OPTIONS] Add Success',

  DELETE_DATA = '[PERFORMANCE SETUPS PLAN_OPTIONS] Delete Data',

  REMOVE_DATA = '[PERFORMANCE SETUPS PLAN_OPTIONS] Remove Data',

}

export class ShowEditorPlanOption implements Action {
  readonly type = PlanOptionActionTypes.SHOW_EDITOR;
}

export class HideEditorPlanOption implements Action {
  readonly type = PlanOptionActionTypes.HIDE_EDITOR;
}


export class ShowViewerPlanOption implements Action {
  readonly type = PlanOptionActionTypes.SHOW_VIEWER;
}

export class HideViewerPlanOption implements Action {
  readonly type = PlanOptionActionTypes.HIDE_VIEWER;
}


export class ProcessingPlanOption implements Action {
  readonly type = PlanOptionActionTypes.PROCESSING;
}

export class NotProcessingPlanOption implements Action {
  readonly type = PlanOptionActionTypes.NOT_PROCESSING;
}


export class LoadDataPlanOption implements Action {
  readonly type = PlanOptionActionTypes.LOAD_DATA;
  constructor(public payload: {planId: number}) {}
}

export class LoadDataPlanOptionSuccess implements Action {
  readonly type = PlanOptionActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IPlanOption[]) {}
}

export class LoadPlanListPlanOption implements Action {
  readonly type = PlanOptionActionTypes.LOAD_PLAN_LIST;
}

export class LoadPlanListPlanOptionSuccess implements Action {
  readonly type = PlanOptionActionTypes.LOAD_PLAN_LIST_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}


export class LoadDocumentPlanOption implements Action {
  readonly type = PlanOptionActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentPlanOptionSuccess implements Action {
  readonly type = PlanOptionActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentPlanOption implements Action {
  readonly type = PlanOptionActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentPlanOption implements Action {
  readonly type = PlanOptionActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}


export class SavePlanOption implements Action {
  readonly type = PlanOptionActionTypes.SAVE;

  constructor(public payload: {data: IPlanOption, recordId: number, editMode: boolean}) {}
}

export class AddPlanOption implements Action {
  readonly type = PlanOptionActionTypes.ADD;

  constructor(public payload: {data: IPlanOption}) {}
}


export class DeleteDataPlanOption implements Action {
  readonly type = PlanOptionActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number, planId: number}) {}
}


export class RemoveDataPlanOption implements Action {
  readonly type = PlanOptionActionTypes.REMOVE_DATA;

  constructor(public payload: {recordId: number}) {}
}

export type PlanOptionActions =
  | ShowEditorPlanOption
  | HideEditorPlanOption
  | ShowViewerPlanOption
  | HideViewerPlanOption
  | ProcessingPlanOption
  | NotProcessingPlanOption
  | LoadDataPlanOption
  | LoadDataPlanOptionSuccess
  | LoadPlanListPlanOption
  | LoadPlanListPlanOptionSuccess
  | LoadDocumentPlanOption
  | LoadDocumentPlanOptionSuccess
  | ClearDocumentPlanOption
  | LoadInlineDocumentPlanOption
  | SavePlanOption
  | AddPlanOption
  | DeleteDataPlanOption
  | RemoveDataPlanOption;
