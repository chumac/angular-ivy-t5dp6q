
import { IExempt, IPlan } from '@nutela/models/talent/performance';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';
import { IAnalysis, IAnalysisDetail, IPosition, IDesignation, IGrade } from '@nutela/models/workforce/personnel';

export interface IExemptState {
  exemptData: IExempt[];
  planList: IPlan[];
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

export const initialExemptState: IExemptState = {
  exemptData: [],
  planList:[],
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

