import { initialHrResignationState, IHrResignationState } from './hr-resignation.state';
import { HrResignationActions, HrResignationActionTypes } from './hr-resignation.actions';

export function hrResignationReducer(
  state = initialHrResignationState,
  action: HrResignationActions
): IHrResignationState {
  switch (action.type) {
    case HrResignationActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case HrResignationActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case HrResignationActionTypes.LOADING:
      return { ...state, isLoading: true };
    case HrResignationActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case HrResignationActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case HrResignationActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case HrResignationActionTypes.LOAD_RESIGNATION_TYPES_SELECT_OPTION_SUCCESS:
      return { ...state, resignationTypes: action.payload };
    case HrResignationActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case HrResignationActionTypes.LOAD_SUBMITTED_RESIGNATIONS_DATA_SUCCESS:
      return {
        ...state, submittedLetters: action.payload};
    case HrResignationActionTypes.LOAD_HR_RESPONSE_QUEUE_SUCCESS:
      return { ...state, hrResponseQueue: action.payload };
    case HrResignationActionTypes.LOAD_REPORT_URL_SUCCESS:
      return { ...state, reportUrl: action.payload };
    default: {
      return state;
    }
  }
}


/*
.map(data => Object.assign({}, data, {
          fullname: data.EmployeeInfo.employee_midname ? `${data.EmployeeInfo.employee_firstname} ${data.EmployeeInfo.employee_midname} ${data.EmployeeInfo.employee_surname}` : `${data.EmployeeInfo.employee_firstname} ${data.EmployeeInfo.employee_surname}`,
        }))
        */
