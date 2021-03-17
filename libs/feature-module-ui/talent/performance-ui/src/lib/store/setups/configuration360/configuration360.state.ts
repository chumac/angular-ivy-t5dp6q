
import { IConfiguration360, IPlan } from '@nutela/models/talent/performance';
import { IAnalysis, IAnalysisDetail, IPosition, IDesignation, IGrade } from '@nutela/models/workforce/personnel';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';
import { ISelectOption } from '@nutela/models/core-data';

export interface IConfiguration360State {
  configuration360Data: IConfiguration360[];
  document: any;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
  plansList: IPlan[];
  analysisList: IAnalysis[];
  analysisDetList: IAnalysisDetail[];
  positionList: ISelectOption[];
  designationList: IDesignation[];
  gradeList: IGrade[];
  employeeList: IPersonal[];
}

export const initialConfiguration360State: IConfiguration360State = {
  configuration360Data: [],
  document: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false,
  plansList: [],
  analysisList: [],
  analysisDetList: [],
  positionList: [],
  designationList: [],
  gradeList: [],
  employeeList: []
}

