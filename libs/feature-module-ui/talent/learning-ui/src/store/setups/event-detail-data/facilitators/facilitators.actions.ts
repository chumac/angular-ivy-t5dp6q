import { Action } from '@ngrx/store';

import { IEventDetailFacilitators, IEventDetailFacilitatorsType } from '@nutela/models/talent/learning';

export enum FacilitatorsActionTypes {
  SHOW_EDITOR = '[LEARNING SETUPS FACILITATORS] Show Editor',
  HIDE_EDITOR = '[LEARNING SETUPS FACILITATORS] Hide Editor',

  SHOW_VIEWER = '[LEARNING SETUPS FACILITATORS] Show Viewer',
  HIDE_VIEWER = '[LEARNING SETUPS FACILITATORS] Hide Viewer',

  PROCESSING = '[LEARNING SETUPS FACILITATORS] Processing',
  NOT_PROCESSING = '[LEARNING SETUPS FACILITATORS] Not Processing',

  LOAD_DATA = '[LEARNING SETUPS FACILITATORS] Load Data',
  LOAD_DATA_SUCCESS = '[LEARNING SETUPS FACILITATORS] Load Data Success',

  LOAD_DATA_TYPE = '[LEARNING SETUPS FACILITATORS] Load Data Type',
  LOAD_DATA_TYPE_SUCCESS = '[LEARNING SETUPS FACILITATORS] Load Data Type Success',

  LOAD_EMPLOYEE = '[LEARNING SETUPS FACILITATORS] Load Employee',
  LOAD_EMPLOYEE_SUCCESS = '[LEARNING SETUPS FACILITATORS] Load Employee Success',

  LOAD_EVENT = '[LEARNING SETUPS FACILITATORS] Load Event',
  LOAD_EVENT_SUCCESS = '[LEARNING SETUPS FACILITATORS] Load Event Success',

  SAVE = '[LEARNING SETUPS FACILITATORS] Save',
  SAVE_SUCCESS = '[LEARNING SETUPS FACILITATORS] Save Success',

  LOAD_FACILITATORS_DOCUMENT = '[LEARNING SETUPS FACILITATORS] Load Document',
  LOAD_FACILITATORS_DOCUMENT_SUCCESS = '[LEARNING SETUPS FACILITATORS] Load Document Success',

  LOAD_FACILITATORS_IMAGE = '[LEARNING SETUPS FACILITATORS] Load image',
  LOAD_FACILITATORS_IMAGE_SUCCESS = '[LEARNING SETUPS FACILITATORS] Load image Success',

  ADD = '[LEARNING SETUPS FACILITATORS] Add',
  ADD_SUCCESS = '[LEARNING SETUPS FACILITATORS] Add Success',

  DELETE_DATA = '[LEARNING SETUPS FACILITATORS] Delete Data',

  REMOVE_DATA = '[LEARNING SETUPS FACILITATORS] Remove Data',

}

export class ShowEditorFacilitators implements Action {
  readonly type = FacilitatorsActionTypes.SHOW_EDITOR;
}

export class HideEditorFacilitators implements Action {
  readonly type = FacilitatorsActionTypes.HIDE_EDITOR;
}

export class ShowViewerFacilitators implements Action {
  readonly type = FacilitatorsActionTypes.SHOW_VIEWER;
}

export class HideViewerFacilitators implements Action {
  readonly type = FacilitatorsActionTypes.HIDE_VIEWER;
}

export class ProcessingFacilitators implements Action {
  readonly type = FacilitatorsActionTypes.PROCESSING;
}

export class NotProcessingFacilitators implements Action {
  readonly type = FacilitatorsActionTypes.NOT_PROCESSING;
}


export class LoadDataFacilitators implements Action {
  readonly type = FacilitatorsActionTypes.LOAD_DATA;

  constructor(public payload: {recordId: number}) {}
}

export class LoadDataFacilitatorsSuccess implements Action {
  readonly type = FacilitatorsActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IEventDetailFacilitators[]) {}
}


export class LoadEmployeeFacilitators implements Action {
  readonly type = FacilitatorsActionTypes.LOAD_EMPLOYEE;
}

export class LoadEventFacilitators implements Action {
  readonly type = FacilitatorsActionTypes.LOAD_EVENT;
}

export class SaveFacilitators implements Action {
  readonly type = FacilitatorsActionTypes.SAVE;

  constructor(public payload: {data: IEventDetailFacilitators, recordId: number, editMode: boolean, eventDetailId: number}) {}
}

export class AddFacilitators implements Action {
  readonly type = FacilitatorsActionTypes.ADD;

  constructor(public payload: {data: IEventDetailFacilitators, eventDetailId: number}) {}
}


export class DeleteDataFacilitators implements Action {
  readonly type = FacilitatorsActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number, eventDetailId: number}) {}
}


export class RemoveDataFacilitators implements Action {
  readonly type = FacilitatorsActionTypes.REMOVE_DATA;

  constructor(public payload: {recordId: number}) {}
}

export class LoadDataFacilitatorsType implements Action {
  readonly type = FacilitatorsActionTypes.LOAD_DATA_TYPE;
}

export class LoadDataFacilitatorsTypeSuccess implements Action {
  readonly type = FacilitatorsActionTypes.LOAD_DATA_TYPE_SUCCESS;

  constructor(public payload: IEventDetailFacilitatorsType[]) {}
}

export class LoadDocumentFacilitators implements Action {
  readonly type = FacilitatorsActionTypes.LOAD_FACILITATORS_DOCUMENT;

  constructor(public payload: {docGuid: string, docExt: string}) {}
}

export class LoadDocumentFacilitatorsSuccess implements Action {
  readonly type = FacilitatorsActionTypes.LOAD_FACILITATORS_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadImageFacilitators implements Action {
  readonly type = FacilitatorsActionTypes.LOAD_FACILITATORS_IMAGE;

  constructor(public payload: {docGuid: string, docExt: string}) {}
}

export class LoadImageFacilitatorsSuccess implements Action {
  readonly type = FacilitatorsActionTypes.LOAD_FACILITATORS_IMAGE_SUCCESS;

  constructor(public payload: any) {}
}

export type FacilitatorsActions =
  | ShowEditorFacilitators
  | HideEditorFacilitators
  | ShowViewerFacilitators
  | HideViewerFacilitators
  | ProcessingFacilitators
  | NotProcessingFacilitators
  | LoadDataFacilitators
  | LoadDataFacilitatorsSuccess
  | LoadEmployeeFacilitators
  | LoadEventFacilitators
  | SaveFacilitators
  | AddFacilitators
  | DeleteDataFacilitators
  | LoadDataFacilitatorsType
  | LoadDataFacilitatorsTypeSuccess
  | LoadDocumentFacilitators
  | LoadDocumentFacilitatorsSuccess
  | LoadImageFacilitators
  | LoadImageFacilitatorsSuccess
  | RemoveDataFacilitators;
