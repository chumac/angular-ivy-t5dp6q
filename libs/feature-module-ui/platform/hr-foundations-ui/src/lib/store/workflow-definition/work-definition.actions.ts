import { Action } from '@ngrx/store';

import { IWorkDefinition, IWorkDetails } from '@nutela/models/foundation';
import { ISelectOption } from '@nutela/models/core-data';



export enum WorkDefinitionActionTypes {

  SHOW_EDITOR = '[WORK DEFINITION] Show Editor',
  HIDE_EDITOR = '[WORK DEFINITION] Hide Editor',

  SHOW_STEP = '[WORK DEFINITION] Show STEP',
  HIDE_STEP = '[WORK DEFINITION] Hide STEP',

  PROCESSING = '[WORK DEFINITION] Processing',
  NOT_PROCESSING = '[WORK DEFINITION] Not Processing',

  LOADING = '[WORK DEFINITION] LOADING',
  NOT_LOADING = '[WORK DEFINITION] Not LOADING',

  LOAD_WORK_DEFINITION_DATA = '[WORK DEFINITION] Load Work Definition Data',
  LOAD_WORK_DEFINITION_DATA_SUCCESS = '[WORK DEFINITION] Load Work Definition Data Success',

  LOAD_POSITION_DATA = '[WORK DEFINITION] Load Specific Position  Data',
  LOAD_POSITION_DATA_SUCCESS = '[WORK DEFINITION] Load Specific Position Data Success',

  LOAD_INDIVIDUAL_DATA = '[WORK DEFINITION] Load Specific Individual Data',
  LOAD_INDIVIDUAL_DATA_SUCCESS = '[WORK DEFINITION] Load Specific Individual Data Success',

  LOAD_ROLE_DATA = '[WORK DEFINITION] Load  Role  Data',
  LOAD_ROLE_DATA_SUCCESS = '[WORK DEFINITION] Load Role Data Success',


  SAVE = '[WORK DEFINITION] Save',
  SAVE_SUCCESS = '[WORK DEFINITION] Save Success',

  UPDATED = '[WORK DEFINITION] UPDATED',
  UPDATED_SUCCESS = '[WORK DEFINITION] UPDATED Success',

  SAVE_STEP = '[WORK DEFINITION STEPS] Save',
  SAVE_STEP_SUCCESS = '[WORK DEFINITION STEPS] Save Success',

  SEND_DATA='[WORK DEFINITION STEPS] Description',

  DELETE_WORK_DEFINITION_DATA = '[WORK DEFINITION] Delete Work Definition Data',
}

export class ShowEditorWorkDefinition implements Action {
  readonly type = WorkDefinitionActionTypes.SHOW_EDITOR;
}

export class HideEditorWorkDefinition implements Action {
  readonly type = WorkDefinitionActionTypes.HIDE_EDITOR;
}

export class ShowStepWorkDefinition implements Action {
  readonly type = WorkDefinitionActionTypes.SHOW_STEP;
}

export class HideStepWorkDefinition implements Action {
  readonly type = WorkDefinitionActionTypes.HIDE_STEP;
}


export class ProcessingWorkDefinition implements Action {
  readonly type = WorkDefinitionActionTypes.PROCESSING;
}

export class NotProcessingWorkDefinition implements Action {
  readonly type = WorkDefinitionActionTypes.NOT_PROCESSING;
}

export class LoadingWorkDefinition implements Action {
  readonly type = WorkDefinitionActionTypes.LOADING;
}

export class NotLoadingWorkDefinition implements Action {
  readonly type = WorkDefinitionActionTypes.NOT_LOADING;
}

export class LoadWorkDefinition implements Action {
  readonly type = WorkDefinitionActionTypes.LOAD_WORK_DEFINITION_DATA;
}

export class LoadWorkDefinitionSuccess implements Action {
  readonly type = WorkDefinitionActionTypes.LOAD_WORK_DEFINITION_DATA_SUCCESS;

  constructor(public payload: IWorkDefinition[]) {}
}

export class LoadPosition implements Action {
  readonly type = WorkDefinitionActionTypes.LOAD_POSITION_DATA;
}

export class LoadPositionSuccess implements Action {
  readonly type = WorkDefinitionActionTypes.LOAD_POSITION_DATA_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadIndividual implements Action {
  readonly type = WorkDefinitionActionTypes.LOAD_INDIVIDUAL_DATA;
}

export class  LoadIndividualSuccess implements Action {
  readonly type = WorkDefinitionActionTypes.LOAD_INDIVIDUAL_DATA_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadRole implements Action {
  readonly type = WorkDefinitionActionTypes.LOAD_ROLE_DATA;
}

export class  LoadRoleSuccess implements Action {
  readonly type = WorkDefinitionActionTypes.LOAD_ROLE_DATA_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}


export class SaveWorkDefinition implements Action {
  readonly type = WorkDefinitionActionTypes.SAVE;

  constructor(public payload: {data: IWorkDefinition, recordId: number}) {}
}

export class UpdateWorkDefinition implements Action {
  readonly type = WorkDefinitionActionTypes.UPDATED;

  constructor(public payload: {data: IWorkDefinition, recordId: number}) {}
}

export class SaveWorkDefinitionStep implements Action {
  readonly type = WorkDefinitionActionTypes.SAVE_STEP;

  constructor(public payload: {data: IWorkDetails, wflowId:number}) {}
}


export class SendBackTo implements Action {
  readonly type = WorkDefinitionActionTypes.SEND_DATA;

  constructor(public payload: {description: string, Id:number}) {}
}

// export class SendBackToSuccess implements Action {
//   readonly type = WorkDefinitionActionTypes.SEND_DATA_SUCCESS;

//   constructor(public payload: {description: String, Id:number}) {}
// }

export class DeleteWorkDefinition implements Action {
  readonly type = WorkDefinitionActionTypes.DELETE_WORK_DEFINITION_DATA;

  constructor(public payload: {recordId: number}) {}
}


export type WorkDefinitionActions =
  | ShowEditorWorkDefinition
  | HideEditorWorkDefinition
  | ShowStepWorkDefinition
  | HideStepWorkDefinition
  | ProcessingWorkDefinition
  | NotProcessingWorkDefinition
  | LoadingWorkDefinition
  | NotLoadingWorkDefinition
  | LoadWorkDefinition
  | LoadWorkDefinitionSuccess
  | LoadPosition
  | LoadPositionSuccess
  | LoadIndividual
  | LoadIndividualSuccess
  | LoadRole
  | LoadRoleSuccess
  | SaveWorkDefinition
  | UpdateWorkDefinition
  | SaveWorkDefinitionStep
  | SendBackTo
  | DeleteWorkDefinition;
