import {
  IObjectiveMasterDto, IPlan} from '@nutela/models/talent/performance';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';

export interface ILmManageObjectivesState {
  isProcessing: boolean;
  selectedEmployeeId: number;
  planlist: IPlan[];
  employeeList: IPersonal[];
  objectiveMasterData: IObjectiveMasterDto[];
  preScoredObjectiveMasterData: IObjectiveMasterDto[];
}

export const initialLmManageObjectivesState: ILmManageObjectivesState = {
  isProcessing: false,
  selectedEmployeeId: null,
  planlist: [],
  employeeList: [],
  objectiveMasterData: [],
  preScoredObjectiveMasterData: []
};
