import { initialRunState, IRunState } from './run.state';
import { RunActions, RunActionTypes } from './run.actions';

export function runReducer(
  state = initialRunState,
  action: RunActions
): IRunState {
  switch (action.type) {
    case RunActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case RunActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case RunActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case RunActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case RunActionTypes.LOADING:
      return { ...state, isLoading: true };
    case RunActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case RunActionTypes.SHOW_RECOVER_EDITOR:
      return { ...state, showRecoverEditor: true };
    case RunActionTypes.HIDE_RECOVER_EDITOR:
      return { ...state, showRecoverEditor: false };
    case RunActionTypes.LOAD_PAYROLL_PROFILE_DATA_SUCCESS:
      return { ...state, payrollProfiles: action.payload };
    case RunActionTypes.LOAD_PAYROLL_GROUP_SELECT_OPTION_DATA_SUCCESS:
      return { ...state, payrollGroupSelectOption: action.payload };
    case RunActionTypes.LOAD_PAYMENT_GROUP_SELECT_OPTION_DATA_SUCCESS:
      return { ...state, paygroupSelectOption: action.payload };
    case RunActionTypes.LOAD_PAY_GRADE_SELECT_OPTION_DATA_SUCCESS:
      return { ...state, gradeSelectOption: action.payload };
    case RunActionTypes.LOAD_EMPLOYEE_SELECT_OPTION_DATA_SUCCESS:
      return { ...state, employeeSelectOption: action.payload };
    case RunActionTypes.LOAD_CAN_RUN_DATA_SUCCESS:
      return { ...state, canRun: action.payload };
    case RunActionTypes.LOAD_POSSIBLE_RETURNS_DATA_SUCCESS:
      return { ...state, possibleReturns: action.payload };
    case RunActionTypes.LOAD_CAN_RUN_DATA_SUCCESS:
      return { ...state, canRun: action.payload };
    default: {
      return state;
    }
  }
}
