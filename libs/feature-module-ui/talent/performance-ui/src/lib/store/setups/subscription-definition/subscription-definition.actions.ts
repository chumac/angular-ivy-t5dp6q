import { Action } from '@ngrx/store'; 

import { ISubscriptionDefinition, IPage } from '@nutela/models/talent/performance';

export enum SubscriptionDefinitionActionTypes {
  SHOW_EDITOR = '[PERFORMANCE SETUPS SUBSCRIPTION_DEFINITIONS] Show Editor',
  HIDE_EDITOR = '[PERFORMANCE SETUPS SUBSCRIPTION_DEFINITIONS] Hide Editor',

  SHOW_VIEWER = '[PERFORMANCE SETUPS SUBSCRIPTION_DEFINITIONS] Show Viewer',
  HIDE_VIEWER = '[PERFORMANCE SETUPS SUBSCRIPTION_DEFINITIONS] Hide Viewer',

  PROCESSING = '[PERFORMANCE SETUPS SUBSCRIPTION_DEFINITIONS] Processing',
  NOT_PROCESSING = '[PERFORMANCE SETUPS SUBSCRIPTION_DEFINITIONS] Not Processing',

  LOAD_DATA = '[PERFORMANCE SETUPS SUBSCRIPTION_DEFINITIONS] Load Data',
  LOAD_DATA_SUCCESS = '[PERFORMANCE SETUPS SUBSCRIPTION_DEFINITIONS] Load Data Success',

  LOAD_SUBSCRIPTION_PAGE_LIST = '[PERFORMANCE SETUPS SUBSCRIPTION_DEFINITIONS] Load Subscription Page List',
  LOAD_SUBSCRIPTION_PAGE_LIST_SUCCESS = '[PERFORMANCE SETUPS SUBSCRIPTION_DEFINITIONS] Load Subscription Page List Success',


  LOAD_DOCUMENT = '[PERFORMANCE SETUPS SUBSCRIPTION_DEFINITIONS] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[PERFORMANCE SETUPS SUBSCRIPTION_DEFINITIONS] Load Document Success',
  CLEAR_DOCUMENT = '[PERFORMANCE SETUPS SUBSCRIPTION_DEFINITIONS] Clear Document',

  LOAD_INLINE_DOCUMENT = '[PERFORMANCE SETUPS SUBSCRIPTION_DEFINITIONS] Load Inline Document',

  SAVE = '[PERFORMANCE SETUPS SUBSCRIPTION_DEFINITIONS] Save',
  SAVE_SUCCESS = '[PERFORMANCE SETUPS SUBSCRIPTION_DEFINITIONS] Save Success',

  ADD = '[PERFORMANCE SETUPS SUBSCRIPTION_DEFINITIONS] Add',
  ADD_SUCCESS = '[PERFORMANCE SETUPS SUBSCRIPTION_DEFINITIONS] Add Success',

  DELETE_DATA = '[PERFORMANCE SETUPS SUBSCRIPTION_DEFINITIONS] Delete Data',

  REMOVE_DATA = '[PERFORMANCE SETUPS SUBSCRIPTION_DEFINITIONS] Remove Data',

}

export class ShowEditorSubscriptionDefinition implements Action {
  readonly type = SubscriptionDefinitionActionTypes.SHOW_EDITOR;
}

export class HideEditorSubscriptionDefinition implements Action {
  readonly type = SubscriptionDefinitionActionTypes.HIDE_EDITOR;
}


export class ShowViewerSubscriptionDefinition implements Action {
  readonly type = SubscriptionDefinitionActionTypes.SHOW_VIEWER;
}

export class HideViewerSubscriptionDefinition implements Action {
  readonly type = SubscriptionDefinitionActionTypes.HIDE_VIEWER;
}


export class ProcessingSubscriptionDefinition implements Action {
  readonly type = SubscriptionDefinitionActionTypes.PROCESSING;
}

export class NotProcessingSubscriptionDefinition implements Action {
  readonly type = SubscriptionDefinitionActionTypes.NOT_PROCESSING;
}


export class LoadDataSubscriptionDefinition implements Action {
  readonly type = SubscriptionDefinitionActionTypes.LOAD_DATA;
}

export class LoadDataSubscriptionDefinitionSuccess implements Action {
  readonly type = SubscriptionDefinitionActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: ISubscriptionDefinition[]) {}
}

export class LoadSubscriptionPageListSubscriptionDefinition implements Action {
  readonly type = SubscriptionDefinitionActionTypes.LOAD_SUBSCRIPTION_PAGE_LIST;
  constructor(public payload: number){}
}

export class LoadSubscriptionPageListSubscriptionDefinitionSuccess implements Action {
  readonly type = SubscriptionDefinitionActionTypes.LOAD_SUBSCRIPTION_PAGE_LIST_SUCCESS;

  constructor(public payload: IPage[]) {}
}

export class LoadDocumentSubscriptionDefinition implements Action {
  readonly type = SubscriptionDefinitionActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentSubscriptionDefinitionSuccess implements Action {
  readonly type = SubscriptionDefinitionActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentSubscriptionDefinition implements Action {
  readonly type = SubscriptionDefinitionActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentSubscriptionDefinition implements Action {
  readonly type = SubscriptionDefinitionActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}


export class SaveSubscriptionDefinition implements Action {
  readonly type = SubscriptionDefinitionActionTypes.SAVE;

  constructor(public payload: {data: ISubscriptionDefinition, recordId: number, editMode: boolean}) {}
}

export class AddSubscriptionDefinition implements Action {
  readonly type = SubscriptionDefinitionActionTypes.ADD;

  constructor(public payload: {data: ISubscriptionDefinition}) {}
}


export class DeleteDataSubscriptionDefinition implements Action {
  readonly type = SubscriptionDefinitionActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number}) {}
}


export class RemoveDataSubscriptionDefinition implements Action {
  readonly type = SubscriptionDefinitionActionTypes.REMOVE_DATA;

  constructor(public payload: {recordId: number}) {}
}

export type SubscriptionDefinitionActions =
  | ShowEditorSubscriptionDefinition
  | HideEditorSubscriptionDefinition
  | ShowViewerSubscriptionDefinition
  | HideViewerSubscriptionDefinition
  | ProcessingSubscriptionDefinition
  | NotProcessingSubscriptionDefinition
  | LoadDataSubscriptionDefinition
  | LoadDataSubscriptionDefinitionSuccess
  | LoadSubscriptionPageListSubscriptionDefinition
  | LoadSubscriptionPageListSubscriptionDefinitionSuccess
  | LoadDocumentSubscriptionDefinition
  | LoadDocumentSubscriptionDefinitionSuccess
  | ClearDocumentSubscriptionDefinition
  | LoadInlineDocumentSubscriptionDefinition
  | SaveSubscriptionDefinition
  | AddSubscriptionDefinition
  | DeleteDataSubscriptionDefinition
  | RemoveDataSubscriptionDefinition;
