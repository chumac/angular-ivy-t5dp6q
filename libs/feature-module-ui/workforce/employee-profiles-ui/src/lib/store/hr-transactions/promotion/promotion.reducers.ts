import { initialPromotionState, IPromotionState } from './promotion.state';
import { PromotionActions, PromotionActionTypes } from './promotion.actions';

export function promotionReducer(
  state = initialPromotionState,
  action: PromotionActions
): IPromotionState {
  switch (action.type) {
    case PromotionActionTypes.LOADING:
      return { ...state, isLoading: true };
    case PromotionActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case PromotionActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case PromotionActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case PromotionActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case PromotionActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case PromotionActionTypes.SHOW_SUBMISSION_PROCESS_EDITOR:
      return { ...state, showSubmissionProcessEditor: true };
    case PromotionActionTypes.HIDE_SUBMISSION_PROCESS_EDITOR:
      return { ...state, showSubmissionProcessEditor: false };
    case PromotionActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case PromotionActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case PromotionActionTypes.LOAD_APPROVED_DATA_SUCCESS:
      return { ...state, approvedData: action.payload };
    case PromotionActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS:
      return { ...state, awaitingData: action.payload };
    case PromotionActionTypes.LOAD_PENDING_DATA_SUCCESS:
      return { ...state, pendingData: action.payload };
    case PromotionActionTypes.LOAD_ARREARS_STATUS_DATA_SUCCESS:
      return { ...state, arrearsStatus: action.payload };
    case PromotionActionTypes.LOAD_ACTIONS_DATA_SUCCESS:
      return { ...state, actions: action.payload };
    case PromotionActionTypes.LOAD_PAYGRADE_DATA_SUCCESS:
      return { ...state, paygradeData: action.payload };
    case PromotionActionTypes.LOAD_PAYGROUP_DATA_SUCCESS:
      return { ...state, paygroupData: action.payload };
    case PromotionActionTypes.LOAD_CURRENT_PAYGRADE_DATA_SUCCESS:
      return { ...state, currentPaygradeData: action.payload };
    case PromotionActionTypes.LOAD_CURRENT_PAYGROUP_DATA_SUCCESS:
      return { ...state, currentPaygroupData: action.payload };
    case PromotionActionTypes.LOAD_SUBMISSION_PROCESS_DATA_SUCCESS:
      return { ...state, submissionProcess: action.payload };
    case PromotionActionTypes.LOAD_SELECTED_PROMOTION_DATA:
      return { ...state, selectedPromotion: action.payload };
    case PromotionActionTypes.LOAD_EMPLOYEE_CURRENT_GRADE_PAYGROUP_DATA:
      return { ...state, employeeCurrentPayData: null };
    case PromotionActionTypes.LOAD_EMPLOYEE_CURRENT_GRADE_PAYGROUP_DATA_SUCCESS:
      return { ...state, employeeCurrentPayData: action.payload };
    default: {
      return state;
    }
  }
}
