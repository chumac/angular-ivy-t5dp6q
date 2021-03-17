import { Action } from '@ngrx/store';
import { IBank } from '@nutela/models/compensation/payroll';
import { ISelectOption } from '@nutela/models/core-data';



export enum BankActionTypes {

  SHOW_EDITOR = '[ BANK] Show Editor',
  HIDE_EDITOR = '[BANK] Hide Editor',

  PROCESSING = '[ BANK ] Processing',
  NOT_PROCESSING = '[ BANK ] Not Processing',

  LOADING = '[ BANK ] LOADING',
  NOT_LOADING = '[ BANK ] Not LOADING',

  LOAD_BANK_DATA = '[ BANK] Load BANK Data',
  LOAD_BANK_DATA_SUCCESS = '[ BANK] Load BANK Data Success',

  LOAD_NATIONALITY_DATA = '[ BANK] Load NATIONALITY Data',
  LOAD_NATIONALITY_DATA_SUCCESS = '[ BANK] Load NATIONALITY Data Success',

  LOAD_STATE_DATA = '[BANK] Load STATE Data',
  LOAD_STATE_DATA_SUCCESS = '[BANK] Load STATE Data Success',

  SAVE = '[BANK] Save',
  SAVE_SUCCESS = '[ BANK] Save Success',

  UPDATE = '[UPDATE BANK] UPDATE',
  UPDATE_SUCCESS = '[UPDATE BANK] UPDATE Success',

  DELETE_BANK_DATA = '[BANK] Delete BANK Data',
}


export class ShowEditorBank implements Action {
  readonly type = BankActionTypes.SHOW_EDITOR;
}

export class HideEditorBank implements Action {
  readonly type = BankActionTypes.HIDE_EDITOR;
}

export class ProcessingBank implements Action {
  readonly type = BankActionTypes.PROCESSING;
}

export class NotProcessingBank implements Action {
  readonly type = BankActionTypes.NOT_PROCESSING;
}

export class LoadingBank implements Action {
  readonly type = BankActionTypes.LOADING;
}

export class NotLoadingBank implements Action {
  readonly type = BankActionTypes.NOT_LOADING;
}


export class LoadBankData implements Action {
  readonly type = BankActionTypes.LOAD_BANK_DATA;
}

export class LoadBankSuccess implements Action {
  readonly type = BankActionTypes.LOAD_BANK_DATA_SUCCESS;
  constructor(public payload: IBank[]) {}
}

export class LoadNation implements Action {
  readonly type = BankActionTypes.LOAD_NATIONALITY_DATA;
}

export class LoadNationSuccess implements Action {
  readonly type = BankActionTypes.LOAD_NATIONALITY_DATA_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class LoadState implements Action {
  readonly type = BankActionTypes.LOAD_STATE_DATA;
  constructor(public payload: {countryId: number}) {}
}

export class LoadStateSuccess implements Action {
  readonly type = BankActionTypes.LOAD_STATE_DATA_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class SaveBank implements Action {
  readonly type = BankActionTypes.SAVE;
  constructor(public payload: {data: IBank}) {}
}

export class UpdateBank implements Action {
  readonly type = BankActionTypes.UPDATE;
  constructor(public payload: {data: IBank, recordId: number}) {}
}

export class DeleteBank implements Action{
  readonly type =BankActionTypes.DELETE_BANK_DATA;
  constructor(public payload: { recordId: number}) {}
}

export type BankActions =
  | ShowEditorBank
  | HideEditorBank
  | ProcessingBank
  | NotProcessingBank
  | LoadingBank
  | NotLoadingBank
  | LoadBankData
  | LoadBankSuccess
  | LoadNation
  | LoadNationSuccess
  | LoadState
  | LoadStateSuccess
  | SaveBank
  | UpdateBank
  | DeleteBank;
