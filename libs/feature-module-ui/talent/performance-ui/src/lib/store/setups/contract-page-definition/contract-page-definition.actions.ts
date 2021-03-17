import { Action } from '@ngrx/store';

import { IContractPageDefinition, IPage } from '@nutela/models/talent/performance';

export enum ContractPageDefinitionActionTypes {
  SHOW_EDITOR = '[PERFORMANCE SETUPS CONTRACT_PAGE_DEFINITIONS] Show Editor',
  HIDE_EDITOR = '[PERFORMANCE SETUPS CONTRACT_PAGE_DEFINITIONS] Hide Editor',

  SHOW_VIEWER = '[PERFORMANCE SETUPS CONTRACT_PAGE_DEFINITIONS] Show Viewer',
  HIDE_VIEWER = '[PERFORMANCE SETUPS CONTRACT_PAGE_DEFINITIONS] Hide Viewer',

  PROCESSING = '[PERFORMANCE SETUPS CONTRACT_PAGE_DEFINITIONS] Processing',
  NOT_PROCESSING = '[PERFORMANCE SETUPS CONTRACT_PAGE_DEFINITIONS] Not Processing',

  LOAD_DATA = '[PERFORMANCE SETUPS CONTRACT_PAGE_DEFINITIONS] Load Data',
  LOAD_DATA_SUCCESS = '[PERFORMANCE SETUPS CONTRACT_PAGE_DEFINITIONS] Load Data Success',

  LOAD_CONTRACT_PAGE_LIST = '[PERFORMANCE SETUPS CONTRACT_PAGE_DEFINITIONS] Load Contract Page List',
  LOAD_CONTRACT_PAGE_LIST_SUCCESS = '[PERFORMANCE SETUPS CONTRACT_PAGE_DEFINITIONS] Load Contract Page List Success',

  LOAD_DOCUMENT = '[PERFORMANCE SETUPS CONTRACT_PAGE_DEFINITIONS] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[PERFORMANCE SETUPS CONTRACT_PAGE_DEFINITIONS] Load Document Success',
  CLEAR_DOCUMENT = '[PERFORMANCE SETUPS CONTRACT_PAGE_DEFINITIONS] Clear Document',

  LOAD_INLINE_DOCUMENT = '[PERFORMANCE SETUPS CONTRACT_PAGE_DEFINITIONS] Load Inline Document',

  SAVE = '[PERFORMANCE SETUPS CONTRACT_PAGE_DEFINITIONS] Save',
  SAVE_SUCCESS = '[PERFORMANCE SETUPS CONTRACT_PAGE_DEFINITIONS] Save Success',

  ADD = '[PERFORMANCE SETUPS CONTRACT_PAGE_DEFINITIONS] Add',
  ADD_SUCCESS = '[PERFORMANCE SETUPS CONTRACT_PAGE_DEFINITIONS] Add Success',

  DELETE_DATA = '[PERFORMANCE SETUPS CONTRACT_PAGE_DEFINITIONS] Delete Data',

  REMOVE_DATA = '[PERFORMANCE SETUPS CONTRACT_PAGE_DEFINITIONS] Remove Data',

}

export class ShowEditorContractPageDefinition implements Action {
  readonly type = ContractPageDefinitionActionTypes.SHOW_EDITOR;
}

export class HideEditorContractPageDefinition implements Action {
  readonly type = ContractPageDefinitionActionTypes.HIDE_EDITOR;
}


export class ShowViewerContractPageDefinition implements Action {
  readonly type = ContractPageDefinitionActionTypes.SHOW_VIEWER;
}

export class HideViewerContractPageDefinition implements Action {
  readonly type = ContractPageDefinitionActionTypes.HIDE_VIEWER;
}


export class ProcessingContractPageDefinition implements Action {
  readonly type = ContractPageDefinitionActionTypes.PROCESSING;
}

export class NotProcessingContractPageDefinition implements Action {
  readonly type = ContractPageDefinitionActionTypes.NOT_PROCESSING;
}


export class LoadDataContractPageDefinition implements Action {
  readonly type = ContractPageDefinitionActionTypes.LOAD_DATA;
}

export class LoadDataContractPageDefinitionSuccess implements Action {
  readonly type = ContractPageDefinitionActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IContractPageDefinition[]) {}
}

export class LoadContractPageListContractPageDefinition implements Action {
  readonly type = ContractPageDefinitionActionTypes.LOAD_CONTRACT_PAGE_LIST;
  constructor(public payload: number){}
}

export class LoadContractPageListContractPageDefinitionSuccess implements Action {
  readonly type = ContractPageDefinitionActionTypes.LOAD_CONTRACT_PAGE_LIST_SUCCESS;

  constructor(public payload: IPage[]) {}
}
export class LoadDocumentContractPageDefinition implements Action {
  readonly type = ContractPageDefinitionActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentContractPageDefinitionSuccess implements Action {
  readonly type = ContractPageDefinitionActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentContractPageDefinition implements Action {
  readonly type = ContractPageDefinitionActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentContractPageDefinition implements Action {
  readonly type = ContractPageDefinitionActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}


export class SaveContractPageDefinition implements Action {
  readonly type = ContractPageDefinitionActionTypes.SAVE;

  constructor(public payload: {data: IContractPageDefinition, recordId: number, editMode: boolean}) {}
}

export class AddContractPageDefinition implements Action {
  readonly type = ContractPageDefinitionActionTypes.ADD;

  constructor(public payload: {data: IContractPageDefinition}) {}
}


export class DeleteDataContractPageDefinition implements Action {
  readonly type = ContractPageDefinitionActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number}) {}
}


export class RemoveDataContractPageDefinition implements Action {
  readonly type = ContractPageDefinitionActionTypes.REMOVE_DATA;

  constructor(public payload: {recordId: number}) {}
}

export type ContractPageDefinitionActions =
  | ShowEditorContractPageDefinition
  | HideEditorContractPageDefinition
  | ShowViewerContractPageDefinition
  | HideViewerContractPageDefinition
  | ProcessingContractPageDefinition
  | NotProcessingContractPageDefinition
  | LoadDataContractPageDefinition
  | LoadDataContractPageDefinitionSuccess
  | LoadContractPageListContractPageDefinition
  | LoadContractPageListContractPageDefinitionSuccess
  | LoadDocumentContractPageDefinition
  | LoadDocumentContractPageDefinitionSuccess
  | ClearDocumentContractPageDefinition
  | LoadInlineDocumentContractPageDefinition
  | SaveContractPageDefinition
  | AddContractPageDefinition
  | DeleteDataContractPageDefinition
  | RemoveDataContractPageDefinition;
