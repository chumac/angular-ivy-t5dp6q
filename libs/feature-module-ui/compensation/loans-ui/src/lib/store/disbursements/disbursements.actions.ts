import { Action } from '@ngrx/store';
import { ISelectOption } from '@nutela/models/core-data';
import { IDisbursed, IApprovedLoan } from '@nutela/models/compensation/loans';

export enum DisbursementsActionTypes {
  SHOW_EDITOR = '[HR LOANS - LOAN DISBURSEMENTS] Show Editor',
  HIDE_EDITOR = '[HR LOANS - LOAN DISBURSEMENTS] Hide Editor',

  SHOW_VIEWER = '[HR LOANS - LOAN DISBURSEMENTS] Show Viewer',
  HIDE_VIEWER = '[HR LOANS - LOAN DISBURSEMENTS] Hide Viewer',

  PROCESSING_DISBURSEMENTS = '[HR LOANS - LOAN DISBURSEMENTS] Processing',
  NOT_PROCESSING_DISBURSEMENTS = '[HR LOANS - LOAN DISBURSEMENTS] Not Processing',

  LOADING_DISBURSEMENTS = '[HR LOANS - LOAN DISBURSEMENTS] Loading Disbursements',
  NOT_LOADING_DISBURSEMENTS = '[HR LOANS - LOAN DISBURSEMENTS] Not Loading Disbursements',

  LOAD_DATA_LOAN_DISBURSEMENTS = '[HR LOANS - LOAN DISBURSEMENTS] Load Data Loan Disbursements',
  LOAD_DATA_LOAN_DISBURSEMENTS_SUCCESS = '[HR LOANS - LOAN DISBURSEMENTS] Load Data Loan Disbursements Success',

  LOAD_DATA_LOAN_DISBURSED = '[HR LOANS - LOAN DISBURSEMENTS] Load Data Loan Disbursed',
  LOAD_DATA_LOAN_DISBURSED_SUCCESS = '[HR LOANS - LOAN DISBURSEMENTS] Load Data Loan Disbursed Success',

  LOAD_DATA_LOAN_DEFINITIONS = '[HR LOANS - LOAN DISBURSEMENTS] Load Data Loan Definitions',
  LOAD_DATA_LOAN_DEFINITIONS_SUCCESS = '[HR LOANS - LOAN DISBURSEMENTS] Load Data Loan Definitions Success',

  SAVE = '[LOANS - LOAN DISBURSEMENTS] Save Loan Disbursement'
}

export class ShowEditorDisbursement implements Action {
  readonly type = DisbursementsActionTypes.SHOW_EDITOR;
}

export class HideEditorDisbursement implements Action {
  readonly type = DisbursementsActionTypes.HIDE_EDITOR;
}

export class ShowViewerDisbursement implements Action {
  readonly type = DisbursementsActionTypes.SHOW_VIEWER;
}

export class HideViewerDisbursement implements Action {
  readonly type = DisbursementsActionTypes.HIDE_VIEWER;
}


export class ProcessingDisbursements implements Action {
  readonly type = DisbursementsActionTypes.PROCESSING_DISBURSEMENTS;
}

export class NotProcessingDisbursements implements Action {
  readonly type = DisbursementsActionTypes.NOT_PROCESSING_DISBURSEMENTS;
}

export class LoadingDisbursements implements Action {
  readonly type = DisbursementsActionTypes.LOADING_DISBURSEMENTS;
}

export class NotLoadingDisbursements implements Action {
  readonly type = DisbursementsActionTypes.NOT_LOADING_DISBURSEMENTS;
}

export class LoadDataDisbursements implements Action {
  readonly type = DisbursementsActionTypes.LOAD_DATA_LOAN_DISBURSEMENTS;
}

export class LoadDataDisbursementsSuccess implements Action {
  readonly type = DisbursementsActionTypes.LOAD_DATA_LOAN_DISBURSEMENTS_SUCCESS;

  constructor(public payload: IDisbursed[]) {}
}

export class LoadDataDisbursed implements Action {
  readonly type = DisbursementsActionTypes.LOAD_DATA_LOAN_DISBURSED;
}

export class LoadDataDisbursedSuccess implements Action {
  readonly type = DisbursementsActionTypes.LOAD_DATA_LOAN_DISBURSED_SUCCESS;

  constructor(public payload: IDisbursed[]) {}
}

export class LoadDefinitions implements Action {
  readonly type = DisbursementsActionTypes.LOAD_DATA_LOAN_DEFINITIONS;
}

export class LoadDefinitionsSuccess implements Action {
  readonly type = DisbursementsActionTypes.LOAD_DATA_LOAN_DEFINITIONS_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class SaveDisbursement implements Action {
  readonly type = DisbursementsActionTypes.SAVE;

  constructor(public payload: {data: IDisbursed}) {}
}

export type DisbursementsActions =
  | ShowEditorDisbursement
  | HideEditorDisbursement
  | ShowViewerDisbursement
  | HideViewerDisbursement
  | ProcessingDisbursements
  | NotProcessingDisbursements
  | LoadingDisbursements
  | NotLoadingDisbursements
  | LoadDataDisbursements
  | LoadDataDisbursementsSuccess
  | LoadDataDisbursed
  | LoadDataDisbursedSuccess
  | LoadDefinitions
  | LoadDefinitionsSuccess
  | SaveDisbursement
