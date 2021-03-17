import {
  IObjectiveDto, IPlan, IObjectiveMasterDto, ILibraryObjective, IPerspective
} from '@nutela/models/talent/performance';

export interface ILibraryLoadObjectivesState {
  showLibraryEditor: boolean;
  showLibraryViewer: boolean;
  libraryObjectivesData: ILibraryObjective[];
  planlist: IPlan[];
  libraryObjectiveExists:boolean;
  isProcessing: boolean,
  isProcessingDataGrid: boolean,

  isValidating: boolean;
  isImporting: boolean;
  validateBtn: boolean;
  importBtn: boolean;
  resetBtn: boolean;
  hasIssues: boolean;
  selectBtn: boolean;

  perspectiveList: IPerspective[];
  analysisList: any[];
  analysisDetList: any[];
  positionList: any[];
  designationList: any[];
  gradeList: any[];
  employeeList: any[];
}

export const initialLibraryLoadObjectivesState: ILibraryLoadObjectivesState = {
  showLibraryEditor: false,
  showLibraryViewer: false,
  libraryObjectivesData: [],
  planlist: [],
  libraryObjectiveExists: false,
  isProcessing: false,
  isProcessingDataGrid: false,

  isValidating: false,
  isImporting: false,
  validateBtn: false,
  importBtn: false,
  resetBtn: false,
  hasIssues: false,
  selectBtn: true,

  perspectiveList: [],
  analysisList: [],
  analysisDetList: [],
  positionList: [],
  designationList: [],
  gradeList: [],
  employeeList: []
};
