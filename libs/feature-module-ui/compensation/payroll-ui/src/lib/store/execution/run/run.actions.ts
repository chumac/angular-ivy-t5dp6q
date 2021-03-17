import { Action } from '@ngrx/store';
import { IPayrollProfile } from '@nutela/models/compensation/payment';
import { ISelectOption } from '@nutela/models/core-data';



export enum RunActionTypes {

  SHOW_EDITOR = '[ PAYROLL EXECUTION PROCESS ] Show Editor',
  HIDE_EDITOR = '[ PAYROLL EXECUTION PROCESS ] Hide Editor',

  SHOW_RECOVER_EDITOR = '[ PAYROLL EXECUTION PROCESS ] Show Recover Editor',
  HIDE_RECOVER_EDITOR = '[ PAYROLL EXECUTION PROCESS ] Hide Recover Editor',

  PROCESSING = '[ PAYROLL EXECUTION PROCESS ] Processing',
  NOT_PROCESSING = '[ PAYROLL EXECUTION PROCESS ] Not Processing',

  LOADING = '[ PAYROLL EXECUTION PROCESS ] Loading',
  NOT_LOADING = '[ PAYROLL EXECUTION PROCESS ] Not Loading',

  LOAD_PAYROLL_PROFILE_DATA = '[ PAYROLL EXECUTION PROCESS ] Load Payroll Profile Data',
  LOAD_PAYROLL_PROFILE_DATA_SUCCESS = '[ PAYROLL EXECUTION PROCESS ] Load Payroll Profile Data Success',

  LOAD_PAYROLL_GROUP_SELECT_OPTION_DATA = '[ PAYROLL EXECUTION PROCESS ] Load Payroll Group Select Option Data',
  LOAD_PAYROLL_GROUP_SELECT_OPTION_DATA_SUCCESS = '[ PAYROLL EXECUTION PROCESS ] Load Payroll Group Select Option Data Success',

  LOAD_BR_RUN_DATA = '[ PAYROLL EXECUTION PROCESS ] Load Br Payroll Run Data',
  LOAD_BR_RUN_DATA_SUCCESS = '[ PAYROLL EXECUTION PROCESS ] Load Br Payroll Run Data Success',

  LOAD_PAYMENT_GROUP_SELECT_OPTION_DATA = '[ PAYROLL EXECUTION PROCESS ] Load Payment Group Select Option Data',
  LOAD_PAYMENT_GROUP_SELECT_OPTION_DATA_SUCCESS = '[ PAYROLL EXECUTION PROCESS ] Load Payment Group Select Option Data Success',

  LOAD_PAY_GRADE_SELECT_OPTION_DATA = '[ PAYROLL EXECUTION PROCESS ] Load Pay Grade Select Option Data',
  LOAD_PAY_GRADE_SELECT_OPTION_DATA_SUCCESS = '[ PAYROLL EXECUTION PROCESS ] Load Pay Grade Select Option Data Success',

  LOAD_EMPLOYEE_SELECT_OPTION_DATA = '[ PAYROLL EXECUTION PROCESS ] Load Employee Select Option Data',
  LOAD_EMPLOYEE_SELECT_OPTION_DATA_SUCCESS = '[ PAYROLL EXECUTION PROCESS ] Load Employee Select Option Data Success',

  LOAD_CAN_RUN_DATA = '[ PAYROLL EXECUTION PROCESS ] Load Can Run Data',
  LOAD_CAN_RUN_DATA_SUCCESS = '[ PAYROLL EXECUTION PROCESS ] Load Can Run Data Success',

  LOAD_POSSIBLE_RETURNS_DATA = '[ PAYROLL EXECUTION PROCESS ] Load Possible Returns Data',
  LOAD_POSSIBLE_RETURNS_DATA_SUCCESS = '[ PAYROLL EXECUTION PROCESS ] Load Possible Returns Data Success',

  RECOVER_PAYROLL_RUN_DATA = '[ PAYROLL EXECUTION PROCESS ] Recover Payroll Run Data',
  SAVE_PAYROLL_RUN_DATA = '[ PAYROLL EXECUTION PROCESS ] Save Payroll Run Data',
  SAVE_PAYROLL_RUN_DATA_SUCCESS = '[ PAYROLL EXECUTION PROCESS ] Save Payroll Run Data Success',
}


export class ShowEditorPayrollRun implements Action {
  readonly type = RunActionTypes.SHOW_EDITOR;
}

export class HideEditorPayrollRun implements Action {
  readonly type = RunActionTypes.HIDE_EDITOR;
}

export class ShowRecoverEditorPayrollRun implements Action {
  readonly type = RunActionTypes.SHOW_RECOVER_EDITOR;
}

export class HideRecoverEditorPayrollRun implements Action {
  readonly type = RunActionTypes.HIDE_RECOVER_EDITOR;
}

export class ProcessingPayrollRun implements Action {
  readonly type = RunActionTypes.PROCESSING;
}

export class NotProcessingPayrollRun implements Action {
  readonly type = RunActionTypes.NOT_PROCESSING;
}

export class LoadingPayrollRun implements Action {
  readonly type = RunActionTypes.LOADING;
}

export class NotLoadingPayrollRun implements Action {
  readonly type = RunActionTypes.NOT_LOADING;
}


export class LoadPayrollProfileData implements Action {
  readonly type = RunActionTypes.LOAD_PAYROLL_PROFILE_DATA;
}

export class LoadPayrollProfileDataSuccess implements Action {
  readonly type = RunActionTypes.LOAD_PAYROLL_PROFILE_DATA_SUCCESS;
  constructor(public payload: IPayrollProfile[]) { }
}

export class LoadCanRunData implements Action {
  readonly type = RunActionTypes.LOAD_CAN_RUN_DATA;

  constructor(public payload: { payrollProfileId: number, payrollDate: string }) { }
}

export class LoadCanRunDataSuccess implements Action {
  readonly type = RunActionTypes.LOAD_CAN_RUN_DATA_SUCCESS;
  constructor(public payload: any) { }
}

export class LoadPayrollGroupSelectOptionData implements Action {
  readonly type = RunActionTypes.LOAD_PAYROLL_GROUP_SELECT_OPTION_DATA;
}

export class LoadPayrollGroupSelectOptionDataSuccess implements Action {
  readonly type = RunActionTypes.LOAD_PAYROLL_GROUP_SELECT_OPTION_DATA_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class LoadPaymentGroupSelectOptionData implements Action {
  readonly type = RunActionTypes.LOAD_PAYMENT_GROUP_SELECT_OPTION_DATA;
}

export class LoadPaymentGroupSelectOptionDataSuccess implements Action {
  readonly type = RunActionTypes.LOAD_PAYMENT_GROUP_SELECT_OPTION_DATA_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class LoadPayGradeSelectOptionData implements Action {
  readonly type = RunActionTypes.LOAD_PAY_GRADE_SELECT_OPTION_DATA;
}

export class LoadPayGradeSelectOptionDataSuccess implements Action {
  readonly type = RunActionTypes.LOAD_PAY_GRADE_SELECT_OPTION_DATA_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class LoadEmployeeSelectOptionData implements Action {
  readonly type = RunActionTypes.LOAD_EMPLOYEE_SELECT_OPTION_DATA;
}

export class LoadEmployeeSelectOptionDataSuccess implements Action {
  readonly type = RunActionTypes.LOAD_EMPLOYEE_SELECT_OPTION_DATA_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class LoadPossibleReturnsData implements Action {
  readonly type = RunActionTypes.LOAD_POSSIBLE_RETURNS_DATA;

  constructor(public payload: {payrollProfileID: number, payrollDate: string}) { }
}

export class LoadPossibleReturnsDataSuccess implements Action {
  readonly type = RunActionTypes.LOAD_POSSIBLE_RETURNS_DATA_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class SavePayrollRunData implements Action {
  readonly type = RunActionTypes.SAVE_PAYROLL_RUN_DATA;
  constructor(public payload: { data: any, recordId: number }) { }
}

export class RecoverPayrollRun implements Action {
  readonly type = RunActionTypes.RECOVER_PAYROLL_RUN_DATA;

  constructor(public payload: {  data: any, payrollProfileID: number }) { }
}

export type RunActions =
  | ShowEditorPayrollRun
  | HideEditorPayrollRun
  | ShowRecoverEditorPayrollRun
  | HideRecoverEditorPayrollRun
  | ProcessingPayrollRun
  | NotProcessingPayrollRun
  | LoadingPayrollRun
  | NotLoadingPayrollRun
  | LoadPayrollProfileData
  | LoadPayrollProfileDataSuccess
  | LoadCanRunData
  | LoadCanRunDataSuccess
  | LoadPayrollGroupSelectOptionData
  | LoadPayrollGroupSelectOptionDataSuccess
  | LoadPaymentGroupSelectOptionData
  | LoadPaymentGroupSelectOptionDataSuccess
  | LoadPayGradeSelectOptionData
  | LoadPayGradeSelectOptionDataSuccess
  | LoadEmployeeSelectOptionData
  | LoadEmployeeSelectOptionDataSuccess
  | LoadPossibleReturnsData
  | LoadPossibleReturnsDataSuccess
  | RecoverPayrollRun
  | SavePayrollRunData;
