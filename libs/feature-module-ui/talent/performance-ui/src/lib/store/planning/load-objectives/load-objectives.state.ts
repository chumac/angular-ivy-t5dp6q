import {
  IObjectiveDto, IPlan
} from '@nutela/models/talent/performance';

export interface ILoadObjectivesState {
  showEditor: boolean;
  showViewer: boolean;
  isProcessing: boolean;
  isProcessingDataGrid: boolean;
  objectiveExists:boolean;
  objectiveData: IObjectiveDto[];
  planlist: IPlan[];

  isValidating: boolean;
  isImporting: boolean;

  validateBtn: boolean;
  importBtn: boolean;
  resetBtn: boolean;
  selectBtn: boolean;
  hasIssues: boolean;
}

export const initialLoadObjectivesState: ILoadObjectivesState = {
  showEditor: false,
  showViewer: false,
  isProcessing: false,
  isProcessingDataGrid: false,
  objectiveExists: true,
  objectiveData: [],
  planlist: [],

  isValidating: false,
  isImporting: false,
  
  validateBtn: false,
  importBtn: false,
  resetBtn: false,
  selectBtn: false,
  hasIssues: false
};
