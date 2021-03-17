import { Action } from '@ngrx/store';
import { IPersonal, IDesignationDefinition } from '@nutela/models/workforce/employee-profiles';
import { ISelectOption } from '@nutela/models/core-data';

export enum DesignationSetupActionTypes {
  SHOW_EDITOR = '[HR_TRANSACTION SETUPS - DESIGNATION] Show Editor',
  HIDE_EDITOR = '[HR_TRANSACTION SETUPS - DESIGNATION] Hide Editor',

  SHOW_VIEWER = '[HR_TRANSACTION SETUPS - DESIGNATION] Show Viewer',
  HIDE_VIEWER = '[HR_TRANSACTION SETUPS - DESIGNATION] Hide Viewer',

  PROCESSING = '[HR_TRANSACTION SETUPS - DESIGNATION] Processing',
  NOT_PROCESSING = '[HR_TRANSACTION SETUPS - DESIGNATION] Not Processing',

  LOADING = '[HR_TRANSACTION SETUPS - DESIGNATION] Loading',
  NOT_LOADING = '[HR_TRANSACTION SETUPS - DESIGNATION] Not Loading',

  LOAD_DATA = '[HR_TRANSACTION SETUPS - DESIGNATION] Load Data',
  LOAD_DATA_SUCCESS = '[HR_TRANSACTION SETUPS - DESIGNATION] Load Data Success',

  LOAD_AWAITING_DATA = '[HR_TRANSACTION SETUPS - DESIGNATION] Load Awaiting Data',
  LOAD_AWAITING_DATA_SUCCESS = '[HR_TRANSACTION SETUPS - DESIGNATION] Load Awaiting Data Success',

  LOAD_POSITION_DATA = '[HR_TRANSACTION SETUPS - DESIGNATION] Load Position Data',
  LOAD_POSITION_DATA_SUCCESS = '[HR_TRANSACTION SETUPS - DESIGNATION] Load Position Data Success',

  LOAD_DOCUMENT = '[HR_TRANSACTION SETUPS - DESIGNATION] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[HR_TRANSACTION SETUPS - DESIGNATION] Load Document Success',
  CLEAR_DOCUMENT = '[HR_TRANSACTION SETUPS - DESIGNATION] Clear Document',

  LOAD_INLINE_DOCUMENT = '[HR_TRANSACTION SETUPS - DESIGNATION] Load Inline Document',

  ADD = '[HR_TRANSACTION SETUPS - DESIGNATION] Add',
  ADD_SUCCESS = '[HR_TRANSACTION SETUPS - DESIGNATION] Add Success',

  SAVE = '[HR_TRANSACTION SETUPS - DESIGNATION] Save',
  SAVE_SUCCESS = '[HR_TRANSACTION SETUPS - DESIGNATION] Save Success',

  DELETE_DATA = '[HR_TRANSACTION SETUPS - DESIGNATION] Delete Data',
}

export class ShowEditorDesignationSetup implements Action {
  readonly type = DesignationSetupActionTypes.SHOW_EDITOR;
}

export class HideEditorDesignationSetup implements Action {
  readonly type = DesignationSetupActionTypes.HIDE_EDITOR;
}


export class ShowViewerDesignationSetup implements Action {
  readonly type = DesignationSetupActionTypes.SHOW_VIEWER;
}

export class HideViewerDesignationSetup implements Action {
  readonly type = DesignationSetupActionTypes.HIDE_VIEWER;
}


export class ProcessingDesignationSetup implements Action {
  readonly type = DesignationSetupActionTypes.PROCESSING;
}

export class NotProcessingDesignationSetup implements Action {
  readonly type = DesignationSetupActionTypes.NOT_PROCESSING;
}


export class LoadingDesignationSetup implements Action {
  readonly type = DesignationSetupActionTypes.LOADING;
}

export class NotLoadingDesignationSetup implements Action {
  readonly type = DesignationSetupActionTypes.NOT_LOADING;
}


export class LoadDataDesignationSetup implements Action {
  readonly type = DesignationSetupActionTypes.LOAD_DATA;
}

export class LoadDataDesignationSetupSuccess implements Action {
  readonly type = DesignationSetupActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IDesignationDefinition[]) {}
}

export class LoadDataAwaitingDesignationSetup implements Action {
  readonly type = DesignationSetupActionTypes.LOAD_AWAITING_DATA;
}

export class LoadDataAwaitingDesignationSetupSuccess implements Action {
  readonly type = DesignationSetupActionTypes.LOAD_AWAITING_DATA_SUCCESS;

  constructor(public payload: IDesignationDefinition[]) {}
}

export class LoadDataPositionSelectOptionDesignationSetup implements Action {
  readonly type = DesignationSetupActionTypes.LOAD_POSITION_DATA;
}

export class LoadDataPositionSelectOptionDesignationSetupSuccess implements Action {
  readonly type = DesignationSetupActionTypes.LOAD_POSITION_DATA_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}


export class LoadDocumentDesignationSetup implements Action {
  readonly type = DesignationSetupActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentDesignationSetupSuccess implements Action {
  readonly type = DesignationSetupActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentDesignationSetup implements Action {
  readonly type = DesignationSetupActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentDesignationSetup implements Action {
  readonly type = DesignationSetupActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class AddDesignationSetup implements Action {
  readonly type = DesignationSetupActionTypes.ADD;

  constructor(public payload: {data: IPersonal, recordId?: number, editMode: boolean}) {}
}

export class SaveDesignationSetup implements Action {
  readonly type = DesignationSetupActionTypes.SAVE;

  constructor(public payload: {data: IPersonal, recordId?: number, editMode: boolean}) {}
}

export class DeleteDataDesignationSetup implements Action {
  readonly type = DesignationSetupActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number}) {}
}


export type DesignationSetupActions =
  | ShowEditorDesignationSetup
  | HideEditorDesignationSetup
  | ShowViewerDesignationSetup
  | HideViewerDesignationSetup
  | ProcessingDesignationSetup
  | NotProcessingDesignationSetup
  | LoadingDesignationSetup
  | NotLoadingDesignationSetup
  | LoadDataDesignationSetup
  | LoadDataDesignationSetupSuccess
  | LoadDataAwaitingDesignationSetup
  | LoadDataAwaitingDesignationSetupSuccess
  | LoadDataPositionSelectOptionDesignationSetup
  | LoadDataPositionSelectOptionDesignationSetupSuccess
  | LoadDocumentDesignationSetup
  | LoadDocumentDesignationSetupSuccess
  | ClearDocumentDesignationSetup
  | LoadInlineDocumentDesignationSetup
  | SaveDesignationSetup
  | AddDesignationSetup
  | DeleteDataDesignationSetup;
