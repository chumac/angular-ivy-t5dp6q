import { initialResignationState, IResignationState } from './resignation.state';
import { ResignationActions, ResignationActionTypes } from './resignation.actions';

export function resignationReducer(
  state = initialResignationState,
  action: ResignationActions
): IResignationState {
  switch (action.type) {
    case ResignationActionTypes.SHOW_VALIDATE_EDITOR:
      return { ...state, showValidateEditor: true };
    case ResignationActionTypes.HIDE_VALIDATE_EDITOR:
      return { ...state, showValidateEditor: false };
    case ResignationActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case ResignationActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case ResignationActionTypes.SHOW_RESPONSE_VIEWER:
      return { ...state, showViewerResponses: true };
    case ResignationActionTypes.HIDE_RESPONSE_VIEWER:
      return { ...state, showViewerResponses: false };
    case ResignationActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case ResignationActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case ResignationActionTypes.LOADING:
      return { ...state, isLoading: true };
    case ResignationActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case ResignationActionTypes.SAVE_SUCCESS:
      return { ...state, submitSuccessful: true };
    case ResignationActionTypes.SAVE_FAILURE:
      return { ...state, submitSuccessful: false };
    case ResignationActionTypes.LOAD_RESIGNATION_TYPES_SELECT_OPTION_SUCCESS:
      return { ...state, resignationTypes: action.payload };
    case ResignationActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case ResignationActionTypes.LOAD_SUBMITTED_RESIGNATIONS_DATA_SUCCESS:
      return { ...state, submittedData: action.payload };
    case ResignationActionTypes.LOAD_PROXY_RESIGNATIONS_DATA_SUCCESS:
      return { ...state, proxyResignations: action.payload };
    case ResignationActionTypes.LOAD_WORKFLOW_DATA_SUCCESS:
      return { ...state, workflowSelectOption: action.payload };
    case ResignationActionTypes.LOAD_RESPONSES_DATA_SUCCESS:
      return { ...state, responsesData: action.payload };
    case ResignationActionTypes.LOAD_EXIT_INITIATION_STATUS_SUCCESS:
      return { ...state, myProcessInitiated: action.payload };
    case ResignationActionTypes.LOAD_NUMBER_OF_RESPONSE_NOTIFICATIONS:
      return { ...state, numberOfNotifications: action.payload };
    case ResignationActionTypes.LOAD_EMPLOYEE_PROCESS_INITIATION_STATUS_SUCCESS:
      return { ...state, employeeProcessInitiated: action.payload };
    case ResignationActionTypes.START_INTERVIEW_SUCCESS:
      return { ...state, interviewStarted: action.payload };
    case ResignationActionTypes.LOAD_MY_SUBORDINATES_SUCCESS:
      return { ...state, mySubordinates: action.payload.map(data => Object.assign({}, data, {
        fullname: data.employee_midname ? `${data.employee_firstname} ${data.employee_midname} ${data.employee_surname}` : `${data.employee_firstname} ${data.employee_surname}`,
      })) };
    default: {
      return state;
    }
  }
}
