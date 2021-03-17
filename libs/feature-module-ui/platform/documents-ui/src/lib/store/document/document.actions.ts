import { Action } from '@ngrx/store';
import { IDocument, IDocumentType } from '@nutela/models/platform/document';

export enum DocumentActionTypes {
  LOAD_DOCUMENT_TYPE = '[DOCUMENT] Load Document Type',
  LOAD_DOCUMENT_TYPE_SUCCESS = '[DOCUMENT] Load Document Type Success',

  LOAD_DATA = '[DOCUMENT] Load Data',
  LOAD_DATA_SUCCESS = '[DOCUMENT] Load Data Success',

  PROCESSING = '[DOCUMENT] Processing',
  NOT_PROCESSING = '[DOCUMENT] Not Processing',

  LOADING_DOCUMENT = '[DOCUMENT] Loading Document',
  NOT_LOADING_DOCUMENT = '[DOCUMENT] Not Loading Document',

  DOWNLOAD_DOCUMENT = '[DOCUMENT] Download Document',
  DOWNLOAD_DOCUMENT_SUCCESS = '[DOCUMENT] Download Document Success'
}

export class LoadDataDocument implements Action {
  readonly type = DocumentActionTypes.LOAD_DATA;
  constructor(public payload: {recordId: number}) {}
}

export class LoadDataDocumentSuccess implements Action {
  readonly type = DocumentActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IDocument[]) {}
}

export class LoadDocumentType implements Action {
  readonly type = DocumentActionTypes.LOAD_DOCUMENT_TYPE;
}

export class LoadDocumentTypeSuccess implements Action {
  readonly type = DocumentActionTypes.LOAD_DOCUMENT_TYPE_SUCCESS;

  constructor(public payload: IDocumentType[]) {}
}


export class ProcessingDocument implements Action {
  readonly type = DocumentActionTypes.PROCESSING;
}

export class NotProcessingDocument implements Action {
  readonly type = DocumentActionTypes.NOT_PROCESSING;
}

export class LoadingDocument implements Action {
  readonly type = DocumentActionTypes.LOADING_DOCUMENT;
}

export class NotLoadingDocument implements Action {
  readonly type = DocumentActionTypes.NOT_LOADING_DOCUMENT;
}

export class DownloadDocument implements Action {
  readonly type = DocumentActionTypes.DOWNLOAD_DOCUMENT;
  constructor(public payload: {docGuId: string, docExt: string}) {}
}

export class DownloadDocumentSuccess implements Action {
  readonly type = DocumentActionTypes.DOWNLOAD_DOCUMENT_SUCCESS;
}

export type DocumentActions =
  | LoadDataDocument
  | LoadDataDocumentSuccess
  | ProcessingDocument
  | NotProcessingDocument
  | LoadingDocument
  | NotLoadingDocument
  | DownloadDocument
  | DownloadDocumentSuccess
  | LoadDocumentType
  | LoadDocumentTypeSuccess;
