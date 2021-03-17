import { IPersonal } from "@nutela/models/workforce/employee-profiles";
import { IFeedbackMetadata, IFeedbackObjectiveMaster, IFeedbackObjectiveDetail, IFeedbackRating, IReviewWorkflowProcess } from "@nutela/models/talent/performance";
import { ISelectOption } from "@nutela/models/core-data";

export interface IFeedBackFormState {
  employeeInfo: IPersonal;
  feedbackMetaData: IFeedbackMetadata;
  feedbackRatings: ISelectOption[];
  canEmployeeProvideFeedback: boolean;
  startEmployeeFeedback: boolean;
  employeeObjectiveMaster: IFeedbackObjectiveMaster[];
  employeeObjectiveDetail: IFeedbackObjectiveDetail[];
  lmTeamCount: number;
  lmObjectiveMaster: IFeedbackObjectiveMaster[];
  lmObjectiveDetail: IFeedbackObjectiveDetail[];
  lmObjectiveDetailAlt: IFeedbackObjectiveDetail[];
  hrObjectiveMaster: IFeedbackObjectiveMaster[];
  hrObjectiveDetail: IFeedbackObjectiveDetail[];
  hrEmpObjectiveDetail: IFeedbackObjectiveDetail[];
  hrLMObjectiveDetail: IFeedbackObjectiveDetail[];
  processing:boolean;
  processingMasters: boolean;
  processingDetails: boolean;
  completingMasters: boolean;
  completingDetails: boolean;
  submittingObjective: boolean;
  loadingTeam: boolean;

  lmTeamList: IPersonal[];
  hrTeamList: IReviewWorkflowProcess[];

}

export const initialFeedBackFormState: IFeedBackFormState = {
  employeeInfo: null,
  feedbackMetaData: null,
  feedbackRatings: [],
  canEmployeeProvideFeedback: false,
  startEmployeeFeedback: false,
  employeeObjectiveMaster: [],
  employeeObjectiveDetail: [],
  lmTeamCount: null,
  lmObjectiveMaster: [],
  lmObjectiveDetail: [],
  lmObjectiveDetailAlt: [],
  hrObjectiveMaster: [],
  hrObjectiveDetail: [],
  hrEmpObjectiveDetail: [],
  hrLMObjectiveDetail: [],
  processing:false,
  processingMasters: false,
  processingDetails: false,
  completingMasters: false,
  completingDetails: false,
  submittingObjective: false,
  loadingTeam: false,

  lmTeamList: [],
  hrTeamList: [],

};
