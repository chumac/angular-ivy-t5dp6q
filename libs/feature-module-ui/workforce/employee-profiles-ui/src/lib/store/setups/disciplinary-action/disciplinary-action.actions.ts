import { Action } from '@ngrx/store';
import { IPersonal, IDisciplinaryActionDefinition } from '@nutela/models/workforce/employee-profiles';

export enum DisciplinaryActionSetupActionTypes {
  SHOW_EDITOR = '[HR_TRANSACTION SETUPS - DISCIPLINARY_ACTION] Show Editor',
  HIDE_EDITOR = '[HR_TRANSACTION SETUPS - DISCIPLINARY_ACTION] Hide Editor',

  SHOW_VIEWER = '[HR_TRANSACTION SETUPS - DISCIPLINARY_ACTION] Show Viewer',
  HIDE_VIEWER = '[HR_TRANSACTION SETUPS - DISCIPLINARY_ACTION] Hide Viewer',

  PROCESSING = '[HR_TRANSACTION SETUPS - DISCIPLINARY_ACTION] Processing',
  NOT_PROCESSING = '[HR_TRANSACTION SETUPS - DISCIPLINARY_ACTION] Not Processing',

  LOADING = '[HR_TRANSACTION SETUPS - DISCIPLINARY_ACTION] Loading',
  NOT_LOADING = '[HR_TRANSACTION SETUPS - DISCIPLINARY_ACTION] Not Loading',

  LOAD_DATA = '[HR_TRANSACTION SETUPS - DISCIPLINARY_ACTION] Load Data',
  LOAD_DATA_SUCCESS = '[HR_TRANSACTION SETUPS - DISCIPLINARY_ACTION] Load Data Success',

  ADD = '[HR_TRANSACTION SETUPS - DISCIPLINARY_ACTION] Add',
  ADD_SUCCESS = '[HR_TRANSACTION SETUPS - DISCIPLINARY_ACTION] Add Success',

  SAVE = '[HR_TRANSACTION SETUPS - DISCIPLINARY_ACTION] Save',

  UPDATE = '[HR_TRANSACTION SETUPS - DISCIPLINARY_ACTION] Save Update',

  DELETE_DATA = '[HR_TRANSACTION SETUPS - DISCIPLINARY_ACTION] Delete Data',
}

export class ShowEditorDisciplinaryActionSetup implements Action {
  readonly type = DisciplinaryActionSetupActionTypes.SHOW_EDITOR;
}

export class HideEditorDisciplinaryActionSetup implements Action {
  readonly type = DisciplinaryActionSetupActionTypes.HIDE_EDITOR;
}


export class ShowViewerDisciplinaryActionSetup implements Action {
  readonly type = DisciplinaryActionSetupActionTypes.SHOW_VIEWER;
}

export class HideViewerDisciplinaryActionSetup implements Action {
  readonly type = DisciplinaryActionSetupActionTypes.HIDE_VIEWER;
}


export class ProcessingDisciplinaryActionSetup implements Action {
  readonly type = DisciplinaryActionSetupActionTypes.PROCESSING;
}

export class NotProcessingDisciplinaryActionSetup implements Action {
  readonly type = DisciplinaryActionSetupActionTypes.NOT_PROCESSING;
}

export class LoadingDisciplinaryActionSetup implements Action {
  readonly type = DisciplinaryActionSetupActionTypes.LOADING;
}

export class NotLoadingDisciplinaryActionSetup implements Action {
  readonly type = DisciplinaryActionSetupActionTypes.NOT_LOADING;
}


export class LoadDataDisciplinaryActionSetup implements Action {
  readonly type = DisciplinaryActionSetupActionTypes.LOAD_DATA;
}

export class LoadDataDisciplinaryActionSetupSuccess implements Action {
  readonly type = DisciplinaryActionSetupActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IDisciplinaryActionDefinition[]) {}
}

export class AddDisciplinaryActionSetup implements Action {
  readonly type = DisciplinaryActionSetupActionTypes.ADD;

  constructor(public payload: {data: IDisciplinaryActionDefinition }) {}
}

export class SaveDisciplinaryActionSetup implements Action {
  readonly type = DisciplinaryActionSetupActionTypes.SAVE;

  constructor(public payload: {data: IDisciplinaryActionDefinition }) {}
}

export class UpdateDisciplinaryActionSetup implements Action {
  readonly type = DisciplinaryActionSetupActionTypes.UPDATE;

  constructor(public payload: {data: IDisciplinaryActionDefinition , recordId: number, editMode: boolean}) {}
}

export class DeleteDataDisciplinaryActionSetup implements Action {
  readonly type = DisciplinaryActionSetupActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number}) {}
}


export type DisciplinaryActionSetupActions =
  | ShowEditorDisciplinaryActionSetup
  | HideEditorDisciplinaryActionSetup
  | ShowViewerDisciplinaryActionSetup
  | HideViewerDisciplinaryActionSetup
  | ProcessingDisciplinaryActionSetup
  | NotProcessingDisciplinaryActionSetup
  | LoadDataDisciplinaryActionSetup
  | LoadDataDisciplinaryActionSetupSuccess
  | LoadingDisciplinaryActionSetup
  | NotLoadingDisciplinaryActionSetup
  | SaveDisciplinaryActionSetup
  | UpdateDisciplinaryActionSetup
  | AddDisciplinaryActionSetup
  | DeleteDataDisciplinaryActionSetup;
