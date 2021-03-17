import { initialEmployeesDataHomeState, IEmployeesDataHomeState } from './employees-data-home.state';
import { EmployeesDataHomeActions, EmployeesDataHomeActionTypes } from './employees-data-home.actions';


export function employeesDataHomeReducer(
  state = initialEmployeesDataHomeState,
  action: EmployeesDataHomeActions
): IEmployeesDataHomeState {

  switch (action.type) {

    case EmployeesDataHomeActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case EmployeesDataHomeActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case EmployeesDataHomeActionTypes.LOAD_CHART_SUCCESS:
      return { ...state, chartData: action.payload };
    case EmployeesDataHomeActionTypes.LOAD_ACTIVE_REBOARD_EMPLOYEES_DATA_SUCCESS:
      return { ...state, activeReboardEmployees: action.payload };
    case EmployeesDataHomeActionTypes.LOAD_ACTIVE_EMPLOYEES_DATA_SUCCESS:
      return { ...state, activeEmployees: action.payload };
    case EmployeesDataHomeActionTypes.LOAD_INACTIVE_EMPLOYEES_DATA_SUCCESS:
      return { ...state, inactiveEmployees: action.payload };
    case EmployeesDataHomeActionTypes.LOADING_EMPLOYEE_DATA:
      return { ...state, isLoading: true };
    case EmployeesDataHomeActionTypes.NOT_LOADING_EMPLOYEE_DATA:
      return { ...state, isLoading: false };
    case EmployeesDataHomeActionTypes.PROCESSING_START:
      return { ...state, isProcessingStart: true };
    case EmployeesDataHomeActionTypes.NOT_PROCESSING_START:
      return { ...state, isProcessingStart: false };
    case EmployeesDataHomeActionTypes.PROCESSING_CANCEL:
      return { ...state, isProcessingCancel: true };
    case EmployeesDataHomeActionTypes.NOT_PROCESSING_CANCEL:
      return { ...state, isProcessingCancel: false };
    case EmployeesDataHomeActionTypes.PROCESSING_RETRIEVE:
      return { ...state, isProcessingRetrieve: true };
    case EmployeesDataHomeActionTypes.NOT_PROCESSING_RETRIEVE:
      return { ...state, isProcessingRetrieve: false };
    case EmployeesDataHomeActionTypes.PROCESSING_MY_REBOARD_CANCEL:
      return { ...state, isProcessingMyCancel: true };
    case EmployeesDataHomeActionTypes.NOT_PROCESSING_MY_REBOARD_CANCEL:
      return { ...state, isProcessingMyCancel: false };
    case EmployeesDataHomeActionTypes.PROCESSING_DECLINE:
      return { ...state, isProcessingDecline: true };
    case EmployeesDataHomeActionTypes.NOT_PROCESSING_DECLINE:
      return { ...state, isProcessingDecline: false };
    case EmployeesDataHomeActionTypes.LOAD_EMPLOYEES_DATA_ITEM_SUCCESS:
      return { ...state, selectedEmployeeSummary: action.payload };
    case EmployeesDataHomeActionTypes.CLEAR_EMPLOYEES_DATA_ITEM:
      return { ...state, selectedEmployeeSummary: null };
    case EmployeesDataHomeActionTypes.LOAD_EMPLOYEES_PROFILE_PICTURE_SUCCESS:
      return { ...state, selectedEmployeeProfilePicture: action.payload };
    case EmployeesDataHomeActionTypes.LOAD_MY_REBOARD_DETAILS_SUCCESS:
      return { ...state, myReboardDetails: action.payload };
    case EmployeesDataHomeActionTypes.LOAD_REBOARD_WORKFLOW_MESSAGE_SUCCESS:
      return { ...state, reboardWorkflowMessage: action.payload };
    case EmployeesDataHomeActionTypes.LOAD_HR_REBOARD_EMPLOYEE_DETAILS_SUCCESS:
      return { ...state, employeeReboardDetails: action.payload };
    case EmployeesDataHomeActionTypes.CLEAR_VIEWER_PHOTO:
      return { ...state, selectedEmployeeProfilePicture: null };
    default: {
      return state;
    }
  }
}
