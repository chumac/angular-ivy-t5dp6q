import {
  IObjectiveMasterDto, IPlan, IObjectiveMasterInfo
} from '@nutela/models/talent/performance';
import { IPerspective } from 'libs/models/talent/performance/src/lib/interfaces/perspective.interface';

export interface IManageObjectivesState {
  showEditor: boolean;
  showViewer: boolean;
  showRecall: boolean;
  isProcessing: boolean;
  isProcessingDataGrid: boolean;
  planlist: IPlan[];
  perspectiveList: IPerspective[];
  perspectiveWeightBalance: string;
  lmPerspectiveWeightBalance: string;
  objectiveMasterData: IObjectiveMasterDto[];
  preScoredobjectivesMasterData: IObjectiveMasterDto[];
  objectiveInfo: IObjectiveMasterDto;

  addBtn: boolean;
  recallBtn: boolean;
  submitBtn: boolean;
  editBtn: boolean;
  viewBtn: boolean;
  deleteBtn: boolean;
  progressBtn: boolean;
  resetBtn: boolean;
}

export const initialManageObjectivesState: IManageObjectivesState = {
  showEditor: false,
  showViewer: false,
  showRecall: false,
  isProcessing: false,
  isProcessingDataGrid: false,
  planlist: [],
  perspectiveList: [],
  perspectiveWeightBalance: null,
  lmPerspectiveWeightBalance: null,
  objectiveMasterData: [],
  preScoredobjectivesMasterData: [],
  objectiveInfo: null,

  addBtn: false,
  recallBtn: false,
  submitBtn: false,
  editBtn: false,
  viewBtn: false,
  deleteBtn: false,
  progressBtn: false,
  resetBtn: false,
};
