
import { IRoleWeight } from '@nutela/models/talent/performance';
import { IAnalysis, IAnalysisDetail, IPosition, IDesignation, IGrade } from '@nutela/models/workforce/personnel';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';

export interface IRoleWeightState {
  roleWeightData: IRoleWeight[];
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

export const initialRoleWeightState: IRoleWeightState = {
  roleWeightData: [],
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

