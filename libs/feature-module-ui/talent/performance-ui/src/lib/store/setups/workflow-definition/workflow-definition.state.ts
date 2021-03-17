
import { IWorkflowDefinition } from '@nutela/models/talent/performance';
import { IAnalysis, IAnalysisDetail, IPosition, IDesignation, IGrade } from '@nutela/models/workforce/personnel';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';

export interface IWorkflowDefinitionState {
  workflowDefinitionData: IWorkflowDefinition[];
  document: any;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
  analysisList: IAnalysis[];
  analysisDetList: IAnalysisDetail[];
  positionList: IPosition[];
  designationList: IDesignation[];
  gradeList: IGrade[];
  employeeList: IPersonal[];
}

export const initialWorkflowDefinitionState: IWorkflowDefinitionState = {
  workflowDefinitionData: [],
  document: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false,
  analysisList: [],
  analysisDetList: [],
  positionList: [],
  designationList: [],
  gradeList: [],
  employeeList: []
}

