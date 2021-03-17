import { initialIdentificationState, IIdentificationState } from './identification.state';
import { IdentificationActions, IdentificationActionTypes } from './identification.actions';

export function identificationReducer(state = initialIdentificationState, action: IdentificationActions): IIdentificationState {
  switch (action.type) {
    case IdentificationActionTypes.HR_SHOW_EDITOR:
      return { ...state, showEditor: true };
    case IdentificationActionTypes.HR_HIDE_EDITOR:
      return { ...state, showEditor: false };
    case IdentificationActionTypes.HR_SHOW_VIEWER:
      return { ...state, showViewer: true };
    case IdentificationActionTypes.HR_HIDE_VIEWER:
      return { ...state, showViewer: false };
    case IdentificationActionTypes.HR_PROCESSING:
      return { ...state, isProcessing: true };
    case IdentificationActionTypes.HR_NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case IdentificationActionTypes.HR_LOAD_APPROVED_DATA_SUCCESS:
      return { ...state, approvedData: action.payload };
    case IdentificationActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS:
      return { ...state, awaitingApprovalData: action.payload };
    case IdentificationActionTypes.HR_LOAD_GRADE_SUCCESS:
      return { ...state, grade: action.payload };
    case IdentificationActionTypes.HR_LOAD_POSITION_SUCCESS:
      return { ...state, position: action.payload };
    case IdentificationActionTypes.HR_LOAD_PAY_GROUP_SUCCESS:
      return { ...state, payGroup: action.payload };
    case IdentificationActionTypes.HR_LOAD_JOB_TITLE_SUCCESS:
      return { ...state, jobTitle: action.payload };
      case IdentificationActionTypes.HR_LOAD_ACTING_JOB_TITLE_SUCCESS:
      return { ...state, actingJobTitle: action.payload };
    case IdentificationActionTypes.HR_LOAD_PAYMENT_MODE_SUCCESS:
        return { ...state, paymentMode: action.payload };
    case IdentificationActionTypes.HR_LOAD_REPORT_TO_SUCCESS:
        return { ...state, reportsTo: action.payload };
    case IdentificationActionTypes.HR_LOAD_BACK_UP_OFFICER_SUCCESS:
        return { ...state, backupOfficer: action.payload };
    case IdentificationActionTypes.HR_RESET_DATA:
      return {
        ...state,
        approvedData: null,
        awaitingApprovalData: null,
        isProcessing: false,
        showEditor: false,
        showViewer: false
      }
    default: {
      return state;
    }
  }
}
