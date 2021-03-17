import { Action } from '@ngrx/store';

import { IPage } from '@nutela/models/talent/performance';
import { ISelectOption } from '@nutela/models/core-data';

export enum PageActionTypes {
  SHOW_EDITOR = '[PERFORMANCE SETUPS PAGES] Show Editor',
  HIDE_EDITOR = '[PERFORMANCE SETUPS PAGES] Hide Editor',

  SHOW_VIEWER = '[PERFORMANCE SETUPS PAGES] Show Viewer',
  HIDE_VIEWER = '[PERFORMANCE SETUPS PAGES] Hide Viewer',

  PROCESSING = '[PERFORMANCE SETUPS PAGES] Processing',
  NOT_PROCESSING = '[PERFORMANCE SETUPS PAGES] Not Processing',

  LOAD_DATA = '[PERFORMANCE SETUPS PAGES] Load Data',
  LOAD_DATA_SUCCESS = '[PERFORMANCE SETUPS PAGES] Load Data Success',

  LOAD_PAGE_TYPE = '[PERFORMANCE SETUPS PAGES] Load Page Type',
  LOAD_PAGE_TYPE_SUCCESS = '[PERFORMANCE SETUPS PAGES] Load Page Type Success',

  LOAD_COMPLETED_PAGE_DATA = '[PERFORMANCE SETUPS PAGES] Load Completed Page Data',
  LOAD_COMPLETED_PAGE_DATA_SUCCESS = '[PERFORMANCE SETUPS PAGES] Load Completed Page Data Success',

  LOAD_UNCOMPLETED_PAGE_DATA = '[PERFORMANCE SETUPS PAGES] Load Uncompleted Page Data',
  LOAD_UNCOMPLETED_PAGE_DATA_SUCCESS = '[PERFORMANCE SETUPS PAGES] Load Uncompleted Page Data Success',

  LOAD_DOCUMENT = '[PERFORMANCE SETUPS PAGES] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[PERFORMANCE SETUPS PAGES] Load Document Success',
  CLEAR_DOCUMENT = '[PERFORMANCE SETUPS PAGES] Clear Document',

  LOAD_INLINE_DOCUMENT = '[PERFORMANCE SETUPS PAGES] Load Inline Document',

  SAVE = '[PERFORMANCE SETUPS PAGES] Save',
  SAVE_SUCCESS = '[PERFORMANCE SETUPS PAGES] Save Success',

  ADD = '[PERFORMANCE SETUPS PAGES] Add',
  ADD_SUCCESS = '[PERFORMANCE SETUPS PAGES] Add Success',

  DELETE_DATA = '[PERFORMANCE SETUPS PAGES] Delete Data',

  REMOVE_DATA = '[PERFORMANCE SETUPS PAGES] Remove Data',

}

export class ShowEditorPage implements Action {
  readonly type = PageActionTypes.SHOW_EDITOR;
}

export class HideEditorPage implements Action {
  readonly type = PageActionTypes.HIDE_EDITOR;
}


export class ShowViewerPage implements Action {
  readonly type = PageActionTypes.SHOW_VIEWER;
}

export class HideViewerPage implements Action {
  readonly type = PageActionTypes.HIDE_VIEWER;
}


export class ProcessingPage implements Action {
  readonly type = PageActionTypes.PROCESSING;
}

export class NotProcessingPage implements Action {
  readonly type = PageActionTypes.NOT_PROCESSING;
}


export class LoadDataPage implements Action {
  readonly type = PageActionTypes.LOAD_DATA;
}

export class LoadDataPageSuccess implements Action {
  readonly type = PageActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IPage[]) {}
}

export class LoadPageType implements Action {
  readonly type = PageActionTypes.LOAD_PAGE_TYPE;
}

export class LoadPageTypeSuccess implements Action {
  readonly type = PageActionTypes.LOAD_PAGE_TYPE_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}


export class LoadCompletedDataPage implements Action {
  readonly type = PageActionTypes.LOAD_COMPLETED_PAGE_DATA;
}

export class LoadCompletedDataPageSuccess implements Action {
  readonly type = PageActionTypes.LOAD_COMPLETED_PAGE_DATA_SUCCESS;

  constructor(public payload: IPage[]) {}
}

export class LoadUncompletedDataPage implements Action {
  readonly type = PageActionTypes.LOAD_UNCOMPLETED_PAGE_DATA;
}

export class LoadUncompletedDataPageSuccess implements Action {
  readonly type = PageActionTypes.LOAD_UNCOMPLETED_PAGE_DATA_SUCCESS;

  constructor(public payload: IPage[]) {}
}


export class LoadDocumentPage implements Action {
  readonly type = PageActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentPageSuccess implements Action {
  readonly type = PageActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentPage implements Action {
  readonly type = PageActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentPage implements Action {
  readonly type = PageActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}


export class SavePage implements Action {
  readonly type = PageActionTypes.SAVE;

  constructor(public payload: {data: IPage, recordId: number, editMode: boolean}) {}
}

export class AddPage implements Action {
  readonly type = PageActionTypes.ADD;

  constructor(public payload: {data: IPage}) {}
}


export class DeleteDataPage implements Action {
  readonly type = PageActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number}) {}
}


export class RemoveDataPage implements Action {
  readonly type = PageActionTypes.REMOVE_DATA;

  constructor(public payload: {recordId: number}) {}
}

export type PageActions =
  | ShowEditorPage
  | HideEditorPage
  | ShowViewerPage
  | HideViewerPage
  | ProcessingPage
  | NotProcessingPage
  | LoadDataPage
  | LoadPageType
  | LoadPageTypeSuccess
  | LoadDataPageSuccess
  | LoadDocumentPage
  | LoadDocumentPageSuccess
  | ClearDocumentPage
  | LoadInlineDocumentPage
  | SavePage
  | AddPage
  | DeleteDataPage
  | RemoveDataPage
  | LoadCompletedDataPage
  | LoadCompletedDataPageSuccess
  | LoadUncompletedDataPage
  | LoadUncompletedDataPageSuccess;
