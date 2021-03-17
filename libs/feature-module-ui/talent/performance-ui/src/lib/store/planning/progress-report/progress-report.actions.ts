import { Action } from '@ngrx/store';
import { IProgressDefinition, IObjectiveMasterDto } from '@nutela/models/talent/performance';
import { IProgressTransaction } from 'libs/models/talent/performance/src/lib/interfaces/progress-transaction.interface';
import { IImageCache } from '../../../interfaces';

export enum ProgressReportActionTypes {
  SHOW_PROGRESS_DEFINITION_EDITOR = '[PERFORMANCE PROGRESS REPORT] Show Progress Definition Editor',
  HIDE_PROGRESS_DEFINITION_EDITOR = '[PERFORMANCE PROGRESS REPORT] Hide Progress Definition Editor',

  SHOW_PROGRESS_TRANSACTION_EDITOR = '[PERFORMANCE PROGRESS REPORT] Show Progress Transaction Editor',
  HIDE_PROGRESS_TRANSACTION_EDITOR = '[PERFORMANCE PROGRESS REPORT] Hide Progress Transaction Editor',

  PROCESSING = '[PERFORMANCE PROGRESS REPORT] Processing',
  NOT_PROCESSING = '[PERFORMANCE PROGRESS REPORT] Not Processing',

  LOAD_PROGRESS_OBJECTIVE_INFO = '[PERFORMANCE PROGRESS REPORT] Load Progress Objective Info',
  LOAD_PROGRESS_OBJECTIVE_INFO_SUCCESS = '[PERFORMANCE PROGRESS REPORT] Load Progress Objective Info Success',

  LOAD_PROGRESS_DEFINITION_INFO = '[PERFORMANCE PROGRESS REPORT] Load Progress Definition Info',
  LOAD_PROGRESS_DEFINITION_INFO_SUCCESS = '[PERFORMANCE PROGRESS REPORT] Load Progress Definition Info Success',

  LOAD_SINGLE_PROGRESS_DEFINITION_INFO = '[PERFORMANCE PROGRESS REPORT] Load Single Progress Definition Info',
  LOAD_SINGLE_PROGRESS_DEFINITION_INFO_SUCCESS = '[PERFORMANCE PROGRESS REPORT] Load Single Progress Definition Info Success',

  LOAD_PROGRESS_TRANSACTION_INFO = '[PERFORMANCE PROGRESS REPORT] Load Progress Transaction Info',
  LOAD_PROGRESS_TRANSACTION_INFO_SUCCESS = '[PERFORMANCE PROGRESS REPORT] Load Progress Transaction Info Success',

  SAVE_PROGRESS_DEFINITION = '[PERFORMANCE PROGRESS REPORT] Save Progress Definition',
  SAVE_PROGRESS_DEFINITION_SUCCESS = '[PERFORMANCE PROGRESS REPORT] Save Progress Definition Success',
  SAVE_PROGRESS_DEFINITION_FAILURE = '[PERFORMANCE PROGRESS REPORT] Save Progress Definition Failure',

  SAVE_PROGRESS_TRANSACTION = '[PERFORMANCE PROGRESS REPORT] Save Progress Transaction',
  SAVE_PROGRESS_TRANSACTION_SUCCESS = '[PERFORMANCE PROGRESS REPORT] Save Progress Transaction Success',
  SAVE_PROGRESS_TRANSACTION_FAILURE = '[PERFORMANCE PROGRESS REPORT] Save Progress Transaction Failure',

  REMOVE_PROGRESS_TRANSACTION = '[PERFORMANCE PROGRESS REPORT] Remove Progress Transaction',
  REMOVE_PROGRESS_TRANSACTION_SUCCESS = '[PERFORMANCE PROGRESS REPORT] Remove Progress Transaction Success',


  REMOVE_PROGRESS_DEFINITION = '[PERFORMANCE PROGRESS REPORT] Remove Progress Definition',

  
  LOAD_INLINE_DOCUMENT = '[PERFORMANCE PROGRESS REPORT] Load Inline Document',
  LOAD_INLINE_DOCUMENT_SUCCESS = '[PERFORMANCE PROGRESS REPORT] Load Inline Document Success',

  LOAD_IMAGE_CACHE = '[PERFORMANCE PROGRESS REPORT] Load Image Cache',
  LOAD_IMAGE_CACHE_SUCCESS = '[PERFORMANCE PROGRESS REPORT] Load Image Cache Success',

  SET_LM_STATUS = '[PERFORMANCE PROGRESS REPORT] Set Line Manager Status',

  RESET_COMPONENT = '[PERFORMANCE PROGRESS REPORT] Reset Component',
}

export class ShowProgressDefinitionEditor implements Action {
  readonly type = ProgressReportActionTypes.SHOW_PROGRESS_DEFINITION_EDITOR;
}

export class HideProgressDefinitionEditor implements Action {
  readonly type = ProgressReportActionTypes.HIDE_PROGRESS_DEFINITION_EDITOR;
}

export class ShowProgressTransactionEditor implements Action {
  readonly type = ProgressReportActionTypes.SHOW_PROGRESS_TRANSACTION_EDITOR;
}

export class HideProgressTransactionEditor implements Action {
  readonly type = ProgressReportActionTypes.HIDE_PROGRESS_TRANSACTION_EDITOR;
}

export class ProcessingProgressReport implements Action {
  readonly type = ProgressReportActionTypes.PROCESSING;
}

export class NotProcessingProgressReport implements Action {
  readonly type = ProgressReportActionTypes.NOT_PROCESSING;
}

export class LoadProgressInfoProgressReport implements Action {
  readonly type = ProgressReportActionTypes.LOAD_PROGRESS_DEFINITION_INFO;
  constructor(public payload: number) {}
}

export class LoadProgressInfoProgressReportSuccess implements Action {
  readonly type = ProgressReportActionTypes.LOAD_PROGRESS_DEFINITION_INFO_SUCCESS;
  constructor(public payload: IProgressDefinition[]) {}
}

export class LoadSingleProgressInfoProgressReport implements Action {
  readonly type = ProgressReportActionTypes.LOAD_SINGLE_PROGRESS_DEFINITION_INFO;
  constructor(public payload: number) {}
}

export class LoadSingleProgressInfoProgressReportSuccess implements Action {
  readonly type = ProgressReportActionTypes.LOAD_SINGLE_PROGRESS_DEFINITION_INFO_SUCCESS;
  constructor(public payload: IProgressDefinition) {}
}

export class LoadProgressTransactionInfo implements Action {
  readonly type = ProgressReportActionTypes.LOAD_PROGRESS_TRANSACTION_INFO;
  constructor(public payload: number) {  }
}

export class LoadProgressTransactionInfoSuccess implements Action {
  readonly type = ProgressReportActionTypes.LOAD_PROGRESS_TRANSACTION_INFO_SUCCESS;
  constructor(public payload: IProgressTransaction[]) {}
}

export class SaveProgressDefinition implements Action {
  readonly type = ProgressReportActionTypes.SAVE_PROGRESS_DEFINITION;
  constructor(public payload: { progressDefData: IProgressDefinition }) {}
}

export class SaveProgressDefinitionSuccess implements Action {
  readonly type = ProgressReportActionTypes.SAVE_PROGRESS_DEFINITION_SUCCESS;
}

export class SaveProgressDefinitionFailure implements Action {
  readonly type = ProgressReportActionTypes.SAVE_PROGRESS_DEFINITION_FAILURE;

  constructor(public error: any) {}
}

export class SaveProgressTransaction implements Action {
  readonly type = ProgressReportActionTypes.SAVE_PROGRESS_TRANSACTION;
  constructor(public payload: { progressTransData: IProgressTransaction, objectiveId: number }) {}
}

export class SaveProgressTransactionSuccess implements Action {
  readonly type = ProgressReportActionTypes.SAVE_PROGRESS_TRANSACTION_SUCCESS;
}

export class SaveProgressTransactionFailure implements Action {
  readonly type = ProgressReportActionTypes.SAVE_PROGRESS_TRANSACTION_FAILURE;

  constructor(public error: any) {}
}

export class RemoveProgressTransaction implements Action {
  readonly type = ProgressReportActionTypes.REMOVE_PROGRESS_TRANSACTION;

  constructor(public payload: {recordId: number, objectiveId: number}) {}
}

export class RemoveProgressTransactionSuccess implements Action {
  readonly type = ProgressReportActionTypes.REMOVE_PROGRESS_TRANSACTION_SUCCESS;
}

export class RemoveProgressDefinition implements Action {
  readonly type = ProgressReportActionTypes.REMOVE_PROGRESS_DEFINITION;

  constructor(public payload: {recordId: number, objectiveId: number}) {}
}

export class LoadInlineDocumentProgressTransaction implements Action {
  readonly type = ProgressReportActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number}) {}
}

export class LoadInlineDocumentProgressTransactionSuccess implements Action {
  readonly type = ProgressReportActionTypes.LOAD_INLINE_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadImageCacheProgressReport implements Action {
  readonly type = ProgressReportActionTypes.LOAD_IMAGE_CACHE;

  constructor(public payload: {recordId: number}) {}
}

export class LoadImageCacheProgressReportSuccess implements Action {
  readonly type = ProgressReportActionTypes.LOAD_IMAGE_CACHE_SUCCESS;

  constructor(public payload: IImageCache[]) {}
}

export class LoadObjectiveMasterDataByIdManageObjectives implements Action {
  readonly type = ProgressReportActionTypes.LOAD_PROGRESS_OBJECTIVE_INFO;

  constructor(public payload: number) {}
}

export class LoadObjectiveMasterDataByIdManageObjectivesSuccess implements Action {
  readonly type = ProgressReportActionTypes.LOAD_PROGRESS_OBJECTIVE_INFO_SUCCESS;

  constructor(public payload: IObjectiveMasterDto) {}
}


export class SetLMStatusProgressDefinition implements Action {
  readonly type = ProgressReportActionTypes.SET_LM_STATUS;

  constructor(public payload: { status: boolean}) {}
}


export class ResetComponentProgressDefinition implements Action {
  readonly type = ProgressReportActionTypes.RESET_COMPONENT;
}

export type ProgressReportActions =
  | ShowProgressDefinitionEditor
  | HideProgressDefinitionEditor
  | ShowProgressTransactionEditor
  | HideProgressTransactionEditor
  | ProcessingProgressReport
  | NotProcessingProgressReport
  | LoadProgressInfoProgressReport
  | LoadProgressInfoProgressReportSuccess
  | LoadProgressTransactionInfo
  | LoadProgressTransactionInfoSuccess
  | SaveProgressDefinition
  | SaveProgressDefinitionSuccess
  | SaveProgressDefinitionFailure
  | SaveProgressTransaction
  | SaveProgressTransactionSuccess
  | SaveProgressTransactionFailure
  | RemoveProgressDefinition
  | RemoveProgressTransaction
  | RemoveProgressTransactionSuccess
  | LoadInlineDocumentProgressTransaction
  | LoadInlineDocumentProgressTransactionSuccess
  | LoadImageCacheProgressReport
  | LoadImageCacheProgressReportSuccess
  | LoadObjectiveMasterDataByIdManageObjectives
  | LoadObjectiveMasterDataByIdManageObjectivesSuccess
  | LoadSingleProgressInfoProgressReport
  | LoadSingleProgressInfoProgressReportSuccess
  | SetLMStatusProgressDefinition
  | ResetComponentProgressDefinition;
