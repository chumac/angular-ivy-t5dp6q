import { Action } from '@ngrx/store';
import { IVariableAllowance, IVariableAllowanceRate } from '@nutela/models/compensation/payroll';
import { ISelectOption } from '@nutela/models/core-data';



export enum VariableAllowanceActionTypes {

  SHOW_EDITOR = '[ VARIABLE ALLOWANCE] Show Editor',
  HIDE_EDITOR = '[VARIABLE ALLOWANCE] Hide Editor',

  SHOW_VIEWER = '[ VARIABLE ALLOWANCE] Show Viewer',
  HIDE_VIEWER = '[VARIABLE ALLOWANCE] Hide Viewer',

  SHOW_RATE_VIEWER = '[ VARIABLE ALLOWANCE] Show Rate Viewer',
  HIDE_RATE_VIEWER = '[VARIABLE ALLOWANCE] Hide Rate Viewer',

  SHOW_RATE_EDITOR = '[ VARIABLE ALLOWANCE] Show Rate Editor',
  HIDE_RATE_EDITOR = '[VARIABLE ALLOWANCE] Hide Rate Editor',

  PROCESSING = '[ VARIABLE ALLOWANCE ] Processing',
  NOT_PROCESSING = '[ VARIABLE ALLOWANCE ] Not Processing',

  LOADING = '[ VARIABLE ALLOWANCE ] LOADING',
  NOT_LOADING = '[ VARIABLE ALLOWANCE ] Not LOADING',

  LOAD_VARIABLE_ALLOWANCE_DATA = '[ VARIABLE ALLOWANCE] Load VARIABLE ALLOWANCE Data',
  LOAD_VARIABLE_ALLOWANCE_DATA_SUCCESS = '[ VARIABLE ALLOWANCE] Load VARIABLE ALLOWANCE Data Success',

  LOAD_RATES_VARIABLE_ALLOWANCE_DATA = '[ VARIABLE ALLOWANCE] Load Rates',
  LOAD_RATES_VARIABLE_ALLOWANCE_DATA_SUCCESS = '[ VARIABLE ALLOWANCE] Load Rates Success',

  LOAD_PAY_FORMULA_LIST = '[ VARIABLE ALLOWANCE] Load Pay Formula List Data',
  LOAD_PAY_FORMULA_LIST_SUCCESS = '[ VARIABLE ALLOWANCE] Load Pay Formula List Success',

  LOAD_PAYGROUP_LIST = '[ VARIABLE ALLOWANCE] Load Paygroup List Data',
  LOAD_PAYGROUP_LIST_SUCCESS = '[ VARIABLE ALLOWANCE] Load Paygroup List Success',

  LOAD_CURRENCY_LIST = '[ VARIABLE ALLOWANCE] Load Currency List',
  LOAD_CURRENCY_LIST_SUCCESS = '[ VARIABLE ALLOWANCE] Load Currency List Success',

  LOAD_PAYROLL_PROFILE_LIST = '[ VARIABLE ALLOWANCE ] Load Payroll Profile List',
  LOAD_PAYROLL_PROFILE_LIST_SUCCESS = '[ VARIABLE ALLOWANCE ] Load Payroll Profile List Success',

  LOAD_TRANSACTION_UNIT_LIST = '[ VARIABLE ALLOWANCE ] Load Transaction Unit List',
  LOAD_TRANSACTION_UNIT_LIST_SUCCESS = '[ VARIABLE ALLOWANCE ] Load Transaction Unit List Success',

  LOAD_GROUP_LIST = '[ VARIABLE ALLOWANCE ] Load Group Name List',
  LOAD_GROUP_LIST_SUCCESS = '[ VARIABLE ALLOWANCE ] Load Group Name List Success',

  SAVE = '[VARIABLE ALLOWANCE] Save',
  SAVE_SUCCESS = '[ VARIABLE ALLOWANCE] Save Success',

  UPDATE = '[UPDATE VARIABLE ALLOWANCE] Update',
  UPDATE_SUCCESS = '[UPDATE VARIABLE ALLOWANCE] Update Success',

  SAVE_RATE = '[VARIABLE ALLOWANCE] Save Rate',
  SAVE_RATE_SUCCESS = '[ VARIABLE ALLOWANCE] Save Rate Success',

  UPDATE_RATE = '[UPDATE VARIABLE ALLOWANCE] Update Rate',
  UPDATE_RATE_SUCCESS = '[UPDATE VARIABLE ALLOWANCE] Update Rate Success',

  DELETE_RATE_VARIABLE_ALLOWANCE_DATA = '[VARIABLE ALLOWANCE] Delete Rate ',
  DELETE_VARIABLE_ALLOWANCE_DATA = '[VARIABLE ALLOWANCE] Delete Variable Allowance Data',
}


export class ShowEditorVariableAllowance implements Action {
  readonly type = VariableAllowanceActionTypes.SHOW_EDITOR;
}

export class HideEditorVariableAllowance implements Action {
  readonly type = VariableAllowanceActionTypes.HIDE_EDITOR;
}

export class ShowViewerVariableAllowance implements Action {
  readonly type = VariableAllowanceActionTypes.SHOW_VIEWER;
}

export class HideViewerVariableAllowance implements Action {
  readonly type = VariableAllowanceActionTypes.HIDE_VIEWER;
}

export class ShowRateViewerVariableAllowance implements Action {
  readonly type = VariableAllowanceActionTypes.SHOW_RATE_VIEWER;
}

export class HideRateViewerVariableAllowance implements Action {
  readonly type = VariableAllowanceActionTypes.HIDE_RATE_VIEWER;
}

export class ShowRateEditorVariableAllowance implements Action {
  readonly type = VariableAllowanceActionTypes.SHOW_RATE_EDITOR;
}

export class HideRateEditorVariableAllowance implements Action {
  readonly type = VariableAllowanceActionTypes.HIDE_RATE_EDITOR;
}

export class ProcessingVariableAllowance implements Action {
  readonly type = VariableAllowanceActionTypes.PROCESSING;
}

export class NotProcessingVariableAllowance implements Action {
  readonly type = VariableAllowanceActionTypes.NOT_PROCESSING;
}

export class LoadingVariableAllowance implements Action {
  readonly type = VariableAllowanceActionTypes.LOADING;
}

export class NotLoadingVariableAllowance implements Action {
  readonly type = VariableAllowanceActionTypes.NOT_LOADING;
}


export class LoadVariableAllowanceData implements Action {
  readonly type = VariableAllowanceActionTypes.LOAD_VARIABLE_ALLOWANCE_DATA;
}

export class LoadVariableAllowanceSuccess implements Action {
  readonly type = VariableAllowanceActionTypes.LOAD_VARIABLE_ALLOWANCE_DATA_SUCCESS;
  constructor(public payload: IVariableAllowance[]) {}
}

export class LoadPayrollProfileListVariableAllowance implements Action {
  readonly type = VariableAllowanceActionTypes.LOAD_PAYROLL_PROFILE_LIST;
}

export class LoadPayrollProfileListVariableAllowanceSuccess implements Action {
  readonly type = VariableAllowanceActionTypes.LOAD_PAYROLL_PROFILE_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class LoadTransactionUnitListVariableAllowance implements Action {
  readonly type = VariableAllowanceActionTypes.LOAD_TRANSACTION_UNIT_LIST;
}

export class LoadTransactionUnitListVariableAllowanceSuccess implements Action {
  readonly type = VariableAllowanceActionTypes.LOAD_TRANSACTION_UNIT_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class LoadGroupListVariableAllowance implements Action {
  readonly type = VariableAllowanceActionTypes.LOAD_GROUP_LIST;
}

export class LoadGroupListVariableAllowanceSuccess implements Action {
  readonly type = VariableAllowanceActionTypes.LOAD_GROUP_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class SaveVariableAllowance implements Action {
  readonly type = VariableAllowanceActionTypes.SAVE;
  constructor(public payload: {data: IVariableAllowance}) {}
}

export class UpdateVariableAllowance implements Action {
  readonly type = VariableAllowanceActionTypes.UPDATE;
  constructor(public payload: {data: IVariableAllowance, recordId: number}) {}
}


export class LoadRatesVariableAllowance implements Action {
  readonly type = VariableAllowanceActionTypes.LOAD_RATES_VARIABLE_ALLOWANCE_DATA;
  constructor(public payload: {allowanceId: number}) { }
}

export class LoadRatesVariableAllowanceSuccess implements Action {
  readonly type = VariableAllowanceActionTypes.LOAD_RATES_VARIABLE_ALLOWANCE_DATA_SUCCESS;
  constructor(public payload: IVariableAllowanceRate[]) { }
}

export class LoadPayFormulaListVariableAllowance implements Action {
  readonly type = VariableAllowanceActionTypes.LOAD_PAY_FORMULA_LIST;
}

export class LoadPayFormulaListVariableAllowanceSuccess implements Action {
  readonly type = VariableAllowanceActionTypes.LOAD_PAY_FORMULA_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class LoadPaygroupListVariableAllowance implements Action {
  readonly type = VariableAllowanceActionTypes.LOAD_PAYGROUP_LIST;
}

export class LoadPaygroupListVariableAllowanceSuccess implements Action {
  readonly type = VariableAllowanceActionTypes.LOAD_PAYGROUP_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class LoadCurrencyListVariableAllowance implements Action {
  readonly type = VariableAllowanceActionTypes.LOAD_CURRENCY_LIST;
}

export class LoadCurrencyListVariableAllowanceSuccess implements Action {
  readonly type = VariableAllowanceActionTypes.LOAD_CURRENCY_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class SaveRateVariableAllowance implements Action {
  readonly type = VariableAllowanceActionTypes.SAVE_RATE;
  constructor(public payload: {data: IVariableAllowance, varAllowId?: number}) {}
}

export class UpdateRateVariableAllowance implements Action {
  readonly type = VariableAllowanceActionTypes.UPDATE_RATE;
  constructor(public payload: {data: IVariableAllowance, recordId: number, varAllowId: number}) {}
}

export class DeleteRateVariableAllowance implements Action{
  readonly type =VariableAllowanceActionTypes.DELETE_RATE_VARIABLE_ALLOWANCE_DATA;
  constructor(public payload: { recordId: number, allowanceId: number}) {}
}

export class DeleteVariableAllowance implements Action{
  readonly type =VariableAllowanceActionTypes.DELETE_VARIABLE_ALLOWANCE_DATA;
  constructor(public payload: { recordId: number}) {}
}

export type VariableAllowanceActions =
  | ShowEditorVariableAllowance
  | HideEditorVariableAllowance
  | ShowViewerVariableAllowance
  | HideViewerVariableAllowance
  | ShowRateViewerVariableAllowance
  | HideRateViewerVariableAllowance
  | ShowRateEditorVariableAllowance
  | HideRateEditorVariableAllowance
  | ProcessingVariableAllowance
  | NotProcessingVariableAllowance
  | LoadingVariableAllowance
  | NotLoadingVariableAllowance
  | LoadVariableAllowanceData
  | LoadVariableAllowanceSuccess
  | LoadPayrollProfileListVariableAllowance
  | LoadPayrollProfileListVariableAllowanceSuccess
  | LoadTransactionUnitListVariableAllowance
  | LoadTransactionUnitListVariableAllowanceSuccess
  | LoadGroupListVariableAllowance
  | LoadGroupListVariableAllowanceSuccess
  | SaveVariableAllowance
  | UpdateVariableAllowance
  | LoadRatesVariableAllowance
  | LoadRatesVariableAllowanceSuccess
  | LoadCurrencyListVariableAllowance
  | LoadCurrencyListVariableAllowanceSuccess
  | LoadPayFormulaListVariableAllowance
  | LoadPayFormulaListVariableAllowanceSuccess
  | LoadPaygroupListVariableAllowance
  | LoadPaygroupListVariableAllowanceSuccess
  | DeleteVariableAllowance
  | SaveRateVariableAllowance
  | UpdateRateVariableAllowance
  | DeleteRateVariableAllowance;
