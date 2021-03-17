import { initialProcessState, IProcessState } from './process.state';
import { ProcessActions, ProcessActionTypes } from './process.actions';

export function processReducer(
  state = initialProcessState,
  action: ProcessActions
): IProcessState {
  switch (action.type) {
    case ProcessActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case ProcessActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case ProcessActionTypes.PROCESSING_SAVE:
      return { ...state, isProcessingSave: action.payload };
    case ProcessActionTypes.PROCESSING_REDIRECT:
      return { ...state, isProcessingRedirect: action.payload };
    case ProcessActionTypes.LOADING:
      return { ...state, isLoading: true };
    case ProcessActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case ProcessActionTypes.SHOW_PENDING_RESPONSES_VIEWER:
      return { ...state, showPendingResponses: true };
    case ProcessActionTypes.HIDE_PENDING_RESPONSES_VIEWER:
      return { ...state, showPendingResponses: false };
    case ProcessActionTypes.LOAD_SUBMITTED_LETTER_SUCCESS:
      return { ...state, submittedLetter: action.payload };
    case ProcessActionTypes.LOAD_PROCESS_DATA_SUCCESS:
      return { ...state, processListData: action.payload };
    case ProcessActionTypes.LOAD_INTERVIEW_LINK_DATA_SUCCESS:
      return { ...state, interviewLink: action.payload };
    case ProcessActionTypes.LOAD_CUSTOM_FORM_DATA_SUCCESS:
      return { ...state, customFormData: action.payload };
    case ProcessActionTypes.LOAD_CHECKLIST_TYPES_SUCCESS:
      return {
        ...state, checklistTypes: action.payload
      };
    case ProcessActionTypes.LOAD_LETTER_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case ProcessActionTypes.LOAD_CHECKLIST_TRANSACTIONS_SUCCESS:
      return { ...state, checklistTransactions: action.payload };
    case ProcessActionTypes.LOAD_PENDING_RESPONSES_SUCCESS:
      return { ...state, pendingResponses: action.payload };
    case ProcessActionTypes.SUBMIT_CHECKLIST_TRANSACTIONS_SUCCESS:
      return { ...state, submitSuccess: action.payload };
    case ProcessActionTypes.LOAD_EMPLOYEE_PHOTO_SUCCESS:
      return { ...state, employeePhoto: action.payload };
    default: {
      return state;
    }
  }
}
