import { IAppraisalStatus } from '@nutela/models/talent/performance';

export interface IAppraisalStatusState {
  data: IAppraisalStatus[];
}

export const initialAppraisalStatusState: IAppraisalStatusState = {
  data: []
};
