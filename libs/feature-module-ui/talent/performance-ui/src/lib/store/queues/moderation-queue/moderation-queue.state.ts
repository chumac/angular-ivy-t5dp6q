import { IReviewWorkflowProcess } from '@nutela/models/talent/performance';

export interface IModerationQueueState {
  data: IReviewWorkflowProcess[];
}

export const initialModerationQueueState: IModerationQueueState = {
  data: []
};
