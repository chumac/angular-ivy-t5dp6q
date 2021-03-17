import { Action } from '@ngrx/store';

import { IFormTemplateDetail, IFormTemplate, IPage } from '@nutela/models/talent/performance';

export enum FormTemplateDetailActionTypes {
  SHOW_EDITOR = '[PERFORMANCE SETUPS FORM_TEMPLATE_DETAILS] Show Editor',
  HIDE_EDITOR = '[PERFORMANCE SETUPS FORM_TEMPLATE_DETAILS] Hide Editor',

  SHOW_VIEWER = '[PERFORMANCE SETUPS FORM_TEMPLATE_DETAILS] Show Viewer',
  HIDE_VIEWER = '[PERFORMANCE SETUPS FORM_TEMPLATE_DETAILS] Hide Viewer',

  PROCESSING = '[PERFORMANCE SETUPS FORM_TEMPLATE_DETAILS] Processing',
  NOT_PROCESSING = '[PERFORMANCE SETUPS FORM_TEMPLATE_DETAILS] Not Processing',

  LOAD_DATA = '[PERFORMANCE SETUPS FORM_TEMPLATE_DETAILS] Load Data',
  LOAD_DATA_SUCCESS = '[PERFORMANCE SETUPS FORM_TEMPLATE_DETAILS] Load Data Success',

  LOAD_FORM_TEMPLATE_DATA = '[PERFORMANCE SETUPS FORM_TEMPLATE_DETAILS] Load Form Template List',
  LOAD_FORM_TEMPLATE_DATA_SUCCESS = '[PERFORMANCE SETUPS FORM_TEMPLATE_DETAILS] Load Form Template List Success',

  LOAD_PAGE_LIST = '[PERFORMANCE SETUPS FORM_TEMPLATE_DETAILS] Load Page List',
  LOAD_PAGE_LIST_SUCCESS = '[PERFORMANCE SETUPS FORM_TEMPLATE_DETAILS] Load Page List Success',

  LOAD_DOCUMENT = '[PERFORMANCE SETUPS FORM_TEMPLATE_DETAILS] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[PERFORMANCE SETUPS FORM_TEMPLATE_DETAILS] Load Document Success',
  CLEAR_DOCUMENT = '[PERFORMANCE SETUPS FORM_TEMPLATE_DETAILS] Clear Document',

  LOAD_INLINE_DOCUMENT = '[PERFORMANCE SETUPS FORM_TEMPLATE_DETAILS] Load Inline Document',

  SAVE = '[PERFORMANCE SETUPS FORM_TEMPLATE_DETAILS] Save',
  SAVE_SUCCESS = '[PERFORMANCE SETUPS FORM_TEMPLATE_DETAILS] Save Success',

  ADD = '[PERFORMANCE SETUPS FORM_TEMPLATE_DETAILS] Add',
  ADD_SUCCESS = '[PERFORMANCE SETUPS FORM_TEMPLATE_DETAILS] Add Success',

  DELETE_DATA = '[PERFORMANCE SETUPS FORM_TEMPLATE_DETAILS] Delete Data',

  REMOVE_DATA = '[PERFORMANCE SETUPS FORM_TEMPLATE_DETAILS] Remove Data',

}

export class ShowEditorFormTemplateDetail implements Action {
  readonly type = FormTemplateDetailActionTypes.SHOW_EDITOR;
}

export class HideEditorFormTemplateDetail implements Action {
  readonly type = FormTemplateDetailActionTypes.HIDE_EDITOR;
}


export class ShowViewerFormTemplateDetail implements Action {
  readonly type = FormTemplateDetailActionTypes.SHOW_VIEWER;
}

export class HideViewerFormTemplateDetail implements Action {
  readonly type = FormTemplateDetailActionTypes.HIDE_VIEWER;
}


export class ProcessingFormTemplateDetail implements Action {
  readonly type = FormTemplateDetailActionTypes.PROCESSING;
}

export class NotProcessingFormTemplateDetail implements Action {
  readonly type = FormTemplateDetailActionTypes.NOT_PROCESSING;
}


export class LoadDataFormTemplateDetail implements Action {
  readonly type = FormTemplateDetailActionTypes.LOAD_DATA;
  constructor(public payload: {formTemplateId: number}) {}
}

export class LoadDataFormTemplateDetailSuccess implements Action {
  readonly type = FormTemplateDetailActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IFormTemplateDetail[]) {}
}

export class LoadTemplateListFormTemplateDetail implements Action {
  readonly type = FormTemplateDetailActionTypes.LOAD_FORM_TEMPLATE_DATA;
}

export class LoadTemplateListFormTemplateDetailSuccess implements Action {
  readonly type = FormTemplateDetailActionTypes.LOAD_FORM_TEMPLATE_DATA_SUCCESS;

  constructor(public payload: IFormTemplate[]) {}
}

export class LoadPageListFormTemplateDetail implements Action {
  readonly type = FormTemplateDetailActionTypes.LOAD_PAGE_LIST;
}

export class LoadPageListFormTemplateDetailSuccess implements Action {
  readonly type = FormTemplateDetailActionTypes.LOAD_PAGE_LIST_SUCCESS;

  constructor(public payload: IPage[]) {}
}


export class LoadDocumentFormTemplateDetail implements Action {
  readonly type = FormTemplateDetailActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentFormTemplateDetailSuccess implements Action {
  readonly type = FormTemplateDetailActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentFormTemplateDetail implements Action {
  readonly type = FormTemplateDetailActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentFormTemplateDetail implements Action {
  readonly type = FormTemplateDetailActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}


export class SaveFormTemplateDetail implements Action {
  readonly type = FormTemplateDetailActionTypes.SAVE;

  constructor(public payload: {data: IFormTemplateDetail, recordId: number, editMode: boolean, formTemplateId: number}) {}
}

export class AddFormTemplateDetail implements Action {
  readonly type = FormTemplateDetailActionTypes.ADD;

  constructor(public payload: {data: IFormTemplateDetail, formTemplateId: number}) {}
}


export class DeleteDataFormTemplateDetail implements Action {
  readonly type = FormTemplateDetailActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number, formTemplateId: number}) {}
}


export class RemoveDataFormTemplateDetail implements Action {
  readonly type = FormTemplateDetailActionTypes.REMOVE_DATA;

  constructor(public payload: {recordId: number}) {}
}

export type FormTemplateDetailActions =
  | ShowEditorFormTemplateDetail
  | HideEditorFormTemplateDetail
  | ShowViewerFormTemplateDetail
  | HideViewerFormTemplateDetail
  | ProcessingFormTemplateDetail
  | NotProcessingFormTemplateDetail
  | LoadDataFormTemplateDetail
  | LoadDataFormTemplateDetailSuccess
  | LoadDocumentFormTemplateDetail
  | LoadDocumentFormTemplateDetailSuccess
  | LoadTemplateListFormTemplateDetail
  | LoadTemplateListFormTemplateDetailSuccess
  | LoadPageListFormTemplateDetail
  | LoadPageListFormTemplateDetailSuccess
  | ClearDocumentFormTemplateDetail
  | LoadInlineDocumentFormTemplateDetail
  | SaveFormTemplateDetail
  | AddFormTemplateDetail
  | DeleteDataFormTemplateDetail
  | RemoveDataFormTemplateDetail;
