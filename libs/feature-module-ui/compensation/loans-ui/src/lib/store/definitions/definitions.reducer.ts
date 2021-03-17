import { initialDefinitionsState, IDefinitionsState } from "./definitions.state";
import { DefinitionsActions, DefinitionsActionTypes } from "./definitions.actions";

export function definitionsReducer(
  state = initialDefinitionsState,
  action: DefinitionsActions
): IDefinitionsState {
  switch (action.type) {
    case DefinitionsActionTypes.SHOW_DEFINITION_EDITOR:
      return { ...state, showEditor: true };
    case DefinitionsActionTypes.HIDE_DEFINITION_EDITOR:
      return { ...state, showEditor: false };

    case DefinitionsActionTypes.PROCESSING_DEFINITION:
      return { ...state, isProcessing: true };
    case DefinitionsActionTypes.NOT_PROCESSING_DEFINITION:
      return { ...state, isProcessing: false };

    case DefinitionsActionTypes.LOADING_DEFINITION:
      return { ...state, isLoading: true };
    case DefinitionsActionTypes.NOT_LOADING_DEFINITION:
      return { ...state, isLoading: false };

    case DefinitionsActionTypes.LOAD_DATA_LOAN_DEFINITIONS_SUCCESS:
      return { ...state, definitionsData: action.payload };

    case DefinitionsActionTypes.LOAD_DATA_PAYROLL_PROFILES_LOAN_DEFINITION_SUCCESS:
      return { ...state, payrollProfilesData: action.payload };

    case DefinitionsActionTypes.LOAD_DATA_PAYROLL_PROFILES_LIST_LOAN_DEFINITION_SUCCESS:
      return { ...state, payrollProfileSelect: action.payload };

    case DefinitionsActionTypes.LOAD_DATA_DEDUCTION_RULES_LOAN_DEFINITION_SUCCESS:
      return { ...state, deductionRulesData: action.payload };

    case DefinitionsActionTypes.LOAD_DATA_DEDUCTION_ALLOWANCES_LOAN_DEFINITION_SUCCESS:
      return { ...state, deductionAllowancesData: action.payload };

    case DefinitionsActionTypes.LOAD_INT_DATA_DEDUCTION_ALLOWANCES_LOAN_DEFINITION_SUCCESS:
      return { ...state, intDeductionAllowancesData: action.payload };

    case DefinitionsActionTypes.LOAD_DATA_AMORTIZATION_RULES_LOAN_DEFINITION_SUCCESS:
      return { ...state, amortizationRulesData: action.payload };

    case DefinitionsActionTypes.LOAD_DATA_GROUP_NAMES_LOAN_DEFINITION_SUCCESS:
      return { ...state, groupNamesData: action.payload };

    default: {
      return state;
    }
  }
}
