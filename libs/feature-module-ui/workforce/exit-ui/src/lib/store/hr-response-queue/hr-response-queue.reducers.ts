import { initialHrResponseQueueState, IHrResponseQueueState } from './hr-response-queue.state';
import { HrResponseQueueActions, HrResponseQueueActionTypes } from './hr-response-queue.actions';

export function hrResponseQueueReducer(
  state = initialHrResponseQueueState,
  action: HrResponseQueueActions
): IHrResponseQueueState {
  switch (action.type) {
    case HrResponseQueueActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case HrResponseQueueActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case HrResponseQueueActionTypes.LOADING:
      return { ...state, isLoading: true };
    case HrResponseQueueActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case HrResponseQueueActionTypes.LOAD_DATA_HR_RESPONSE_QUEUE_SUCCESS:
      return { ...state, hrResponseQueue: action.payload };
    case HrResponseQueueActionTypes.LOAD_DATA_INTERVIEW_URL_SUCCESS:
      return { ...state, interviewUrl: action.payload };
    default: {
      return state;
    }
  }
}
