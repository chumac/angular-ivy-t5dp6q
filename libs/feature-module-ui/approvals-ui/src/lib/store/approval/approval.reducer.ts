import { initialApprovalState, IApprovalState } from './approval.state';
import { ApprovalActions, ApprovalActionTypes } from './approval.actions';
import { IWorkflowApprovalPath } from '@nutela/models/foundation';

export function approvalReducer(
  state = initialApprovalState,
  action: ApprovalActions
): IApprovalState {
  switch (action.type) {
    case ApprovalActionTypes.SHOW_APPROVE_EDITOR:
      return { ...state, showApproveEditor: true };
    case ApprovalActionTypes.HIDE_APPROVE_EDITOR:
      return { ...state, showApproveEditor: false };
    case ApprovalActionTypes.SHOW_DECLINE_EDITOR:
      return { ...state, showDeclineEditor: true };
    case ApprovalActionTypes.HIDE_DECLINE_EDITOR:
      return { ...state, showDeclineEditor: false };
    case ApprovalActionTypes.SHOW_REDIRECT_EDITOR:
      return { ...state, showRedirectEditor: true };
    case ApprovalActionTypes.HIDE_REDIRECT_EDITOR:
      return { ...state, showRedirectEditor: false };
    case ApprovalActionTypes.SHOW_REMOVE_EDITOR:
      return { ...state, showRemoveEditor: true };
    case ApprovalActionTypes.HIDE_REMOVE_EDITOR:
      return { ...state, showRemoveEditor: false };

    case ApprovalActionTypes.SHOW_REQUEST_EDITOR:
      return { ...state, showRequestEditor: true };
    case ApprovalActionTypes.HIDE_REQUEST_EDITOR:
      return { ...state, showRequestEditor: false };

    case ApprovalActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case ApprovalActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };

    case ApprovalActionTypes.SHOW_APPROVAL_PATH_VIEWER:
      return { ...state, showApprovalPathViewer: true };
    case ApprovalActionTypes.HIDE_APPROVAL_PATH_VIEWER:
      return { ...state, showApprovalPathViewer: false };


    case ApprovalActionTypes.LOADING_APPROVALS:
      return { ...state, isLoading: true };
    case ApprovalActionTypes.NOT_LOADING_APPROVALS:
      return { ...state, isLoading: false };

    case ApprovalActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case ApprovalActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };

    case ApprovalActionTypes.PROCESSING_DECLINE:
      return { ...state, isProcessingDecline: true };
    case ApprovalActionTypes.NOT_PROCESSING_DECLINE:
      return { ...state, isProcessingDecline: false };

    case ApprovalActionTypes.PROCESSING_REDIRECT:
      return { ...state, isProcessingRedirect: true };
    case ApprovalActionTypes.NOT_PROCESSING_REDIRECT:
    return { ...state, isProcessingRedirect: false };

    case ApprovalActionTypes.PROCESSING_REMOVE:
      return { ...state, isProcessingRemove: true };
    case ApprovalActionTypes.NOT_PROCESSING_REMOVE:
      return { ...state, isProcessingRemove: false };

    case ApprovalActionTypes.LOAD_APPROVAL_PATH_SUCCESS:
      return {...state, workflowApprovalPath: <IWorkflowApprovalPath[]>action.payload };
    case ApprovalActionTypes.CLEAR_APPROVAL_PATH:
        return {...state, workflowApprovalPath: [] };
    case ApprovalActionTypes.LOAD_QUEUE_SUCCESS:
      return {...state, queueLists:action.payload}

    case ApprovalActionTypes.LOAD_LABEL_VALUE:
      return {...state, viewerLabelValue:[]}

    case ApprovalActionTypes.LOAD_LABEL_VALUE_SUCCESS:
      return {...state, viewerLabelValue:action.payload}

    default: {
      return state;
    }
  }
}
