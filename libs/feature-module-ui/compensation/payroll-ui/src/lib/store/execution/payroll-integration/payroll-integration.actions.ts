import { Action } from '@ngrx/store';
import { IPayrollProfile } from '@nutela/models/compensation/payment';
import { ISelectOption } from '@nutela/models/core-data';



export enum PayrollIntegrationActionTypes {

  SHOW_EDITOR = '[ PAYROLL INTEGRATION PROCESS ] Show Editor',
  HIDE_EDITOR = '[ PAYROLL INTEGRATION PROCESS ] Hide Editor',

  SHOW_VIEWER = '[ PAYROLL INTEGRATION PROCESS ] Show Viewer',
  HIDE_VIEWER = '[ PAYROLL INTEGRATION PROCESS ] Hide Viewer',

  PROCESSING = '[ PAYROLL INTEGRATION PROCESS ] Processing',
  NOT_PROCESSING = '[ PAYROLL INTEGRATION PROCESS ] Not Processing',

  LOADING = '[ PAYROLL INTEGRATION PROCESS ] Loading',
  NOT_LOADING = '[ PAYROLL INTEGRATION PROCESS ] Not Loading',

  LOAD_PAYROLL_INTEGRATION_DATA = '[ PAYROLL INTEGRATION PROCESS ] Load Payroll Integration Data',
  LOAD_PAYROLL_INTEGRATION_DATA_SUCCESS = '[ PAYROLL INTEGRATION PROCESS ] Load Payroll Integration Data Success',

  LOAD_PAYROLL_PROFILE_LIST = '[ PAYROLL INTEGRATION PROCESS ] Load Payroll Profile List',
  LOAD_PAYROLL_PROFILE_LIST_SUCCESS = '[ PAYROLL INTEGRATION PROCESS ] Load Payroll Profile List Success',

  LOAD_MONTH_LIST = '[ PAYROLL INTEGRATION PROCESS ] Load Payroll Month List',
  LOAD_MONTH_LIST_SUCCESS = '[ PAYROLL INTEGRATION PROCESS ] Load Payroll Month List Success',

  LOAD_YEAR_LIST = '[ PAYROLL INTEGRATION PROCESS ] Load Payroll Year List',
  LOAD_YEAR_LIST_SUCCESS = '[ PAYROLL INTEGRATION PROCESS ] Load Payroll Year List Success',

  LOAD_FORMAT_LIST = '[ PAYROLL INTEGRATION PROCESS ] Load Format List',
  LOAD_FORMAT_LIST_SUCCESS = '[ PAYROLL INTEGRATION PROCESS ] Load Format List Success',

  LOAD_SOURCE_LIST = '[ PAYROLL INTEGRATION PROCESS ] Load Source List',
  LOAD_SOURCE_LIST_SUCCESS = '[ PAYROLL INTEGRATION PROCESS ] Load Source List Success',

  SAVE_PAYROLL_INTEGRATION_DATA = '[ PAYROLL INTEGRATION PROCESS ] Save Payroll Integration Data',
  UPDATE_PAYROLL_INTEGRATION_DATA = '[ PAYROLL INTEGRATION PROCESS ] Update Payroll Integration Data',
}


export class ShowEditorPayrollIntegration implements Action {
  readonly type = PayrollIntegrationActionTypes.SHOW_EDITOR;
}

export class HideEditorPayrollIntegration implements Action {
  readonly type = PayrollIntegrationActionTypes.HIDE_EDITOR;
}

export class ShowViewerPayrollIntegration implements Action {
  readonly type = PayrollIntegrationActionTypes.SHOW_VIEWER;
}

export class HideViewerPayrollIntegration implements Action {
  readonly type = PayrollIntegrationActionTypes.HIDE_VIEWER;
}

export class ProcessingPayrollIntegration implements Action {
  readonly type = PayrollIntegrationActionTypes.PROCESSING;
}

export class NotProcessingPayrollIntegration implements Action {
  readonly type = PayrollIntegrationActionTypes.NOT_PROCESSING;
}

export class LoadingPayrollIntegration implements Action {
  readonly type = PayrollIntegrationActionTypes.LOADING;
}

export class NotLoadingPayrollIntegration implements Action {
  readonly type = PayrollIntegrationActionTypes.NOT_LOADING;
}

export class LoadPayrollIntegrationData implements Action {
  readonly type = PayrollIntegrationActionTypes.LOAD_PAYROLL_INTEGRATION_DATA;
  constructor(public payload: {payrollProfileId: number}) { }
}

export class LoadPayrollIntegrationDataSuccess implements Action {
  readonly type = PayrollIntegrationActionTypes.LOAD_PAYROLL_INTEGRATION_DATA_SUCCESS;
  constructor(public payload: any[]) { }
}

export class LoadPayrollProfileListPayrollIntegration implements Action {
  readonly type = PayrollIntegrationActionTypes.LOAD_PAYROLL_PROFILE_LIST;
}

export class LoadPayrollProfileListPayrollIntegrationSuccess implements Action {
  readonly type = PayrollIntegrationActionTypes.LOAD_PAYROLL_PROFILE_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class LoadMonthListPayrollIntegration implements Action {
  readonly type = PayrollIntegrationActionTypes.LOAD_MONTH_LIST;
}

export class LoadMonthListPayrollIntegrationSuccess implements Action {
  readonly type = PayrollIntegrationActionTypes.LOAD_MONTH_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class LoadYearListPayrollIntegration implements Action {
  readonly type = PayrollIntegrationActionTypes.LOAD_YEAR_LIST;
}

export class LoadYearListPayrollIntegrationSuccess implements Action {
  readonly type = PayrollIntegrationActionTypes.LOAD_YEAR_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class LoadFormatListPayrollIntegration implements Action {
  readonly type = PayrollIntegrationActionTypes.LOAD_FORMAT_LIST;
}

export class LoadFormatListPayrollIntegrationSuccess implements Action {
  readonly type = PayrollIntegrationActionTypes.LOAD_FORMAT_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class LoadSourceListPayrollIntegration implements Action {
  readonly type = PayrollIntegrationActionTypes.LOAD_SOURCE_LIST;
}

export class LoadSourceListPayrollIntegrationSuccess implements Action {
  readonly type = PayrollIntegrationActionTypes.LOAD_SOURCE_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class SavePayrollIntegrationData implements Action {
  readonly type = PayrollIntegrationActionTypes.SAVE_PAYROLL_INTEGRATION_DATA;
  constructor(public payload: {data: any}) { }
}

export class UpdatePayrollIntegrationData implements Action {
  readonly type = PayrollIntegrationActionTypes.UPDATE_PAYROLL_INTEGRATION_DATA;
  constructor(public payload: {data: any, recordId: number}) { }
}


export type PayrollIntegrationActions =
  | ShowEditorPayrollIntegration
  | HideEditorPayrollIntegration
  | ShowViewerPayrollIntegration
  | HideViewerPayrollIntegration
  | ProcessingPayrollIntegration
  | NotProcessingPayrollIntegration
  | LoadingPayrollIntegration
  | NotLoadingPayrollIntegration
  | LoadPayrollIntegrationData
  | LoadPayrollIntegrationDataSuccess
  | LoadPayrollProfileListPayrollIntegration
  | LoadPayrollProfileListPayrollIntegrationSuccess
  | LoadMonthListPayrollIntegration
  | LoadMonthListPayrollIntegrationSuccess
  | LoadYearListPayrollIntegration
  | LoadYearListPayrollIntegrationSuccess
  | LoadFormatListPayrollIntegration
  | LoadFormatListPayrollIntegrationSuccess
  | LoadSourceListPayrollIntegration
  | LoadSourceListPayrollIntegrationSuccess
  | UpdatePayrollIntegrationData
  | SavePayrollIntegrationData;
