
import { IPerspectiveRating, IPerspective } from '@nutela/models/talent/performance';
import { IAnalysis, IAnalysisDetail, IPosition, IDesignation, IGrade } from '@nutela/models/workforce/personnel';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';

export interface IPerspectiveRatingState {
  perspectiveRatingData: IPerspectiveRating[];
  document: any;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
  perspectiveList: IPerspective[];
  analysisList: IAnalysis[];
  analysisDetList: IAnalysisDetail[];
  positionList: IPosition[];
  designationList: IDesignation[];
  gradeList: IGrade[];
  employeeList: IPersonal[];
} 

export const initialPerspectiveRatingState: IPerspectiveRatingState = {
  perspectiveRatingData: [],
  document: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false,
  perspectiveList: [],
  analysisList: [],
  analysisDetList: [],
  positionList: [],
  designationList: [],
  gradeList: [],
  employeeList: []
}

