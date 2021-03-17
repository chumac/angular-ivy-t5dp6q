import { Action } from '@ngrx/store';
import { IGetPayrollProfile,  IstaffEmployeeList,  IstaffEmployeePayrollProfile } from '@nutela/models/compensation/payroll';
import { ISelectOption } from '@nutela/models/core-data';



export enum StaffActionTypes {
  

// Added by Akash Desai
  SHOW_EDITOR = '[ STAFF EXECUTION PROCESS ] Show Editor',
  HIDE_EDITOR = '[ STAFF EXECUTION PROCESS ] Hide Editor',

  PROCESSING = '[ STAFF EXECUTION PROCESS ] Processing',
  NOT_PROCESSING = '[ STAFF EXECUTION PROCESS ] Not Processing',

  LOADING = '[ STAFF EXECUTION PROCESS ] Loading',
  NOT_LOADING = '[ STAFF EXECUTION PROCESS ] Not Loading',

  //Employee List
  LOAD_EMPLOYEE_LIST_DATA = '[ STAFF EXECUTION PROCESS ] Load Staff Employee Data',
  LOAD_EMPLOYEE_LIST_DATA_SUCCESS = '[ STAFF EXECUTION PROCESS ] Load Staff Employee Data Success',

  //Added by Akash Desai for Dropdown
  LOAD_EMPLOYEE_GROUP_SELECT_OPTION_DATA = '[ STAFF EXECUTION PROCESS ] Load Employee Group Select Option Data',
  LOAD_EMPLOYEE_GROUP_SELECT_OPTION_DATA_SUCCESS = '[ STAFF EXECUTION PROCESS ] Load Employee Group Select Option Data Success',

  //Added by Akash Desai 
  LOAD_EMPLOYEE_PAYROLL_PROFILE_DATA = '[ STAFF EXECUTION PROCESS ] Load Employee Payroll Profile Data',
  LOAD_EMPLOYEE_PAYROLL_PROFILE_DATA_SUCCESS = '[ STAFF EXECUTION PROCESS ] Load Employee Payroll Profile Data Success',

  // Save Payroll
  SAVE_PAYROLL_PROFILE_DATA = '[ STAFF EXECUTION PROCESS ] Save Payroll Profile Data',
  SAVE_PAYROLL_RUN_PROFILE_SUCCESS = '[ STAFF EXECUTION PROCESS ] Save Payroll Profile Data Success',

  // Load Profile Data
  LOAD_CAN_PROFILE_DATA = '[ STAFF EXECUTION PROCESS ] Load Payroll Profile Data',
  LOAD_CAN_PROFILE_DATA_SUCCESS = '[ STAFF EXECUTION PROCESS ] Load Payroll Profile Data Success',

  // Remove Employee
  LOAD_CAN_REMOVE_DATA = '[ PAYROLL EXECUTION PROCESS - LAST RUN ITEM ] Load Can Cancel Data',
  LOAD_CAN_REMOVE_DATA_SUCCESS = '[ PAYROLL EXECUTION PROCESS - LAST RUN ITEM ] Load Can Cancel Data Success',
  
}



export class ShowEditorStaff implements Action {
  readonly type = StaffActionTypes.SHOW_EDITOR;
}

export class HideEditorStaff implements Action {
  readonly type = StaffActionTypes.HIDE_EDITOR;
}

export class ProcessingStaff implements Action {
  readonly type = StaffActionTypes.PROCESSING;
}

export class NotProcessingStaff implements Action {
  readonly type = StaffActionTypes.NOT_PROCESSING;
}

export class LoadingStaff implements Action {
  readonly type = StaffActionTypes.LOADING;
}

export class NotLoadingStaff implements Action {
  readonly type = StaffActionTypes.NOT_LOADING;
}

export class LoadListEmployeeData implements Action {
  readonly type = StaffActionTypes.LOAD_EMPLOYEE_LIST_DATA;
}
export class LoadListEmployeeDataSuccess implements Action {
  readonly type = StaffActionTypes.LOAD_EMPLOYEE_LIST_DATA_SUCCESS;
  constructor(public payload: IstaffEmployeeList[]) { }
}

export class LoadEmployeeGroupSelectOptionData implements Action {
  readonly type = StaffActionTypes.LOAD_EMPLOYEE_GROUP_SELECT_OPTION_DATA;
}

export class LoadEmployeeGroupSelectOptionDataSuccess implements Action {
  readonly type = StaffActionTypes.LOAD_EMPLOYEE_GROUP_SELECT_OPTION_DATA_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}


export class LoadEmployeePayrollProfileData implements Action {
  readonly type = StaffActionTypes.LOAD_EMPLOYEE_PAYROLL_PROFILE_DATA;
  constructor(public payload: { employee_id: number}) { }
}

export class LoadEmployeePayrollProfileDataSuccess implements Action {
  readonly type = StaffActionTypes.LOAD_EMPLOYEE_PAYROLL_PROFILE_DATA_SUCCESS;
  constructor(public payload: IstaffEmployeePayrollProfile[]) { }
}

export class SavePayrollProfileData implements Action {
  readonly type = StaffActionTypes.SAVE_PAYROLL_PROFILE_DATA;
  constructor(public payload: { data: any}) { }
}

export class LoadCanProfileData implements Action {
  readonly type = StaffActionTypes.LOAD_CAN_PROFILE_DATA;

  constructor(public payload: { employeeID: number}) { }
}

export class LoadCanProfileDataSuccess implements Action {
  readonly type = StaffActionTypes.LOAD_CAN_PROFILE_DATA_SUCCESS;
  constructor(public payload: IGetPayrollProfile[]) { }
}

export class LoadCanRemoveData implements Action {
  readonly type = StaffActionTypes.LOAD_CAN_REMOVE_DATA;
  constructor(public payload: { employee_id: number }) { }
}

export class LoadCanRemoveDataSuccess implements Action {
  readonly type = StaffActionTypes.LOAD_CAN_REMOVE_DATA_SUCCESS;
  constructor(public payload: any[]) { }
}




export type StaffActions =
  | ShowEditorStaff
  | HideEditorStaff
  | ProcessingStaff
  | NotProcessingStaff
  | LoadingStaff
  | NotLoadingStaff
  | LoadListEmployeeData
  | LoadListEmployeeDataSuccess
  | LoadEmployeeGroupSelectOptionData
  | LoadEmployeeGroupSelectOptionDataSuccess
  | LoadEmployeePayrollProfileData
  | LoadEmployeePayrollProfileDataSuccess
  | SavePayrollProfileData
  | LoadCanProfileDataSuccess
  | LoadCanProfileData
  | LoadCanRemoveData
  | LoadCanRemoveDataSuccess
