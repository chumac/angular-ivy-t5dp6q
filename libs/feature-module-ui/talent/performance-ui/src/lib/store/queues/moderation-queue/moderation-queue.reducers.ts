import { initialModerationQueueState, IModerationQueueState } from './moderation-queue.state';
import { ModerationQueueActions, ModerationQueueActionTypes } from './moderation-queue.actions';

export function moderationQueueReducer(
  state = initialModerationQueueState,
  action: ModerationQueueActions
): IModerationQueueState {
  switch (action.type) {
    case ModerationQueueActionTypes.LOAD_MODERATION_QUEUE_SUCCESS:
      return { ...state, data: action.payload };
    default: {
      return state;
    }
  }
}
