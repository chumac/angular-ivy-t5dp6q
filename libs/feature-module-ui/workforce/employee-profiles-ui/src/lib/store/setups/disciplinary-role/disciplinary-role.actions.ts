import { Action } from '@ngrx/store';
import { IPersonal, IDisciplinaryRoleDefinition } from '@nutela/models/workforce/employee-profiles';

export enum DisciplinaryRoleSetupActionTypes {
  SHOW_EDITOR = '[HR_TRANSACTION SETUPS - DISCIPLINARY_ROLE] Show Editor',
  HIDE_EDITOR = '[HR_TRANSACTION SETUPS - DISCIPLINARY_ROLE] Hide Editor',

  SHOW_VIEWER = '[HR_TRANSACTION SETUPS - DISCIPLINARY_ROLE] Show Viewer',
  HIDE_VIEWER = '[HR_TRANSACTION SETUPS - DISCIPLINARY_ROLE] Hide Viewer',

  PROCESSING = '[HR_TRANSACTION SETUPS - DISCIPLINARY_ROLE] Processing',
  NOT_PROCESSING = '[HR_TRANSACTION SETUPS - DISCIPLINARY_ROLE] Not Processing',

  LOADING = '[HR_TRANSACTION SETUPS - DISCIPLINARY_ROLE] Loading',
  NOT_LOADING = '[HR_TRANSACTION SETUPS - DISCIPLINARY_ROLE] Not Loading',

  LOAD_DATA = '[HR_TRANSACTION SETUPS - DISCIPLINARY_ROLE] Load Data',
  LOAD_DATA_SUCCESS = '[HR_TRANSACTION SETUPS - DISCIPLINARY_ROLE] Load Data Success',

  LOAD_DOCUMENT = '[HR_TRANSACTION SETUPS - DISCIPLINARY_ROLE] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[HR_TRANSACTION SETUPS - DISCIPLINARY_ROLE] Load Document Success',
  CLEAR_DOCUMENT = '[HR_TRANSACTION SETUPS - DISCIPLINARY_ROLE] Clear Document',

  LOAD_INLINE_DOCUMENT = '[HR_TRANSACTION SETUPS - DISCIPLINARY_ROLE] Load Inline Document',

  ADD = '[HR_TRANSACTION SETUPS - DISCIPLINARY_ROLE] Add',
  ADD_SUCCESS = '[HR_TRANSACTION SETUPS - DISCIPLINARY_ROLE] Add Success',

  SAVE = '[HR_TRANSACTION SETUPS - DISCIPLINARY_ROLE] Save',
  SAVE_SUCCESS = '[HR_TRANSACTION SETUPS - DISCIPLINARY_ROLE] Save Success',

  DELETE_DATA = '[HR_TRANSACTION SETUPS - DISCIPLINARY_ROLE] Delete Data',
}

export class ShowEditorDisciplinaryRoleSetup implements Action {
  readonly type = DisciplinaryRoleSetupActionTypes.SHOW_EDITOR;
}

export class HideEditorDisciplinaryRoleSetup implements Action {
  readonly type = DisciplinaryRoleSetupActionTypes.HIDE_EDITOR;
}


export class ShowViewerDisciplinaryRoleSetup implements Action {
  readonly type = DisciplinaryRoleSetupActionTypes.SHOW_VIEWER;
}

export class HideViewerDisciplinaryRoleSetup implements Action {
  readonly type = DisciplinaryRoleSetupActionTypes.HIDE_VIEWER;
}


export class ProcessingDisciplinaryRoleSetup implements Action {
  readonly type = DisciplinaryRoleSetupActionTypes.PROCESSING;
}

export class NotProcessingDisciplinaryRoleSetup implements Action {
  readonly type = DisciplinaryRoleSetupActionTypes.NOT_PROCESSING;
}

export class LoadingDisciplinaryRoleSetup implements Action {
  readonly type = DisciplinaryRoleSetupActionTypes.LOADING;
}

export class NotLoadingDisciplinaryRoleSetup implements Action {
  readonly type = DisciplinaryRoleSetupActionTypes.NOT_LOADING;
}


export class LoadDataDisciplinaryRoleSetup implements Action {
  readonly type = DisciplinaryRoleSetupActionTypes.LOAD_DATA;
}

export class LoadDataDisciplinaryRoleSetupSuccess implements Action {
  readonly type = DisciplinaryRoleSetupActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IDisciplinaryRoleDefinition[]) {}
}


export class LoadDocumentDisciplinaryRoleSetup implements Action {
  readonly type = DisciplinaryRoleSetupActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentDisciplinaryRoleSetupSuccess implements Action {
  readonly type = DisciplinaryRoleSetupActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentDisciplinaryRoleSetup implements Action {
  readonly type = DisciplinaryRoleSetupActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentDisciplinaryRoleSetup implements Action {
  readonly type = DisciplinaryRoleSetupActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class AddDisciplinaryRoleSetup implements Action {
  readonly type = DisciplinaryRoleSetupActionTypes.ADD;

  constructor(public payload: {data: IDisciplinaryRoleDefinition}) {}
}

export class SaveDisciplinaryRoleSetup implements Action {
  readonly type = DisciplinaryRoleSetupActionTypes.SAVE;

  constructor(public payload: {data: IDisciplinaryRoleDefinition, recordId: number}) {}
}

export class DeleteDataDisciplinaryRoleSetup implements Action {
  readonly type = DisciplinaryRoleSetupActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number}) {}
}


export type DisciplinaryRoleSetupActions =
  | ShowEditorDisciplinaryRoleSetup
  | HideEditorDisciplinaryRoleSetup
  | ShowViewerDisciplinaryRoleSetup
  | HideViewerDisciplinaryRoleSetup
  | ProcessingDisciplinaryRoleSetup
  | NotProcessingDisciplinaryRoleSetup
  | LoadingDisciplinaryRoleSetup
  | NotLoadingDisciplinaryRoleSetup
  | LoadDataDisciplinaryRoleSetup
  | LoadDataDisciplinaryRoleSetupSuccess
  | LoadDocumentDisciplinaryRoleSetup
  | LoadDocumentDisciplinaryRoleSetupSuccess
  | ClearDocumentDisciplinaryRoleSetup
  | LoadInlineDocumentDisciplinaryRoleSetup
  | SaveDisciplinaryRoleSetup
  | AddDisciplinaryRoleSetup
  | DeleteDataDisciplinaryRoleSetup;
