import { Action } from '@ngrx/store';
import { IDocumentTags } from '@nutela/models/platform/lookup';


export enum DocumentTagsActionTypes {

  SHOW_EDITOR = '[ DOCUMENT TAGS] Show Editor',
  HIDE_EDITOR = '[DOCUMENT TAGS] Hide Editor',

  PROCESSING = '[ DOCUMENT TAGS] Processing',
  NOT_PROCESSING = '[ DOCUMENT TAGS] Not Processing',

  LOAD_DOCUMENT_TAGS_DATA = '[ DOCUMENT TAGS] Load DOCUMENT TAGS Data',
  LOAD_DOCUMENT_TAGS_DATA_SUCCESS = '[ DOCUMENT TAGS] Load DOCUMENT TAGS Data Success',

  SAVE = '[DOCUMENT TAGS] Save',
  SAVE_SUCCESS = '[ DOCUMENT TAGS] Save Success', 

  UPDATE = '[UPDATE DOCUMENT TAGS] UPDATE',
  UPDATE_SUCCESS = '[UPDATE DOCUMENT TAGS] UPDATE Success', 

  DELETE = '[DOCUMENT TAGS] DELETE',
}


export class ShowEditorDocumentTags implements Action {
  readonly type = DocumentTagsActionTypes.SHOW_EDITOR;
}

export class HideEditorDocumentTags implements Action {
  readonly type = DocumentTagsActionTypes.HIDE_EDITOR;
}

export class ProcessingDocumentTags implements Action {
  readonly type = DocumentTagsActionTypes.PROCESSING;
}

export class NotProcessingDocumentTags implements Action {
  readonly type = DocumentTagsActionTypes.NOT_PROCESSING;
}


export class LoadDocumentTagsData implements Action {
  readonly type = DocumentTagsActionTypes.LOAD_DOCUMENT_TAGS_DATA;
}

export class LoadDocumentTagsSuccess implements Action {
  readonly type = DocumentTagsActionTypes.LOAD_DOCUMENT_TAGS_DATA_SUCCESS;

  constructor(public payload: IDocumentTags[]) {}
}


export class SaveDocumentTags implements Action {
  readonly type = DocumentTagsActionTypes.SAVE;

  constructor(public payload: {data: IDocumentTags}) {}
}

export class UpdateDocumentTags implements Action {
  readonly type = DocumentTagsActionTypes.UPDATE;
  constructor(public payload: {data: IDocumentTags, recordId: number}) {}
}

export class DeleteDocumentTags implements Action {
  readonly type = DocumentTagsActionTypes.DELETE;
  constructor(public payload: {recordId: number}) {}
}

export type DocumentTagsActions =
  | ShowEditorDocumentTags
  | HideEditorDocumentTags 
  | ProcessingDocumentTags
  | NotProcessingDocumentTags
  | LoadDocumentTagsData
  | LoadDocumentTagsSuccess
  | SaveDocumentTags
  | UpdateDocumentTags;
