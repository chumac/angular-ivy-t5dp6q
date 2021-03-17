
import { ITeamDeployment, ITeamDeploymentTransaction, IPersonal } from '@nutela/models/workforce/employee-profiles';
import { ISelectOption } from '@nutela/models/core-data';
import { IPosition } from '@nutela/models/workforce/personnel';

export interface ITeamDeploymentState {
  deploymentData: ITeamDeployment[];
  transactionData: ITeamDeploymentTransaction[];
  positionList: IPosition[];
  team: IPersonal[];
  suggestedSupervisor: number;
  loadingSuggestion: boolean;
  isProcessing: boolean;
  loading: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialTeamDeploymentState: ITeamDeploymentState = {
  deploymentData: [],
  transactionData: [],
  positionList: [],
  team: [],
  suggestedSupervisor: null,
  loadingSuggestion: false,
  isProcessing: false,
  loading: false,
  showEditor: false,
  showViewer: false,
};
