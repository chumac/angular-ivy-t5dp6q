import {
  initialProcessingState,
  IProcessingState
} from './processing.state';
import {
  ProcessingActions,
  ProcessingActionTypes
} from './processing.actions';

export function processingReducer(
  state = initialProcessingState,
  action: ProcessingActions
): IProcessingState {
  switch (action.type) {
    case ProcessingActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case ProcessingActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };

    case ProcessingActionTypes.LOADING_DATA:
      return { ...state, isLoading: true };
    case ProcessingActionTypes.NOT_LOADING_DATA:
      return { ...state, isLoading: false };

    case ProcessingActionTypes.LOAD_PROCESSING_DATA_SUCCESS:
      return { ...state, processingData: action.payload };

    case ProcessingActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS:
      return { ...state, awaitingData: action.payload };

    default: {
      return state;
    }
  }
}
