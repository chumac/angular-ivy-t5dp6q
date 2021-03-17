import { initialFormulaState, IFormulaState } from './formula.state';
import { FormulaActions, FormulaActionTypes } from './formula.actions';

export function formulaReducer(
  state = initialFormulaState,
  action: FormulaActions
): IFormulaState {
  switch (action.type) {
    case FormulaActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case FormulaActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case FormulaActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case FormulaActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case FormulaActionTypes.LOADING:
      return { ...state, isLoading: true };
    case FormulaActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case FormulaActionTypes.LOAD_FORMULA_DATA_SUCCESS:
      return { ...state, data: action.payload };
    case FormulaActionTypes.LOAD_FILTERED_FORMULA_DATA:
      return { ...state, filteredData: state.data.filter(val =>  action.payload.payrollProfileId ? val.payroll_profile_id === action.payload.payrollProfileId : (val.link_to_profile === action.payload.payrollProfileId)) };
    case FormulaActionTypes.LOAD_ROLE_DATA_SUCCESS:
      return { ...state, roles: action.payload };
    case FormulaActionTypes.HAS_FORMULA_ADMIN_ROLE:
      return { ...state, hasFormulaAdminRole: action.payload };
    default: {
      return state;
    }
  }
}
