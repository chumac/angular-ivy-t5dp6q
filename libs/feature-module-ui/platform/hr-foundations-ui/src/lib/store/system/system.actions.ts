import { Action } from '@ngrx/store';

import { ISystem } from '@nutela/models/foundation';


export enum SystemActionTypes {

  LOAD_SYSTEM_DATA = '[ SYSTEM] Load System Data',
  LOAD_SYSTEM_DATA_SUCCESS = '[ SYSTEM] Load System Data Success',


  PROCESSING = '[ SYSTEM] Load NOT PROCESSING',
  NOT_PROCESSING = '[ SYSTEM] Load NOT PROCESSING Success',

  SAVE = '[SYSTEM] Save',
  SAVE_SUCCESS = '[ SYSTEM] Save Success',
}



export class LoadSystemData implements Action {
  readonly type = SystemActionTypes.LOAD_SYSTEM_DATA;
}

export class LoadSystemDataSuccess implements Action {
  readonly type = SystemActionTypes.LOAD_SYSTEM_DATA_SUCCESS;

  constructor(public payload: ISystem[]) {}
}

export class ProcessingSystem implements Action {
  readonly type = SystemActionTypes.PROCESSING;
}


export class NotProcessingSystem implements Action {
  readonly type = SystemActionTypes.NOT_PROCESSING;
}

export class SaveSystem implements Action {
  readonly type = SystemActionTypes.SAVE;

  constructor(public payload: {data: ISystem, recordId: number, editMode: boolean}) {}
}

export type SystemActions =
  | LoadSystemData
  | LoadSystemDataSuccess
  | ProcessingSystem
  | NotProcessingSystem
  | SaveSystem;
