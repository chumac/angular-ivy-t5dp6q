
import { IManageReviewState } from "../reviews/manage-review";
import { IReviewStatusState } from "../reviews/review-status";
import { IAppraisalFormsState } from "../reviews/appraisal-forms";
import { IReviewWorkflowProcessState } from "../reviews/review-workflow-process";
import { ITeamReviewState } from "../reviews/team-review";
import { IModerationQueueState } from "../queues/moderation-queue";
import { IHRQueueState } from "../queues/hr-queue";

import {
  ILoadObjectivesState,
  IManageObjectivesState,
  ILmManageObjectivesState,
  IProgressReportState,
  IMultiEmployeeLoadObjectivesState,
  ISingleEmployeeLoadObjectivesState,
  ILibraryLoadObjectivesState,
  IPlanState,
  IPerspectiveState,
  IObjectiveState,
  IPlanOptionState,
  IWorkflowStepState,
  IWorkflowDefinitionState,
  IContractPageDefinitionState,
  ISubscriptionDefinitionState,
  IObjectiveRatingState,
  IRatingAssetDetailState,
  IFormTemplateState,
  IFormTemplateDetailState,
  ILineManagerState,
  IPerspectiveRatingState,
  ISectionState,
  IHurdleState,
  IExemptState,
  IControlState,
  IEcosystem360State,
  IObjectiveApprovalState,
} from '../../store';
import { IPageState, IRatingAssetDefinitionState, IConfiguration360State, IFeedbackSessionState, IFeedbackQuestionState, IFeedbackRatingState } from '../setups';

import { createFeatureSelector } from '@ngrx/store';
import { IRoleWeightState } from "../setups/role-weight";
import { IAppraisalStatusState } from "../reviews/appraisal-status";
import { IFeedBackFormState } from "../reviews/feedback-form";
import { IRecommendationState } from "../setups/recommendation";
import { IPerformanceDashboardState } from "../dashboard";

export const getPerformanceState = createFeatureSelector<IPerformanceState>('performance');

export interface IPerformanceState {
  manageReview: IManageReviewState;
  reviewStatus: IReviewStatusState;
  appraisalForms: IAppraisalFormsState;
  reviewWorkflowProcess: IReviewWorkflowProcessState;
  hrQueue: IHRQueueState;
  moderationQueue: IModerationQueueState;
  teamReview: ITeamReviewState;

  loadObjectives: ILoadObjectivesState;
  manageObjectives: IManageObjectivesState;
  lmManageObjectives: ILmManageObjectivesState;
  progressReport: IProgressReportState;
  multiEmployeeLoadObjectives: IMultiEmployeeLoadObjectivesState;
  singleEmployeeLoadObjectives: ISingleEmployeeLoadObjectivesState;
  libraryLoadObjectives: ILibraryLoadObjectivesState;
  planSetup: IPlanState;
  perspectiveSetup: IPerspectiveState;
  objectiveSetup: IObjectiveState;
  planOptionSetup: IPlanOptionState;
  workflowStepSetup: IWorkflowStepState;
  workflowDefinitionSetup: IWorkflowDefinitionState;
  contractPageDefinitionSetup: IContractPageDefinitionState;
  subscriptionDefinitionSetup: ISubscriptionDefinitionState;
  pageSetup: IPageState;
  objectiveRatingSetup: IObjectiveRatingState;
  ratingAssetDetailSetup: IRatingAssetDetailState;
  ratingAssetDefinitionSetup: IRatingAssetDefinitionState;
  formTemplateSetup: IFormTemplateState;
  formTemplateDetailSetup: IFormTemplateDetailState;
  lineManagerSetup: ILineManagerState;
  perspectiveRatingSetup: IPerspectiveRatingState;
  sectionSetup: ISectionState;
  hurdleSetup: IHurdleState;
  exemptSetup: IExemptState;
  configuration360Setup: IConfiguration360State;
  controlSetup: IControlState;
  ecosystem360Setup: IEcosystem360State;
  roleWeightSetup: IRoleWeightState;
  objectiveApproval: IObjectiveApprovalState;
  appraisalStatus: IAppraisalStatusState;
  feedbackForm: IFeedBackFormState;
  feedbackSession: IFeedbackSessionState;
  feedbackQuestion: IFeedbackQuestionState;
  feedbackRating: IFeedbackRatingState;
  recommendation: IRecommendationState;
  performanceDashboard: IPerformanceDashboardState;
}

export const initialState: IPerformanceState = {
  manageReview: null,
  reviewStatus: null,
  appraisalForms: null,
  reviewWorkflowProcess: null,
  hrQueue: null,
  moderationQueue: null,
  teamReview: null,

  loadObjectives: null,
  manageObjectives: null,
  lmManageObjectives: null,
  progressReport: null,
  multiEmployeeLoadObjectives: null,
  singleEmployeeLoadObjectives: null,
  libraryLoadObjectives: null,
  planSetup: null,
  perspectiveSetup: null,
  objectiveSetup: null,
  planOptionSetup: null,
  workflowStepSetup: null,
  workflowDefinitionSetup: null,
  contractPageDefinitionSetup: null,
  subscriptionDefinitionSetup: null,
  pageSetup: null,
  objectiveRatingSetup: null,
  ratingAssetDetailSetup: null,
  ratingAssetDefinitionSetup: null,
  formTemplateSetup: null,
  formTemplateDetailSetup: null,
  lineManagerSetup: null,
  perspectiveRatingSetup: null,
  sectionSetup: null,
  hurdleSetup: null,
  exemptSetup: null,
  configuration360Setup: null,
  controlSetup: null,
  ecosystem360Setup: null,
  roleWeightSetup: null,
  objectiveApproval: null,
  appraisalStatus: null,
  feedbackForm: null,
  feedbackSession: null,
  feedbackQuestion: null,
  feedbackRating: null,
  recommendation: null,
  performanceDashboard: null
};

