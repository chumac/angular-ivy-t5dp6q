import { initialEmployeeStatusState, IEmployeeStatusState } from './employee-status.state';
import { EmployeeStatusActions, EmployeeStatusActionTypes } from './employee-status.actions';

export function employeeStatusReducer(
  state = initialEmployeeStatusState,
  action: EmployeeStatusActions
): IEmployeeStatusState {
  switch (action.type) {
    case EmployeeStatusActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case EmployeeStatusActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case EmployeeStatusActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case EmployeeStatusActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case EmployeeStatusActionTypes.LOAD_STATUS_DATA_SUCCESS:
      return { ...state, statusData: action.payload };
    default: {
      return state;
    }
  }
}
