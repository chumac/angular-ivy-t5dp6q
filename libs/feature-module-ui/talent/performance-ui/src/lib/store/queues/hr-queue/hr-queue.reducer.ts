import { initialHRQueueState, IHRQueueState } from './hr-queue.state';
import { HRQueueActions, HRQueueActionTypes } from './hr-queue.actions';

export function hrQueueReducer(
  state = initialHRQueueState,
  action: HRQueueActions
): IHRQueueState {
  switch (action.type) {
    case HRQueueActionTypes.LOAD_HR_QUEUE_SUCCESS:
      return { ...state, data: action.payload };
    default: {
      return state;
    }
  }
}
