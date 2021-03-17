import { Action } from '@ngrx/store';
import { IProcessFormDefinition, IProcessFormArea } from '@nutela/models/workforce/employee-profiles';

export enum ProcessFormDefinitionActionTypes {
  SHOW_EDITOR = '[HR-TRANSACTIONS PROCESS_FORM_DEFINITIONS] Show Editor',
  HIDE_EDITOR = '[HR-TRANSACTIONS PROCESS_FORM_DEFINITIONS] Hide Editor',

  SHOW_VIEWER = '[HR-TRANSACTIONS PROCESS_FORM_DEFINITIONS] Show Viewer',
  HIDE_VIEWER = '[HR-TRANSACTIONS PROCESS_FORM_DEFINITIONS] Hide Viewer',

  PROCESSING = '[HR-TRANSACTIONS PROCESS_FORM_DEFINITIONS] Processing',
  NOT_PROCESSING = '[HR-TRANSACTIONS PROCESS_FORM_DEFINITIONS] Not Processing',

  LOAD_DATA = '[HR-TRANSACTIONS PROCESS_FORM_DEFINITIONS] Load Data',
  LOAD_DATA_SUCCESS = '[HR-TRANSACTIONS PROCESS_FORM_DEFINITIONS] Load Data Success',

  LOAD_AREA = '[HR-TRANSACTIONS PROCESS_FORM_DEFINITIONS] Load Area',
  LOAD_AREA_SUCCESS = '[HR-TRANSACTIONS PROCESS_FORM_DEFINITIONS] Load Area Success',

  SAVE = '[HR-TRANSACTIONS PROCESS_FORM_DEFINITIONS] Save',
  SAVE_SUCCESS = '[HR-TRANSACTIONS PROCESS_FORM_DEFINITIONS] Save Success',

  ADD = '[HR-TRANSACTIONS PROCESS_FORM_DEFINITIONS] Add',
  ADD_SUCCESS = '[HR-TRANSACTIONS PROCESS_FORM_DEFINITIONS] Add Success',

  DELETE_DATA = '[HR-TRANSACTIONS PROCESS_FORM_DEFINITIONS] Delete Data',

  REMOVE_DATA = '[HR-TRANSACTIONS PROCESS_FORM_DEFINITIONS] Remove Data',

}

export class ShowEditorProcessFormDefinition implements Action {
  readonly type = ProcessFormDefinitionActionTypes.SHOW_EDITOR;
}

export class HideEditorProcessFormDefinition implements Action {
  readonly type = ProcessFormDefinitionActionTypes.HIDE_EDITOR;
}


export class ShowViewerProcessFormDefinition implements Action {
  readonly type = ProcessFormDefinitionActionTypes.SHOW_VIEWER;
}

export class HideViewerProcessFormDefinition implements Action {
  readonly type = ProcessFormDefinitionActionTypes.HIDE_VIEWER;
}


export class ProcessingProcessFormDefinition implements Action {
  readonly type = ProcessFormDefinitionActionTypes.PROCESSING;
}

export class NotProcessingProcessFormDefinition implements Action {
  readonly type = ProcessFormDefinitionActionTypes.NOT_PROCESSING;
}


export class LoadDataProcessFormDefinition implements Action {
  readonly type = ProcessFormDefinitionActionTypes.LOAD_DATA;
}

export class LoadDataProcessFormDefinitionSuccess implements Action {
  readonly type = ProcessFormDefinitionActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IProcessFormDefinition[]) {}
}

export class LoadAreaProcessFormDefinition implements Action {
  readonly type = ProcessFormDefinitionActionTypes.LOAD_AREA;
}

export class LoadAreaProcessFormDefinitionSuccess implements Action {
  readonly type = ProcessFormDefinitionActionTypes.LOAD_AREA_SUCCESS;

  constructor(public payload: IProcessFormArea[]) {}
}

export class SaveProcessFormDefinition implements Action {
  readonly type = ProcessFormDefinitionActionTypes.SAVE;

  constructor(public payload: {data: any, recordId: number, editMode: boolean}) {}
}

export class AddProcessFormDefinition implements Action {
  readonly type = ProcessFormDefinitionActionTypes.ADD;

  constructor(public payload: {data: any}) {}
}


export class DeleteDataProcessFormDefinition implements Action {
  readonly type = ProcessFormDefinitionActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number}) {}
}


export class RemoveDataProcessFormDefinition implements Action {
  readonly type = ProcessFormDefinitionActionTypes.REMOVE_DATA;

  constructor(public payload: {recordId: number}) {}
}

export type ProcessFormDefinitionActions =
  | ShowEditorProcessFormDefinition
  | HideEditorProcessFormDefinition
  | ShowViewerProcessFormDefinition
  | HideViewerProcessFormDefinition
  | ProcessingProcessFormDefinition
  | NotProcessingProcessFormDefinition
  | LoadDataProcessFormDefinition
  | LoadDataProcessFormDefinitionSuccess
  | SaveProcessFormDefinition
  | AddProcessFormDefinition
  | DeleteDataProcessFormDefinition
  | RemoveDataProcessFormDefinition
  | LoadAreaProcessFormDefinition
  | LoadAreaProcessFormDefinitionSuccess;
