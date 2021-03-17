import { ActionReducerMap } from "@ngrx/store";

import { IPerformanceState } from "./performance.state";
import { manageReviewReducer } from "../reviews/manage-review";
import { reviewStatusReducer } from "../reviews/review-status";
import { appraisalFormsReducer } from "../reviews/appraisal-forms";
import { reviewWorkflowProcessReducer } from "../reviews/review-workflow-process";

import {
  loadObjectivesReducer,
  manageObjectivesReducer,
  progressReportReducer,
  loadMultiEmployeeObjectivesReducer,
  loadSingleEmployeeObjectivesReducer,
  loadLibraryObjectivesReducer,
  objectiveApprovalReducer,
  lmManageObjectivesReducer,
} from '../../store/planning';

import {
  planReducer,
  perspectiveReducer,
  objectiveReducer,
  planOptionReducer,
  workflowStepReducer,
  workflowDefinitionReducer,
  contractPageDefinitionReducer,
  subscriptionDefinitionReducer,
  pageReducer,
  objectiveRatingReducer,
  ratingAssetDetailReducer,
  ratingAssetDefinitionReducer,
  formTemplateReducer,
  formTemplateDetailReducer,
  lineManagerReducer,
  perspectiveRatingReducer,
  sectionReducer,
  hurdleReducer,
  exemptReducer,
  configuration360Reducer,
  controlReducer,
  ecosystem360Reducer,
  roleWeightReducer,
  feedbackSessionReducer,
  feedbackQuestionReducer,
  feedbackRatingReducer
} from '../../store/setups';
import { teamReviewReducer } from "../reviews/team-review";
import { moderationQueueReducer } from "../queues/moderation-queue";
import { hrQueueReducer } from "../queues/hr-queue";
import { appraisalStatusReducer } from "../reviews/appraisal-status";
import { feedBackFormReducer } from "../reviews/feedback-form";
import { recommendationReducer } from "../setups/recommendation";
import { performanceDashboardReducer } from "../dashboard";

export const performanceReducers: ActionReducerMap<IPerformanceState> = {
  manageReview: manageReviewReducer,
  reviewStatus: reviewStatusReducer,
  appraisalForms: appraisalFormsReducer,
  reviewWorkflowProcess: reviewWorkflowProcessReducer,
  hrQueue: hrQueueReducer,
  moderationQueue: moderationQueueReducer,
  teamReview: teamReviewReducer,

  loadObjectives: loadObjectivesReducer,
  manageObjectives: manageObjectivesReducer,
  lmManageObjectives: lmManageObjectivesReducer,
  progressReport: progressReportReducer,
  multiEmployeeLoadObjectives: loadMultiEmployeeObjectivesReducer,
  singleEmployeeLoadObjectives: loadSingleEmployeeObjectivesReducer,
  libraryLoadObjectives: loadLibraryObjectivesReducer,
  planSetup: planReducer,
  perspectiveSetup: perspectiveReducer,
  objectiveSetup: objectiveReducer,
  planOptionSetup: planOptionReducer,
  workflowStepSetup: workflowStepReducer,
  workflowDefinitionSetup: workflowDefinitionReducer,
  contractPageDefinitionSetup: contractPageDefinitionReducer,
  subscriptionDefinitionSetup: subscriptionDefinitionReducer,
  pageSetup:pageReducer,
  objectiveRatingSetup: objectiveRatingReducer,
  ratingAssetDetailSetup: ratingAssetDetailReducer,
  ratingAssetDefinitionSetup: ratingAssetDefinitionReducer,
  formTemplateSetup: formTemplateReducer,
  formTemplateDetailSetup: formTemplateDetailReducer,
  lineManagerSetup: lineManagerReducer,
  perspectiveRatingSetup: perspectiveRatingReducer,
  sectionSetup: sectionReducer,
  hurdleSetup: hurdleReducer,
  exemptSetup: exemptReducer,
  configuration360Setup: configuration360Reducer,
  controlSetup: controlReducer,
  ecosystem360Setup: ecosystem360Reducer,
  roleWeightSetup: roleWeightReducer,
  objectiveApproval: objectiveApprovalReducer,
  appraisalStatus: appraisalStatusReducer,
  feedbackForm: feedBackFormReducer,
  feedbackSession: feedbackSessionReducer,
  feedbackQuestion: feedbackQuestionReducer,
  feedbackRating: feedbackRatingReducer,
  recommendation: recommendationReducer,
  performanceDashboard: performanceDashboardReducer
};
