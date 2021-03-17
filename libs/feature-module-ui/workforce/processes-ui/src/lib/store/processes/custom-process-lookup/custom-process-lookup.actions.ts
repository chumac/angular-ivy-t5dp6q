import { Action } from '@ngrx/store';
import { ISelectOption } from '@nutela/models/core-data';
import { IProcessFormDefinition, IProcessFormArea, IProcessMetaData, IPersonal } from '@nutela/models/workforce/employee-profiles';

export enum CustomProcessLookupActionTypes {
  SHOW_EDITOR = '[SELF-SERVICE CUSTOM_PROCESS_LOOKUPS] Show Editor',
  HIDE_EDITOR = '[SELF-SERVICE CUSTOM_PROCESS_LOOKUPS] Hide Editor',

  SHOW_VIEWER = '[SELF-SERVICE CUSTOM_PROCESS_LOOKUPS] Show Viewer',
  HIDE_VIEWER = '[SELF-SERVICE CUSTOM_PROCESS_LOOKUPS] Hide Viewer',

  PROCESSING = '[SELF-SERVICE CUSTOM_PROCESS_LOOKUPS] Processing',
  NOT_PROCESSING = '[SELF-SERVICE CUSTOM_PROCESS_LOOKUPS] Not Processing',

  INITIATING = '[SELF-SERVICE CUSTOM_PROCESS_LOOKUPS] Initiating',
  NOT_INITIATING = '[SELF-SERVICE CUSTOM_PROCESS_LOOKUPS] Not Initiating',

  LOAD_DATA = '[SELF-SERVICE CUSTOM_PROCESS_LOOKUPS] Load Data',
  LOAD_DATA_SUCCESS = '[SELF-SERVICE CUSTOM_PROCESS_LOOKUPS] Load Data Success',

  LOAD_TEAM_MEMBERS = '[SELF-SERVICE CUSTOM_PROCESS_LOOKUPS] Load Team Members',
  LOAD_TEAM_MEMBERS_SUCCESS = '[SELF-SERVICE CUSTOM_PROCESS_LOOKUPS] Load Team Members Success',

  LOAD_META_DATA = '[SELF-SERVICE CUSTOM_PROCESS_LOOKUPS] Load Meta Data',
  LOAD_META_DATA_SUCCESS = '[SELF-SERVICE CUSTOM_PROCESS_LOOKUPS] Load Meta Success',

  INITIATE_PROCESS = '[SELF-SERVICE CUSTOM_PROCESS_LOOKUPS] Initiate Process',
  INITIATE_PROCESS_SUCCESS = '[SELF-SERVICE CUSTOM_PROCESS_LOOKUPS] Initiate Process Success',

  SAVE = '[SELF-SERVICE CUSTOM_PROCESS_LOOKUPS] Save',
  SAVE_SUCCESS = '[SELF-SERVICE CUSTOM_PROCESS_LOOKUPS] Save Success',

  ADD = '[SELF-SERVICE CUSTOM_PROCESS_LOOKUPS] Add',
  ADD_SUCCESS = '[SELF-SERVICE CUSTOM_PROCESS_LOOKUPS] Add Success',

  DELETE_DATA = '[SELF-SERVICE CUSTOM_PROCESS_LOOKUPS] Delete Data',

  REMOVE_DATA = '[SELF-SERVICE CUSTOM_PROCESS_LOOKUPS] Remove Data',

}

export class ShowEditorCustomProcessLookup implements Action {
  readonly type = CustomProcessLookupActionTypes.SHOW_EDITOR;
}

export class HideEditorCustomProcessLookup implements Action {
  readonly type = CustomProcessLookupActionTypes.HIDE_EDITOR;
}


export class ShowViewerCustomProcessLookup implements Action {
  readonly type = CustomProcessLookupActionTypes.SHOW_VIEWER;
}

export class HideViewerCustomProcessLookup implements Action {
  readonly type = CustomProcessLookupActionTypes.HIDE_VIEWER;
}


export class ProcessingCustomProcessLookup implements Action {
  readonly type = CustomProcessLookupActionTypes.PROCESSING;
}

export class NotProcessingCustomProcessLookup implements Action {
  readonly type = CustomProcessLookupActionTypes.NOT_PROCESSING;
}

export class InitiatingCustomProcessLookup implements Action {
  readonly type = CustomProcessLookupActionTypes.INITIATING;
}

export class NotInitiatingCustomProcessLookup implements Action {
  readonly type = CustomProcessLookupActionTypes.NOT_INITIATING;
}


export class LoadDataCustomProcessLookup implements Action {
  readonly type = CustomProcessLookupActionTypes.LOAD_DATA;
  constructor(public payload: {roleId: number}) {}
}

export class LoadDataCustomProcessLookupSuccess implements Action {
  readonly type = CustomProcessLookupActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IProcessFormDefinition[]) {}
}

export class LoadTeamMembersCustomProcessLookup implements Action {
  readonly type = CustomProcessLookupActionTypes.LOAD_TEAM_MEMBERS;
}

export class LoadTeamMembersCustomProcessLookupSuccess implements Action {
  readonly type = CustomProcessLookupActionTypes.LOAD_TEAM_MEMBERS_SUCCESS;

  constructor(public payload: IPersonal[]) {}
}

export class LoadMetaDataCustomProcessLookup implements Action {
  readonly type = CustomProcessLookupActionTypes.LOAD_META_DATA;
}

export class LoadMetaDataCustomProcessLookupSuccess implements Action {
  readonly type = CustomProcessLookupActionTypes.LOAD_META_DATA_SUCCESS;

  constructor(public payload: IProcessMetaData) {}
}


export class InitiateProcessCustomProcessLookup implements Action {
  readonly type = CustomProcessLookupActionTypes.INITIATE_PROCESS;
  constructor(public payload: {processId: number, employeeId: number}) {}
}

export class InitiateProcessCustomProcessLookupSuccess implements Action {
  readonly type = CustomProcessLookupActionTypes.INITIATE_PROCESS_SUCCESS;
  constructor(public payload: {masterId: number}) {}
}

export class SaveCustomProcessLookup implements Action {
  readonly type = CustomProcessLookupActionTypes.SAVE;

  constructor(public payload: {data: any, recordId: number, editMode: boolean}) {}
}

export class AddCustomProcessLookup implements Action {
  readonly type = CustomProcessLookupActionTypes.ADD;

  constructor(public payload: {data: any}) {}
}


export class DeleteDataCustomProcessLookup implements Action {
  readonly type = CustomProcessLookupActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number}) {}
}


export class RemoveDataCustomProcessLookup implements Action {
  readonly type = CustomProcessLookupActionTypes.REMOVE_DATA;

  constructor(public payload: {recordId: number}) {}
}

export type CustomProcessLookupActions =
  | ShowEditorCustomProcessLookup
  | HideEditorCustomProcessLookup
  | ShowViewerCustomProcessLookup
  | HideViewerCustomProcessLookup
  | ProcessingCustomProcessLookup
  | NotProcessingCustomProcessLookup
  | InitiatingCustomProcessLookup
  | NotInitiatingCustomProcessLookup
  | LoadDataCustomProcessLookup
  | LoadDataCustomProcessLookupSuccess
  | LoadTeamMembersCustomProcessLookup
  | LoadTeamMembersCustomProcessLookupSuccess
  | LoadMetaDataCustomProcessLookup
  | LoadMetaDataCustomProcessLookupSuccess
  | InitiateProcessCustomProcessLookup
  | InitiateProcessCustomProcessLookupSuccess
  | SaveCustomProcessLookup
  | AddCustomProcessLookup
  | DeleteDataCustomProcessLookup
  | RemoveDataCustomProcessLookup;
