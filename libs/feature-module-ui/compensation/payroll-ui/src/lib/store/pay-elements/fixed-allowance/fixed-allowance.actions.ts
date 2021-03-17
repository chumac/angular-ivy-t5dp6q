import { Action } from '@ngrx/store';
import { IFixedAllowance, IFixedAllowanceEmployeeRate, IFixedAllowancePaygroupRate, IFixedAllowanceRate } from '@nutela/models/compensation/payroll';
import { ISelectOption } from 'dist/libs/models/core-data';



export enum FixedAllowanceActionTypes {

  SHOW_EDITOR = '[FIXED_ALLOWANCE] Show Editor',
  HIDE_EDITOR = '[FIXED_ALLOWANCE] Hide Editor',

  SHOW_RATE_EDITOR = '[FIXED_ALLOWANCE] Show Rate Editor',
  HIDE_RATE_EDITOR = '[FIXED_ALLOWANCE] Hide Rate Editor',

  SHOW_CONFIGURE_EDITOR = '[FIXED_ALLOWANCE] Show Configure Editor',
  HIDE_CONFIGURE_EDITOR = '[FIXED_ALLOWANCE] Hide Configure Editor',

  SHOW_VIEWER = '[FIXED_ALLOWANCE] Show Viewer',
  HIDE_VIEWER = '[FIXED_ALLOWANCE] Hide Viewer',

  SHOW_EMPLOYEE_RATE_VIEWER = '[FIXED_ALLOWANCE] Show Employee Rate Viewer',
  HIDE_EMPLOYEE_RATE_VIEWER = '[FIXED_ALLOWANCE] Hide Employee Rate Viewer',

  SHOW_PAYGROUP_RATE_VIEWER = '[FIXED_ALLOWANCE] Show Paygroup Rate Viewer',
  HIDE_PAYGROUP_RATE_VIEWER = '[FIXED_ALLOWANCE] Hide Paygroup Rate Viewer',

  SHOW_GLOBAL_RATE_VIEWER = '[FIXED_ALLOWANCE] Show Global Rate Viewer',
  HIDE_GLOBAL_RATE_VIEWER = '[FIXED_ALLOWANCE] Hide Global Rate Viewer',

  PROCESSING = '[FIXED_ALLOWANCE] Processing',
  NOT_PROCESSING = '[FIXED_ALLOWANCE] Not Processing',

  LOADING = '[FIXED_ALLOWANCE] Loading',
  NOT_LOADING = '[FIXED_ALLOWANCE] Not Loading',

  LOAD_DATA = '[FIXED_ALLOWANCE] Load Data',
  LOAD_DATA_SUCCESS = '[FIXED_ALLOWANCE] Load Data Success',

  LOAD_AWAITING_APPROVAL_DATA = '[FIXED_ALLOWANCE] Load Awaiting Approval Data',
  LOAD_AWAITING_APPROVAL_DATA_SUCCESS = '[FIXED_ALLOWANCE] Load Awaiting Approval Data Success',

  LOAD_CURRENCY_LIST = '[FIXED_ALLOWANCE] Load Currency List',
  LOAD_CURRENCY_LIST_SUCCESS = '[FIXED_ALLOWANCE] Load Currency List Success',

  LOAD_PAY_FORMULA_LIST = '[FIXED_ALLOWANCE] Load Pay Formula List',
  LOAD_PAY_FORMULA_LIST_SUCCESS = '[FIXED_ALLOWANCE] Load Pay Formula List Success',

  LOAD_PAYROLL_PROFILE_LIST = '[FIXED_ALLOWANCE] Load Payroll Profile List',
  LOAD_PAYROLL_PROFILE_LIST_SUCCESS = '[FIXED_ALLOWANCE] Load Payroll Profile List Success',

  LOAD_PAYMENT_ITEM_TYPES = '[FIXED_ALLOWANCE] Load Payment Item Types',
  LOAD_PAYMENT_ITEM_TYPES_SUCCESS = '[FIXED_ALLOWANCE] Load Payment Item Types Success',

  LOAD_PAYMENT_FREQUENCY_LIST = '[FIXED_ALLOWANCE] Load Payment Frequency List',
  LOAD_PAYMENT_FREQUENCY_LIST_SUCCESS = '[FIXED_ALLOWANCE] Load Payment Frequency List Success',

  LOAD_MONTH_LIST = '[FIXED_ALLOWANCE] Load Month List',
  LOAD_MONTH_LIST_SUCCESS = '[FIXED_ALLOWANCE] Load Month List Success',

  LOAD_ELIGIBILITY_LIST = '[FIXED_ALLOWANCE] Load Eligibility List',
  LOAD_ELIGIBILITY_LIST_SUCCESS = '[FIXED_ALLOWANCE] Load Eligibility List Success',

  LOAD_PAYROLL_TYPE_LIST = '[FIXED_ALLOWANCE] Load Payroll Type List',
  LOAD_PAYROLL_TYPE_LIST_SUCCESS = '[FIXED_ALLOWANCE] Load Payroll Type List Success',

  LOAD_GROUP_LIST = '[FIXED_ALLOWANCE] Load Group List',
  LOAD_GROUP_LIST_SUCCESS = '[FIXED_ALLOWANCE] Load Group List Success',

  LOAD_ALLOWANCE_LIST = '[FIXED_ALLOWANCE] Load Allowance List',
  LOAD_ALLOWANCE_LIST_SUCCESS = '[FIXED_ALLOWANCE] Load Allowance List Success',

  LOAD_PRORATION_DATE_TYPE_LIST = '[FIXED_ALLOWANCE] Load Proration Date Type List',
  LOAD_PRORATION_DATE_TYPE_LIST_SUCCESS = '[FIXED_ALLOWANCE] Load Proration Date Type List Success',

  LOAD_PAYGROUP_LIST = '[FIXED_ALLOWANCE] Load Paygroup List',
  LOAD_PAYGROUP_LIST_SUCCESS = '[FIXED_ALLOWANCE] Load Paygroup List Success',

  LOAD_PAYGROUP_RATES_FIXED_ALLOWANCE = '[FIXED_ALLOWANCE] Load Paygroup Rates Fixed Allowance',
  LOAD_PAYGROUP_RATES_FIXED_ALLOWANCE_SUCCESS = '[FIXED_ALLOWANCE] Load Paygroup Rates Fixed Allowance Success',

  LOAD_EMPLOYEE_RATES_FIXED_ALLOWANCE = '[FIXED_ALLOWANCE] Load Employee Rates Fixed Allowance',
  LOAD_EMPLOYEE_RATES_FIXED_ALLOWANCE_SUCCESS = '[FIXED_ALLOWANCE] Load Employee Rates Fixed Allowance Success',

  LOAD_GLOBAL_RATES_FIXED_ALLOWANCE = '[FIXED_ALLOWANCE] Load Global Rates Fixed Allowance',
  LOAD_GLOBAL_RATES_FIXED_ALLOWANCE_SUCCESS = '[FIXED_ALLOWANCE] Load Global Rates Fixed Allowance Success',

  LOAD_CRITERIA_CONFIGURATION_CHECK_FIXED_ALLOWANCE = '[FIXED_ALLOWANCE] Load Criteria Configuration Check Fixed Allowance',
  LOAD_CRITERIA_CONFIGURATION_CHECK_FIXED_ALLOWANCE_SUCCESS = '[FIXED_ALLOWANCE] Load Criteria Configuration Check Fixed Allowance Success',

  LOAD_DATA_CRITERIA_CONFIGURATION_FIXED_ALLOWANCE = '[FIXED_ALLOWANCE] Load Data Criteria Configuration Fixed Allowance',
  LOAD_DATA_CRITERIA_CONFIGURATION_FIXED_ALLOWANCE_SUCCESS = '[FIXED_ALLOWANCE] Load Data Criteria Configuration Fixed Allowance Success',

  EMPLOYEE_RATE_CHART_CHECK_FIXED_ALLOWANCE = '[FIXED_ALLOWANCE] Check Employee Rate Chart Existence Fixed Allowance',
  EMPLOYEE_RATE_CHART_CHECK_FIXED_ALLOWANCE_SUCCESS = '[FIXED_ALLOWANCE] Check Employee Rate Chart Existence Fixed Allowance Success',

  PAYGROUP_RATE_CHART_CHECK_FIXED_ALLOWANCE = '[FIXED_ALLOWANCE] Check Paygroup Rate Chart Existence Fixed Allowance',
  PAYGROUP_RATE_CHART_CHECK_FIXED_ALLOWANCE_SUCCESS = '[FIXED_ALLOWANCE] Check Paygroup Rate Chart Existence Fixed Allowance Success',

  SAVE = '[FIXED_ALLOWANCE] Save',
  SAVE_SUCCESS = '[FIXED_ALLOWANCE] Save Success',

  SAVE_CRITERIA_CONFIGURATION_FIXED_ALLOWANCE = '[FIXED_ALLOWANCE] Save Criteria Configuration',
  SAVE_CRITERIA_CONFIGURATION_FIXED_ALLOWANCE_SUCCESS = '[FIXED_ALLOWANCE] Save Criteria Configuration Success',

  UPDATE_CRITERIA_CONFIGURATION_FIXED_ALLOWANCE = '[FIXED_ALLOWANCE] Update Criteria Configuration',
  UPDATE_CRITERIA_CONFIGURATION_FIXED_ALLOWANCE_SUCCESS = '[FIXED_ALLOWANCE] Update Criteria Configuration Success',

  UPDATE = '[FIXED_ALLOWANCE] UPDATE',
  UPDATE_SUCCESS = '[FIXED_ALLOWANCE] UPDATE Success',

  LOAD_FILTERED_FIXED_ALLOWANCE_DATA = '[FIXED_ALLOWANCE] Load Filtered Fixed Allowance',

  PROCESSING_RATE_CHART_CHECK_FIXED_ALLOWANCE = '[FIXED_ALLOWANCE] Processing Rate Chart Check Fixed Allowance',

  SET_RATE = '[FIXED_ALLOWANCE] Set Rate',
  SET_RATE_SUCCESS = '[FIXED_ALLOWANCE] Set Rate Success',

  UPDATE_RATE = '[FIXED_ALLOWANCE] Update Rate',
  UPDATE_RATE_SUCCESS = '[FIXED_ALLOWANCE] Update Rate Success',

  DELETE = '[FIXED_ALLOWANCE] Delete',
  DELETE_SUCCESS = '[FIXED_ALLOWANCE] Delete Success',

  DELETE_EMPLOYEE_RATE_FIXED_ALLOWANCE = '[FIXED_ALLOWANCE] Delete Employee Rate',
  DELETE_GLOBAL_RATE_FIXED_ALLOWANCE = '[FIXED_ALLOWANCE] Delete Global Rate',
  DELETE_PAYGROUP_RATE_FIXED_ALLOWANCE = '[FIXED_ALLOWANCE] Delete Paygroup Rate',

}


export class ShowEditorFixedAllowance implements Action {
  readonly type = FixedAllowanceActionTypes.SHOW_EDITOR;
}

export class HideEditorFixedAllowance implements Action {
  readonly type = FixedAllowanceActionTypes.HIDE_EDITOR;
}

export class ShowRateEditorFixedAllowance implements Action {
  readonly type = FixedAllowanceActionTypes.SHOW_RATE_EDITOR;
}

export class HideRateEditorFixedAllowance implements Action {
  readonly type = FixedAllowanceActionTypes.HIDE_RATE_EDITOR;
}

export class ShowConfigureEditorFixedAllowance implements Action {
  readonly type = FixedAllowanceActionTypes.SHOW_CONFIGURE_EDITOR;
}

export class HideConfigureEditorFixedAllowance implements Action {
  readonly type = FixedAllowanceActionTypes.HIDE_CONFIGURE_EDITOR;
}

export class ShowViewerFixedAllowance implements Action {
  readonly type = FixedAllowanceActionTypes.SHOW_VIEWER;
}

export class HideViewerFixedAllowance implements Action {
  readonly type = FixedAllowanceActionTypes.HIDE_VIEWER;
}

export class ShowViewerPaygroupRateFixedAllowance implements Action {
  readonly type = FixedAllowanceActionTypes.SHOW_PAYGROUP_RATE_VIEWER;
}

export class HideViewerPaygroupRateFixedAllowance implements Action {
  readonly type = FixedAllowanceActionTypes.HIDE_PAYGROUP_RATE_VIEWER;
}

export class ShowViewerGlobalRateFixedAllowance implements Action {
  readonly type = FixedAllowanceActionTypes.SHOW_GLOBAL_RATE_VIEWER;
}

export class HideViewerGlobalRateFixedAllowance implements Action {
  readonly type = FixedAllowanceActionTypes.HIDE_GLOBAL_RATE_VIEWER;
}

export class ShowViewerEmployeeRateFixedAllowance implements Action {
  readonly type = FixedAllowanceActionTypes.SHOW_EMPLOYEE_RATE_VIEWER;
}

export class HideViewerEmployeeRateFixedAllowance implements Action {
  readonly type = FixedAllowanceActionTypes.HIDE_EMPLOYEE_RATE_VIEWER;
}

export class ProcessingFixedAllowance implements Action {
  readonly type = FixedAllowanceActionTypes.PROCESSING;
}

export class NotProcessingFixedAllowance implements Action {
  readonly type = FixedAllowanceActionTypes.NOT_PROCESSING;
}

export class LoadingFixedAllowance implements Action {
  readonly type = FixedAllowanceActionTypes.LOADING;
}

export class NotLoadingFixedAllowance implements Action {
  readonly type = FixedAllowanceActionTypes.NOT_LOADING;
}

export class ProcessingRateChartCheckFixedAllowance implements Action {
  readonly type = FixedAllowanceActionTypes.PROCESSING_RATE_CHART_CHECK_FIXED_ALLOWANCE;
  constructor(public payload: boolean) { }
}

export class LoadFilteredFixedAllowance implements Action {
  readonly type = FixedAllowanceActionTypes.LOAD_FILTERED_FIXED_ALLOWANCE_DATA;
  constructor(public payload: { payrollProfileId: any }) { }
}

export class LoadDataFixedAllowance implements Action {
  readonly type = FixedAllowanceActionTypes.LOAD_DATA;
}

export class LoadDataFixedAllowanceSuccess implements Action {
  readonly type = FixedAllowanceActionTypes.LOAD_DATA_SUCCESS;
  constructor(public payload: IFixedAllowance[]) {}
}

export class CheckEmployeeRateChartExistenceFixedAllowance implements Action {
  readonly type = FixedAllowanceActionTypes.EMPLOYEE_RATE_CHART_CHECK_FIXED_ALLOWANCE;
  constructor(public payload: {employeeId: number}) { }
}

export class CheckEmployeeRateChartExistenceFixedAllowanceSuccess implements Action {
  readonly type = FixedAllowanceActionTypes.EMPLOYEE_RATE_CHART_CHECK_FIXED_ALLOWANCE_SUCCESS;
  constructor(public payload: any[]) {}
}

export class CheckPaygroupRateChartExistenceFixedAllowance implements Action {
  readonly type = FixedAllowanceActionTypes.PAYGROUP_RATE_CHART_CHECK_FIXED_ALLOWANCE;
  constructor(public payload: { paygroupId: number }) { }
}

export class CheckPaygroupRateChartExistenceFixedAllowanceSuccess implements Action {
  readonly type = FixedAllowanceActionTypes.PAYGROUP_RATE_CHART_CHECK_FIXED_ALLOWANCE_SUCCESS;
  constructor(public payload: any[]) {}
}

export class LoadCurrencyListFixedAllowance implements Action {
  readonly type = FixedAllowanceActionTypes.LOAD_CURRENCY_LIST;
}

export class LoadCurrencyListFixedAllowanceSuccess implements Action {
  readonly type = FixedAllowanceActionTypes.LOAD_CURRENCY_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class LoadPayFormulaListFixedAllowance implements Action {
  readonly type = FixedAllowanceActionTypes.LOAD_PAY_FORMULA_LIST;
}

export class LoadPayFormulaListFixedAllowanceSuccess implements Action {
  readonly type = FixedAllowanceActionTypes.LOAD_PAY_FORMULA_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class LoadPaymentItemTypesFixedAllowance implements Action {
  readonly type = FixedAllowanceActionTypes.LOAD_PAYMENT_ITEM_TYPES;
}

export class LoadPaymentItemTypesFixedAllowanceSuccess implements Action {
  readonly type = FixedAllowanceActionTypes.LOAD_PAYMENT_ITEM_TYPES_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class LoadPaymentFrequencyListFixedAllowance implements Action {
  readonly type = FixedAllowanceActionTypes.LOAD_PAYMENT_FREQUENCY_LIST;
}

export class LoadPaymentFrequencyListFixedAllowanceSuccess implements Action {
  readonly type = FixedAllowanceActionTypes.LOAD_PAYMENT_FREQUENCY_LIST_SUCCESS;
  constructor(public payload: any[]) {}
}

export class LoadMonthListFixedAllowance implements Action {
  readonly type = FixedAllowanceActionTypes.LOAD_MONTH_LIST;
}

export class LoadMonthListFixedAllowanceSuccess implements Action {
  readonly type = FixedAllowanceActionTypes.LOAD_MONTH_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class LoadEligibilityListFixedAllowance implements Action {
  readonly type = FixedAllowanceActionTypes.LOAD_ELIGIBILITY_LIST;
}

export class LoadEligibilityListFixedAllowanceSuccess implements Action {
  readonly type = FixedAllowanceActionTypes.LOAD_ELIGIBILITY_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class LoadPayrollTypeListFixedAllowance implements Action {
  readonly type = FixedAllowanceActionTypes.LOAD_PAYROLL_TYPE_LIST;
}

export class LoadPayrollTypeListFixedAllowanceSuccess implements Action {
  readonly type = FixedAllowanceActionTypes.LOAD_PAYROLL_TYPE_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class LoadGroupListFixedAllowance implements Action {
  readonly type = FixedAllowanceActionTypes.LOAD_GROUP_LIST;
}

export class LoadGroupListFixedAllowanceSuccess implements Action {
  readonly type = FixedAllowanceActionTypes.LOAD_GROUP_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class LoadAllowanceListFixedAllowance implements Action {
  readonly type = FixedAllowanceActionTypes.LOAD_ALLOWANCE_LIST;
}

export class LoadAllowanceListFixedAllowanceSuccess implements Action {
  readonly type = FixedAllowanceActionTypes.LOAD_ALLOWANCE_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class LoadProrationDateTypeListFixedAllowance implements Action {
  readonly type = FixedAllowanceActionTypes.LOAD_PRORATION_DATE_TYPE_LIST;
}

export class LoadProrationDateTypeListFixedAllowanceSuccess implements Action {
  readonly type = FixedAllowanceActionTypes.LOAD_PRORATION_DATE_TYPE_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class LoadPaygroupListFixedAllowance implements Action {
  readonly type = FixedAllowanceActionTypes.LOAD_PAYGROUP_LIST;
}

export class LoadPaygroupListFixedAllowanceSuccess implements Action {
  readonly type = FixedAllowanceActionTypes.LOAD_PAYGROUP_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class LoadPaygroupRatesFixedAllowance implements Action {
  readonly type = FixedAllowanceActionTypes.LOAD_PAYGROUP_RATES_FIXED_ALLOWANCE;
  constructor(public payload: { allowanceId: number }) { }
}

export class LoadPaygroupRatesFixedAllowanceSuccess implements Action {
  readonly type = FixedAllowanceActionTypes.LOAD_PAYGROUP_RATES_FIXED_ALLOWANCE_SUCCESS;
  constructor(public payload: IFixedAllowancePaygroupRate[]) {}
}

export class LoadEmployeeRatesFixedAllowance implements Action {
  readonly type = FixedAllowanceActionTypes.LOAD_EMPLOYEE_RATES_FIXED_ALLOWANCE;
  constructor(public payload: { allowanceId: number }) { }
}

export class LoadEmployeeRatesFixedAllowanceSuccess implements Action {
  readonly type = FixedAllowanceActionTypes.LOAD_EMPLOYEE_RATES_FIXED_ALLOWANCE_SUCCESS;
  constructor(public payload: IFixedAllowanceEmployeeRate[]) {}
}

export class LoadGlobalRatesFixedAllowance implements Action {
  readonly type = FixedAllowanceActionTypes.LOAD_GLOBAL_RATES_FIXED_ALLOWANCE;
  // constructor(public payload: { allowanceId: number }) { }
}

export class LoadGlobalRatesFixedAllowanceSuccess implements Action {
  readonly type = FixedAllowanceActionTypes.LOAD_GLOBAL_RATES_FIXED_ALLOWANCE_SUCCESS;
  constructor(public payload: IFixedAllowanceRate[]) {}
}

export class LoadCriteriaConfigurationCheckFixedAllowance implements Action {
  readonly type = FixedAllowanceActionTypes.LOAD_CRITERIA_CONFIGURATION_CHECK_FIXED_ALLOWANCE;
  constructor(public payload: { recordId: number }) { }
}

export class LoadCriteriaConfigurationCheckFixedAllowanceSuccess implements Action {
  readonly type = FixedAllowanceActionTypes.LOAD_CRITERIA_CONFIGURATION_CHECK_FIXED_ALLOWANCE_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadDataCriteriaConfigurationFixedAllowance implements Action {
  readonly type = FixedAllowanceActionTypes.LOAD_DATA_CRITERIA_CONFIGURATION_FIXED_ALLOWANCE;
  constructor(public payload: { recordId: number }) { }
}

export class LoadDataCriteriaConfigurationFixedAllowanceSuccess implements Action {
  readonly type = FixedAllowanceActionTypes.LOAD_DATA_CRITERIA_CONFIGURATION_FIXED_ALLOWANCE_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadPayrollProfileListFixedAllowance implements Action {
  readonly type = FixedAllowanceActionTypes.LOAD_PAYROLL_PROFILE_LIST;
}

export class LoadPayrollProfileListFixedAllowanceSuccess implements Action {
  readonly type = FixedAllowanceActionTypes.LOAD_PAYROLL_PROFILE_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class SaveFixedAllowance implements Action {
  readonly type = FixedAllowanceActionTypes.SAVE;
  constructor(public payload: {data: IFixedAllowance}) {}
}

export class UpdateFixedAllowance implements Action {
  readonly type = FixedAllowanceActionTypes.UPDATE;
  constructor(public payload: {data: IFixedAllowance, recordId: number}) {}
}

export class SaveRateFixedAllowance implements Action {
  readonly type = FixedAllowanceActionTypes.SET_RATE;
  constructor(public payload: {data: IFixedAllowanceRate}) {}
}

export class UpdateRateFixedAllowance implements Action {
  readonly type = FixedAllowanceActionTypes.UPDATE_RATE;
  constructor(public payload: {data: IFixedAllowanceRate, recordId: number}) {}
}

export class DeleteFixedAllowance implements Action{
  readonly type =FixedAllowanceActionTypes.DELETE;
  constructor(public payload: { recordId: number, payrollProfile: number }) {}
}

export class SaveCriteriaConfigurationFixedAllowance implements Action {
  readonly type = FixedAllowanceActionTypes.SAVE_CRITERIA_CONFIGURATION_FIXED_ALLOWANCE;
  constructor(public payload: {data: IFixedAllowance}) {}
}

export class UpdateCriteriaConfigurationFixedAllowance implements Action {
  readonly type = FixedAllowanceActionTypes.UPDATE_CRITERIA_CONFIGURATION_FIXED_ALLOWANCE;
  constructor(public payload: { data: IFixedAllowance, recordId: number }) { }
}

export class DeletePaygroupRateFixedAllowance implements Action{
  readonly type =FixedAllowanceActionTypes.DELETE_PAYGROUP_RATE_FIXED_ALLOWANCE;
  constructor(public payload: { recordId: number, allowanceId: number }) {}
}

export class DeleteEmployeeRateFixedAllowance implements Action{
  readonly type = FixedAllowanceActionTypes.DELETE_EMPLOYEE_RATE_FIXED_ALLOWANCE;
  constructor(public payload: { recordId: number, allowanceId: number }) {}
}

export class DeleteGlobalRateFixedAllowance implements Action{
  readonly type = FixedAllowanceActionTypes.DELETE_GLOBAL_RATE_FIXED_ALLOWANCE;
  constructor(public payload: { recordId: number }) {}
}

export type FixedAllowanceActions =
  | ShowEditorFixedAllowance
  | HideEditorFixedAllowance
  | ShowViewerFixedAllowance
  | HideViewerFixedAllowance
  | ShowViewerPaygroupRateFixedAllowance
  | HideViewerPaygroupRateFixedAllowance
  | ShowViewerGlobalRateFixedAllowance
  | HideViewerGlobalRateFixedAllowance
  | ShowViewerEmployeeRateFixedAllowance
  | HideViewerEmployeeRateFixedAllowance
  | ProcessingFixedAllowance
  | NotProcessingFixedAllowance
  | LoadingFixedAllowance
  | NotLoadingFixedAllowance
  | CheckEmployeeRateChartExistenceFixedAllowance
  | CheckEmployeeRateChartExistenceFixedAllowanceSuccess
  | CheckPaygroupRateChartExistenceFixedAllowance
  | CheckPaygroupRateChartExistenceFixedAllowanceSuccess
  | LoadCurrencyListFixedAllowance
  | LoadCurrencyListFixedAllowanceSuccess
  | LoadPayFormulaListFixedAllowance
  | LoadPayFormulaListFixedAllowanceSuccess
  | LoadPayrollProfileListFixedAllowance
  | LoadPayrollProfileListFixedAllowanceSuccess
  | SaveFixedAllowance
  | UpdateFixedAllowance
  | SaveRateFixedAllowance
  | UpdateRateFixedAllowance
  | ShowRateEditorFixedAllowance
  | HideRateEditorFixedAllowance
  | ShowConfigureEditorFixedAllowance
  | HideConfigureEditorFixedAllowance
  | LoadDataFixedAllowance
  | LoadDataFixedAllowanceSuccess
  | LoadPaymentItemTypesFixedAllowance
  | LoadPaymentItemTypesFixedAllowanceSuccess
  | LoadPaymentFrequencyListFixedAllowance
  | LoadPaymentFrequencyListFixedAllowanceSuccess
  | LoadMonthListFixedAllowance
  | LoadMonthListFixedAllowanceSuccess
  | LoadEligibilityListFixedAllowance
  | LoadEligibilityListFixedAllowanceSuccess
  | LoadPayrollTypeListFixedAllowance
  | LoadPayrollTypeListFixedAllowanceSuccess
  | LoadGroupListFixedAllowance
  | LoadGroupListFixedAllowanceSuccess
  | LoadAllowanceListFixedAllowance
  | LoadAllowanceListFixedAllowanceSuccess
  | LoadProrationDateTypeListFixedAllowance
  | LoadProrationDateTypeListFixedAllowanceSuccess
  | LoadPaygroupListFixedAllowance
  | LoadPaygroupListFixedAllowanceSuccess
  | LoadPaygroupRatesFixedAllowance
  | LoadPaygroupRatesFixedAllowanceSuccess
  | LoadEmployeeRatesFixedAllowance
  | LoadEmployeeRatesFixedAllowanceSuccess
  | LoadGlobalRatesFixedAllowance
  | LoadGlobalRatesFixedAllowanceSuccess
  | LoadCriteriaConfigurationCheckFixedAllowance
  | LoadCriteriaConfigurationCheckFixedAllowanceSuccess
  | LoadDataCriteriaConfigurationFixedAllowance
  | LoadDataCriteriaConfigurationFixedAllowanceSuccess
  | LoadFilteredFixedAllowance
  | SaveCriteriaConfigurationFixedAllowance
  | UpdateCriteriaConfigurationFixedAllowance
  | ProcessingRateChartCheckFixedAllowance
  | DeleteFixedAllowance
  | DeletePaygroupRateFixedAllowance
  | DeleteGlobalRateFixedAllowance
  | DeleteEmployeeRateFixedAllowance;
