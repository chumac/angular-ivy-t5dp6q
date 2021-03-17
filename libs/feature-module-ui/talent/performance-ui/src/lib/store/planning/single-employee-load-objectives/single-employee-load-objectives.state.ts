import {
  IObjectiveDto, IPlan, IObjectiveMasterDto
} from '@nutela/models/talent/performance';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';

export interface ISingleEmployeeLoadObjectivesState {
  showSingleEmployeeEditor: boolean;
  showSingleEmployeeViewer: boolean;
  singleEmployeeObjectivesData: IObjectiveDto[];
  planlist: IPlan[];
  employeeList: IPersonal[];
  singleEmployeeObjectiveExists:boolean;
  isProcessing: boolean,
  isProcessingDataGrid: boolean,

  isValidating: boolean;
  isImporting: boolean;
  validateBtn: boolean;
  importBtn: boolean;
  resetBtn: boolean;
  hasIssues: boolean;
  selectBtn: boolean;
}

export const initialSingleEmployeeLoadObjectivesState: ISingleEmployeeLoadObjectivesState = {
  showSingleEmployeeEditor: false,
  showSingleEmployeeViewer: false,
  singleEmployeeObjectivesData: [],
  planlist: [],
  employeeList: [],
  singleEmployeeObjectiveExists: false,
  isProcessing: false,
  isProcessingDataGrid: false,

  isValidating: false,
  isImporting: false,
  validateBtn: false,
  importBtn: false,
  resetBtn: false,
  hasIssues: false,
  selectBtn: false
};
