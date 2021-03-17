import { Action } from '@ngrx/store';
import { IProfile } from '@nutela/models/compensation/payroll';
import { ISelectOption } from '@nutela/models/core-data';



export enum ProfileActionTypes {

  SHOW_EDITOR = '[ PROFILE] Show Editor',
  HIDE_EDITOR = '[PROFILE] Hide Editor',

  SHOW_VIEWER = '[ PROFILE] Show Viewer',
  HIDE_VIEWER = '[PROFILE] Hide Viewer',

  SHOW_TREE = '[ PROFILE] Show Tree',
  HIDE_TREE = '[PROFILE] Hide Tree',

  PROCESSING = '[ PROFILE ] Processing',
  NOT_PROCESSING = '[ PROFILE ] Not Processing',

  LOADING = '[ PROFILE ] Loading',
  NOT_LOADING = '[ PROFILE ] Not Loading',

  LOADING_FORM = '[ PROFILE ] Loading Form',
  NOT_LOADING_FORM = '[ PROFILE ] Not Loading Form',

  LOAD_PROFILE_DATA = '[ PROFILE] Load Profile Data',
  LOAD_PROFILE_DATA_SUCCESS = '[ PROFILE] Load Profile Data Success',

  LOAD_DAYS_DATA = '[ PROFILE] Load Days Data',
  LOAD_DAYS_DATA_SUCCESS = '[ PROFILE] Load Days Data Success',

  LOAD_TAX_OPTIONS_DATA = '[ PROFILE] Load Tax Options Data',
  LOAD_TAX_OPTIONS_DATA_SUCCESS = '[ PROFILE] Load Tax Options Data Success',

  LOAD_TAX_MODE_DATA = '[ PROFILE] Load Tax Mode Data',
  LOAD_TAX_MODE_DATA_SUCCESS = '[ PROFILE] Load Tax Mode Data Success',

  LOAD_TAX_RULE_DATA = '[ PROFILE] Load Tax Rule Data',
  LOAD_TAX_RULE_DATA_SUCCESS = '[ PROFILE] Load Tax Rule Data Success',

  LOAD_RUN_CYCLE_DATA = '[ PROFILE] Load Run Cycle Data',
  LOAD_RUN_CYCLE_DATA_SUCCESS = '[ PROFILE] Load Run Cycle Data Success',

  LOAD_PAYROLL_SELECT_OPTION_DATA = '[ PROFILE ] Load Payroll SelectOption Data',
  LOAD_PAYROLL_SELECT_OPTION_DATA_SUCCESS = '[ PROFILE ] Load Payroll SelectOption Data Success',

  LOAD_CURRENCY_DATA = '[ PROFILE] Load Currency Data',
  LOAD_CURRENCY_DATA_SUCCESS = '[ PROFILE] Load Currency Data Success',

  LOAD_PAY_PERIOD_DATA = '[ PROFILE] Load Pay Period Data',
  LOAD_PAY_PERIOD_DATA_SUCCESS = '[ PROFILE] Load Pay Period Data Success',

  LOAD_ENTERPRISE_STRUCTURE_DATA = '[ PROFILE] Load Enterprise Structure Data',
  LOAD_ENTERPRISE_STRUCTURE_DATA_SUCCESS = '[ PROFILE] Load Enterprise Structure Data Success',

  LOAD_STRUCTURE_DETAIL_DATA = '[ PROFILE] Load Structure Detail Data',
  LOAD_STRUCTURE_DETAIL_DATA_SUCCESS = '[ PROFILE] Load Structure Detail Data Success',

  LOAD_ALLOW_NEGATIVE_PAY_DATA = '[ PROFILE] Load Allow Negative Pay Data',
  LOAD_ALLOW_NEGATIVE_PAY_DATA_SUCCESS = '[ PROFILE] Load Allow Negative Pay Data Success',

  LOAD_COST_CENTER_DATA = '[ PROFILE] Load Cost Center Data',
  LOAD_COST_CENTER_DATA_SUCCESS = '[ PROFILE] Load Cost Center Data Success',

  LOAD_FIXED_DEDUCTION_DATA = '[ PROFILE] Load Fixed Deduction Data',
  LOAD_FIXED_DEDUCTION_DATA_SUCCESS = '[ PROFILE] Load Fixed Deduction Data Success',

  LOAD_COINAGE_ROUNDING_DATA = '[ PROFILE] Load Coinage Rounding Data',
  LOAD_COINAGE_ROUNDING_DATA_SUCCESS = '[ PROFILE] Load Coinage Rounding Data Success',

  LOAD_UPFRONT_TREATMENT_DATA = '[ PROFILE] Load Upfront Treatment Data',
  LOAD_UPFRONT_TREATMENT_DATA_SUCCESS = '[ PROFILE] Load Upfront Treatment Data Success',

  LOAD_PERIODIC_PRORATION_DATA = '[ PROFILE] Load Periodic Proration Data',
  LOAD_PERIODIC_PRORATION_DATA_SUCCESS = '[ PROFILE] Load Periodic Proration Data Success',

  LOAD_SECURITY_ROLES_DATA = '[ PROFILE] Load Security Roles Data',
  LOAD_SECURITY_ROLES_DATA_SUCCESS = '[ PROFILE] Load Security Roles Data Success',

  LOAD_SECURITY_GROUP_EDITABLE = '[ PROFILE] Load Security Group Eligibility',
  LOAD_SECURITY_GROUP_EDITABLE_SUCCESS = '[ PROFILE] Load Security Group Eligibility Success',

  SAVE = '[PROFILE] Save',
  SAVE_SUCCESS = '[ PROFILE] Save Success',

  UPDATE = '[UPDATE PROFILE] UPDATE',
  UPDATE_SUCCESS = '[UPDATE PROFILE] UPDATE Success',

  DELETE_PROFILE_DATA = '[PROFILE] Delete Profile Data',

  HAS_PROFILE_ADMIN_ROLE = '[PROFILE] Has Profile Admin Role',
}


export class ShowEditorProfile implements Action {
  readonly type = ProfileActionTypes.SHOW_EDITOR;
}

export class HideEditorProfile implements Action {
  readonly type = ProfileActionTypes.HIDE_EDITOR;
}

export class ShowViewerProfile implements Action {
  readonly type = ProfileActionTypes.SHOW_VIEWER;
}

export class HideViewerProfile implements Action {
  readonly type = ProfileActionTypes.HIDE_VIEWER;
}

export class ShowTreeProfile implements Action {
  readonly type = ProfileActionTypes.SHOW_TREE;
}

export class HideTreeProfile implements Action {
  readonly type = ProfileActionTypes.HIDE_TREE;
}

export class ProcessingProfile implements Action {
  readonly type = ProfileActionTypes.PROCESSING;
}

export class NotProcessingProfile implements Action {
  readonly type = ProfileActionTypes.NOT_PROCESSING;
}

export class LoadingProfile implements Action {
  readonly type = ProfileActionTypes.LOADING;
}

export class NotLoadingProfile implements Action {
  readonly type = ProfileActionTypes.NOT_LOADING;
}

export class LoadingFormData implements Action {
  readonly type = ProfileActionTypes.LOADING_FORM;
}

export class NotLoadingFormData implements Action {
  readonly type = ProfileActionTypes.NOT_LOADING_FORM;
}


export class LoadProfileData implements Action {
  readonly type = ProfileActionTypes.LOAD_PROFILE_DATA;
}

export class LoadProfileSuccess implements Action {
  readonly type = ProfileActionTypes.LOAD_PROFILE_DATA_SUCCESS;
  constructor(public payload: IProfile[]) { }
}

export class LoadPayrollProfileSelectOption implements Action {
  readonly type = ProfileActionTypes.LOAD_PAYROLL_SELECT_OPTION_DATA;
  constructor(public payload: { useNoneOption: boolean }) { }
}

export class LoadPayrollProfileSelectOptionSuccess implements Action {
  readonly type = ProfileActionTypes.LOAD_PAYROLL_SELECT_OPTION_DATA_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class LoadDaysSelectOptionData implements Action {
  readonly type = ProfileActionTypes.LOAD_DAYS_DATA;
}

export class LoadDaysSelectOptionDataSuccess implements Action {
  readonly type = ProfileActionTypes.LOAD_DAYS_DATA_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class LoadTaxOptionSelectOptionData implements Action {
  readonly type = ProfileActionTypes.LOAD_TAX_OPTIONS_DATA;
}

export class LoadTaxOptionSelectOptionDataSuccess implements Action {
  readonly type = ProfileActionTypes.LOAD_TAX_OPTIONS_DATA_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class LoadAllowNegativePaySelectOptionData implements Action {
  readonly type = ProfileActionTypes.LOAD_ALLOW_NEGATIVE_PAY_DATA;
}

export class LoadAllowNegativePaySelectOptionDataSuccess implements Action {
  readonly type = ProfileActionTypes.LOAD_ALLOW_NEGATIVE_PAY_DATA_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class LoadTaxModeSelectOptionData implements Action {
  readonly type = ProfileActionTypes.LOAD_TAX_MODE_DATA;
}

export class LoadTaxModeSelectOptionDataSuccess implements Action {
  readonly type = ProfileActionTypes.LOAD_TAX_MODE_DATA_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class LoadTaxRuleSelectOptionData implements Action {
  readonly type = ProfileActionTypes.LOAD_TAX_RULE_DATA;
}

export class LoadTaxRuleSelectOptionDataSuccess implements Action {
  readonly type = ProfileActionTypes.LOAD_TAX_RULE_DATA_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class LoadPaymentCurrencySelectOptionData implements Action {
  readonly type = ProfileActionTypes.LOAD_CURRENCY_DATA;
}

export class LoadPaymentCurrencySelectOptionDataSuccess implements Action {
  readonly type = ProfileActionTypes.LOAD_CURRENCY_DATA_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class LoadPayPeriodSelectOptionData implements Action {
  readonly type = ProfileActionTypes.LOAD_PAY_PERIOD_DATA;
}

export class LoadPayPeriodSelectOptionDataSuccess implements Action {
  readonly type = ProfileActionTypes.LOAD_PAY_PERIOD_DATA_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class LoadRunCycleSelectOptionData implements Action {
  readonly type = ProfileActionTypes.LOAD_RUN_CYCLE_DATA;
}

export class LoadRunCycleSelectOptionDataSuccess implements Action {
  readonly type = ProfileActionTypes.LOAD_RUN_CYCLE_DATA_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class LoadEnterpriseStructureSelectOptionData implements Action {
  readonly type = ProfileActionTypes.LOAD_ENTERPRISE_STRUCTURE_DATA;
}

export class LoadEnterpriseStructureSelectOptionDataSuccess implements Action {
  readonly type = ProfileActionTypes.LOAD_ENTERPRISE_STRUCTURE_DATA_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class LoadStructureDetailSelectOptionData implements Action {
  readonly type = ProfileActionTypes.LOAD_STRUCTURE_DETAIL_DATA;

  constructor(public payload: { structureId: number }) { }
}

export class LoadStructureDetailSelectOptionDataSuccess implements Action {
  readonly type = ProfileActionTypes.LOAD_STRUCTURE_DETAIL_DATA_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class LoadCostCenterSelectOptionData implements Action {
  readonly type = ProfileActionTypes.LOAD_COST_CENTER_DATA;
  constructor(public payload: { structureId: number }) { }
}

export class LoadCostCenterSelectOptionDataSuccess implements Action {
  readonly type = ProfileActionTypes.LOAD_COST_CENTER_DATA_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class LoadFixedDeductionSelectOptionData implements Action {
  readonly type = ProfileActionTypes.LOAD_FIXED_DEDUCTION_DATA;
}

export class LoadFixedDeductionSelectOptionDataSuccess implements Action {
  readonly type = ProfileActionTypes.LOAD_FIXED_DEDUCTION_DATA_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class LoadCoinageRoundingSelectOptionData implements Action {
  readonly type = ProfileActionTypes.LOAD_COINAGE_ROUNDING_DATA;
}

export class LoadCoinageRoundingSelectOptionDataSuccess implements Action {
  readonly type = ProfileActionTypes.LOAD_COINAGE_ROUNDING_DATA_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class LoadUpfrontTreatmentSelectOptionData implements Action {
  readonly type = ProfileActionTypes.LOAD_UPFRONT_TREATMENT_DATA;
}

export class LoadUpfrontTreatmentSelectOptionDataSuccess implements Action {
  readonly type = ProfileActionTypes.LOAD_UPFRONT_TREATMENT_DATA_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class LoadPeriodicProrationSelectOptionData implements Action {
  readonly type = ProfileActionTypes.LOAD_PERIODIC_PRORATION_DATA;
}

export class LoadPeriodicProrationSelectOptionDataSuccess implements Action {
  readonly type = ProfileActionTypes.LOAD_PERIODIC_PRORATION_DATA_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class LoadSecurityRolesSelectOptionData implements Action {
  readonly type = ProfileActionTypes.LOAD_SECURITY_ROLES_DATA;
}

export class LoadSecurityRolesSelectOptionDataSuccess implements Action {
  readonly type = ProfileActionTypes.LOAD_SECURITY_ROLES_DATA_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class LoadUpdateSecurityGroupEligibility implements Action {
  readonly type = ProfileActionTypes.LOAD_SECURITY_GROUP_EDITABLE;
}

export class LoadUpdateSecurityGroupEligibilitySuccess implements Action {
  readonly type = ProfileActionTypes.LOAD_SECURITY_GROUP_EDITABLE_SUCCESS;
  constructor(public payload: any) { }
}

export class SaveProfile implements Action {
  readonly type = ProfileActionTypes.SAVE;
  constructor(public payload: { data: IProfile }) { }
}

export class UpdateProfile implements Action {
  readonly type = ProfileActionTypes.UPDATE;
  constructor(public payload: { data: IProfile, recordId: number }) { }
}

export class DeleteProfile implements Action {
  readonly type = ProfileActionTypes.DELETE_PROFILE_DATA;
  constructor(public payload: { recordId: number }) { }
}

export class HasProfileAdminRole implements Action {
  readonly type = ProfileActionTypes.HAS_PROFILE_ADMIN_ROLE;
  constructor(public payload: boolean) { }
}

export type ProfileActions =
  | ShowEditorProfile
  | HideEditorProfile
  | ShowViewerProfile
  | HideViewerProfile
  | ShowTreeProfile
  | HideTreeProfile
  | ProcessingProfile
  | NotProcessingProfile
  | LoadingProfile
  | NotLoadingProfile
  | LoadingFormData
  | NotLoadingFormData
  | LoadProfileData
  | LoadProfileSuccess
  | LoadPayrollProfileSelectOption
  | LoadPayrollProfileSelectOptionSuccess
  | LoadDaysSelectOptionData
  | LoadDaysSelectOptionDataSuccess
  | LoadTaxOptionSelectOptionData
  | LoadTaxOptionSelectOptionDataSuccess
  | LoadTaxModeSelectOptionData
  | LoadTaxModeSelectOptionDataSuccess
  | LoadTaxRuleSelectOptionData
  | LoadTaxRuleSelectOptionDataSuccess
  | LoadPaymentCurrencySelectOptionData
  | LoadPaymentCurrencySelectOptionDataSuccess
  | LoadPayPeriodSelectOptionData
  | LoadPayPeriodSelectOptionDataSuccess
  | LoadEnterpriseStructureSelectOptionData
  | LoadEnterpriseStructureSelectOptionDataSuccess
  | LoadStructureDetailSelectOptionData
  | LoadStructureDetailSelectOptionDataSuccess
  | LoadAllowNegativePaySelectOptionData
  | LoadAllowNegativePaySelectOptionDataSuccess
  | LoadRunCycleSelectOptionData
  | LoadRunCycleSelectOptionDataSuccess
  | LoadCostCenterSelectOptionData
  | LoadCostCenterSelectOptionDataSuccess
  | LoadFixedDeductionSelectOptionData
  | LoadFixedDeductionSelectOptionDataSuccess
  | LoadCoinageRoundingSelectOptionData
  | LoadCoinageRoundingSelectOptionDataSuccess
  | LoadUpfrontTreatmentSelectOptionData
  | LoadUpfrontTreatmentSelectOptionDataSuccess
  | LoadPeriodicProrationSelectOptionData
  | LoadPeriodicProrationSelectOptionDataSuccess
  | LoadSecurityRolesSelectOptionData
  | LoadSecurityRolesSelectOptionDataSuccess
  | LoadUpdateSecurityGroupEligibility
  | LoadUpdateSecurityGroupEligibilitySuccess
  | SaveProfile
  | UpdateProfile
  | DeleteProfile
  | HasProfileAdminRole;
