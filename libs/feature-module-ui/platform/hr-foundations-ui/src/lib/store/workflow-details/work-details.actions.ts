import { Action } from '@ngrx/store';

import { IWorkDetails } from '@nutela/models/foundation';
import { ISelectOption } from 'dist/libs/models/core-data';



export enum WorkDetailsActionTypes {

  SHOW_EDITOR = '[WORK DETAILS] Show Editor',
  HIDE_EDITOR = '[WORK DETAILS] Hide Editor',

  SHOW_VIEWER = '[WORK DETAILS] Show Viewer',
  HIDE_VIEWER = '[WORK DETAILS] Hide Viewer',

  SHOW_STEP = '[WORK DETAILS] Show STEP',
  HIDE_STEP = '[WORK DETAILS] Hide STEP',

  PROCESSING = '[WORK DETAILS] Processing',
  NOT_PROCESSING = '[WORK DETAILS] Not Processing',

  LOADING = '[WORK DETAILS] LOADING',
  NOT_LOADING = '[WORK DETAILS] Not LOADING',

  LOAD_WORK_DETAILS_DATA = '[WORK DETAILS] Load Work Details Data',
  LOAD_WORK_DETAILS_DATA_SUCCESS = '[WORK DETAILS] Load Work Details Data Success',

  PROCESSING_RULE = '[WORK DETAILS] Load PROCESSING_RULE Data',
  PROCESSING_RULE_SUCCESS = '[WORK DETAILS] Load PROCESSING_RULE Data Success',

  CLEAR_WORK_DETAILS_DATA = '[WORK DETAILS] CLEAR Work Details Data',

  SAVE = '[WORK DETAILS] Save',
  SAVE_SUCCESS = '[WORK DETAILS] Save Success',

  DELETE_WORK_DETAILS_DATA = '[WORK DETAILS] Delete Work Details Data',

}

export class ShowEditorWorkDetails implements Action {
  readonly type = WorkDetailsActionTypes.SHOW_EDITOR;
}

export class HideEditorWorkDetails implements Action {
  readonly type = WorkDetailsActionTypes.HIDE_EDITOR;
}

export class ShowViewerWorkDetails implements Action {
  readonly type = WorkDetailsActionTypes.SHOW_VIEWER;
}

export class HideViewerWorkDetails implements Action {
  readonly type = WorkDetailsActionTypes.HIDE_VIEWER;
}

export class ProcessingWorkDetails implements Action {
  readonly type = WorkDetailsActionTypes.PROCESSING;
}

export class NotProcessingWorkDetails implements Action {
  readonly type = WorkDetailsActionTypes.NOT_PROCESSING;
}

export class LoadingWorkDetails implements Action {
  readonly type = WorkDetailsActionTypes.LOADING;
}

export class NotLoadingWorkDetails implements Action {
  readonly type = WorkDetailsActionTypes.NOT_LOADING;
}


export class LoadWorkDetails implements Action {
  readonly type = WorkDetailsActionTypes.LOAD_WORK_DETAILS_DATA;
  constructor(public payload: {recordId:number}) {}
}

export class LoadWorkDetailsSuccess implements Action {
  readonly type = WorkDetailsActionTypes.LOAD_WORK_DETAILS_DATA_SUCCESS;

  constructor(public payload: IWorkDetails[]) {}
}

export class LoadProcessingRule implements Action {
  readonly type = WorkDetailsActionTypes.PROCESSING_RULE;
}

export class LoadProcessingRuleSuccess implements Action {
  readonly type = WorkDetailsActionTypes.PROCESSING_RULE_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class ClearWorkDetails implements Action {
  readonly type = WorkDetailsActionTypes.CLEAR_WORK_DETAILS_DATA;
}

export class SaveWorkDetails implements Action {
  readonly type = WorkDetailsActionTypes.SAVE;

  constructor(public payload: {data: IWorkDetails, recordId: number,workID:number}) {}
}


export class DeleteWorkDetails implements Action {
  readonly type = WorkDetailsActionTypes.DELETE_WORK_DETAILS_DATA;

  constructor(public payload: {recordId: number, workID:number}) {}
}


export type WorkDetailsActions =
  | ShowEditorWorkDetails
  | HideEditorWorkDetails
  | ShowViewerWorkDetails
  | HideViewerWorkDetails
  | ProcessingWorkDetails
  | NotProcessingWorkDetails
  | LoadingWorkDetails
  | NotLoadingWorkDetails
  | LoadWorkDetails
  | LoadWorkDetailsSuccess
  | LoadProcessingRule
  | LoadProcessingRuleSuccess
  | ClearWorkDetails
  | SaveWorkDetails
  | DeleteWorkDetails;
