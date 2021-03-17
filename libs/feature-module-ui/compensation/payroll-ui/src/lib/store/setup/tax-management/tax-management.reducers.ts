import { initialTaxManagementState, ITaxManagementState } from './tax-management.state';
import { TaxManagementActionTypes, TaxManagementActions } from './tax-management.actions';

export function taxManagementReducer(
  state = initialTaxManagementState,
  action: TaxManagementActions
): ITaxManagementState {
  switch (action.type) {
    case TaxManagementActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case TaxManagementActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case TaxManagementActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case TaxManagementActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case TaxManagementActionTypes.LOADING:
      return { ...state, isLoading: true };
    case TaxManagementActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case TaxManagementActionTypes.LOAD_TAX_MANAGEMENT_LIST_DATA_SUCCESS:
      return { ...state, taxManagementList: action.payload };
    case TaxManagementActionTypes.LOAD_TAX_MANAGEMENT_PROFILE_LIST_DATA_SUCCESS:
      return { ...state, taxManagementProfileList: action.payload };
    case TaxManagementActionTypes.LOAD_PERCENTAGE_GROSS_LIST_DATA_SUCCESS:
      return { ...state, percentageGrossList: action.payload };
    case TaxManagementActionTypes.LOAD_TAX_STANDARD_LIST_DATA_SUCCESS:
      return { ...state, taxStandardList: action.payload };
    case TaxManagementActionTypes.SHOW_PERCENTAGE_GROSS_EDITOR:
      return { ...state, showPercentGrossEditor: true };
    case TaxManagementActionTypes.HIDE_PERCENTAGE_GROSS_EDITOR:
      return { ...state, showPercentGrossEditor: false };
    case TaxManagementActionTypes.SHOW_TAX_STANDARD_EDITOR:
      return { ...state, showTaxStandardEditor: true };
    case TaxManagementActionTypes.HIDE_TAX_STANDARD_EDITOR:
      return { ...state, showTaxStandardEditor: false };
    case TaxManagementActionTypes.LOAD_RANGE_PERCENT_LIST_DATA_SUCCESS:
      return { ...state, rangePercentList: action.payload };
    case TaxManagementActionTypes.SHOW_RANGE_PERCENT_EDITOR:
      return { ...state, showRangePercentEditor: true };
    case TaxManagementActionTypes.HIDE_RANGE_PERCENT_EDITOR:
      return { ...state, showRangePercentEditor: false };
    case TaxManagementActionTypes.LOAD_RANGE_VALUE_LIST_DATA_SUCCESS:
      return { ...state, rangeValueList: action.payload };
    case TaxManagementActionTypes.SHOW_RANGE_VALUE_EDITOR:
      return { ...state, showRangeValueEditor: true };
    case TaxManagementActionTypes.HIDE_RANGE_VALUE_EDITOR:
      return { ...state, showRangeValueEditor: false };
    case TaxManagementActionTypes.LOAD_TAX_FIXED_DEDUCTION_LIST_DATA_SUCCESS:
      return { ...state, taxFixedDeduction: action.payload };
    case TaxManagementActionTypes.SHOW_FIXED_DEDUCTION:
      return { ...state, showTaxFixedDeduction: true };
    case TaxManagementActionTypes.HIDE_FIXED_DEDUCTION:
      return { ...state, showTaxFixedDeduction: false };
    case TaxManagementActionTypes.LOAD_TAX_FIXED_DEDUCTION_DATA_SUCCESS:
      return { ...state, taxFixedDeductionValue: action.payload };
    case TaxManagementActionTypes.SHOW_TAX_PROFILE:
      return { ...state, showTaxProfile: true };
    case TaxManagementActionTypes.HIDE_TAX_PROFILE:
      return { ...state, showTaxProfile: false };
    case TaxManagementActionTypes.SHOW_TAX_STANDARD_VIEW:
      return { ...state, showTaxStandardView: true };
    case TaxManagementActionTypes.HIDE_TAX_STANDARD_VIEW:
      return { ...state, showTaxStandardView: false };
    case TaxManagementActionTypes.SHOW_TAX_RANGE_PERCENT_VIEW:
      return { ...state, showTaxRangePercentView: true };
    case TaxManagementActionTypes.HIDE_TAX_RANGE_PERCENT_VIEW:
      return { ...state, showTaxRangePercentView: false };
    case TaxManagementActionTypes.SHOW_TAX_RANGE_VALUE_VIEW:
      return { ...state, showTaxRangeValueView: true };
    case TaxManagementActionTypes.HIDE_TAX_RANGE_VALUE_VIEW:
      return { ...state, showTaxRangeValueView: false };
    case TaxManagementActionTypes.SHOW_TAX_GROSS_PERCENT_VIEW:
      return { ...state, showTaxGrossPercentView: true };
    case TaxManagementActionTypes.HIDE_TAX_GROSS_PERCENT_VIEW:
      return { ...state, showTaxGrossPercentView: false };

    default: {
      return state;
    }
  }
}
