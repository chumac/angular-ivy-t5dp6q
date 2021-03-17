import { initialPromotionHistoryState, IPromotionHistoryState } from "./promotion-history.state";
import { PromotionHistoryActions, PromotionHistoryActionTypes } from "./promotion-history.actions";

export function promotionHistoryReducer(state = initialPromotionHistoryState, action: PromotionHistoryActions): IPromotionHistoryState {
  switch (action.type) {
    case PromotionHistoryActionTypes.HR_SHOW_EDITOR:
      return { ...state, showEditor: true }
    case PromotionHistoryActionTypes.HR_HIDE_EDITOR:
      return { ...state, showEditor: false }
    case PromotionHistoryActionTypes.HR_SHOW_VIEWER:
      return { ...state, showViewer: true }
    case PromotionHistoryActionTypes.HR_HIDE_VIEWER:
      return { ...state, showViewer: false }
    case PromotionHistoryActionTypes.HR_PROCESSING:
      return { ...state, isProcessing: true }
    case PromotionHistoryActionTypes.HR_NOT_PROCESSING:
      return { ...state, isProcessing: false }
    case PromotionHistoryActionTypes.HR_LOAD_APPROVED_DATA_SUCCESS:
      return { ...state, approvedData: action.payload }
    case PromotionHistoryActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS:
      return { ...state, awaitingApprovalData: action.payload }
    case PromotionHistoryActionTypes.HR_RESET_DATA:
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