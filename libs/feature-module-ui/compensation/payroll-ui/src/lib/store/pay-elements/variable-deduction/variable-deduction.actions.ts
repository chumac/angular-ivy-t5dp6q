import { Action } from '@ngrx/store';
import { IVariableDeduction, IVariableDeductionRate } from '@nutela/models/compensation/payroll';
import { ISelectOption } from '@nutela/models/core-data';



export enum VariableDeductionActionTypes {

  SHOW_EDITOR = '[ VARIABLE DEDUCTION] Show Editor',
  HIDE_EDITOR = '[VARIABLE DEDUCTION] Hide Editor',

  SHOW_VIEWER = '[ VARIABLE DEDUCTION] Show Viewer',
  HIDE_VIEWER = '[VARIABLE DEDUCTION] Hide Viewer',

  SHOW_RATE_VIEWER = '[ VARIABLE DEDUCTION] Show Rate Viewer',
  HIDE_RATE_VIEWER = '[VARIABLE DEDUCTION] Hide Rate Viewer',

  SHOW_RATE_EDITOR = '[ VARIABLE DEDUCTION] Show Rate Editor',
  HIDE_RATE_EDITOR = '[VARIABLE DEDUCTION] Hide Rate Editor',

  PROCESSING = '[ VARIABLE DEDUCTION ] Processing',
  NOT_PROCESSING = '[ VARIABLE DEDUCTION ] Not Processing',

  LOADING = '[ VARIABLE DEDUCTION ] LOADING',
  NOT_LOADING = '[ VARIABLE DEDUCTION ] Not LOADING',

  LOAD_VARIABLE_DEDUCTION_DATA = '[ VARIABLE DEDUCTION] Load VARIABLE DEDUCTION Data',
  LOAD_VARIABLE_DEDUCTION_DATA_SUCCESS = '[ VARIABLE DEDUCTION] Load VARIABLE DEDUCTION Data Success',

  LOAD_PAYROLL_PROFILE_LIST = '[ VARIABLE DEDUCTION] Load Payroll Profile List',
  LOAD_PAYROLL_PROFILE_LIST_SUCCESS = '[ VARIABLE DEDUCTION] Load Payroll Profile List Success',

  LOAD_TRANSACTION_UNIT_LIST = '[ VARIABLE DEDUCTION] Load Transaction Unit List',
  LOAD_TRANSACTION_UNIT_LIST_SUCCESS = '[ VARIABLE DEDUCTION] Load Transaction Unit List Success',

  LOAD_GROUP_LIST = '[ VARIABLE DEDUCTION] Load Group Name List',
  LOAD_GROUP_LIST_SUCCESS = '[ VARIABLE DEDUCTION] Load Group Name List Success',

  LOAD_RATES_VARIABLE_DEDUCTION_DATA = '[ VARIABLE DEDUCTION] Load Rates',
  LOAD_RATES_VARIABLE_DEDUCTION_DATA_SUCCESS = '[ VARIABLE DEDUCTION] Load Rates Success',

  LOAD_FORMULA_LIST = '[ VARIABLE DEDUCTION] Load Formula List Data',
  LOAD_FORMULA_LIST_SUCCESS = '[ VARIABLE DEDUCTION] Load Formula List Success',

  LOAD_PAYGROUP_LIST = '[ VARIABLE DEDUCTION] Load Paygroup List Data',
  LOAD_PAYGROUP_LIST_SUCCESS = '[ VARIABLE DEDUCTION] Load Paygroup List Success',

  LOAD_CURRENCY_LIST = '[ VARIABLE DEDUCTION] Load Currency List',
  LOAD_CURRENCY_LIST_SUCCESS = '[ VARIABLE DEDUCTION] Load Currency List Success',

  SAVE = '[VARIABLE DEDUCTION] Save',
  SAVE_SUCCESS = '[ VARIABLE DEDUCTION] Save Success',

  UPDATE = '[UPDATE VARIABLE DEDUCTION] Update',
  UPDATE_SUCCESS = '[UPDATE VARIABLE DEDUCTION] Update Success',

  SAVE_RATE = '[VARIABLE DEDUCTION] Save Rate',
  SAVE_RATE_SUCCESS = '[ VARIABLE DEDUCTION] Save Rate Success',

  UPDATE_RATE = '[UPDATE VARIABLE DEDUCTION] Update Rate',
  UPDATE_RATE_SUCCESS = '[UPDATE VARIABLE DEDUCTION] Update Rate Success',

  DELETE_RATE_VARIABLE_DEDUCTION = '[VARIABLE DEDUCTION] Delete Rate',
  DELETE_VARIABLE_DEDUCTION_DATA = '[VARIABLE DEDUCTION] Delete Variable Deduction Data',
}


export class ShowEditorVariableDeduction implements Action {
  readonly type = VariableDeductionActionTypes.SHOW_EDITOR;
}

export class HideEditorVariableDeduction implements Action {
  readonly type = VariableDeductionActionTypes.HIDE_EDITOR;
}

export class ShowViewerVariableDeduction implements Action {
  readonly type = VariableDeductionActionTypes.SHOW_VIEWER;
}

export class HideViewerVariableDeduction implements Action {
  readonly type = VariableDeductionActionTypes.HIDE_VIEWER;
}

export class ShowRateViewerVariableDeduction implements Action {
  readonly type = VariableDeductionActionTypes.SHOW_RATE_VIEWER;
}

export class HideRateViewerVariableDeduction implements Action {
  readonly type = VariableDeductionActionTypes.HIDE_RATE_VIEWER;
}

export class ShowRateEditorVariableDeduction implements Action {
  readonly type = VariableDeductionActionTypes.SHOW_RATE_EDITOR;
}

export class HideRateEditorVariableDeduction implements Action {
  readonly type = VariableDeductionActionTypes.HIDE_RATE_EDITOR;
}

export class ProcessingVariableDeduction implements Action {
  readonly type = VariableDeductionActionTypes.PROCESSING;
}

export class NotProcessingVariableDeduction implements Action {
  readonly type = VariableDeductionActionTypes.NOT_PROCESSING;
}

export class LoadingVariableDeduction implements Action {
  readonly type = VariableDeductionActionTypes.LOADING;
}

export class NotLoadingVariableDeduction implements Action {
  readonly type = VariableDeductionActionTypes.NOT_LOADING;
}


export class LoadVariableDeductionData implements Action {
  readonly type = VariableDeductionActionTypes.LOAD_VARIABLE_DEDUCTION_DATA;
}

export class LoadVariableDeductionSuccess implements Action {
  readonly type = VariableDeductionActionTypes.LOAD_VARIABLE_DEDUCTION_DATA_SUCCESS;
  constructor(public payload: IVariableDeduction[]) {}
}

export class LoadPayrollProfileListVariableDeduction implements Action {
  readonly type = VariableDeductionActionTypes.LOAD_PAYROLL_PROFILE_LIST;
}

export class LoadPayrollProfileListVariableDeductionSuccess implements Action {
  readonly type = VariableDeductionActionTypes.LOAD_PAYROLL_PROFILE_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class LoadTransactionUnitListVariableDeduction implements Action {
  readonly type = VariableDeductionActionTypes.LOAD_TRANSACTION_UNIT_LIST;
}

export class LoadTransactionUnitListVariableDeductionSuccess implements Action {
  readonly type = VariableDeductionActionTypes.LOAD_TRANSACTION_UNIT_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class LoadGroupListVariableDeduction implements Action {
  readonly type = VariableDeductionActionTypes.LOAD_GROUP_LIST;
}

export class LoadGroupListVariableDeductionSuccess implements Action {
  readonly type = VariableDeductionActionTypes.LOAD_GROUP_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class SaveVariableDeduction implements Action {
  readonly type = VariableDeductionActionTypes.SAVE;
  constructor(public payload: {data: IVariableDeduction}) {}
}

export class UpdateVariableDeduction implements Action {
  readonly type = VariableDeductionActionTypes.UPDATE;
  constructor(public payload: {data: IVariableDeduction, recordId: number}) {}
}

export class SaveRateVariableDeduction implements Action {
  readonly type = VariableDeductionActionTypes.SAVE_RATE;
  constructor(public payload: {data: IVariableDeduction, varDeductId?: number}) {}
}

export class UpdateRateVariableDeduction implements Action {
  readonly type = VariableDeductionActionTypes.UPDATE_RATE;
  constructor(public payload: {data: IVariableDeductionRate, recordId: number, varDeductId: number}) {}
}

export class LoadRatesVariableDeduction implements Action {
  readonly type = VariableDeductionActionTypes.LOAD_RATES_VARIABLE_DEDUCTION_DATA;
  constructor(public payload: {recordId: number}) { }
}

export class LoadRatesVariableDeductionSuccess implements Action {
  readonly type = VariableDeductionActionTypes.LOAD_RATES_VARIABLE_DEDUCTION_DATA_SUCCESS;
  constructor(public payload: IVariableDeductionRate[]) { }
}

export class LoadFormulaListVariableDeduction implements Action {
  readonly type = VariableDeductionActionTypes.LOAD_FORMULA_LIST;
}

export class LoadFormulaListVariableDeductionSuccess implements Action {
  readonly type = VariableDeductionActionTypes.LOAD_FORMULA_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class LoadPaygroupListVariableDeduction implements Action {
  readonly type = VariableDeductionActionTypes.LOAD_PAYGROUP_LIST;
}

export class LoadPaygroupListVariableDeductionSuccess implements Action {
  readonly type = VariableDeductionActionTypes.LOAD_PAYGROUP_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class LoadCurrencyListVariableDeduction implements Action {
  readonly type = VariableDeductionActionTypes.LOAD_CURRENCY_LIST;
}

export class LoadCurrencyListVariableDeductionSuccess implements Action {
  readonly type = VariableDeductionActionTypes.LOAD_CURRENCY_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class DeleteRateVariableDeduction implements Action {
  readonly type = VariableDeductionActionTypes.DELETE_RATE_VARIABLE_DEDUCTION;
  constructor(public payload: { recordId: number, deductionId?: number }) { }
}

export class DeleteVariableDeduction implements Action{
  readonly type =VariableDeductionActionTypes.DELETE_VARIABLE_DEDUCTION_DATA;
  constructor(public payload: { recordId: number}) {}
}

export type VariableDeductionActions =
  | ShowEditorVariableDeduction
  | HideEditorVariableDeduction
  | ShowViewerVariableDeduction
  | HideViewerVariableDeduction
  | ShowRateViewerVariableDeduction
  | HideRateViewerVariableDeduction
  | ShowRateEditorVariableDeduction
  | HideRateEditorVariableDeduction
  | ProcessingVariableDeduction
  | NotProcessingVariableDeduction
  | LoadingVariableDeduction
  | NotLoadingVariableDeduction
  | LoadVariableDeductionData
  | LoadVariableDeductionSuccess
  | LoadPayrollProfileListVariableDeduction
  | LoadPayrollProfileListVariableDeductionSuccess
  | LoadTransactionUnitListVariableDeduction
  | LoadTransactionUnitListVariableDeductionSuccess
  | LoadGroupListVariableDeduction
  | LoadGroupListVariableDeductionSuccess
  | SaveVariableDeduction
  | UpdateVariableDeduction
  | DeleteVariableDeduction
  | LoadRatesVariableDeduction
  | LoadRatesVariableDeductionSuccess
  | LoadCurrencyListVariableDeduction
  | LoadCurrencyListVariableDeductionSuccess
  | LoadFormulaListVariableDeduction
  | LoadFormulaListVariableDeductionSuccess
  | LoadPaygroupListVariableDeduction
  | LoadPaygroupListVariableDeductionSuccess
  | SaveRateVariableDeduction
  | UpdateRateVariableDeduction
  | DeleteRateVariableDeduction;
