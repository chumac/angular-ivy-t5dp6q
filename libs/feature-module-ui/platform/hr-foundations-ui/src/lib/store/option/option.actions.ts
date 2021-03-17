import { Action } from '@ngrx/store';

import { IOptions } from '@nutela/models/foundation';


export enum OptionActionTypes {
  SHOW_EDITOR = '[OPTION] Show Editor',
  HIDE_EDITOR = '[OPTION] Hide Editor',

  PROCESSING = '[OPTION] Processing',
  NOT_PROCESSING = '[OPTION] Not Processing',

  LOAD_CUSTOM_APPROVED_DATA = '[CUSTOM OPTION] Load Approved Data',
  LOAD_CUSTOM_APPROVED_DATA_SUCCESS = '[CUSTOM OPTION] Load Approved Data Success',

  LOAD_GLOBAL_APPROVED_DATA = '[GLOBAL OPTION] Load Approved Data',
  LOAD_GLOBAL_APPROVED_DATA_SUCCESS = '[GLOBAL OPTION] Load Approved Data Success',

 

  SAVE_CUSTOM = '[CUSTOM OPTION] Save',
  SAVE_CUSTOM_SUCCESS = '[CUSTOM OPTION] Save Success',

  SAVE_GLOBAL = '[GLOBAL OPTION] Save',
  SAVE_GLOBAL_SUCCESS = '[GLOBAL OPTION] Save Success',

  DELETE_OPTION_DATA = '[OPTION] Delete Option Data',
  DELETE_OPTION_SUCCESS_DATA = '[OPTION] Delete Option Data',
}

export class ShowEditorOption implements Action {
  readonly type = OptionActionTypes.SHOW_EDITOR;
}

export class HideEditorOption implements Action {
  readonly type = OptionActionTypes.HIDE_EDITOR;
}

export class ProcessingOption implements Action {
  readonly type = OptionActionTypes.PROCESSING;
}

export class NotProcessingOption implements Action {
  readonly type = OptionActionTypes.NOT_PROCESSING;
}

export class LoadCustomOption implements Action {
  readonly type = OptionActionTypes.LOAD_CUSTOM_APPROVED_DATA;
}

export class LoadCustomOptionSuccess implements Action {
  readonly type = OptionActionTypes.LOAD_CUSTOM_APPROVED_DATA_SUCCESS;
  constructor(public payload: IOptions[]) {}
}

export class LoadGlobalOption implements Action {
  readonly type = OptionActionTypes.LOAD_GLOBAL_APPROVED_DATA;
}

export class LoadGlobalOptionSuccess implements Action {
  readonly type = OptionActionTypes.LOAD_GLOBAL_APPROVED_DATA_SUCCESS;
  constructor(public payload: IOptions[]) {}
}

export class SaveCustomOption implements Action {
  readonly type = OptionActionTypes.SAVE_CUSTOM;
  constructor(public payload: {data: IOptions, optionKey: string}) {}
}

export class SaveGlobalOption implements Action {
  readonly type = OptionActionTypes.SAVE_GLOBAL;
  constructor(public payload: {data: IOptions}) {}
}

export class DeleteOption implements Action {
  readonly type = OptionActionTypes.DELETE_OPTION_DATA
  constructor(public payload: {optionKey: string}) {}
}





export type OptionActions =
  | ShowEditorOption
  | HideEditorOption
  | ProcessingOption
  | NotProcessingOption
  | LoadCustomOption
  | LoadCustomOptionSuccess
  | LoadGlobalOption
  | LoadGlobalOptionSuccess
  | SaveCustomOption
  | SaveGlobalOption
  | DeleteOption;
