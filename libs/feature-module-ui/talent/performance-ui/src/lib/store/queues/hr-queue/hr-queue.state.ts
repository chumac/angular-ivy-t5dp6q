import { IReviewWorkflowProcess } from '@nutela/models/talent/performance';

export interface IHRQueueState {
  data: IReviewWorkflowProcess[];
}

export const initialHRQueueState: IHRQueueState = {
  data: []
};
