import { ManageReviewEffects } from "../reviews/manage-review";
import { ReviewStatusEffects } from "../reviews/review-status";
import { AppraisalFormsEffects } from "../reviews/appraisal-forms";
import { ReviewWorkflowProcessEffects } from "../reviews/review-workflow-process";

import {
  LoadObjectivesEffects,
  ManageObjectivesEffects,
  LmManageObjectivesEffects,
  ProgressReportEffects,
  MultiEmployeeLoadObjectivesEffects,
  LoadSingleEmployeeObjectivesEffects,
  LoadLibraryObjectivesEffects,
  ObjectiveApprovalEffects,

} from "../../store/planning";
import {
  PlanEffects,
  PerspectiveEffects,
  PlanOptionEffects,
  WorkflowStepEffects,
  WorkflowDefinitionEffects,
  ContractPageDefinitionEffects,
  SubscriptionDefinitionEffects,
  PageEffects,
  ObjectiveRatingEffects,
  RatingAssetDetailEffects,
  RatingAssetDefinitionEffects,
  FormTemplateEffects,
  FormTemplateDetailEffects,
  LineManagerEffects,
  PerspectiveRatingEffects,
  SectionEffects,
  HurdleEffects,
  ExemptEffects,
  Configuration360Effects,
  ControlEffects,
  Ecosystem360Effects,
  RoleWeightEffects,
  FeedbackSessionEffects,
  FeedbackQuestionEffects,
  FeedbackRatingEffects
} from "../../store/setups";
import { TeamReviewEffects } from "../reviews/team-review";
import { ModerationQueueEffects } from "../queues/moderation-queue";
import { HRQueueEffects } from "../queues/hr-queue";
import { AppraisalStatusEffects } from "../reviews/appraisal-status";
import { FeedbackFormEffects } from "../reviews/feedback-form";
import { RecommendationEffects } from "../setups/recommendation";
import { PerformanceDashboardEffects } from "../dashboard";

export const performanceEffects = [
  ManageReviewEffects,
  ReviewStatusEffects,
  AppraisalFormsEffects,
  ReviewWorkflowProcessEffects,
  HRQueueEffects,
  ModerationQueueEffects,
  TeamReviewEffects,

  LoadObjectivesEffects,
  ManageObjectivesEffects,
  LmManageObjectivesEffects,
  ProgressReportEffects,
  MultiEmployeeLoadObjectivesEffects,
  LoadSingleEmployeeObjectivesEffects,
  LoadLibraryObjectivesEffects,
  PlanEffects,
  PerspectiveEffects,
  PlanOptionEffects,
  WorkflowStepEffects,
  WorkflowDefinitionEffects,
  ContractPageDefinitionEffects,
  SubscriptionDefinitionEffects,
  PageEffects,
  ObjectiveRatingEffects,
  RatingAssetDetailEffects,
  RatingAssetDefinitionEffects,
  FormTemplateEffects,
  FormTemplateDetailEffects,
  LineManagerEffects,
  PerspectiveRatingEffects,
  SectionEffects,
  HurdleEffects,
  ExemptEffects,
  Configuration360Effects,
  ControlEffects,
  Ecosystem360Effects,
  RoleWeightEffects,
  ObjectiveApprovalEffects,
  AppraisalStatusEffects,
  FeedbackFormEffects,
  FeedbackSessionEffects,
  FeedbackQuestionEffects,
  FeedbackRatingEffects,
  RecommendationEffects,
  PerformanceDashboardEffects
]

