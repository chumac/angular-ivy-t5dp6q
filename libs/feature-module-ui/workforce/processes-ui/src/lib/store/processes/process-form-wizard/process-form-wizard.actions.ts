import { Action } from '@ngrx/store';
import { IProcessFormArea, IProcessTransactionMaster, IProcessTransactionDetail, IProcessMetaData } from '@nutela/models/workforce/employee-profiles';

export enum ProcessFormWizardActionTypes {
  SHOW_EDITOR = '[PROCESS_FORM_WIZARDS] Show Editor',
  HIDE_EDITOR = '[PROCESS_FORM_WIZARDS] Hide Editor',

  SHOW_VIEWER = '[PROCESS_FORM_WIZARDS] Show Viewer',
  HIDE_VIEWER = '[PROCESS_FORM_WIZARDS] Hide Viewer',

  PROCESSING = '[PROCESS_FORM_WIZARDS] Processing',
  NOT_PROCESSING = '[PROCESS_FORM_WIZARDS] Not Processing',

  PROCESSING_MASTER = '[PROCESS_FORM_WIZARDS] Processing Master',
  NOT_PROCESSING_MASTER = '[PROCESS_FORM_WIZARDS] Not Processing Master',

  PROCESSING_DETAIL = '[PROCESS_FORM_WIZARDS] Processing Detail',
  NOT_PROCESSING_DETAIL = '[PROCESS_FORM_WIZARDS] Not Processing Detail',

  SAVING = '[PROCESS_FORM_WIZARDS] Saving',
  NOT_SAVING = '[PROCESS_FORM_WIZARDS] Not Saving',

  COMPLETING = '[PROCESS_FORM_WIZARDS] Completing',
  NOT_COMPLETING = '[PROCESS_FORM_WIZARDS] Not Completing',

  SUBMITTING = '[PROCESS_FORM_WIZARDS] Submitting',
  NOT_SUBMITTING = '[PROCESS_FORM_WIZARDS] Not Submitting',

  LOAD_MASTER_DATA = '[PROCESS_FORM_WIZARDS] Load Master Data',
  LOAD_MASTER_DATA_SUCCESS = '[PROCESS_FORM_WIZARDS] Load Master Data Success',

  LOAD_DETAIL_DATA = '[PROCESS_FORM_WIZARDS] Load Detail Data',
  LOAD_DETAIL_DATA_SUCCESS = '[PROCESS_FORM_WIZARDS] Load Detail Data Success',

  LOAD_META_DATA = '[PROCESS_FORM_WIZARDS] Load Meta Data',
  LOAD_META_DATA_SUCCESS = '[PROCESS_FORM_WIZARDS] Load Meta Data Success',


  SAVE = '[PROCESS_FORM_WIZARDS] Save',
  SAVE_SUCCESS = '[PROCESS_FORM_WIZARDS] Save Success',

  COMPLETE = '[PROCESS_FORM_WIZARDS] Complete',
  COMPLETE_SUCCESS = '[PROCESS_FORM_WIZARDS] Complete Success',

  SUBMIT = '[PROCESS_FORM_WIZARDS] Submit',
  SUBMIT_SUCCESS = '[PROCESS_FORM_WIZARDS] Submit Success',

  ADD = '[PROCESS_FORM_WIZARDS] Add',
  ADD_SUCCESS = '[PROCESS_FORM_WIZARDS] Add Success',

  DELETE_DATA = '[PROCESS_FORM_WIZARDS] Delete Data',

  REMOVE_DATA = '[PROCESS_FORM_WIZARDS] Remove Data',

}

export class ShowEditorProcessFormWizard implements Action {
  readonly type = ProcessFormWizardActionTypes.SHOW_EDITOR;
}

export class HideEditorProcessFormWizard implements Action {
  readonly type = ProcessFormWizardActionTypes.HIDE_EDITOR;
}


export class ShowViewerProcessFormWizard implements Action {
  readonly type = ProcessFormWizardActionTypes.SHOW_VIEWER;
}

export class HideViewerProcessFormWizard implements Action {
  readonly type = ProcessFormWizardActionTypes.HIDE_VIEWER;
}


export class ProcessingProcessFormWizard implements Action {
  readonly type = ProcessFormWizardActionTypes.PROCESSING;
}

export class NotProcessingProcessFormWizard implements Action {
  readonly type = ProcessFormWizardActionTypes.NOT_PROCESSING;
}

export class ProcessingMasterProcessFormWizard implements Action {
  readonly type = ProcessFormWizardActionTypes.PROCESSING_MASTER;
}

export class NotProcessingMasterProcessFormWizard implements Action {
  readonly type = ProcessFormWizardActionTypes.NOT_PROCESSING_MASTER;
}

export class ProcessingDetailProcessFormWizard implements Action {
  readonly type = ProcessFormWizardActionTypes.PROCESSING_DETAIL;
}

export class NotProcessingDetailProcessFormWizard implements Action {
  readonly type = ProcessFormWizardActionTypes.NOT_PROCESSING_DETAIL;
}

export class SavingProcessFormWizard implements Action {
  readonly type = ProcessFormWizardActionTypes.SAVING;
}

export class NotSavingProcessFormWizard implements Action {
  readonly type = ProcessFormWizardActionTypes.NOT_SAVING;
}

export class CompletingProcessFormWizard implements Action {
  readonly type = ProcessFormWizardActionTypes.COMPLETING;
}

export class NotCompletingProcessFormWizard implements Action {
  readonly type = ProcessFormWizardActionTypes.NOT_COMPLETING;
}

export class SubmittingProcessFormWizard implements Action {
  readonly type = ProcessFormWizardActionTypes.SUBMITTING;
}

export class NotSubmittingProcessFormWizard implements Action {
  readonly type = ProcessFormWizardActionTypes.NOT_SUBMITTING;
}

export class LoadMasterDataProcessFormWizard implements Action {
  readonly type = ProcessFormWizardActionTypes.LOAD_MASTER_DATA;
  constructor(public payload: {masterId:number}) {}
}

export class LoadMasterDataProcessFormWizardSuccess implements Action {
  readonly type = ProcessFormWizardActionTypes.LOAD_MASTER_DATA_SUCCESS;
  constructor(public payload: IProcessTransactionMaster) {}
}

export class LoadDetailDataProcessFormWizard implements Action {
  readonly type = ProcessFormWizardActionTypes.LOAD_DETAIL_DATA;
  constructor(public payload: {masterId:number, roleId: number}) {}
}

export class LoadDetailDataProcessFormWizardSuccess implements Action {
  readonly type = ProcessFormWizardActionTypes.LOAD_DETAIL_DATA_SUCCESS;
  constructor(public payload: IProcessTransactionDetail[]) {}
}

export class LoadMetaDataProcessFormWizard implements Action {
  readonly type = ProcessFormWizardActionTypes.LOAD_META_DATA;
}

export class LoadMetaDataProcessFormWizardSuccess implements Action {
  readonly type = ProcessFormWizardActionTypes.LOAD_META_DATA_SUCCESS;
  constructor(public payload: IProcessMetaData) {}
}

export class SaveProcessFormWizard implements Action {
  readonly type = ProcessFormWizardActionTypes.SAVE;

  constructor(public payload: {data: any, recordId: number, masterId: number, editMode: boolean, role:number, flag?:number}) {}
}


export class CompleteProcessFormWizard implements Action {
  readonly type = ProcessFormWizardActionTypes.COMPLETE;

  constructor(public payload: {data: any, recordId: number, masterId: number, processId: number, employeeId: number, role:number, flag?:number}) {}
}

export class CompleteProcessFormWizardSuccess implements Action {
  readonly type = ProcessFormWizardActionTypes.COMPLETE_SUCCESS;
}


export class SubmitProcessFormWizard implements Action {
  readonly type = ProcessFormWizardActionTypes.SUBMIT;

  constructor(public payload: {recordId: number, employeeId: number, role:number, flag?:number}) {}
}

export class AddProcessFormWizard implements Action {
  readonly type = ProcessFormWizardActionTypes.ADD;

  constructor(public payload: {data: any}) {}
}


export class DeleteDataProcessFormWizard implements Action {
  readonly type = ProcessFormWizardActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number}) {}
}


export class RemoveDataProcessFormWizard implements Action {
  readonly type = ProcessFormWizardActionTypes.REMOVE_DATA;

  constructor(public payload: {recordId: number}) {}
}

export type ProcessFormWizardActions =
  | ShowEditorProcessFormWizard
  | HideEditorProcessFormWizard
  | ShowViewerProcessFormWizard
  | HideViewerProcessFormWizard
  | ProcessingProcessFormWizard
  | NotProcessingProcessFormWizard
  | ProcessingMasterProcessFormWizard
  | NotProcessingMasterProcessFormWizard
  | ProcessingDetailProcessFormWizard
  | NotProcessingDetailProcessFormWizard
  | SavingProcessFormWizard
  | NotSavingProcessFormWizard
  | CompletingProcessFormWizard
  | NotCompletingProcessFormWizard
  | SubmittingProcessFormWizard
  | NotSubmittingProcessFormWizard
  | LoadMasterDataProcessFormWizard
  | LoadMasterDataProcessFormWizardSuccess
  | LoadDetailDataProcessFormWizard
  | LoadDetailDataProcessFormWizardSuccess
  | LoadMetaDataProcessFormWizard
  | LoadMetaDataProcessFormWizardSuccess
  | SaveProcessFormWizard
  | CompleteProcessFormWizard
  | CompleteProcessFormWizardSuccess
  | SubmitProcessFormWizard
  | AddProcessFormWizard
  | DeleteDataProcessFormWizard
  | RemoveDataProcessFormWizard;
