import { IReviewWorkflowProcess } from '@nutela/models/talent/performance';

export interface ITeamReviewState {
  isLoading: boolean;
  data: IReviewWorkflowProcess[];
}

export const initialTeamReviewState: ITeamReviewState = {
  isLoading: false,
  data: []
};
