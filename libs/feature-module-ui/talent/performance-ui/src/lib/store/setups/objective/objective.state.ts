
import { IObjectiveDto } from '@nutela/models/talent/performance';

export interface IObjectiveState {
  objectiveData: IObjectiveDto[];
  document: any;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialObjectiveState: IObjectiveState = {
  objectiveData: [],
  document: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
}

