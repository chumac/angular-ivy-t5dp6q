import { Action } from '@ngrx/store';


import { ILeaveDefinition} from '@nutela/models/workforce/leave';

export enum LeaveDefinitionActionTypes {

  SHOW_EDITOR = '[LEAVE DEFINITION] Show Editor',
  HIDE_EDITOR = '[LEAVE DEFINITION] Hide Editor',

  SHOW_VIEWER = '[LEAVE DEFINITION] Show VIEWER',
  HIDE_VIEWER = '[LEAVE DEFINITION] Hide VIEWER',

  PROCESSING = '[LEAVE DEFINITION] Processing',
  NOT_PROCESSING = '[LEAVE DEFINITION] Not Processing',

  LOADING_LEAVE_DEFINITION = '[LEAVE DEFINITION] Loading Leave Definition',
  NOT_LOADING_LEAVE_DEFINITION = '[LEAVE DEFINITION] Not Loading Leave Definition',

  LOAD_DEFINITION_DATA = '[LEAVE DEFINITION] Load DEFINITION Data',
  LOAD_DEFINITION_DATA_SUCCESS = '[LEAVE DEFINITION] Load DEFINITION Data Success',

  SAVE = '[LEAVE DEFINITION] Save',
  SAVE_SUCCESS = '[LEAVE DEFINITION] Save Success',

  UPDATED = '[LEAVE DEFINITION] UPDATED',
  UPDATED_SUCCESS = '[LEAVE DEFINITION] Update Success',

  DELETE = '[LEAVE DEFINITION] Delete Data',
}



export class ShowEditorLeaveDefinition implements Action {
  readonly type = LeaveDefinitionActionTypes.SHOW_EDITOR;
}

export class HideEditorLeaveDefinition implements Action {
  readonly type = LeaveDefinitionActionTypes.HIDE_EDITOR;
}

export class ShowViewerLeaveDefinition implements Action {
  readonly type = LeaveDefinitionActionTypes.SHOW_VIEWER;
}

export class HideViewerLeaveDefinition implements Action {
  readonly type = LeaveDefinitionActionTypes.HIDE_VIEWER;
}

export class ProcessingLeaveDefinition implements Action {
  readonly type = LeaveDefinitionActionTypes.PROCESSING;
}

export class NotProcessingLeaveDefinition implements Action {
  readonly type = LeaveDefinitionActionTypes.NOT_PROCESSING;
}

export class LoadingLeaveDefinition implements Action {
  readonly type = LeaveDefinitionActionTypes.LOADING_LEAVE_DEFINITION;
}

export class NotLoadingLeaveDefinition implements Action {
  readonly type = LeaveDefinitionActionTypes.NOT_LOADING_LEAVE_DEFINITION;
}

export class LoadLeaveDefinitionData implements Action {
  readonly type=LeaveDefinitionActionTypes.LOAD_DEFINITION_DATA;
}

export class LoadLeaveDefinitionDataSuccess implements Action {
  readonly type = LeaveDefinitionActionTypes.LOAD_DEFINITION_DATA_SUCCESS;

  constructor(public payload: ILeaveDefinition[]) {}
}

export class SaveLeaveDefinition implements Action {
  readonly type = LeaveDefinitionActionTypes.SAVE;
  constructor(public payload: {data: ILeaveDefinition, recordId: number}) {}
}

export class UpdateLeaveDefinition implements Action {
  readonly type = LeaveDefinitionActionTypes.UPDATED;

  constructor(public payload: {data: ILeaveDefinition, recordId: number}) {}
}

export class DeleteLeaveDefinition implements Action {
  readonly type = LeaveDefinitionActionTypes.DELETE;

  constructor(public payload: {recordId: number}) {}
}

export type LeaveDefinitionActions =
  | ShowEditorLeaveDefinition
  | HideEditorLeaveDefinition
  | ShowViewerLeaveDefinition
  | HideViewerLeaveDefinition
  | ProcessingLeaveDefinition
  | NotProcessingLeaveDefinition
  | LoadingLeaveDefinition
  | NotLoadingLeaveDefinition
  | LoadLeaveDefinitionData
  | LoadLeaveDefinitionDataSuccess
  | SaveLeaveDefinition
  | UpdateLeaveDefinition
  | DeleteLeaveDefinition;
