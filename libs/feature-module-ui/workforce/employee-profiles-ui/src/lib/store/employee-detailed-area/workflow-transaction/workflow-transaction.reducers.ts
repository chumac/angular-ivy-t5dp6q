import { initialWorkflowTransactionState, IWorkflowTransactionState } from "./workflow-transaction.state";
import { WorkflowTransactionActions, WorkflowTransactionActionTypes } from "./workflow-transaction.actions";

export function workflowTransactionReducer(state = initialWorkflowTransactionState, action: WorkflowTransactionActions): IWorkflowTransactionState {
  switch (action.type) {
    case WorkflowTransactionActionTypes.HR_SHOW_EDITOR:
      return { ...state, showEditor: true }
    case WorkflowTransactionActionTypes.HR_HIDE_EDITOR:
      return { ...state, showEditor: false }
    case WorkflowTransactionActionTypes.HR_SHOW_VIEWER:
      return { ...state, showViewer: true }
    case WorkflowTransactionActionTypes.HR_HIDE_VIEWER:
      return { ...state, showViewer: false }
    case WorkflowTransactionActionTypes.HR_PROCESSING:
      return { ...state, isProcessing: true }
    case WorkflowTransactionActionTypes.HR_NOT_PROCESSING:
      return { ...state, isProcessing: false }
    case WorkflowTransactionActionTypes.HR_LOAD_APPROVED_DATA_SUCCESS:
      return { ...state, approvedData: action.payload }
    case WorkflowTransactionActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS:
      return { ...state, awaitingApprovalData: action.payload }
    case WorkflowTransactionActionTypes.HR_RESET_DATA:
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