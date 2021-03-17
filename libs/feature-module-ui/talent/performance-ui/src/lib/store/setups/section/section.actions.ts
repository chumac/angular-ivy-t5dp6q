import { Action } from '@ngrx/store';

import { ISection, IPage } from '@nutela/models/talent/performance';

export enum SectionActionTypes {
  SHOW_EDITOR = '[PERFORMANCE SETUPS SECTIONS] Show Editor',
  HIDE_EDITOR = '[PERFORMANCE SETUPS SECTIONS] Hide Editor',

  SHOW_VIEWER = '[PERFORMANCE SETUPS SECTIONS] Show Viewer',
  HIDE_VIEWER = '[PERFORMANCE SETUPS SECTIONS] Hide Viewer',

  PROCESSING = '[PERFORMANCE SETUPS SECTIONS] Processing',
  NOT_PROCESSING = '[PERFORMANCE SETUPS SECTIONS] Not Processing',

  PROCESSING_GRID = '[PERFORMANCE SETUPS SECTIONS] Processing Grid',
  NOT_PROCESSING_GRID = '[PERFORMANCE SETUPS SECTIONS] Not Processing Grid',

  LOAD_DATA = '[PERFORMANCE SETUPS SECTIONS] Load Data',
  LOAD_DATA_SUCCESS = '[PERFORMANCE SETUPS SECTIONS] Load Data Success',

  LOAD_CUSTOM_PAGE_LIST = '[PERFORMANCE SETUPS SECTIONS] Load Custom Page List',
  LOAD_CUSTOM_PAGE_LIST_SUCCESS = '[PERFORMANCE SETUPS SECTIONS] Load Custom Page List Success',

  LOAD_DOCUMENT = '[PERFORMANCE SETUPS SECTIONS] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[PERFORMANCE SETUPS SECTIONS] Load Document Success',
  CLEAR_DOCUMENT = '[PERFORMANCE SETUPS SECTIONS] Clear Document',

  LOAD_INLINE_DOCUMENT = '[PERFORMANCE SETUPS SECTIONS] Load Inline Document',

  SAVE = '[PERFORMANCE SETUPS SECTIONS] Save',
  SAVE_SUCCESS = '[PERFORMANCE SETUPS SECTIONS] Save Success',

  ADD = '[PERFORMANCE SETUPS SECTIONS] Add',
  ADD_SUCCESS = '[PERFORMANCE SETUPS SECTIONS] Add Success',

  DELETE_DATA = '[PERFORMANCE SETUPS SECTIONS] Delete Data',

  REMOVE_DATA = '[PERFORMANCE SETUPS SECTIONS] Remove Data',

}

export class ShowEditorSection implements Action {
  readonly type = SectionActionTypes.SHOW_EDITOR;
}

export class HideEditorSection implements Action {
  readonly type = SectionActionTypes.HIDE_EDITOR;
}


export class ShowViewerSection implements Action {
  readonly type = SectionActionTypes.SHOW_VIEWER;
}

export class HideViewerSection implements Action {
  readonly type = SectionActionTypes.HIDE_VIEWER;
}


export class ProcessingSection implements Action {
  readonly type = SectionActionTypes.PROCESSING;
}

export class NotProcessingSection implements Action {
  readonly type = SectionActionTypes.NOT_PROCESSING;
}

export class ProcessingGridSection implements Action {
  readonly type = SectionActionTypes.PROCESSING_GRID;
}

export class NotProcessingGridSection implements Action {
  readonly type = SectionActionTypes.NOT_PROCESSING_GRID;
}

export class LoadDataSection implements Action {
  readonly type = SectionActionTypes.LOAD_DATA;
  constructor(public payload: { pageID: number, widgetID: number }) {}
}

export class LoadDataSectionSuccess implements Action {
  readonly type = SectionActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: ISection[]) {}
}


export class LoadCustomPageListSection implements Action {
  readonly type = SectionActionTypes.LOAD_CUSTOM_PAGE_LIST;
  constructor(public payload: number){}
}

export class LoadCustomPageListSectionSuccess implements Action {
  readonly type = SectionActionTypes.LOAD_CUSTOM_PAGE_LIST_SUCCESS;

  constructor(public payload: IPage[]) {}
}

export class LoadDocumentSection implements Action {
  readonly type = SectionActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentSectionSuccess implements Action {
  readonly type = SectionActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentSection implements Action {
  readonly type = SectionActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentSection implements Action {
  readonly type = SectionActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}


export class SaveSection implements Action {
  readonly type = SectionActionTypes.SAVE;

  constructor(public payload: {data: ISection, recordId: number, editMode: boolean}) {}
}

export class AddSection implements Action {
  readonly type = SectionActionTypes.ADD;

  constructor(public payload: {data: ISection}) {}
}


export class DeleteDataSection implements Action {
  readonly type = SectionActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number}) {}
}


export class RemoveDataSection implements Action {
  readonly type = SectionActionTypes.REMOVE_DATA;

  constructor(public payload: {recordId: number}) {}
}

export type SectionActions =
  | ShowEditorSection
  | HideEditorSection
  | ShowViewerSection
  | HideViewerSection
  | ProcessingSection
  | NotProcessingSection
  | ProcessingGridSection
  | NotProcessingGridSection
  | LoadDataSection
  | LoadDataSectionSuccess
  | LoadDocumentSection
  | LoadDocumentSectionSuccess
  | ClearDocumentSection
  | LoadInlineDocumentSection
  | SaveSection
  | AddSection
  | DeleteDataSection
  | RemoveDataSection
  | LoadCustomPageListSection
  | LoadCustomPageListSectionSuccess;
