import { Action } from '@ngrx/store';
import { IFixedDeduction, IFixedDeductionRate, IFixedDeductionPaygroupRate, IFixedDeductionEmployeeRate } from '@nutela/models/compensation/payroll';
import { ISelectOption } from '@nutela/models/core-data';



export enum FixedDeductionActionTypes {

  SHOW_EDITOR = '[ PAY ELEMENT - FIXED DEDUCTION ] Show Editor',
  HIDE_EDITOR = '[ PAY ELEMENT - FIXED DEDUCTION ] Hide Editor',

  SHOW_RATE_EDITOR = '[ PAY ELEMENT - FIXED DEDUCTION ] Show Rate Editor',
  HIDE_RATE_EDITOR = '[ PAY ELEMENT - FIXED DEDUCTION ] Hide Rate Editor',

  SHOW_CONFIGURE_EDITOR = '[ PAY ELEMENT - FIXED DEDUCTION ] Show Configure Editor',
  HIDE_CONFIGURE_EDITOR = '[ PAY ELEMENT - FIXED DEDUCTION ] Hide Configure Editor',

  SHOW_VIEWER = '[ PAY ELEMENT - FIXED DEDUCTION ] Show Viewer',
  HIDE_VIEWER = '[ PAY ELEMENT - FIXED DEDUCTION ] Hide Viewer',

  SHOW_EMPLOYEE_RATE_VIEWER = '[PAY ELEMENT - FIXED DEDUCTION] Show Employee Rate Viewer',
  HIDE_EMPLOYEE_RATE_VIEWER = '[PAY ELEMENT - FIXED DEDUCTION] Hide Employee Rate Viewer',

  SHOW_PAYGROUP_RATE_VIEWER = '[PAY ELEMENT - FIXED DEDUCTION] Show Paygroup Rate Viewer',
  HIDE_PAYGROUP_RATE_VIEWER = '[PAY ELEMENT - FIXED DEDUCTION] Hide Paygroup Rate Viewer',

  SHOW_GLOBAL_RATE_VIEWER = '[ PAY ELEMENT - FIXED DEDUCTION ] Show  Global Rate Viewer',
  HIDE_GLOBAL_RATE_VIEWER = '[ PAY ELEMENT - FIXED DEDUCTION ] Hide Global Rate  Viewer',

  PROCESSING = '[ PAY ELEMENT - FIXED DEDUCTION ] Processing',
  NOT_PROCESSING = '[ PAY ELEMENT - FIXED DEDUCTION ] Not Processing',

  LOADING = '[ PAY ELEMENT - FIXED DEDUCTION ] Loading',
  NOT_LOADING = '[ PAY ELEMENT - FIXED DEDUCTION ] Not Loading',

  LOAD_DATA = '[ PAY ELEMENT - FIXED DEDUCTION ] Load Data',
  LOAD_DATA_SUCCESS = '[ PAY ELEMENT - FIXED DEDUCTION ] Load Data Success',

  LOAD_AWAITING_APPROVAL_DATA = '[ PAY ELEMENT - FIXED DEDUCTION ] Load Awaiting Approval Data',
  LOAD_AWAITING_APPROVAL_DATA_SUCCESS = '[ PAY ELEMENT - FIXED DEDUCTION ] Load Awaiting Approval Data Success',

  LOAD_CURRENCY_LIST = '[ PAY ELEMENT - FIXED DEDUCTION ] Load Currency List',
  LOAD_CURRENCY_LIST_SUCCESS = '[ PAY ELEMENT - FIXED DEDUCTION ] Load Currency List Success',

  LOAD_DEDUCT_FORMULA_LIST = '[ PAY ELEMENT - FIXED DEDUCTION ] Load Pay Formula List',
  LOAD_DEDUCT_FORMULA_LIST_SUCCESS = '[ PAY ELEMENT - FIXED DEDUCTION ] Load Pay Formula List Success',

  LOAD_PAYROLL_PROFILE_LIST = '[ PAY ELEMENT - FIXED DEDUCTION ] Load Payroll Profile List',
  LOAD_PAYROLL_PROFILE_LIST_SUCCESS = '[ PAY ELEMENT - FIXED DEDUCTION ] Load Payroll Profile List Success',

  LOAD_PAYMENT_ITEM_TYPES = '[ PAY ELEMENT - FIXED DEDUCTION ] Load Payment Item Types',
  LOAD_PAYMENT_ITEM_TYPES_SUCCESS = '[ PAY ELEMENT - FIXED DEDUCTION ] Load Payment Item Types Success',

  LOAD_PAYMENT_FREQUENCY_LIST = '[ PAY ELEMENT - FIXED DEDUCTION ] Load Payment Frequency List',
  LOAD_PAYMENT_FREQUENCY_LIST_SUCCESS = '[ PAY ELEMENT - FIXED DEDUCTION ] Load Payment Frequency List Success',

  LOAD_MONTH_LIST = '[ PAY ELEMENT - FIXED DEDUCTION ] Load Month List',
  LOAD_MONTH_LIST_SUCCESS = '[ PAY ELEMENT - FIXED DEDUCTION ] Load Month List Success',

  LOAD_ELIGIBILITY_LIST = '[ PAY ELEMENT - FIXED DEDUCTION ] Load Eligibility List',
  LOAD_ELIGIBILITY_LIST_SUCCESS = '[ PAY ELEMENT - FIXED DEDUCTION ] Load Eligibility List Success',

  LOAD_PAYROLL_TYPE_LIST = '[ PAY ELEMENT - FIXED DEDUCTION ] Load Payroll Type List',
  LOAD_PAYROLL_TYPE_LIST_SUCCESS = '[ PAY ELEMENT - FIXED DEDUCTION ] Load Payroll Type List Success',

  LOAD_GROUP_LIST = '[ PAY ELEMENT - FIXED DEDUCTION ] Load Group List',
  LOAD_GROUP_LIST_SUCCESS = '[ PAY ELEMENT - FIXED DEDUCTION ] Load Group List Success',

  LOAD_DEDUCTION_LIST = '[ PAY ELEMENT - FIXED DEDUCTION ] Load Deduction List',
  LOAD_DEDUCTION_LIST_SUCCESS = '[ PAY ELEMENT - FIXED DEDUCTION ] Load Deduction List Success',

  LOAD_PRORATION_DATE_TYPE_LIST = '[ PAY ELEMENT - FIXED DEDUCTION ] Load Proration Date Type List',
  LOAD_PRORATION_DATE_TYPE_LIST_SUCCESS = '[ PAY ELEMENT - FIXED DEDUCTION ] Load Proration Date Type List Success',

  LOAD_PAYGROUP_LIST = '[ PAY ELEMENT - FIXED DEDUCTION ] Load Paygroup List',
  LOAD_PAYGROUP_LIST_SUCCESS = '[ PAY ELEMENT - FIXED DEDUCTION ] Load Paygroup List Success',

  LOAD_PAYGROUP_RATES_FIXED_DEDUCTION  = '[ PAY ELEMENT - FIXED DEDUCTION ] Load Paygroup Rates Fixed Deduction',
  LOAD_PAYGROUP_RATES_FIXED_DEDUCTION_SUCCESS = '[ PAY ELEMENT - FIXED DEDUCTION ] Load Paygroup Rates Fixed Deduction Success',

  LOAD_EMPLOYEE_RATES_FIXED_DEDUCTION = '[ PAY ELEMENT - FIXED DEDUCTION ] Load Employee Rates Fixed Deduction',
  LOAD_EMPLOYEE_RATES_FIXED_DEDUCTION_SUCCESS = '[ PAY ELEMENT - FIXED DEDUCTION ] Load Employee Rates Fixed Deduction Success',

  LOAD_GLOBAL_RATES_FIXED_DEDUCTION = '[ PAY ELEMENT - FIXED DEDUCTION ] Load Global Rates Fixed Deduction',
  LOAD_GLOBAL_RATES_FIXED_DEDUCTION_SUCCESS = '[ PAY ELEMENT - FIXED DEDUCTION ] Load Global Rates Fixed Deduction Success',

  LOAD_CRITERIA_CONFIGURATION_CHECK_FIXED_DEDUCTION = '[ PAY ELEMENT - FIXED DEDUCTION ] Load Criteria Configuration Check Fixed Deduction',
  LOAD_CRITERIA_CONFIGURATION_CHECK_FIXED_DEDUCTION_SUCCESS = '[ PAY ELEMENT - FIXED DEDUCTION ] Load Criteria Configuration Check Fixed Deduction Success',

  LOAD_DATA_CRITERIA_CONFIGURATION_FIXED_DEDUCTION = '[ PAY ELEMENT - FIXED DEDUCTION ] Load Data Criteria Configuration Fixed Deduction',
  LOAD_DATA_CRITERIA_CONFIGURATION_FIXED_DEDUCTION_SUCCESS = '[ PAY ELEMENT - FIXED DEDUCTION ] Load Data Criteria Configuration Fixed Deduction Success',

  EMPLOYEE_RATE_CHART_CHECK_FIXED_DEDUCTION = '[ PAY ELEMENT - FIXED DEDUCTION ] Check Employee Rate Chart Existence Fixed Deduction',
  EMPLOYEE_RATE_CHART_CHECK_FIXED_DEDUCTION_SUCCESS = '[ PAY ELEMENT - FIXED DEDUCTION ] Check Employee Rate Chart Existence Fixed Deduction Success',

  PAYGROUP_RATE_CHART_CHECK_FIXED_DEDUCTION = '[ PAY ELEMENT - FIXED DEDUCTION ] Check Paygroup Rate Chart Existence Fixed Deduction',
  PAYGROUP_RATE_CHART_CHECK_FIXED_DEDUCTION_SUCCESS = '[ PAY ELEMENT - FIXED DEDUCTION ] Check Paygroup Rate Chart Existence Fixed Deduction Success',

  SAVE = '[ PAY ELEMENT - FIXED DEDUCTION ] Save',
  SAVE_SUCCESS = '[ PAY ELEMENT - FIXED DEDUCTION ] Save Success',

  SAVE_CRITERIA_CONFIGURATION_FIXED_DEDUCTION = '[ PAY ELEMENT - FIXED DEDUCTION ] Save Criteria Configuration',
  SAVE_CRITERIA_CONFIGURATION_FIXED_DEDUCTION_SUCCESS = '[ PAY ELEMENT - FIXED DEDUCTION ] Save Criteria Configuration Success',

  UPDATE_CRITERIA_CONFIGURATION_FIXED_DEDUCTION = '[ PAY ELEMENT - FIXED DEDUCTION ] Update Criteria Configuration',
  UPDATE_CRITERIA_CONFIGURATION_FIXED_DEDUCTION_SUCCESS = '[ PAY ELEMENT - FIXED DEDUCTION ] Update Criteria Configuration Success',

  UPDATE = '[ PAY ELEMENT - FIXED DEDUCTION ] UPDATE',
  UPDATE_SUCCESS = '[ PAY ELEMENT - FIXED DEDUCTION ] UPDATE Success',

  PROCESSING_RATE_CHART_CHECK_FIXED_DEDUCTION = '[ PAY ELEMENT - FIXED DEDUCTION ] Processing Rate Chart Check Fixed Deduction',

  SET_RATE = '[ PAY ELEMENT - FIXED DEDUCTION ] Set Rate',
  SET_RATE_SUCCESS = '[ PAY ELEMENT - FIXED DEDUCTION ] Set Rate Success',

  UPDATE_RATE = '[ PAY ELEMENT - FIXED DEDUCTION ] Update Rate',
  UPDATE_RATE_SUCCESS = '[ PAY ELEMENT - FIXED DEDUCTION ] Update Rate Success',

  DELETE = '[ PAY ELEMENT - FIXED DEDUCTION ] Delete',
  DELETE_SUCCESS = '[ PAY ELEMENT - FIXED DEDUCTION ] Delete Success',

  DELETE_EMPLOYEE_RATE_FIXED_DEDUCTION = '[ PAY ELEMENT - FIXED DEDUCTION ] Delete Employee Rate',
  DELETE_GLOBAL_RATE_FIXED_DEDUCTION = '[ PAY ELEMENT - FIXED DEDUCTION ] Delete Global Rate',
  DELETE_PAYGROUP_RATE_FIXED_DEDUCTION = '[ PAY ELEMENT - FIXED DEDUCTION ] Delete Paygroup Rate',
}


export class ShowEditorFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.SHOW_EDITOR;
}

export class HideEditorFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.HIDE_EDITOR;
}

export class ShowRateEditorFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.SHOW_RATE_EDITOR;
}

export class HideRateEditorFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.HIDE_RATE_EDITOR;
}

export class ShowConfigureEditorFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.SHOW_CONFIGURE_EDITOR;
}

export class HideConfigureEditorFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.HIDE_CONFIGURE_EDITOR;
}

export class ShowViewerFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.SHOW_VIEWER;
}

export class HideViewerFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.HIDE_VIEWER;
}

export class ShowViewerGlobalRateFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.SHOW_GLOBAL_RATE_VIEWER;
}

export class HideViewerGlobalRateFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.HIDE_GLOBAL_RATE_VIEWER;
}

export class ShowViewerEmployeeRateFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.SHOW_EMPLOYEE_RATE_VIEWER;
}

export class HideViewerEmployeeRateFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.HIDE_EMPLOYEE_RATE_VIEWER;
}

export class ShowViewerPaygroupRateFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.SHOW_PAYGROUP_RATE_VIEWER;
}

export class HideViewerPaygroupRateFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.HIDE_PAYGROUP_RATE_VIEWER;
}

export class ProcessingFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.PROCESSING;
}

export class NotProcessingFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.NOT_PROCESSING;
}

export class LoadingFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.LOADING;
}

export class NotLoadingFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.NOT_LOADING;
}

export class ProcessingRateChartCheckFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.PROCESSING_RATE_CHART_CHECK_FIXED_DEDUCTION;
  constructor(public payload: boolean) { }
}


export class LoadDataFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.LOAD_DATA;
}

export class LoadDataFixedDeductionSuccess implements Action {
  readonly type = FixedDeductionActionTypes.LOAD_DATA_SUCCESS;
  constructor(public payload: IFixedDeduction[]) { }
}

export class CheckEmployeeRateChartExistenceFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.EMPLOYEE_RATE_CHART_CHECK_FIXED_DEDUCTION;
  constructor(public payload: { employeeId: number }) { }
}

export class CheckEmployeeRateChartExistenceFixedDeductionSuccess implements Action {
  readonly type = FixedDeductionActionTypes.EMPLOYEE_RATE_CHART_CHECK_FIXED_DEDUCTION_SUCCESS;
  constructor(public payload: any[]) { }
}

export class CheckPaygroupRateChartExistenceFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.PAYGROUP_RATE_CHART_CHECK_FIXED_DEDUCTION;
  constructor(public payload: { paygroupId: number }) { }
}

export class CheckPaygroupRateChartExistenceFixedDeductionSuccess implements Action {
  readonly type = FixedDeductionActionTypes.PAYGROUP_RATE_CHART_CHECK_FIXED_DEDUCTION_SUCCESS;
  constructor(public payload: any[]) { }
}

export class LoadCurrencyListFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.LOAD_CURRENCY_LIST;
}

export class LoadCurrencyListFixedDeductionSuccess implements Action {
  readonly type = FixedDeductionActionTypes.LOAD_CURRENCY_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class LoadDeductFormulaListFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.LOAD_DEDUCT_FORMULA_LIST;
}

export class LoadDeductFormulaListFixedDeductionSuccess implements Action {
  readonly type = FixedDeductionActionTypes.LOAD_DEDUCT_FORMULA_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class LoadPaymentItemTypesFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.LOAD_PAYMENT_ITEM_TYPES;
}

export class LoadPaymentItemTypesFixedDeductionSuccess implements Action {
  readonly type = FixedDeductionActionTypes.LOAD_PAYMENT_ITEM_TYPES_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class LoadPaymentFrequencyListFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.LOAD_PAYMENT_FREQUENCY_LIST;
}

export class LoadPaymentFrequencyListFixedDeductionSuccess implements Action {
  readonly type = FixedDeductionActionTypes.LOAD_PAYMENT_FREQUENCY_LIST_SUCCESS;
  constructor(public payload: any[]) { }
}

export class LoadMonthListFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.LOAD_MONTH_LIST;
}

export class LoadMonthListFixedDeductionSuccess implements Action {
  readonly type = FixedDeductionActionTypes.LOAD_MONTH_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class LoadEligibilityListFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.LOAD_ELIGIBILITY_LIST;
}

export class LoadEligibilityListFixedDeductionSuccess implements Action {
  readonly type = FixedDeductionActionTypes.LOAD_ELIGIBILITY_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class LoadPayrollTypeListFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.LOAD_PAYROLL_TYPE_LIST;
}

export class LoadPayrollTypeListFixedDeductionSuccess implements Action {
  readonly type = FixedDeductionActionTypes.LOAD_PAYROLL_TYPE_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class LoadGroupListFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.LOAD_GROUP_LIST;
}

export class LoadGroupListFixedDeductionSuccess implements Action {
  readonly type = FixedDeductionActionTypes.LOAD_GROUP_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class LoadDeductionListFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.LOAD_DEDUCTION_LIST;
}

export class LoadDeductionListFixedDeductionSuccess implements Action {
  readonly type = FixedDeductionActionTypes.LOAD_DEDUCTION_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class LoadProrationDateTypeListFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.LOAD_PRORATION_DATE_TYPE_LIST;
}

export class LoadProrationDateTypeListFixedDeductionSuccess implements Action {
  readonly type = FixedDeductionActionTypes.LOAD_PRORATION_DATE_TYPE_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class LoadPaygroupListFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.LOAD_PAYGROUP_LIST;
}

export class LoadPaygroupListFixedDeductionSuccess implements Action {
  readonly type = FixedDeductionActionTypes.LOAD_PAYGROUP_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class LoadPaygroupRatesFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.LOAD_PAYGROUP_RATES_FIXED_DEDUCTION;
  constructor(public payload: { deductionId: number }) { }
}

export class LoadPaygroupRatesFixedDeductionSuccess implements Action {
  readonly type = FixedDeductionActionTypes.LOAD_PAYGROUP_RATES_FIXED_DEDUCTION_SUCCESS;
  constructor(public payload: IFixedDeductionPaygroupRate[]) { }
}

export class LoadEmployeeRatesFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.LOAD_EMPLOYEE_RATES_FIXED_DEDUCTION;
  constructor(public payload: { deductionId: number }) { }
}

export class LoadEmployeeRatesFixedDeductionSuccess implements Action {
  readonly type = FixedDeductionActionTypes.LOAD_EMPLOYEE_RATES_FIXED_DEDUCTION_SUCCESS;
  constructor(public payload: IFixedDeductionEmployeeRate[]) { }
}

export class LoadGlobalRatesFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.LOAD_GLOBAL_RATES_FIXED_DEDUCTION;
}

export class LoadGlobalRatesFixedDeductionSuccess implements Action {
  readonly type = FixedDeductionActionTypes.LOAD_GLOBAL_RATES_FIXED_DEDUCTION_SUCCESS;
  constructor(public payload: IFixedDeductionRate[]) { }
}

export class LoadCriteriaConfigurationCheckFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.LOAD_CRITERIA_CONFIGURATION_CHECK_FIXED_DEDUCTION;
  constructor(public payload: { recordId: number }) { }
}

export class LoadCriteriaConfigurationCheckFixedDeductionSuccess implements Action {
  readonly type = FixedDeductionActionTypes.LOAD_CRITERIA_CONFIGURATION_CHECK_FIXED_DEDUCTION_SUCCESS;
  constructor(public payload: any) { }
}

export class LoadDataCriteriaConfigurationFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.LOAD_DATA_CRITERIA_CONFIGURATION_FIXED_DEDUCTION;
  constructor(public payload: { recordId: number }) { }
}

export class LoadDataCriteriaConfigurationFixedDeductionSuccess implements Action {
  readonly type = FixedDeductionActionTypes.LOAD_DATA_CRITERIA_CONFIGURATION_FIXED_DEDUCTION_SUCCESS;
  constructor(public payload: any) { }
}

export class LoadPayrollProfileListFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.LOAD_PAYROLL_PROFILE_LIST;
}

export class LoadPayrollProfileListFixedDeductionSuccess implements Action {
  readonly type = FixedDeductionActionTypes.LOAD_PAYROLL_PROFILE_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class SaveFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.SAVE;
  constructor(public payload: { data: IFixedDeduction }) { }
}

export class UpdateFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.UPDATE;
  constructor(public payload: { data: IFixedDeduction, recordId: number }) { }
}

export class SaveRateFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.SET_RATE;
  constructor(public payload: { data: IFixedDeductionRate }) { }
}

export class UpdateRateFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.UPDATE_RATE;
  constructor(public payload: { data: IFixedDeductionRate, recordId: number }) { }
}

export class DeleteFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.DELETE;
  constructor(public payload: { recordId: number }) { }
}

export class SaveCriteriaConfigurationFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.SAVE_CRITERIA_CONFIGURATION_FIXED_DEDUCTION;
  constructor(public payload: { data: IFixedDeduction }) { }
}

export class UpdateCriteriaConfigurationFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.UPDATE_CRITERIA_CONFIGURATION_FIXED_DEDUCTION;
  constructor(public payload: { data: IFixedDeduction, recordId: number }) { }
}

export class DeletePaygroupRateFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.DELETE_PAYGROUP_RATE_FIXED_DEDUCTION;
  constructor(public payload: { recordId: number, deductionId: number }) { }
}

export class DeleteEmployeeRateFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.DELETE_EMPLOYEE_RATE_FIXED_DEDUCTION;
  constructor(public payload: { recordId: number, deductionId: number, rateType: string }) { }
}

export class DeleteGlobalRateFixedDeduction implements Action {
  readonly type = FixedDeductionActionTypes.DELETE_GLOBAL_RATE_FIXED_DEDUCTION;
  constructor(public payload: { recordId: number }) { }
}

export type FixedDeductionActions =
  | ShowEditorFixedDeduction
  | HideEditorFixedDeduction
  | ShowViewerFixedDeduction
  | HideViewerFixedDeduction
  | ShowViewerPaygroupRateFixedDeduction
  | HideViewerPaygroupRateFixedDeduction
  | ShowViewerEmployeeRateFixedDeduction
  | HideViewerEmployeeRateFixedDeduction
  | ShowViewerGlobalRateFixedDeduction
  | HideViewerGlobalRateFixedDeduction
  | ProcessingFixedDeduction
  | NotProcessingFixedDeduction
  | LoadingFixedDeduction
  | NotLoadingFixedDeduction
  | CheckEmployeeRateChartExistenceFixedDeduction
  | CheckEmployeeRateChartExistenceFixedDeductionSuccess
  | CheckPaygroupRateChartExistenceFixedDeduction
  | CheckPaygroupRateChartExistenceFixedDeductionSuccess
  | LoadCurrencyListFixedDeduction
  | LoadCurrencyListFixedDeductionSuccess
  | LoadDeductFormulaListFixedDeduction
  | LoadDeductFormulaListFixedDeductionSuccess
  | LoadPayrollProfileListFixedDeduction
  | LoadPayrollProfileListFixedDeductionSuccess
  | SaveFixedDeduction
  | UpdateFixedDeduction
  | SaveRateFixedDeduction
  | UpdateRateFixedDeduction
  | ShowRateEditorFixedDeduction
  | HideRateEditorFixedDeduction
  | ShowConfigureEditorFixedDeduction
  | HideConfigureEditorFixedDeduction
  | LoadDataFixedDeduction
  | LoadDataFixedDeductionSuccess
  | LoadPaymentItemTypesFixedDeduction
  | LoadPaymentItemTypesFixedDeductionSuccess
  | LoadPaymentFrequencyListFixedDeduction
  | LoadPaymentFrequencyListFixedDeductionSuccess
  | LoadMonthListFixedDeduction
  | LoadMonthListFixedDeductionSuccess
  | LoadEligibilityListFixedDeduction
  | LoadEligibilityListFixedDeductionSuccess
  | LoadPayrollTypeListFixedDeduction
  | LoadPayrollTypeListFixedDeductionSuccess
  | LoadGroupListFixedDeduction
  | LoadGroupListFixedDeductionSuccess
  | LoadDeductionListFixedDeduction
  | LoadDeductionListFixedDeductionSuccess
  | LoadProrationDateTypeListFixedDeduction
  | LoadProrationDateTypeListFixedDeductionSuccess
  | LoadPaygroupListFixedDeduction
  | LoadPaygroupListFixedDeductionSuccess
  | LoadPaygroupRatesFixedDeduction
  | LoadPaygroupRatesFixedDeductionSuccess
  | LoadGlobalRatesFixedDeduction
  | LoadGlobalRatesFixedDeductionSuccess
  | LoadEmployeeRatesFixedDeduction
  | LoadEmployeeRatesFixedDeductionSuccess
  | LoadCriteriaConfigurationCheckFixedDeduction
  | LoadCriteriaConfigurationCheckFixedDeductionSuccess
  | LoadDataCriteriaConfigurationFixedDeduction
  | LoadDataCriteriaConfigurationFixedDeductionSuccess
  | SaveCriteriaConfigurationFixedDeduction
  | UpdateCriteriaConfigurationFixedDeduction
  | ProcessingRateChartCheckFixedDeduction
  | DeleteFixedDeduction
  | DeletePaygroupRateFixedDeduction
  | DeleteEmployeeRateFixedDeduction
  | DeleteGlobalRateFixedDeduction;
