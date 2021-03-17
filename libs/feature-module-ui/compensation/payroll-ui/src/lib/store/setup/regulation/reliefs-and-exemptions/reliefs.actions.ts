import { Action } from '@ngrx/store';
import { IEmployee, IGradeRelief, IReliefGloble, IReliefsList, IStaturoryRelief, ITaxRuleRelief, IUseRuleRelief } from '@nutela/models/compensation/payroll';
import { IReliefCurrency } from 'libs/models/compensation/payroll/src/lib/interfaces/relief-currency.interface';
import { IReliefEmployeeData } from 'libs/models/compensation/payroll/src/lib/interfaces/relief-employeeData.interface';
import { IFixedDeductionReliefUpdate } from 'libs/models/compensation/payroll/src/lib/interfaces/relief-fixedDeduction-update.interface';
import { IFixedDeductionRelief } from 'libs/models/compensation/payroll/src/lib/interfaces/relief-fixedDeduction.interface';
import { IReliefGrade } from 'libs/models/compensation/payroll/src/lib/interfaces/relief-grade.interface';
import { IReliefProfile } from 'libs/models/compensation/payroll/src/lib/interfaces/relief-profile.interface';
import { IReliefPayGroup } from 'libs/models/compensation/payroll/src/lib/interfaces/relief.paygroupList.interface';


export enum ReliefActionTypes {

  SHOW_EDITOR = '[ RELIEF EXECUTION PROCESS ] Show Editor',
  HIDE_EDITOR = '[ RELIEF EXECUTION PROCESS ] Hide Editor',

  SHOW_ADD_EDITOR = '[ RELIEF EXECUTION PROCESS ] Show Add Editor',
  HIDE_ADD_EDITOR = '[ RELIEF EXECUTION PROCESS ] Hide Add Editor',

  SHOW_CONFIG_EDITOR = '[ RELIEF EXECUTION PROCESS ] Show Config Editor',
  HIDE_CONFIG_EDITOR = '[ RELIEF EXECUTION PROCESS ] Hide Config Editor',

  SHOW_GRADE_EDITOR = '[ RELIEF EXECUTION PROCESS ] Show Grade Editor',
  HIDE_GRADE_EDITOR = '[ RELIEF EXECUTION PROCESS ] Hide Grade Editor',

  SHOW_PAYGROUP_EDITOR = '[ RELIEF EXECUTION PROCESS ] Show Paygroup Editor',
  HIDE_PAYGROUP_EDITOR = '[ RELIEF EXECUTION PROCESS ] Hide Paygroup Editor',

  SHOW_EMPLOYEE_EDITOR = '[ RELIEF EXECUTION PROCESS ] Show Employee Editor',
  HIDE_EMPLOYEE_EDITOR = '[ RELIEF EXECUTION PROCESS ] Hide Employee Editor',

  PROCESSING = '[ RELIEF EXECUTION PROCESS ] Processing',
  NOT_PROCESSING = '[ RELIEF EXECUTION PROCESS ] Not Processing',

  LOADING = '[ RELIEF EXECUTION PROCESS ] Loading',
  NOT_LOADING = '[ RELIEF EXECUTION PROCESS ] Not Loading',

  LOAD_RELIEF_DATA = '[ RELIEF EXECUTION PROCESS ] Load Relief Data',
  LOAD_RELIEF_DATA_SUCCESS = '[ RELIEF EXECUTION PROCESS ] Load Relief Data Success',

  LOAD_RELIEF_PROFILE_DATA = '[ RELIEF EXECUTION PROCESS ] Load Employee Group Select Option Data',
  LOAD_RELIEF_PROFILE_SUCCESS = '[ RELIEF EXECUTION PROCESS ] Load Employee Group Select Option Data Success',

  SAVE_RELIEF_PROFILE_DATA = '[ RELIEF EXECUTION PROCESS ] Save Relief Profile Data',
  SAVE_RELIEF_PROFILE_SUCCESS = '[ RELIEF EXECUTION PROCESS ] Save Relief Profile Data Success',

  UPDATE_RELIEF_PROFILE_DATA = '[ UPDATE RELIEF EXECUTION PROCESS ] Update Relief Profile Data',
  UPDATE_RELIEF_PROFILE_SUCCESS = '[ UPDATE RELIEF EXECUTION PROCESS ] Update Relief Profile Data Success',

  LOAD_STATUTORY_DATA = '[ RELIEF EXECUTION PROCESS ] Load Statutory Data',
  LOAD_STATUTORY_DATA_SUCCESS = '[ RELIEF EXECUTION PROCESS ] Load Statutory Data Success',

  LOAD_RELIEF_TYPE_DATA = '[ RELIEF EXECUTION PROCESS ] Load Relief Type Data',
  LOAD_RELIEF_TYPE_DATA_SUCCESS = '[ RELIEF EXECUTION PROCESS ] Load Relief Type Data Success',

  LOAD_USE_RULE_DATA = '[ RELIEF EXECUTION PROCESS ] Load Use Rule Data',
  LOAD_USE_RULE_DATA_SUCCESS = '[ RELIEF EXECUTION PROCESS ] Load Use Rule Data Success',

  LOAD_GET_RELIEF_PROFILE_DATA = '[ GET RELIEF PROFILE EXECUTION PROCESS ] Load Get Relief Profile Data',
  LOAD_GET_RELIEF_PROFILE_DATA_SUCCESS = '[ GET RELIEF PROFILE EXECUTION PROCESS ] Load Get Relief Profile Data Success',

  LOAD_RELIEF_CURRENCY_DATA = '[RELIEF EXECUTION PROCESS  ] Load  Relief Cuuency Data',
  LOAD_RELIEF_CURRENCY_DATA_SUCCESS = '[ RELIEF EXECUTION PROCESS  ] Load  Relief Cuuency Data Success',

  SAVE_RELIEF_GLOBAL_DATA = '[ RELIEF EXECUTION PROCESS ] Save Relief Global Data',
  SAVE_RELIEF_GLOBAL_SUCCESS = '[ RELIEF EXECUTION PROCESS ] Save Relief Global Data Success',

  SAVE_GRADES_GLOBAL_DATA = '[ RELIEF EXECUTION PROCESS ] Save Relief Grades Data',
  SAVE_GRADES_GLOBAL_SUCCESS = '[ RELIEF EXECUTION PROCESS ] Save Relief Grades Data Success',

  SAVE_PAY_GROUP_DATA = '[ RELIEF EXECUTION PROCESS ] Save Pay Group Data',
  SAVE_PAY_GROUP_SUCCESS = '[ RELIEF EXECUTION PROCESS ] Save Pay Group Data Success',

  SAVE_EMPLOYEE_DATA = '[ RELIEF EXECUTION PROCESS ] Save Employee Data',
  SAVE_EMPLOYEE_SUCCESS = '[ RELIEF EXECUTION PROCESS ] Save Employee Data Success',

  LOAD_RELIEF_GRADE_DATA = '[ RELIEF EXECUTION PROCESS ] Load Relief Grade Data',
  LOAD_RELIEF_GRADE_DATA_SUCCESS = '[ RELIEF EXECUTION PROCESS ] Load Relief Grade Data Success',

  GET_RELIEF_GRADE_DATA = '[ RELIEF EXECUTION PROCESS ] Get Relief Grade Data',
  GET_RELIEF_GRADE_DATA_SUCCESS = '[ RELIEF EXECUTION PROCESS ] Get Relief Grade Data Success',
  DELETE_RELIEF_PROFILE = '[DELETE RELIEF PROFILE] Delete Relief Profile',

  LOAD_PAY_GROUP_DATA = '[ RELIEF EXECUTION PROCESS ] Load Pay Group Data',
  LOAD_PAY_GROUP_DATA_SUCCESS = '[ RELIEF EXECUTION PROCESS ] Load Pay Group Data Success',

  LOAD_EMPLOYEE_DATA = '[ RELIEF EXECUTION PROCESS ] Load Employee Data',
  LOAD_EMPLOYEE_DATA_SUCCESS = '[ RELIEF EXECUTION PROCESS ] Load Employee Data Success',

  GET_PAYGROUP_DATA = '[ RELIEF EXECUTION PROCESS ] Get Pay Group Data',
  GET_PAYGROUP_DATA_SUCCESS = '[ RELIEF EXECUTION PROCESS ] Get Pay Group Data Success',

  GET_EMPLOYEE_DATA = '[ RELIEF EXECUTION PROCESS ] Get Employee Data',
  GET_EMPLOYEE_DATA_SUCCESS = '[ RELIEF EXECUTION PROCESS ] Get Employee Data Success',

  SHOW_VIEW_EDITOR = '[ RELIEF VIEW EXECUTION PROCESS ] Show View Editor',
  HIDE_VIEW_EDITOR = '[ RELIEF VIEW EXECUTION PROCESS ] Hide View Editor',

  SHOW_VIEW_RELIEF_PROFILE = '[ VIEW RELIEF PROFILE PROCESS ] Show View Relief Profile',
  HIDE_VIEW_RELIEF_PROFILE = '[ VIEW RELIEF PROFILE PROCESS ] Hide View Relief Profile',

  SHOW_FIXED_DEDUCTION = '[ SHOW FIXED DEDUCTION EXECUTION PROCESS ] Show FIXED Deduction',
  HIDE_FIXED_DEDUCTION = '[ HIDE FIXED DEDUCTION EXECUTION PROCESS ] Hide FIXED Deduction',

  LOAD_FIXED_DEDUCTION_DATA = '[ LOAD FIXED DEDUCTION EXECUTION PROCESS ] Load Fixed Data Data',
  LOAD_FIXED_DEDUCTION_DATA_SUCCESS = '[ LOAD FIXED DEDUCTION EXECUTION PROCESS ] Load Fixed Data Data Success',

  UPDATE_FIXED_DEDUCTION_RELIEF_DATA = '[ UDATE FIXED DEDUCTION RELIEF EXECUTION PROCESS ] Update Fixed Deduction Relief Data',
  UPDATE_FIXED_DEDUCTION_RELIEF_SUCCESS = '[ UDATE FIXED DEDUCTION RELIEF EXECUTION PROCESS ] Update Fixed Deduction Relief Data Success',

  SAVE_RELIEF_PAYROLL_DATA = '[ SAVE RELIEF PAYROLL EXECUTION PROCESS ] Save Relief Payroll Data',
  SAVE_RELIEF_PAYROLL_SUCCESS = '[ SAVE RELIEF PAYROLL EXECUTION PROCESS ] Save Relief Payroll Data Success',

  SAVE_RELIEF_EMPLOYEE_DATA = '[ SAVE RELIEF EMPLOYEE EXECUTION PROCESS ] Save Relief Employee Data',
  SAVE_RELIEF_EMPLOYEE_SUCCESS = '[ SAVE RELIEF EMPLOYEE EXECUTION PROCESS ] Save Relief Employee Data Success',  

  SAVE_GRADES_DATA = '[ RELIEF GRADES EXECUTION PROCESS ] Save Relief Grades Data',
  SAVE_GRADES_SUCCESS = '[ RELIEF GRADES EXECUTION PROCESS ] Save Relief Grades Data Success',

  LOAD_RELIEF_GRADE_LIST_DATA = '[RELIEF GRADE LIST EXECUTION PROCESS  ] Load  Relief Grade List Data',
  LOAD_RELIEF_GRADE_LIST_DATA_SUCCESS = '[ RELIEF GRADE LIST EXECUTION PROCESS  ] Load  Relief Grade List Data Success',

  LOAD_RELIEF_PAYGROUP_LIST_DATA = '[RELIEF PAYGROUP LIST EXECUTION PROCESS  ] Load  Relief PayGroup List Data',
  LOAD_RELIEF_PAYGROUP_LIST_DATA_SUCCESS = '[ RELIEF PAYGROUP LIST EXECUTION PROCESS  ] Load  Relief PayGroup List Data Success',

  LOAD_RELIEF_EMPLOYEE_LIST_DATA = '[RELIEF EMPLOYEE LIST EXECUTION PROCESS  ] Load  Relief Employee List Data',
  LOAD_RELIEF_EMPLOYEE_LIST_DATA_SUCCESS = '[ RELIEF EMPLOYEE LIST EXECUTION PROCESS  ] Load  Relief Employee List Data Success',

  DELETE_EMPLOYEE_RELIEF_CONFIGURE = '[DELETE EMPLOYEE RELIEF CONFIGURE] Delete Employee Relief Configure',
  DELETE_PAYGROUP_RELIEF_CONFIGURE = '[DELETE PAYGROUP RELIEF CONFIGURE] Delete Paygroup Relief Configure',
  DELETE_GRADE_RELIEF_CONFIGURE = '[DELETE GRADE RELIEF CONFIGURE] Delete Grade Relief Configure',


}



export class ShowEditorRelief implements Action {
  readonly type = ReliefActionTypes.SHOW_EDITOR;
}

export class HideEditorRelief implements Action {
  readonly type = ReliefActionTypes.HIDE_EDITOR;
}

export class ProcessingRelief implements Action {
  readonly type = ReliefActionTypes.PROCESSING;
}

export class NotProcessingRelief implements Action {
  readonly type = ReliefActionTypes.NOT_PROCESSING;
}

export class LoadingRelief implements Action {
  readonly type = ReliefActionTypes.LOADING;
}

export class NotLoadingRelief implements Action {
  readonly type = ReliefActionTypes.NOT_LOADING;
}

export class LoadReliefData implements Action {
  readonly type = ReliefActionTypes.LOAD_RELIEF_DATA;
}
export class LoadReliefDataSuccess implements Action {
  readonly type = ReliefActionTypes.LOAD_RELIEF_DATA_SUCCESS;
  constructor(public payload: IReliefsList[]) { }
}


export class LoadReliefProfileData implements Action {
  readonly type = ReliefActionTypes.LOAD_RELIEF_PROFILE_DATA;
  constructor(public payload: { payroll_profileID: number}) { }
}

export class LoadReliefProfileDataSuccess implements Action {
  readonly type = ReliefActionTypes.LOAD_RELIEF_PROFILE_SUCCESS;
  constructor(public payload: IReliefProfile[]) { }
}

export class ShowAddEditorRelief implements Action {
  readonly type = ReliefActionTypes.SHOW_ADD_EDITOR;
}

export class HideAddEditorRelief implements Action {
  readonly type = ReliefActionTypes.HIDE_ADD_EDITOR;
}
export class ShowConfigEditorRelief implements Action {
  readonly type = ReliefActionTypes.SHOW_CONFIG_EDITOR;
}

export class HideConfigEditorRelief implements Action {
  readonly type = ReliefActionTypes.HIDE_CONFIG_EDITOR;
}

export class ShowGradeEditorRelief implements Action {
  readonly type = ReliefActionTypes.SHOW_GRADE_EDITOR;
}

export class HideGradeEditorRelief implements Action {
  readonly type = ReliefActionTypes.HIDE_GRADE_EDITOR;
}

export class ShowPayGroupEditorRelief implements Action {
  readonly type = ReliefActionTypes.SHOW_PAYGROUP_EDITOR;
}

export class HidePayGroupEditorRelief implements Action {
  readonly type = ReliefActionTypes.HIDE_PAYGROUP_EDITOR;
}


export class ShowEmployeeEditorRelief implements Action {
  readonly type = ReliefActionTypes.SHOW_EMPLOYEE_EDITOR;
}

export class HideEmployeeEditorRelief implements Action {
  readonly type = ReliefActionTypes.HIDE_EMPLOYEE_EDITOR;
}

export class SaveReliedProfileData implements Action {
  readonly type = ReliefActionTypes.SAVE_RELIEF_PROFILE_DATA;
  constructor(public payload: { data: IReliefProfile}) { }
}

export class UpdateReliedProfileData implements Action {
  readonly type = ReliefActionTypes.UPDATE_RELIEF_PROFILE_DATA;
  constructor(public payload: { data: any , id:number }) { }
}


export class LoadStatutoeyReliefData implements Action {
  readonly type = ReliefActionTypes.LOAD_STATUTORY_DATA;
}
export class LoadStatutoeyReliefDataSuccess implements Action {
  readonly type = ReliefActionTypes.LOAD_STATUTORY_DATA_SUCCESS;
  constructor(public payload: IStaturoryRelief[]) { }
}

export class LoadReliefTypeData implements Action {
  readonly type = ReliefActionTypes.LOAD_RELIEF_TYPE_DATA;
}
export class LoadReliefTypeDataSuccess implements Action {
  readonly type = ReliefActionTypes.LOAD_RELIEF_TYPE_DATA_SUCCESS;
  constructor(public payload: ITaxRuleRelief[]) { }
}

export class LoadReliefCurrencyData implements Action {
  readonly type = ReliefActionTypes.LOAD_RELIEF_CURRENCY_DATA;
}
export class LoadReliefCurrencyDataSuccess implements Action {
  readonly type = ReliefActionTypes.LOAD_RELIEF_CURRENCY_DATA_SUCCESS;
  constructor(public payload: IReliefCurrency[]) { }
}

export class LoadGetReliefProfileData implements Action {
  readonly type = ReliefActionTypes.LOAD_GET_RELIEF_PROFILE_DATA;
  constructor(public id: number) { }
}

export class LoadGetReliefProfileDataSuccess implements Action {
  readonly type = ReliefActionTypes.LOAD_GET_RELIEF_PROFILE_DATA_SUCCESS;
  constructor(public payload: any) { }
}


export class LoadUseRuleData implements Action {
  readonly type = ReliefActionTypes.LOAD_USE_RULE_DATA;
}
export class LoadUseRuleDataSuccess implements Action {
  readonly type = ReliefActionTypes.LOAD_USE_RULE_DATA_SUCCESS;
  constructor(public payload: IUseRuleRelief[]) { }
}

export class SaveReliefGlobalData implements Action {
  readonly type = ReliefActionTypes.SAVE_RELIEF_GLOBAL_DATA;
  constructor(public payload: { data: IReliefGloble}) { }
}

export class SaveReliefGradesData implements Action {
  readonly type = ReliefActionTypes.SAVE_GRADES_GLOBAL_DATA;
  constructor(public payload: { id: number, data: IReliefGloble}) { }
}

export class SaveReliefPayGroupData implements Action {
  readonly type = ReliefActionTypes.SAVE_PAY_GROUP_DATA;
  constructor(public payload: { id: number, data: IReliefGloble}) { }
}

export class SaveReliefEmployeeData implements Action {
  readonly type = ReliefActionTypes.SAVE_EMPLOYEE_DATA;
  constructor(public payload: { id: number, data: IReliefGloble}) { }
}

export class LoadReliefGradeData implements Action {
  readonly type = ReliefActionTypes.LOAD_RELIEF_GRADE_DATA;
  constructor(public relief_id: number) { }
}
export class LoadReliefGradeDataSuccess implements Action {
  readonly type = ReliefActionTypes.LOAD_RELIEF_GRADE_DATA_SUCCESS;
  constructor(public payload: IGradeRelief[]) { }
}

export class LoadReliefPayGroupData implements Action {
  readonly type = ReliefActionTypes.LOAD_PAY_GROUP_DATA;
  constructor(public relief_id: number) { }
}
export class LoadReliefPayGroupDataSuccess implements Action {
  readonly type = ReliefActionTypes.LOAD_PAY_GROUP_DATA_SUCCESS;
  constructor(public payload: IGradeRelief[]) { }
}


export class LoadEmployeeData implements Action {
  readonly type = ReliefActionTypes.LOAD_EMPLOYEE_DATA;
  constructor(public relief_id: number) { }
}
export class LoadEmployeeDataSuccess implements Action {
  readonly type = ReliefActionTypes.LOAD_EMPLOYEE_DATA_SUCCESS;
  constructor(public payload: IEmployee[]) { }
}

export class GetReliefGradeData implements Action {
  readonly type = ReliefActionTypes.GET_RELIEF_GRADE_DATA;
  constructor(public reliefdet_id: number) { }
}
export class GetReliefGradeDataSuccess implements Action {
  readonly type = ReliefActionTypes.GET_RELIEF_GRADE_DATA_SUCCESS;
  constructor(public payload: IGradeRelief) { }
}

export class GetPayGroupData implements Action {
  readonly type = ReliefActionTypes.GET_PAYGROUP_DATA;
  constructor(public reliefdet_id: number) { }
}
export class GetPayGroupDataSuccess implements Action {
  readonly type = ReliefActionTypes.GET_PAYGROUP_DATA_SUCCESS;
  constructor(public payload: IGradeRelief) { }
}


export class GetEmployeeData implements Action {
  readonly type = ReliefActionTypes.GET_EMPLOYEE_DATA;
  constructor(public reliefdet_id: number) { }
}
export class GetEmployeeDataSuccess implements Action {
  readonly type = ReliefActionTypes.GET_EMPLOYEE_DATA_SUCCESS;
  constructor(public payload: IEmployee) { }
}


export class DeleteRelief implements Action {
  readonly type = ReliefActionTypes.DELETE_RELIEF_PROFILE;
  constructor(public payload: {relief_id: number, payroll_profile_id: number}) {}
}
export class ShowViewEditorRelief implements Action {
  readonly type = ReliefActionTypes.SHOW_VIEW_EDITOR;
}
export class HideViewEditorRelief implements Action {
  readonly type = ReliefActionTypes.HIDE_VIEW_EDITOR;
}

export class ShowFixedDeductionRelief implements Action {
  readonly type = ReliefActionTypes.SHOW_FIXED_DEDUCTION;
}

export class HideFixedDeductionRelief implements Action {
  readonly type = ReliefActionTypes.HIDE_FIXED_DEDUCTION;
}

export class LoadFixedDeductionData implements Action {
  readonly type = ReliefActionTypes.LOAD_FIXED_DEDUCTION_DATA;
  constructor(public payroll_profile_id: number) { }
}
export class LoadFixedDeductionDataSuccess implements Action {
  readonly type = ReliefActionTypes.LOAD_FIXED_DEDUCTION_DATA_SUCCESS;
  constructor(public payload: IFixedDeductionRelief[]) { }
}
export class UpdateFixedDeductionData implements Action {
  readonly type = ReliefActionTypes.UPDATE_FIXED_DEDUCTION_RELIEF_DATA;
  constructor(public payload: { data: IFixedDeductionReliefUpdate,payroll_profileID : any}) { }
}

export class SavePayGroupData implements Action {
  readonly type = ReliefActionTypes.SAVE_RELIEF_PAYROLL_DATA;
  constructor(public payload: { data: IReliefGloble}) { }
}

export class SaveEmployeeData implements Action {
  readonly type = ReliefActionTypes.SAVE_RELIEF_EMPLOYEE_DATA;
  constructor(public payload: { data: IReliefGloble}) { }
}

export class SaveGradesData implements Action {
  readonly type = ReliefActionTypes.SAVE_GRADES_DATA;
  constructor(public payload: { data: IReliefGloble}) { }
}

export class LoadReliefGradeListData implements Action {
  readonly type = ReliefActionTypes.LOAD_RELIEF_GRADE_LIST_DATA;
}
export class LoadReliefGradeListDataSuccess implements Action {
  readonly type = ReliefActionTypes.LOAD_RELIEF_GRADE_LIST_DATA_SUCCESS;
  constructor(public payload: IReliefGrade[]) { }
}

export class LoadReliefPayGroupListData implements Action {
  readonly type = ReliefActionTypes.LOAD_RELIEF_PAYGROUP_LIST_DATA;
}
export class LoadReliefPayGroupListDataSuccess implements Action {
  readonly type = ReliefActionTypes.LOAD_RELIEF_PAYGROUP_LIST_DATA_SUCCESS;
  constructor(public payload: IReliefPayGroup[]) { }
}

export class LoadReliefEmployeeListData implements Action {
  readonly type = ReliefActionTypes.LOAD_RELIEF_EMPLOYEE_LIST_DATA;
}
export class LoadReliefEmployeeListDataSuccess implements Action {
  readonly type = ReliefActionTypes.LOAD_RELIEF_EMPLOYEE_LIST_DATA_SUCCESS;
  constructor(public payload: IReliefEmployeeData[]) { }
}

export class DeleteEmployeeRelief implements Action {
  readonly type = ReliefActionTypes.DELETE_EMPLOYEE_RELIEF_CONFIGURE;
  constructor(public payload: {reliefdet_id: number}) {}
}

export class DeletePaygroupRelief implements Action {
  readonly type = ReliefActionTypes.DELETE_PAYGROUP_RELIEF_CONFIGURE;
  constructor(public payload: {reliefdet_id: number}) {}
}

export class DeleteGradeRelief implements Action {
  readonly type = ReliefActionTypes.DELETE_GRADE_RELIEF_CONFIGURE;
  constructor(public payload: {reliefdet_id: number}) {}
}


export type ReliefActions =
  | ShowEditorRelief
  | HideEditorRelief
  | ProcessingRelief
  | NotProcessingRelief
  | LoadingRelief
  | NotLoadingRelief
  | LoadReliefData
  | LoadReliefDataSuccess
  | LoadReliefProfileData
  | LoadReliefProfileDataSuccess
  | ShowAddEditorRelief
  | HideAddEditorRelief
  | SaveReliedProfileData
  | LoadStatutoeyReliefData
  | LoadStatutoeyReliefDataSuccess
  | LoadReliefTypeData
  | LoadReliefTypeDataSuccess
  | ShowConfigEditorRelief
  | HideConfigEditorRelief
  | LoadUseRuleData
  | LoadUseRuleDataSuccess
  | LoadReliefCurrencyData
  | LoadReliefCurrencyDataSuccess
  | LoadReliefGradeData
  | LoadReliefGradeDataSuccess
  | ShowGradeEditorRelief
  | HideGradeEditorRelief
  | SaveReliefGradesData
  | GetReliefGradeData
  | GetReliefGradeDataSuccess
  | LoadReliefPayGroupData
  | LoadReliefPayGroupDataSuccess
  | ShowPayGroupEditorRelief
  | HidePayGroupEditorRelief
  | GetPayGroupData
  | GetPayGroupDataSuccess
  | SaveReliefPayGroupData
  | LoadEmployeeData 
  | LoadEmployeeDataSuccess
  | ShowEmployeeEditorRelief
  | HideEmployeeEditorRelief
  | SaveReliefEmployeeData
  | GetEmployeeData
  | GetEmployeeDataSuccess
  | ShowViewEditorRelief
  | HideViewEditorRelief
  | DeleteRelief
  | ShowFixedDeductionRelief
  | HideFixedDeductionRelief
  | LoadFixedDeductionData
  | LoadFixedDeductionDataSuccess
  | UpdateFixedDeductionData
  | SavePayGroupData
  | SaveEmployeeData
  | SaveGradesData
  | LoadReliefGradeListData
  | LoadReliefGradeListDataSuccess
  | LoadReliefPayGroupListData
  | LoadReliefPayGroupListDataSuccess
  | LoadReliefEmployeeListData
  | LoadReliefEmployeeListDataSuccess