import { initialTrainingHistoryState, ITrainingHistoryState } from "./training-history.state";
import { TrainingHistoryActions, TrainingHistoryActionTypes } from "./training-history.actions";

export function trainingHistoryReducer(state = initialTrainingHistoryState, action: TrainingHistoryActions): ITrainingHistoryState {
  switch (action.type) {
    case TrainingHistoryActionTypes.HR_SHOW_EDITOR:
      return { ...state, showEditor: true }
    case TrainingHistoryActionTypes.HR_HIDE_EDITOR:
      return { ...state, showEditor: false }
    case TrainingHistoryActionTypes.HR_SHOW_VIEWER:
      return { ...state, showViewer: true }
    case TrainingHistoryActionTypes.HR_HIDE_VIEWER:
      return { ...state, showViewer: false }
    case TrainingHistoryActionTypes.HR_PROCESSING:
      return { ...state, isProcessing: true }
    case TrainingHistoryActionTypes.HR_NOT_PROCESSING:
      return { ...state, isProcessing: false }
    case TrainingHistoryActionTypes.HR_LOAD_APPROVED_DATA_SUCCESS:
      return { ...state, approvedData: action.payload }
    case TrainingHistoryActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS:
      return { ...state, awaitingApprovalData: action.payload }
    case TrainingHistoryActionTypes.HR_RESET_DATA:
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