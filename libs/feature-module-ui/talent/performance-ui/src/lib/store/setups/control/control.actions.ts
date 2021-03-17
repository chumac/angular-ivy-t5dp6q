import { Action } from '@ngrx/store';

import { IControl, IPage, ISection } from '@nutela/models/talent/performance';

export enum ControlActionTypes {
  SHOW_EDITOR = '[PERFORMANCE SETUPS CONTROLS] Show Editor',
  HIDE_EDITOR = '[PERFORMANCE SETUPS CONTROLS] Hide Editor',

  SHOW_VIEWER = '[PERFORMANCE SETUPS CONTROLS] Show Viewer',
  HIDE_VIEWER = '[PERFORMANCE SETUPS CONTROLS] Hide Viewer',

  PROCESSING = '[PERFORMANCE SETUPS CONTROLS] Processing',
  NOT_PROCESSING = '[PERFORMANCE SETUPS CONTROLS] Not Processing',

  PROCESSING_GRID = '[PERFORMANCE SETUPS CONTROLS] Processing Grid',
  NOT_PROCESSING_GRID = '[PERFORMANCE SETUPS CONTROLS] Not Processing Grid',

  LOAD_DATA = '[PERFORMANCE SETUPS CONTROLS] Load Data',
  LOAD_DATA_SUCCESS = '[PERFORMANCE SETUPS CONTROLS] Load Data Success',

  LOAD_CUSTOM_PAGE_LIST = '[PERFORMANCE SETUPS CONTROLS] Load Custom Page List',
  LOAD_CUSTOM_PAGE_LIST_SUCCESS = '[PERFORMANCE SETUPS CONTROLS] Load Custom Page List Success',

  LOAD_SECTION_LIST = '[PERFORMANCE SETUPS CONTROLS] Load Section List',
  LOAD_SECTION_LIST_SUCCESS = '[PERFORMANCE SETUPS CONTROLS] Load Section List Success',

  LOAD_DOCUMENT = '[PERFORMANCE SETUPS CONTROLS] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[PERFORMANCE SETUPS CONTROLS] Load Document Success',
  CLEAR_DOCUMENT = '[PERFORMANCE SETUPS CONTROLS] Clear Document',

  LOAD_INLINE_DOCUMENT = '[PERFORMANCE SETUPS CONTROLS] Load Inline Document',

  SAVE = '[PERFORMANCE SETUPS CONTROLS] Save',
  SAVE_SUCCESS = '[PERFORMANCE SETUPS CONTROLS] Save Success',

  ADD = '[PERFORMANCE SETUPS CONTROLS] Add',
  ADD_SUCCESS = '[PERFORMANCE SETUPS CONTROLS] Add Success',

  DELETE_DATA = '[PERFORMANCE SETUPS CONTROLS] Delete Data',

  REMOVE_DATA = '[PERFORMANCE SETUPS CONTROLS] Remove Data',

}

export class ShowEditorControl implements Action {
  readonly type = ControlActionTypes.SHOW_EDITOR;
}

export class HideEditorControl implements Action {
  readonly type = ControlActionTypes.HIDE_EDITOR;
}


export class ShowViewerControl implements Action {
  readonly type = ControlActionTypes.SHOW_VIEWER;
}

export class HideViewerControl implements Action {
  readonly type = ControlActionTypes.HIDE_VIEWER;
}


export class ProcessingControl implements Action {
  readonly type = ControlActionTypes.PROCESSING;
}

export class NotProcessingControl implements Action {
  readonly type = ControlActionTypes.NOT_PROCESSING;
}

export class ProcessingGridControl implements Action {
  readonly type = ControlActionTypes.PROCESSING_GRID;
}

export class NotProcessingGridControl implements Action {
  readonly type = ControlActionTypes.NOT_PROCESSING_GRID;
}

export class LoadDataControl implements Action {
  readonly type = ControlActionTypes.LOAD_DATA;
  constructor(public payload: { pageID: number }) {}
}

export class LoadDataControlSuccess implements Action {
  readonly type = ControlActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IControl[]) {}
}

export class LoadSectionListControl implements Action {
  readonly type = ControlActionTypes.LOAD_SECTION_LIST;
  constructor(public payload: { pageID: number, widgetID: number }) {}
}

export class LoadSectionListControlSuccess implements Action {
  readonly type = ControlActionTypes.LOAD_SECTION_LIST_SUCCESS;

  constructor(public payload: ISection[]) {}
}


export class LoadCustomPageListControl implements Action {
  readonly type = ControlActionTypes.LOAD_CUSTOM_PAGE_LIST;
  constructor(public payload: number){}
}

export class LoadCustomPageListControlSuccess implements Action {
  readonly type = ControlActionTypes.LOAD_CUSTOM_PAGE_LIST_SUCCESS;

  constructor(public payload: IPage[]) {}
}

export class LoadDocumentControl implements Action {
  readonly type = ControlActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentControlSuccess implements Action {
  readonly type = ControlActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentControl implements Action {
  readonly type = ControlActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentControl implements Action {
  readonly type = ControlActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}


export class SaveControl implements Action {
  readonly type = ControlActionTypes.SAVE;

  constructor(public payload: {data: IControl, recordId: number, editMode: boolean}) {}
}

export class AddControl implements Action {
  readonly type = ControlActionTypes.ADD;

  constructor(public payload: {data: IControl}) {}
}


export class DeleteDataControl implements Action {
  readonly type = ControlActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number}) {}
}


export class RemoveDataControl implements Action {
  readonly type = ControlActionTypes.REMOVE_DATA;

  constructor(public payload: {recordId: number}) {}
}

export type ControlActions =
  | ShowEditorControl
  | HideEditorControl
  | ShowViewerControl
  | HideViewerControl
  | ProcessingControl
  | NotProcessingControl
  | ProcessingGridControl
  | NotProcessingGridControl
  | LoadDataControl
  | LoadDataControlSuccess
  | LoadDocumentControl
  | LoadDocumentControlSuccess
  | ClearDocumentControl
  | LoadInlineDocumentControl
  | SaveControl
  | AddControl
  | DeleteDataControl
  | RemoveDataControl
  | LoadCustomPageListControl
  | LoadCustomPageListControlSuccess
  | LoadSectionListControl
  | LoadSectionListControlSuccess;
