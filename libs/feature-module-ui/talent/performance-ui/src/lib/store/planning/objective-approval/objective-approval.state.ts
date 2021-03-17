import {
  IObjectiveMasterDto, IPlan, IObjectiveMasterInfo, IPerspective
} from '@nutela/models/talent/performance';

export interface IObjectiveApprovalState {
  showViewer: boolean;  
  showEditor: boolean;  
  isProcessing: boolean;
  isProcessingDataGrid: boolean;
  objectiveMasterData: IObjectiveMasterDto[];
  workflowInfo: any;
  perspectiveList: IPerspective[];
  perspectiveWeightBalance: string;
}

export const initialObjectiveApprovalState: IObjectiveApprovalState = {
  showViewer: false,
  showEditor: false,
  isProcessing: false,
  isProcessingDataGrid: false,
  objectiveMasterData: [],
  workflowInfo: null,
  perspectiveList: [],
  perspectiveWeightBalance: null,
};
