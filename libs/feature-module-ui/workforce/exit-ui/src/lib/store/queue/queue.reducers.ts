import { initialQueueState, IQueueState } from './queue.state';
import { QueueActions, QueueActionTypes } from './queue.actions';

export function queueReducer(
  state = initialQueueState,
  action: QueueActions
): IQueueState {
  switch (action.type) {
    case QueueActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case QueueActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case QueueActionTypes.LOADING:
      return { ...state, isLoading: true };
    case QueueActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case QueueActionTypes.LOAD_DATA_MY_EXIT_RESPONSE_QUEUE_SUCCESS:
      return { ...state, myQueue: action.payload };
    case QueueActionTypes.LOAD_DATA_INTERVIEW_URL_SUCCESS:
      return { ...state, interviewUrl: action.payload };
    default: {
      return state;
    }
  }
}
