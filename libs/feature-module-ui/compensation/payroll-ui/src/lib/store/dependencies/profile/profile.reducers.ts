import { initialProfileState, IProfileState } from './profile.state';
import { ProfileActions, ProfileActionTypes } from './profile.actions';

export function profileReducer(
  state = initialProfileState,
  action: ProfileActions
): IProfileState {
  switch (action.type) {
    case ProfileActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case ProfileActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case ProfileActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case ProfileActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case ProfileActionTypes.SHOW_TREE:
      return { ...state, showTree: true };
    case ProfileActionTypes.HIDE_TREE:
      return { ...state, showTree: false };
    case ProfileActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case ProfileActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case ProfileActionTypes.LOADING:
      return { ...state, isLoading: true };
    case ProfileActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case ProfileActionTypes.LOADING_FORM:
      return { ...state, isLoadingForm: true };
    case ProfileActionTypes.NOT_LOADING_FORM:
      return { ...state, isLoadingForm: false };
    case ProfileActionTypes.LOAD_PROFILE_DATA_SUCCESS:
      return { ...state, data: action.payload };
    case ProfileActionTypes.LOAD_DAYS_DATA_SUCCESS:
      return { ...state, daysData: action.payload };
    case ProfileActionTypes.LOAD_PAYROLL_SELECT_OPTION_DATA_SUCCESS:
      return { ...state, payrollSelectOption: action.payload };
    case ProfileActionTypes.LOAD_TAX_OPTIONS_DATA_SUCCESS:
      return { ...state, taxOptionData: action.payload };
    case ProfileActionTypes.LOAD_TAX_MODE_DATA_SUCCESS:
      return { ...state, taxModeData: action.payload };
    case ProfileActionTypes.LOAD_TAX_RULE_DATA_SUCCESS:
      return { ...state, taxRuleData: action.payload };
    case ProfileActionTypes.LOAD_CURRENCY_DATA_SUCCESS:
      return { ...state, paymentCurrencyData: action.payload };
    case ProfileActionTypes.LOAD_PAY_PERIOD_DATA_SUCCESS:
      return { ...state, payPeriodData: action.payload };
    case ProfileActionTypes.LOAD_ENTERPRISE_STRUCTURE_DATA_SUCCESS:
      return { ...state, enterpriseStructures: action.payload };
    case ProfileActionTypes.LOAD_STRUCTURE_DETAIL_DATA_SUCCESS:
      return { ...state, structureDetails: action.payload };
    case ProfileActionTypes.LOAD_COST_CENTER_DATA_SUCCESS:
      return { ...state, costCenterData: action.payload };
    case ProfileActionTypes.LOAD_FIXED_DEDUCTION_DATA_SUCCESS:
      return { ...state, fixedDeductionData: action.payload };
    case ProfileActionTypes.LOAD_COINAGE_ROUNDING_DATA_SUCCESS:
      return { ...state, coinageRoundingData: action.payload };
    case ProfileActionTypes.LOAD_UPFRONT_TREATMENT_DATA_SUCCESS:
      return { ...state, upfrontTreatmentData: action.payload };
    case ProfileActionTypes.LOAD_PERIODIC_PRORATION_DATA_SUCCESS:
      return { ...state, periodicProrationData: action.payload };
    case ProfileActionTypes.LOAD_ALLOW_NEGATIVE_PAY_DATA_SUCCESS:
      return { ...state, allowNegativePay: action.payload };
    case ProfileActionTypes.LOAD_RUN_CYCLE_DATA_SUCCESS:
      return { ...state, runCycle: action.payload };
    case ProfileActionTypes.LOAD_SECURITY_ROLES_DATA_SUCCESS:
      return { ...state, securityRoles: action.payload };
    case ProfileActionTypes.LOAD_SECURITY_GROUP_EDITABLE_SUCCESS:
      return { ...state, canUpdateSecurityGroup: action.payload };
    case ProfileActionTypes.HAS_PROFILE_ADMIN_ROLE:
      return { ...state, hasProfileAdminRole: action.payload };
    default: {
      return state;
    }
  }
}
