import { initialHrProcessState, IHrProcessState } from './hr-process.state';
import { HrProcessActions, HrProcessActionTypes } from './hr-process.actions';

export function hrProcessReducer(
  state = initialHrProcessState,
  action: HrProcessActions
): IHrProcessState {
  switch (action.type) {
    case HrProcessActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case HrProcessActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case HrProcessActionTypes.LOADING:
      return { ...state, isLoading: true };
    case HrProcessActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case HrProcessActionTypes.LOAD_EMPLOYEE_SUBMITTED_LETTER_SUCCESS:
      return { ...state, employeeSubmittedLetter: action.payload };
    case HrProcessActionTypes.LOAD_EMPLOYEE_PROCESS_DATA_SUCCESS:
      return { ...state, processListData: action.payload };
    case HrProcessActionTypes.LOAD_DATA_FINALIZE_WORKFLOW_SUCCESS:
      return { ...state, finalizeWorkflow: action.payload };
    case HrProcessActionTypes.IS_USER_ADMIN:
      return { ...state, isAdmin: action.payload };
    case HrProcessActionTypes.SHOW_SEPARATION_EDITOR:
      return { ...state, showEditor: action.payload };
    case HrProcessActionTypes.LOAD_LETTER_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case HrProcessActionTypes.LOAD_CHECKLIST_TRANSACTIONS_SUCCESS:
      return { ...state, checklistTransactions: action.payload };
    case HrProcessActionTypes.SUBMIT_CHECKLIST_TRANSACTIONS_SUCCESS:
      return { ...state, submitSuccess: action.payload };
    default: {
      return state;
    }
  }
}
