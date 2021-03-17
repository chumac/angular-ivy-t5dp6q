import { initialStaffState, IStaffState } from './newstaff.state';
import { StaffActionTypes, StaffActions } from './newstaff.actions';

export function staffReducer(
  state = initialStaffState,
  action: StaffActions
): IStaffState {
  switch (action.type) {
    case StaffActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case StaffActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case StaffActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case StaffActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case StaffActionTypes.LOADING:
      return { ...state, isLoading: true };
    case StaffActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case StaffActionTypes.LOAD_EMPLOYEE_LIST_DATA_SUCCESS:
      return { ...state, staffemployeeList: action.payload };
    case StaffActionTypes.LOAD_EMPLOYEE_GROUP_SELECT_OPTION_DATA_SUCCESS:
       return { ...state, employeeGroupSelectOption: action.payload };
    case StaffActionTypes.LOAD_EMPLOYEE_PAYROLL_PROFILE_DATA_SUCCESS:
       return { ...state, employeePayrollProfile: action.payload };
       case StaffActionTypes.LOAD_CAN_PROFILE_DATA_SUCCESS:
       return { ...state, getPayrollProfile: action.payload };
    default: {
      return state;
    }
  }
}
