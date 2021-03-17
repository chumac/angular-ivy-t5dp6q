import { initialReviewerProcessTransactionState, IReviewerProcessTransactionState } from './reviewer-process-transaction.state';
import { ReviewerProcessTransactionActions, ReviewerProcessTransactionActionTypes } from './reviewer-process-transaction.actions';

export function reviewerProcessTransactionReducer(
  state = initialReviewerProcessTransactionState,
  action: ReviewerProcessTransactionActions
): IReviewerProcessTransactionState {
  switch (action.type) {
    case ReviewerProcessTransactionActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case ReviewerProcessTransactionActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case ReviewerProcessTransactionActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case ReviewerProcessTransactionActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case ReviewerProcessTransactionActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case ReviewerProcessTransactionActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case ReviewerProcessTransactionActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, reviewerProcessTransactionData: action.payload };
    case ReviewerProcessTransactionActionTypes.REMOVE_DATA:
      return { ...state, reviewerProcessTransactionData: state.reviewerProcessTransactionData.filter(item => item.id !== action.payload.recordId) };
    default: {
      return state;
    }
  }
}

