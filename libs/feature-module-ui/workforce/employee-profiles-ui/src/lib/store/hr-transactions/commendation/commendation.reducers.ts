import { initialCommendationState, ICommendationState } from './commendation.state';
import { CommendationActions, CommendationActionTypes } from './commendation.actions';

export function commendationReducer(
  state = initialCommendationState,
  action: CommendationActions
): ICommendationState {
  switch (action.type) {
    case CommendationActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case CommendationActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case CommendationActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case CommendationActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case CommendationActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case CommendationActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case CommendationActionTypes.LOAD_APPROVED_DATA_SUCCESS:
      return { ...state, approvedData: action.payload.map(data => Object.assign({}, data, { 
        employee_name: data.EmployeeInfo ? `${data.EmployeeInfo.employee_surname} ${data.EmployeeInfo.employee_firstname} ${data.EmployeeInfo.employee_midname} ${data.EmployeeInfo.employee_number}` : null ,
        issued_by_name: data.IssuedByInfo ? `${data.IssuedByInfo.employee_surname} ${data.IssuedByInfo.employee_firstname} ${data.IssuedByInfo.employee_midname} ${data.IssuedByInfo.employee_number}` : null ,
        role_type_text: data.IssuedByRole ? data.IssuedByRole.description : null ,
      })) };
    case CommendationActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS:
      return { ...state, awaitingApprovalData: action.payload.map(data => Object.assign({}, data, { 
        employee_name: data.EmployeeInfo ? `${data.EmployeeInfo.employee_surname} ${data.EmployeeInfo.employee_firstname} ${data.EmployeeInfo.employee_midname} ${data.EmployeeInfo.employee_number}` : null ,
        issued_by_name: data.IssuedByInfo ? `${data.IssuedByInfo.employee_surname} ${data.IssuedByInfo.employee_firstname} ${data.IssuedByInfo.employee_midname} ${data.IssuedByInfo.employee_number}` : null ,
        role_type_text: data.IssuedByRole ? data.IssuedByRole.description : null ,
      })) };
    case CommendationActionTypes.LOAD_ROLE_TYPES_SUCCESS:
      return { ...state, roleTypes: action.payload };
    case CommendationActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case CommendationActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    default: {
      return state;
    }
  }
}