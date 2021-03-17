
import { IDisciplinaryActionTransaction, IRecommendationType } from '@nutela/models/workforce/employee-profiles';
import { ISelectOption } from 'dist/libs/models/core-data';

export interface IDisciplinaryActionsState {
  isLoading: boolean;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
  recommendation: IRecommendationType;
  approvedData: IDisciplinaryActionTransaction[];
  awaitingApprovalData: IDisciplinaryActionTransaction[];
  actionRolesData: ISelectOption[];
  takeActionData: ISelectOption[];
  recommendationList: ISelectOption[];
}

export const initialDisciplinaryActionsState: IDisciplinaryActionsState = {
  isLoading: false,
  isProcessing: false,
  showEditor: false,
  showViewer: false,
  recommendation: null,
  approvedData: [],
  awaitingApprovalData: [],
  actionRolesData: null,
  takeActionData: null,
  recommendationList: null
};
