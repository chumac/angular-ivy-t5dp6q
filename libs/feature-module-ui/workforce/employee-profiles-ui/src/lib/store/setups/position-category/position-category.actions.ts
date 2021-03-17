import { Action } from '@ngrx/store';
import { IPositionCategorySetup } from '@nutela/models/workforce/employee-profiles';

export enum PositionCategorySetupActionTypes {
  SHOW_EDITOR = '[HR_TRANSACTION SETUPS - POSITION_CATEGORY] Show Editor',
  HIDE_EDITOR = '[HR_TRANSACTION SETUPS - POSITION_CATEGORY] Hide Editor',

  SHOW_VIEWER = '[HR_TRANSACTION SETUPS - POSITION_CATEGORY] Show Viewer',
  HIDE_VIEWER = '[HR_TRANSACTION SETUPS - POSITION_CATEGORY] Hide Viewer',

  PROCESSING = '[HR_TRANSACTION SETUPS - POSITION_CATEGORY] Processing',
  NOT_PROCESSING = '[HR_TRANSACTION SETUPS - POSITION_CATEGORY] Not Processing',

  LOADING = '[HR_TRANSACTION SETUPS - POSITION_CATEGORY] LOADING',
  NOT_LOADING = '[HR_TRANSACTION SETUPS - POSITION_CATEGORY] Not LOADING',

  LOAD_DATA = '[HR_TRANSACTION SETUPS - POSITION_CATEGORY] Load Data',
  LOAD_DATA_SUCCESS = '[HR_TRANSACTION SETUPS - POSITION_CATEGORY] Load Data Success',

  LOAD_DOCUMENT = '[HR_TRANSACTION SETUPS - POSITION_CATEGORY] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[HR_TRANSACTION SETUPS - POSITION_CATEGORY] Load Document Success',
  CLEAR_DOCUMENT = '[HR_TRANSACTION SETUPS - POSITION_CATEGORY] Clear Document',

  LOAD_INLINE_DOCUMENT = '[HR_TRANSACTION SETUPS - POSITION_CATEGORY] Load Inline Document',

  ADD = '[HR_TRANSACTION SETUPS - POSITION_CATEGORY] Add',
  ADD_SUCCESS = '[HR_TRANSACTION SETUPS - POSITION_CATEGORY] Add Success',

  SAVE = '[HR_TRANSACTION SETUPS - POSITION_CATEGORY] Save',
  SAVE_SUCCESS = '[HR_TRANSACTION SETUPS - POSITION_CATEGORY] Save Success',

  DELETE_DATA = '[HR_TRANSACTION SETUPS - POSITION_CATEGORY] Delete Data',
}

export class ShowEditorPositionCategorySetup implements Action {
  readonly type = PositionCategorySetupActionTypes.SHOW_EDITOR;
}

export class HideEditorPositionCategorySetup implements Action {
  readonly type = PositionCategorySetupActionTypes.HIDE_EDITOR;
}


export class ShowViewerPositionCategorySetup implements Action {
  readonly type = PositionCategorySetupActionTypes.SHOW_VIEWER;
}

export class HideViewerPositionCategorySetup implements Action {
  readonly type = PositionCategorySetupActionTypes.HIDE_VIEWER;
}


export class ProcessingPositionCategorySetup implements Action {
  readonly type = PositionCategorySetupActionTypes.PROCESSING;
}

export class NotProcessingPositionCategorySetup implements Action {
  readonly type = PositionCategorySetupActionTypes.NOT_PROCESSING;
}

export class LoadingPositionCategorySetup implements Action {
  readonly type = PositionCategorySetupActionTypes.LOADING;
}

export class NotLoadingPositionCategorySetup implements Action {
  readonly type = PositionCategorySetupActionTypes.NOT_LOADING;
}

export class LoadDataPositionCategorySetup implements Action {
  readonly type = PositionCategorySetupActionTypes.LOAD_DATA;
}

export class LoadDataPositionCategorySetupSuccess implements Action {
  readonly type = PositionCategorySetupActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IPositionCategorySetup[]) {}
}


export class LoadDocumentPositionCategorySetup implements Action {
  readonly type = PositionCategorySetupActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentPositionCategorySetupSuccess implements Action {
  readonly type = PositionCategorySetupActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentPositionCategorySetup implements Action {
  readonly type = PositionCategorySetupActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentPositionCategorySetup implements Action {
  readonly type = PositionCategorySetupActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class AddPositionCategorySetup implements Action {
  readonly type = PositionCategorySetupActionTypes.ADD;

  constructor(public payload: {data: IPositionCategorySetup}) {}
}

export class SavePositionCategorySetup implements Action {
  readonly type = PositionCategorySetupActionTypes.SAVE;

  constructor(public payload: {data: IPositionCategorySetup, recordId: number}) {}
}

export class DeleteDataPositionCategorySetup implements Action {
  readonly type = PositionCategorySetupActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number}) {}
}


export type PositionCategorySetupActions =
  | ShowEditorPositionCategorySetup
  | HideEditorPositionCategorySetup
  | ShowViewerPositionCategorySetup
  | HideViewerPositionCategorySetup
  | ProcessingPositionCategorySetup
  | NotProcessingPositionCategorySetup
  | LoadingPositionCategorySetup
  | NotLoadingPositionCategorySetup
  | LoadDataPositionCategorySetup
  | LoadDataPositionCategorySetupSuccess
  | LoadDocumentPositionCategorySetup
  | LoadDocumentPositionCategorySetupSuccess
  | ClearDocumentPositionCategorySetup
  | LoadInlineDocumentPositionCategorySetup
  | SavePositionCategorySetup
  | AddPositionCategorySetup
  | DeleteDataPositionCategorySetup;
