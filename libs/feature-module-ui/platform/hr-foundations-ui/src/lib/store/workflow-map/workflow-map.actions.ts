import { Action } from '@ngrx/store';

import { IWorkflowMap } from '@nutela/models/foundation';
import { ISelectOption } from '@nutela/models/core-data';



export enum WorkflowMapActionTypes {

  SHOW_EDITOR = '[WORK MAP] Show Editor',
  HIDE_EDITOR = '[WORK MAP] Hide Editor',

  PROCESSING = '[WORK MAP] Processing',
  NOT_PROCESSING = '[WORK MAP] Not Processing',

  LOAD_WORK_MAP_DATA = '[WORK MAP] Load Work Map Data',
  LOAD_WORK_MAP_DATA_SUCCESS = '[WORK MAP] Load Work Map Data Success',

  LOAD_SYSTEM_DATA = '[WORK MAP] Load System  Data',
  LOAD_SYSTEM_DATA_SUCCESS = '[WORK MAP] Load System Data Success',

  LOAD_WORK_DEFINITION_DATA = '[WORK MAP] Load Work Definition Data',
  LOAD_WORK_DEFINITION_DATA_SUCCESS = '[WORK MAP] Load Work Definition Data Success',


  SAVE = '[WORK MAP] Save',
  SAVE_SUCCESS = '[WORK MAP] Save Success',

  DELETE_WORK_MAP_DATA = '[WORK MAP] Delete Work Map Data',

}

export class ShowEditorWorkflowMap implements Action {
  readonly type = WorkflowMapActionTypes.SHOW_EDITOR;
}

export class HideEditorWorkflowMap implements Action {
  readonly type = WorkflowMapActionTypes.HIDE_EDITOR;
}


export class ProcessingWorkflowMap implements Action {
  readonly type = WorkflowMapActionTypes.PROCESSING;
}

export class NotProcessingWorkflowMap implements Action {
  readonly type = WorkflowMapActionTypes.NOT_PROCESSING;
}


export class LoadSystemData implements Action {
  readonly type = WorkflowMapActionTypes.LOAD_SYSTEM_DATA;
}

export class LoadSystemDataSuccess implements Action {
  readonly type = WorkflowMapActionTypes.LOAD_SYSTEM_DATA_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadWorkDefinition implements Action {
  readonly type = WorkflowMapActionTypes.LOAD_WORK_DEFINITION_DATA;
}

export class  LoadWorkDefinitionSuccess implements Action {
  readonly type = WorkflowMapActionTypes.LOAD_WORK_DEFINITION_DATA_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadWorkflowMap implements Action {
  readonly type = WorkflowMapActionTypes.LOAD_WORK_MAP_DATA;
}

export class LoadWorkflowMapSuccess implements Action {
  readonly type = WorkflowMapActionTypes.LOAD_WORK_MAP_DATA_SUCCESS;

  constructor(public payload: IWorkflowMap[]) {}
}


export class SaveWorkflowMap implements Action {
  readonly type = WorkflowMapActionTypes.SAVE;
 constructor(public payload: {data: IWorkflowMap, recordId: number, editMode: boolean}) {}
}


export class DeleteWorkflowMap implements Action {
  readonly type = WorkflowMapActionTypes.DELETE_WORK_MAP_DATA;
  constructor(public payload: {recordId: number}) {}
}


export type WorkflowMapActions =
  | ShowEditorWorkflowMap
  | HideEditorWorkflowMap
  | ProcessingWorkflowMap
  | NotProcessingWorkflowMap
  | LoadWorkflowMap
  | LoadWorkflowMapSuccess
  | LoadSystemData
  | LoadSystemDataSuccess
  | LoadWorkDefinition
  | LoadWorkDefinitionSuccess
  | SaveWorkflowMap
  | DeleteWorkflowMap;
